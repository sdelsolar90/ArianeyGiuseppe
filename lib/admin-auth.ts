import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const SECRET = process.env.ADMIN_SECRET ?? "";
const PASSWORD = process.env.ADMIN_PASSWORD ?? "";
export const COOKIE_NAME = "ag_admin";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function isConfigured() {
  return SECRET.length > 0 && PASSWORD.length > 0;
}

export function checkPassword(input: string) {
  if (!PASSWORD || !input) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(PASSWORD);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function signToken(payload = "admin") {
  return createHmac("sha256", SECRET).update(payload).digest("hex");
}

export function verifyToken(token: string | undefined | null) {
  if (!token || !SECRET) return false;
  const expected = signToken("admin");
  if (token.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}

export async function isAuthenticated() {
  if (!isConfigured()) return false;
  const store = await cookies();
  return verifyToken(store.get(COOKIE_NAME)?.value);
}
