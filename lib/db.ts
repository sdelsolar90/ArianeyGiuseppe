import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL;

let cachedSql: NeonQueryFunction<false, false> | null = null;

export function getSql(): NeonQueryFunction<false, false> | null {
  if (!DATABASE_URL) return null;
  if (!cachedSql) cachedSql = neon(DATABASE_URL);
  return cachedSql;
}

export type RsvpRow = {
  id: string;
  created_at: string;
  submitted_at: string | null;
  name: string;
  email: string;
  attending: "yes" | "no";
  plus_one: boolean;
  plus_one_name: string;
  bus: string;
  diet_pref: string;
  diet_other: string;
  allergies: string[];
  allergy_other: string;
  plus_one_bus: string;
  plus_one_diet_pref: string;
  plus_one_diet_other: string;
  plus_one_allergies: string[];
  plus_one_allergy_other: string;
  locale: string;
};
