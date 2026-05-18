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

const DIET_KEYS = ["vegan", "vegetarian", "none", "other"] as const;

function emptyTotals() {
  return {
    submissions: 0,
    attending: 0,
    declined: 0,
    headcount: 0,
    busSeats: 0,
    diet: { vegan: 0, vegetarian: 0, none: 0, other: 0 },
    allergies: {} as Record<string, number>,
  };
}

function computeTotals(rows: RsvpRow[]) {
  const t = emptyTotals();
  t.submissions = rows.length;

  const addDiet = (pref: string | null | undefined) => {
    if (!pref) return;
    if ((DIET_KEYS as readonly string[]).includes(pref)) {
      t.diet[pref as keyof typeof t.diet]++;
    }
  };
  const addAllergies = (list: string[] | null | undefined) => {
    if (!Array.isArray(list)) return;
    for (const a of list) {
      t.allergies[a] = (t.allergies[a] ?? 0) + 1;
    }
  };

  for (const r of rows) {
    if (r.attending === "yes") {
      t.attending++;
      t.headcount++;
      addDiet(r.diet_pref);
      addAllergies(r.allergies);
      if (r.bus === "yes") t.busSeats++;
      if (r.plus_one) {
        t.headcount++;
        addDiet(r.plus_one_diet_pref);
        addAllergies(r.plus_one_allergies);
        if (r.plus_one_bus === "yes") t.busSeats++;
      }
    } else {
      t.declined++;
    }
  }

  return t;
}
