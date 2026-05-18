import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  attending?: "yes" | "no";
  plusOne?: boolean;
  plusOneName?: string;
  bus?: "yes" | "no" | "";
  dietPref?: "vegan" | "vegetarian" | "none" | "other" | "";
  dietOther?: string;
  allergies?: string[];
  allergyOther?: string;
  plusOneBus?: "yes" | "no" | "";
  plusOneDietPref?: "vegan" | "vegetarian" | "none" | "other" | "";
  plusOneDietOther?: string;
  plusOneAllergies?: string[];
  plusOneAllergyOther?: string;
  locale?: string;
  submittedAt?: string;
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  if (!name || !email) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const attending = body.attending === "no" ? "no" : "yes";

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    null;
  const userAgent = req.headers.get("user-agent") ?? null;

  const row = {
    submitted_at: body.submittedAt ?? new Date().toISOString(),
    name,
    email,
    attending,
    plus_one: !!body.plusOne,
    plus_one_name: body.plusOneName ?? "",
    bus: body.bus ?? "",
    diet_pref: body.dietPref ?? "",
    diet_other: body.dietOther ?? "",
    allergies: Array.isArray(body.allergies) ? body.allergies : [],
    allergy_other: body.allergyOther ?? "",
    plus_one_bus: body.plusOneBus ?? "",
    plus_one_diet_pref: body.plusOneDietPref ?? "",
    plus_one_diet_other: body.plusOneDietOther ?? "",
    plus_one_allergies: Array.isArray(body.plusOneAllergies) ? body.plusOneAllergies : [],
    plus_one_allergy_other: body.plusOneAllergyOther ?? "",
    locale: body.locale ?? "es",
    ip,
    user_agent: userAgent,
  };

  const sql = getSql();
  if (!sql) {
    console.warn("[rsvp] DATABASE_URL missing — skipping insert");
    console.log("[rsvp] row →", row);
    return NextResponse.json({ ok: true, skipped: true });
  }

  try {
    await sql`
      INSERT INTO rsvps (
        submitted_at, name, email, attending, plus_one, plus_one_name,
        bus, diet_pref, diet_other, allergies, allergy_other,
        plus_one_bus, plus_one_diet_pref, plus_one_diet_other,
        plus_one_allergies, plus_one_allergy_other, locale, ip, user_agent
      ) VALUES (
        ${row.submitted_at}, ${row.name}, ${row.email}, ${row.attending},
        ${row.plus_one}, ${row.plus_one_name}, ${row.bus}, ${row.diet_pref},
        ${row.diet_other}, ${row.allergies}, ${row.allergy_other},
        ${row.plus_one_bus}, ${row.plus_one_diet_pref}, ${row.plus_one_diet_other},
        ${row.plus_one_allergies}, ${row.plus_one_allergy_other}, ${row.locale},
        ${row.ip}, ${row.user_agent}
      )
    `;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[rsvp] db insert failed", err);
    return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  }
}
