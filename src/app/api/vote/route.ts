import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const visitorId = body.visitorId;

    if (!visitorId || typeof visitorId !== "string" || visitorId.length < 8) {
      return NextResponse.json(
        { success: false, error: "Invalid visitor identifier" },
        { status: 400 }
      );
    }

    const rawIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const salt = process.env.VOTE_SALT || "rent-anything-blr-secret-salt";
    const ipHash = crypto
      .createHash("sha256")
      .update(rawIp + salt)
      .digest("hex");

    const userAgent = request.headers.get("user-agent")?.slice(0, 255) || "Unknown";

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isConfigured = Boolean(
      supabaseUrl &&
      !supabaseUrl.includes("placeholder") &&
      !supabaseUrl.includes("your-project")
    );

    if (!isConfigured) {
      // Graceful offline/preview fallback before Vercel env vars are set
      return NextResponse.json({
        success: true,
        already_voted: false,
        count: null,
        mode: "local_mock",
      });
    }

    const supabase = createAdminClient();

    // 1. Try anti-spam procedure if created
    const { data: antiSpamData, error: antiSpamError } = await supabase.rpc("cast_excitement_vote", {
      p_visitor_id: visitorId,
      p_ip_hash: ipHash,
      p_user_agent: userAgent,
    });

    if (!antiSpamError && antiSpamData) {
      return NextResponse.json(antiSpamData);
    }

    // 2. Fallback to increment_excitement RPC
    const { data: count, error: incError } = await supabase.rpc("increment_excitement");

    if (incError) {
      console.warn("Supabase increment_excitement warning:", incError.message);
      return NextResponse.json({
        success: true,
        already_voted: false,
        count: null,
      });
    }

    return NextResponse.json({
      success: true,
      already_voted: false,
      count: Number(count),
    });
  } catch (err: any) {
    console.error("Vote API route exception:", err);
    return NextResponse.json(
      { success: true, count: null, error: "Handled gracefully" }
    );
  }
}
