import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";

export const runtime = "nodejs";

type PatchBody = {
  name?: string;
  email?: string;
  attending?: "yes" | "no";
  bus?: string;
  diet_pref?: string;
  diet_other?: string;
  allergies?: string[];
  allergy_other?: string;
  plus_one?: boolean;
  plus_one_name?: string;
  plus_one_bus?: string;
  plus_one_diet_pref?: string;
  plus_one_diet_other?: string;
  plus_one_allergies?: string[];
  plus_one_allergy_other?: string;
};

const str = (v: string | undefined | null) => (v ?? "").toString();
const arr = (v: string[] | undefined | null) => (Array.isArray(v) ? v : []);

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ ok: false, error: "bad_id" }, { status: 400 });
  }

  let body: PatchBody;
  try {
    body = (await req.json()) as PatchBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const sql = getSql();
  if (!sql) {
    return NextResponse.json(
      { ok: false, error: "db_unavailable" },
      { status: 503 }
    );
  }

  const attending = body.attending === "no" ? "no" : "yes";
  const numericId = Number(id);

  try {
    await sql`
      UPDATE rsvps SET
        name                   = ${str(body.name)},
        email                  = ${str(body.email)},
        attending              = ${attending},
        bus                    = ${str(body.bus)},
        diet_pref              = ${str(body.diet_pref)},
        diet_other             = ${str(body.diet_other)},
        allergies              = ${arr(body.allergies)},
        allergy_other          = ${str(body.allergy_other)},
        plus_one               = ${!!body.plus_one},
        plus_one_name          = ${str(body.plus_one_name)},
        plus_one_bus           = ${str(body.plus_one_bus)},
        plus_one_diet_pref     = ${str(body.plus_one_diet_pref)},
        plus_one_diet_other    = ${str(body.plus_one_diet_other)},
        plus_one_allergies     = ${arr(body.plus_one_allergies)},
        plus_one_allergy_other = ${str(body.plus_one_allergy_other)}
      WHERE id = ${numericId}
    `;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/rsvps/patch] failed", err);
    return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ ok: false, error: "bad_id" }, { status: 400 });
  }

  const sql = getSql();
  if (!sql) {
    return NextResponse.json(
      { ok: false, error: "db_unavailable" },
      { status: 503 }
    );
  }

  try {
    await sql`DELETE FROM rsvps WHERE id = ${Number(id)}`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/rsvps/delete] failed", err);
    return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  }
}
