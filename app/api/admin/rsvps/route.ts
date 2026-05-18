import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { getSql, type RsvpRow } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const sql = getSql();
  if (!sql) {
    return NextResponse.json({ ok: true, rows: [], totals: emptyTotals() });
  }

  try {
    const rows = (await sql`
      SELECT * FROM rsvps ORDER BY created_at DESC
    `) as unknown as RsvpRow[];

    const totals = computeTotals(rows);
    return NextResponse.json({ ok: true, rows, totals });
  } catch (err) {
    console.error("[admin/rsvps] query failed", err);
    return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  }
}

function emptyTotals() {
  return {
    submissions: 0,
    attending: 0,
    declined: 0,
    headcount: 0,
    busSeats: 0,
  };
}

function computeTotals(rows: RsvpRow[]) {
  let attending = 0;
  let declined = 0;
  let headcount = 0;
  let busSeats = 0;
  for (const r of rows) {
    if (r.attending === "yes") {
      attending++;
      headcount++;
      if (r.plus_one) headcount++;
      if (r.bus === "yes") {
        busSeats++;
        if (r.plus_one && r.plus_one_bus === "yes") busSeats++;
      }
    } else {
      declined++;
    }
  }
  return { submissions: rows.length, attending, declined, headcount, busSeats };
}
