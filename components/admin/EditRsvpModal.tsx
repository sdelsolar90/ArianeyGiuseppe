"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon } from "../icons";

const ALLERGY_KEYS = ["gluten", "lactose", "nuts", "seafood", "egg", "other"] as const;
const ALLERGY_LABEL: Record<string, string> = {
  gluten: "Gluten",
  lactose: "Lactosa",
  nuts: "Frutos secos",
  seafood: "Mariscos",
  egg: "Huevo",
  other: "Otra",
};

const DIET_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "—" },
  { value: "vegan", label: "Vegana" },
  { value: "vegetarian", label: "Vegetariana" },
  { value: "none", label: "Ninguna" },
  { value: "other", label: "Otra" },
];

export type EditableRsvp = {
  id: string;
  name: string;
  email: string;
  attending: "yes" | "no";
  bus: string;
  diet_pref: string;
  diet_other: string;
  allergies: string[];
  allergy_other: string;
  plus_one: boolean;
  plus_one_name: string;
  plus_one_bus: string;
  plus_one_diet_pref: string;
  plus_one_diet_other: string;
  plus_one_allergies: string[];
  plus_one_allergy_other: string;
};

export default function EditRsvpModal({
  row,
  onClose,
  onSaved,
}: {
  row: EditableRsvp;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [draft, setDraft] = useState<EditableRsvp>(row);
  const [busy, setBusy] = useState<"idle" | "saving" | "deleting">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const patch = <K extends keyof EditableRsvp>(key: K, value: EditableRsvp[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const save = async () => {
    setBusy("saving");
    setError(null);
    try {
      const res = await fetch(`/api/admin/rsvps/${row.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      onSaved();
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
      setBusy("idle");
    }
  };

  const remove = async () => {
    if (!confirm(`¿Eliminar la confirmación de ${row.name}? No se puede deshacer.`)) return;
    setBusy("deleting");
    setError(null);
    try {
      const res = await fetch(`/api/admin/rsvps/${row.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      onSaved();
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
      setBusy("idle");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[70] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute inset-0 bg-marron-deep/75 backdrop-blur-sm cursor-default"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-crema shadow-2xl ring-1 ring-marron/10"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-blanco text-marron transition hover:bg-blanco/70 shadow-sm ring-1 ring-marron/10"
          >
            <CloseIcon size={16} />
          </button>

          <div className="px-6 sm:px-8 pt-8 pb-4">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-terracota">
              Editar confirmación
            </p>
            <h2 className="font-display italic text-2xl text-marron mt-1">
              {row.name}
            </h2>
            <p className="text-xs text-marron/50 mt-0.5">#{row.id}</p>
          </div>

          <div className="px-6 sm:px-8 pb-6 space-y-7">
            <Section title="Persona principal">
              <TextField
                label="Nombre"
                value={draft.name}
                onChange={(v) => patch("name", v)}
              />
              <TextField
                label="Email"
                type="email"
                value={draft.email}
                onChange={(v) => patch("email", v)}
              />
              <ToggleField
                label="¿Asiste?"
                value={draft.attending}
                options={[
                  { value: "yes", label: "Sí" },
                  { value: "no", label: "No" },
                ]}
                onChange={(v) => patch("attending", v as "yes" | "no")}
              />
              <ToggleField
                label="¿En el bus?"
                value={draft.bus || ""}
                options={[
                  { value: "yes", label: "Sí" },
                  { value: "no", label: "No" },
                  { value: "", label: "—" },
                ]}
                onChange={(v) => patch("bus", v)}
              />
              <SelectField
                label="Preferencia alimentaria"
                value={draft.diet_pref || ""}
                options={DIET_OPTIONS}
                onChange={(v) => patch("diet_pref", v)}
              />
              {draft.diet_pref === "other" && (
                <TextField
                  label="Dieta detalle"
                  value={draft.diet_other}
                  onChange={(v) => patch("diet_other", v)}
                />
              )}
              <AllergiesField
                value={draft.allergies}
                onChange={(v) => patch("allergies", v)}
              />
              {draft.allergies.includes("other") && (
                <TextField
                  label="Alergia detalle"
                  value={draft.allergy_other}
                  onChange={(v) => patch("allergy_other", v)}
                />
              )}
            </Section>

            <Section title="Acompañante">
              <CheckField
                label="Trae acompañante"
                checked={draft.plus_one}
                onChange={(v) => patch("plus_one", v)}
              />
              {draft.plus_one && (
                <>
                  <TextField
                    label="Nombre del acompañante"
                    value={draft.plus_one_name}
                    onChange={(v) => patch("plus_one_name", v)}
                  />
                  <ToggleField
                    label="¿En el bus?"
                    value={draft.plus_one_bus || ""}
                    options={[
                      { value: "yes", label: "Sí" },
                      { value: "no", label: "No" },
                      { value: "", label: "—" },
                    ]}
                    onChange={(v) => patch("plus_one_bus", v)}
                  />
                  <SelectField
                    label="Preferencia alimentaria"
                    value={draft.plus_one_diet_pref || ""}
                    options={DIET_OPTIONS}
                    onChange={(v) => patch("plus_one_diet_pref", v)}
                  />
                  {draft.plus_one_diet_pref === "other" && (
                    <TextField
                      label="Dieta detalle"
                      value={draft.plus_one_diet_other}
                      onChange={(v) => patch("plus_one_diet_other", v)}
                    />
                  )}
                  <AllergiesField
                    value={draft.plus_one_allergies}
                    onChange={(v) => patch("plus_one_allergies", v)}
                  />
                  {draft.plus_one_allergies.includes("other") && (
                    <TextField
                      label="Alergia detalle"
                      value={draft.plus_one_allergy_other}
                      onChange={(v) => patch("plus_one_allergy_other", v)}
                    />
                  )}
                </>
              )}
            </Section>

            {error && (
              <p className="text-xs text-terracota">Error: {error}</p>
            )}
          </div>

          <div className="sticky bottom-0 bg-crema border-t border-marron/10 px-6 sm:px-8 py-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={remove}
              disabled={busy !== "idle"}
              className="text-xs font-semibold tracking-wide text-terracota hover:text-terracota-soft transition disabled:opacity-50"
            >
              {busy === "deleting" ? "Eliminando…" : "Eliminar"}
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={busy !== "idle"}
                className="rounded-full border border-marron/20 px-4 py-2 text-xs font-semibold tracking-wide text-marron hover:border-terracota/40 hover:text-terracota transition disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={save}
                disabled={busy !== "idle"}
                className="rounded-full bg-terracota text-blanco px-5 py-2 text-xs font-semibold tracking-wide hover:bg-terracota-soft transition disabled:opacity-50"
              >
                {busy === "saving" ? "Guardando…" : "Guardar"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-4">
      <legend className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-terracota mb-2">
        — {title}
      </legend>
      {children}
    </fieldset>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[0.65rem] uppercase tracking-[0.25em] text-marron/55 mb-1">
        {label}
      </span>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-marron/20 bg-blanco px-3 py-2 text-sm text-marron focus:border-terracota outline-none"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="block text-[0.65rem] uppercase tracking-[0.25em] text-marron/55 mb-1">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-marron/20 bg-blanco px-3 py-2 text-sm text-marron focus:border-terracota outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ToggleField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <span className="block text-[0.65rem] uppercase tracking-[0.25em] text-marron/55 mb-2">
        {label}
      </span>
      <div className="flex gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={[
              "flex-1 rounded-md px-3 py-2 text-sm font-medium transition ring-1",
              value === o.value
                ? "bg-terracota/15 text-terracota ring-terracota/40 font-semibold"
                : "bg-blanco text-marron/70 ring-marron/15 hover:ring-terracota/40",
            ].join(" ")}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function CheckField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-terracota"
      />
      <span className="text-sm text-marron">{label}</span>
    </label>
  );
}

function AllergiesField({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (k: string) => {
    if (value.includes(k)) onChange(value.filter((v) => v !== k));
    else onChange([...value, k]);
  };
  return (
    <div>
      <span className="block text-[0.65rem] uppercase tracking-[0.25em] text-marron/55 mb-2">
        Alergias
      </span>
      <div className="flex flex-wrap gap-2">
        {ALLERGY_KEYS.map((k) => {
          const on = value.includes(k);
          return (
            <button
              key={k}
              type="button"
              onClick={() => toggle(k)}
              className={[
                "rounded-full px-3 py-1.5 text-xs ring-1 transition",
                on
                  ? "bg-terracota/15 text-terracota ring-terracota/40 font-semibold"
                  : "bg-blanco text-marron/70 ring-marron/15 hover:ring-terracota/40",
              ].join(" ")}
            >
              {ALLERGY_LABEL[k]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
