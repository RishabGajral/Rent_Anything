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
      console.error("Supabase increment_excitement error:", incError);
      return NextResponse.json(
        { success: false, error: incError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      already_voted: false,
      count: Number(count),
    });
  } catch (err: any) {
    console.error("Vote API route exception:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
