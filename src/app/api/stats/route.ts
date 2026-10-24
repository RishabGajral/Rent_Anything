import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("platform_stats")
      .select("counter_value")
      .eq("id", "excitement_count")
      .single();

    if (error) {
      console.error("Error fetching stats:", error);
      return NextResponse.json({ count: 1428, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ count: Number(data.counter_value) });
  } catch (err: any) {
    return NextResponse.json({ count: 1428, error: err.message }, { status: 500 });
  }
}
