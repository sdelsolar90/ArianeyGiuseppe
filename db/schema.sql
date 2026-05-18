-- Run this once in your Neon SQL editor.

CREATE TABLE IF NOT EXISTS rsvps (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  submitted_at TIMESTAMPTZ,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  attending TEXT NOT NULL CHECK (attending IN ('yes', 'no')),
  plus_one BOOLEAN NOT NULL DEFAULT false,
  plus_one_name TEXT NOT NULL DEFAULT '',
  bus TEXT NOT NULL DEFAULT '',
  diet_pref TEXT NOT NULL DEFAULT '',
  diet_other TEXT NOT NULL DEFAULT '',
  allergies TEXT[] NOT NULL DEFAULT '{}',
  allergy_other TEXT NOT NULL DEFAULT '',
  plus_one_bus TEXT NOT NULL DEFAULT '',
  plus_one_diet_pref TEXT NOT NULL DEFAULT '',
  plus_one_diet_other TEXT NOT NULL DEFAULT '',
  plus_one_allergies TEXT[] NOT NULL DEFAULT '{}',
  plus_one_allergy_other TEXT NOT NULL DEFAULT '',
  locale TEXT NOT NULL DEFAULT 'es',
  ip TEXT,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS rsvps_created_at_idx ON rsvps (created_at DESC);
CREATE INDEX IF NOT EXISTS rsvps_attending_idx ON rsvps (attending);
