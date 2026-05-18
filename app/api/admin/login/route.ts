import { NextResponse } from "next/server";
import {
  COOKIE_MAX_AGE,
  COOKIE_NAME,
  checkPassword,
  isConfigured,
  signToken,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!isConfigured()) {
    return NextResponse.json(
      { ok: false, error: "admin_not_configured" },
      { status: 500 }
    );
  }

  let body: { password?: string };
  try {
    body = (await req.json()) as { password?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!checkPassword(body.password ?? "")) {
    return NextResponse.json({ ok: false, error: "wrong_password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: COOKIE_NAME,
    value: signToken(),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return res;
}
