import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isConfigured = Boolean(
      supabaseUrl &&
      !supabaseUrl.includes("placeholder") &&
      !supabaseUrl.includes("your-project")
    );

    if (!isConfigured) {
      return NextResponse.json({ count: 0, isLocalMock: true });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("platform_stats")
      .select("counter_value")
      .eq("id", "excitement_count")
      .single();

    if (error || !data) {
      console.warn("Supabase stats query warning:", error?.message);
      return NextResponse.json({ count: 0 });
    }

    return NextResponse.json({ count: Number(data.counter_value) });
  } catch (err: any) {
    return NextResponse.json({ count: 0 });
  }
}
