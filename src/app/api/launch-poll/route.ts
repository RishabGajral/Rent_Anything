import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

// Fallback in-memory state for development if table not yet created in Supabase
let memoryVotes: Record<string, number> = {
  "HSR Layout": 0,
  "Koramangala": 0,
  "Indiranagar": 0,
  "Whitefield": 0,
  "Bellandur / Sarjapur": 0,
  "JP Nagar / Jayanagar": 0,
};

let memoryPledges: Array<{ area: string; role: string; text: string; created_at: string }> = [];

export async function GET() {
  try {
    const supabase = createAdminClient();

    // Query Supabase neighbourhood_votes table
    const { data: dbVotes, error: votesError } = await supabase
      .from("neighbourhood_votes")
      .select("neighbourhood, user_role, pledge_text, created_at")
      .order("created_at", { ascending: false });

    if (!votesError && dbVotes) {
      // Aggregate real votes
      const counts: Record<string, number> = {
        "HSR Layout": 0,
        "Koramangala": 0,
        "Indiranagar": 0,
        "Whitefield": 0,
        "Bellandur / Sarjapur": 0,
        "JP Nagar / Jayanagar": 0,
      };

      const pledgesList: Array<{ area: string; role: string; text: string; created_at: string }> = [];

      dbVotes.forEach((row: any) => {
        if (counts[row.neighbourhood] !== undefined) {
          counts[row.neighbourhood] += 1;
        } else {
          counts[row.neighbourhood] = 1;
        }

        if (row.pledge_text && pledgesList.length < 8) {
          pledgesList.push({
            area: row.neighbourhood,
            role: row.user_role === "renter" ? "Renter" : row.user_role === "lister" ? "Owner" : "Both",
            text: row.pledge_text,
            created_at: row.created_at,
          });
        }
      });

      return NextResponse.json({
        votes: counts,
        pledges: pledgesList,
        totalVotes: dbVotes.length,
      });
    }

    // Fallback if table does not exist yet
    return NextResponse.json({
      votes: memoryVotes,
      pledges: memoryPledges,
      totalVotes: Object.values(memoryVotes).reduce((a, b) => a + b, 0),
    });
  } catch (err) {
    return NextResponse.json({
      votes: memoryVotes,
      pledges: memoryPledges,
      totalVotes: 0,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { area, role, text } = body;

    if (!area || typeof area !== "string") {
      return NextResponse.json({ success: false, error: "Area is required" }, { status: 400 });
    }

    const cleanArea = area.trim();
    const cleanRole = role === "renter" || role === "lister" || role === "both" ? role : "both";
    const cleanText = typeof text === "string" ? text.trim().slice(0, 200) : "";

    const supabase = createAdminClient();

    // Try inserting into Supabase
    const { error: insertError } = await supabase
      .from("neighbourhood_votes")
      .insert({
        neighbourhood: cleanArea,
        user_role: cleanRole,
        pledge_text: cleanText || null,
      });

    if (!insertError) {
      // Re-fetch aggregated counts
      const { data: dbVotes } = await supabase
        .from("neighbourhood_votes")
        .select("neighbourhood, user_role, pledge_text, created_at")
        .order("created_at", { ascending: false });

      const counts: Record<string, number> = {
        "HSR Layout": 0,
        "Koramangala": 0,
        "Indiranagar": 0,
        "Whitefield": 0,
        "Bellandur / Sarjapur": 0,
        "JP Nagar / Jayanagar": 0,
      };

      const pledgesList: Array<{ area: string; role: string; text: string; created_at: string }> = [];

      (dbVotes || []).forEach((row: any) => {
        if (counts[row.neighbourhood] !== undefined) {
          counts[row.neighbourhood] += 1;
        } else {
          counts[row.neighbourhood] = 1;
        }

        if (row.pledge_text && pledgesList.length < 8) {
          pledgesList.push({
            area: row.neighbourhood,
            role: row.user_role === "renter" ? "Renter" : row.user_role === "lister" ? "Owner" : "Both",
            text: row.pledge_text,
            created_at: row.created_at,
          });
        }
      });

      return NextResponse.json({
        success: true,
        votes: counts,
        pledges: pledgesList,
      });
    }

    // Memory fallback
    memoryVotes[cleanArea] = (memoryVotes[cleanArea] || 0) + 1;
    if (cleanText) {
      memoryPledges.unshift({
        area: cleanArea,
        role: cleanRole === "renter" ? "Renter" : cleanRole === "lister" ? "Owner" : "Both",
        text: cleanText,
        created_at: new Date().toISOString(),
      });
      memoryPledges = memoryPledges.slice(0, 8);
    }

    return NextResponse.json({
      success: true,
      votes: memoryVotes,
      pledges: memoryPledges,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
