-- ============================================================================
-- Rent Anything Bengaluru — Supabase PostgreSQL Schema & RLS Policies
-- ============================================================================

-- 1. Profiles Table (Extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  phone_verified BOOLEAN DEFAULT FALSE,
  neighbourhood TEXT NOT NULL,
  avatar_url TEXT,
  rating NUMERIC(2,1) DEFAULT 5.0,
  total_rentals INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Rental Items & Wanted Pins Table
CREATE TABLE IF NOT EXISTS public.rental_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('listing', 'wanted')),
  category TEXT NOT NULL,
  icon TEXT DEFAULT '📦',
  price_per_day NUMERIC(10,2) NOT NULL,
  weekly_price NUMERIC(10,2),
  deposit NUMERIC(10,2) NOT NULL,
  condition TEXT NOT NULL,
  neighbourhood TEXT NOT NULL,
  distance_label TEXT,
  -- Geolocation coords: Longitude, Latitude
  longitude DOUBLE PRECISION NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  -- Approximate blurred/fuzzy privacy coordinates (+/- 150m)
  fuzzy_longitude DOUBLE PRECISION NOT NULL,
  fuzzy_latitude DOUBLE PRECISION NOT NULL,
  handover_spot TEXT NOT NULL,
  description TEXT,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  booked_dates DATE[] DEFAULT ARRAY[]::DATE[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.rental_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active listings are viewable by anyone" 
  ON public.rental_items FOR SELECT USING (is_active = true);

CREATE POLICY "Owners can insert their own items" 
  ON public.rental_items FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update their own items" 
  ON public.rental_items FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete their own items" 
  ON public.rental_items FOR DELETE USING (auth.uid() = owner_id);

-- 3. Rental Booking Requests
CREATE TABLE IF NOT EXISTS public.rental_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID REFERENCES public.rental_items(id) ON DELETE CASCADE NOT NULL,
  renter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_days INT NOT NULL,
  total_amount NUMERIC(10,2) NOT NULL,
  deposit_amount NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed', 'cancelled')),
  handover_spot TEXT,
  renter_phone_revealed BOOLEAN DEFAULT FALSE,
  owner_phone_revealed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.rental_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view requests they are part of" 
  ON public.rental_requests FOR SELECT 
  USING (auth.uid() = renter_id OR auth.uid() = owner_id);

CREATE POLICY "Renters can create requests" 
  ON public.rental_requests FOR INSERT 
  WITH CHECK (auth.uid() = renter_id);

CREATE POLICY "Participants can update request status" 
  ON public.rental_requests FOR UPDATE 
  USING (auth.uid() = renter_id OR auth.uid() = owner_id);

-- 4. Excitement Poll & Neighbourhood Votes
CREATE TABLE IF NOT EXISTS public.neighbourhood_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  neighbourhood TEXT NOT NULL,
  user_role TEXT DEFAULT 'both' CHECK (user_role IN ('renter', 'lister', 'both')),
  pledge_text TEXT,
  voter_ip_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.neighbourhood_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view neighbourhood votes" 
  ON public.neighbourhood_votes FOR SELECT USING (true);

CREATE POLICY "Anyone can submit a vote" 
  ON public.neighbourhood_votes FOR INSERT WITH CHECK (true);

-- 5. Global Excitement Counter (Atomic Realtime Counter)
CREATE TABLE IF NOT EXISTS public.platform_stats (
  id TEXT PRIMARY KEY,
  counter_value BIGINT NOT NULL DEFAULT 1428,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial counter
INSERT INTO public.platform_stats (id, counter_value)
VALUES ('excitement_count', 1428)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.platform_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read platform stats"
  ON public.platform_stats FOR SELECT USING (true);

-- Atomic increment stored procedure (prevents race conditions)
CREATE OR REPLACE FUNCTION public.increment_excitement()
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count BIGINT;
BEGIN
  UPDATE public.platform_stats
  SET counter_value = counter_value + 1,
      updated_at = NOW()
  WHERE id = 'excitement_count'
  RETURNING counter_value INTO new_count;

  RETURN new_count;
END;
$$;

-- Grant permission to public anon callers
GRANT EXECUTE ON FUNCTION public.increment_excitement() TO anon, authenticated;

-- Enable Realtime publication so all visitors see live counter increments
ALTER PUBLICATION supabase_realtime ADD TABLE public.platform_stats;

-- 6. Anti-Spam Excitement Votes Log (Enforces 1 Vote Per Visitor / Browser)
CREATE TABLE IF NOT EXISTS public.excitement_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT NOT NULL UNIQUE,       -- Guarantees the same device/browser cannot vote twice
  ip_hash TEXT,                          -- SHA-256 hashed client IP
  user_agent TEXT,                       -- Client device info
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.excitement_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can record a unique vote"
  ON public.excitement_votes FOR INSERT WITH CHECK (true);

-- Anti-Spam Atomic Stored Procedure
CREATE OR REPLACE FUNCTION public.cast_excitement_vote(
  p_visitor_id TEXT,
  p_ip_hash TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_inserted BOOLEAN := FALSE;
  v_current_count BIGINT;
  v_ip_vote_count INT := 0;
BEGIN
  -- Rate-limit per IP: Maximum 5 votes per IP per 24 hours (prevents script spam while allowing household users)
  IF p_ip_hash IS NOT NULL THEN
    SELECT COUNT(*) INTO v_ip_vote_count
    FROM public.excitement_votes
    WHERE ip_hash = p_ip_hash
      AND created_at > NOW() - INTERVAL '24 hours';

    IF v_ip_vote_count >= 5 THEN
      SELECT counter_value INTO v_current_count
      FROM public.platform_stats
      WHERE id = 'excitement_count';

      RETURN jsonb_build_object(
        'success', FALSE,
        'rate_limited', TRUE,
        'already_voted', TRUE,
        'message', 'Maximum votes from this network reached for today.',
        'count', v_current_count
      );
    END IF;
  END IF;

  -- Attempt to insert unique visitor_id (ON CONFLICT prevents duplicates)
  INSERT INTO public.excitement_votes (visitor_id, ip_hash, user_agent)
  VALUES (p_visitor_id, p_ip_hash, p_user_agent)
  ON CONFLICT (visitor_id) DO NOTHING;

  GET DIAGNOSTICS v_inserted = ROW_COUNT;

  IF v_inserted THEN
    -- Increment the global counter ONLY on a verified fresh vote
    UPDATE public.platform_stats
    SET counter_value = counter_value + 1,
        updated_at = NOW()
    WHERE id = 'excitement_count'
    RETURNING counter_value INTO v_current_count;

    RETURN jsonb_build_object(
      'success', TRUE,
      'already_voted', FALSE,
      'rate_limited', FALSE,
      'count', v_current_count
    );
  ELSE
    -- Visitor already voted
    SELECT counter_value INTO v_current_count
    FROM public.platform_stats
    WHERE id = 'excitement_count';

    RETURN jsonb_build_object(
      'success', TRUE,
      'already_voted', TRUE,
      'rate_limited', FALSE,
      'count', v_current_count
    );
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.cast_excitement_vote(TEXT, TEXT, TEXT) TO anon, authenticated;


