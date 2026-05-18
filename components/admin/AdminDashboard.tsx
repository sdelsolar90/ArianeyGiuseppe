"use client";

import { useEffect, useMemo, useState } from "react";
import EditRsvpModal, { type EditableRsvp } from "./EditRsvpModal";

type Row = {
  id: string;
  created_at: string;
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

type Totals = {
  submissions: number;
  attending: number;
  declined: number;
  headcount: number;
  busSeats: number;
  diet: { vegan: number; vegetarian: number; none: number; other: number };
  allergies: Record<string, number>;
};

const ALLERGY_LABEL: Record<string, string> = {
  gluten: "Gluten",
  lactose: "Lactosa",
  nuts: "Frutos secos",
  seafood: "Mariscos",
  egg: "Huevo",
  other: "Otra",
};

const DIET_LABEL: Record<string, string> = {
  vegan: "Vegana",
  vegetarian: "Vegetariana",
  none: "Ninguna",
  other: "Otra",
};

type Filter = "all" | "yes" | "no";

type FlatRow = {
  key: string;
  rsvpId: string;
  isPlusOne: boolean;
  parentName: string;
  name: string;
  email: string;
  attending: "yes" | "no";
  bus: string;
  diet_pref: string;
  diet_other: string;
  allergies: string[];
  allergy_other: string;
  locale: string;
  created_at: string;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("es", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function flatten(rows: Row[]): FlatRow[] {
  const out: FlatRow[] = [];
  for (const r of rows) {
    out.push({
      key: `${r.id}-main`,
      rsvpId: r.id,
      isPlusOne: false,
      parentName: "",
      name: r.name,
      email: r.email,
      attending: r.attending,
      bus: r.bus,
      diet_pref: r.diet_pref,
      diet_other: r.diet_other,
      allergies: r.allergies ?? [],
      allergy_other: r.allergy_other,
      locale: r.locale,
      created_at: r.created_at,
    });
    if (r.plus_one && r.attending === "yes") {
      out.push({
        key: `${r.id}-plus`,
        rsvpId: r.id,
        isPlusOne: true,
        parentName: r.name,
        name: r.plus_one_name || "—",
        email: r.email,
        attending: "yes",
        bus: r.plus_one_bus,
        diet_pref: r.plus_one_diet_pref,
        diet_other: r.plus_one_diet_other,
        allergies: r.plus_one_allergies ?? [],
        allergy_other: r.plus_one_allergy_other,
        locale: r.locale,
        created_at: r.created_at,
      });
    }
  }
  return out;
}

function rowToEditable(r: Row): EditableRsvp {
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    attending: r.attending,
    bus: r.bus,
    diet_pref: r.diet_pref,
    diet_other: r.diet_other,
    allergies: r.allergies ?? [],
    allergy_other: r.allergy_other,
    plus_one: r.plus_one,
    plus_one_name: r.plus_one_name,
    plus_one_bus: r.plus_one_bus,
    plus_one_diet_pref: r.plus_one_diet_pref,
    plus_one_diet_other: r.plus_one_diet_other,
    plus_one_allergies: r.plus_one_allergies ?? [],
    plus_one_allergy_other: r.plus_one_allergy_other,
  };
}

export default function AdminDashboard() {
  const [rows, setRows] = useState<Row[]>([]);
  const [totals, setTotals] = useState<Totals | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<EditableRsvp | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/rsvps", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as { rows: Row[]; totals: Totals };
      setRows(json.rows);
      setTotals(json.totals);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const flat = useMemo(() => flatten(rows), [rows]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return flat.filter((r) => {
      if (filter === "yes" && r.attending !== "yes") return false;
      if (filter === "no" && r.attending !== "no") return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.parentName.toLowerCase().includes(q)
      );
    });
  }, [flat, filter, search]);

  const openEdit = (rsvpId: string) => {
    const r = rows.find((x) => x.id === rsvpId);
    if (r) setEditing(rowToEditable(r));
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-marron/10 bg-blanco">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div>
            <p className="font-body text-[0.65rem] uppercase tracking-[0.4em] text-terracota">
              Admin
            </p>
            <h1 className="font-display italic text-2xl text-marron leading-none">
              Ariane &amp; Giuseppe
            </h1>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-marron/20 px-4 py-2 text-xs font-semibold tracking-wide text-marron hover:border-terracota/40 hover:text-terracota transition"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 space-y-8">
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <StatCard label="Confirmados" value={totals?.attending ?? 0} accent="terracota" />
          <StatCard label="Personas" value={totals?.headcount ?? 0} accent="oro" />
          <StatCard label="Bus" value={totals?.busSeats ?? 0} accent="marron" hint="Asientos solicitados" />
          <StatCard label="No vienen" value={totals?.declined ?? 0} accent="muted" />
        </section>

        <section>
          <h2 className="font-body text-[0.65rem] uppercase tracking-[0.4em] text-terracota mb-3">
            — Catering
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
            <StatCard label="Veganos" value={totals?.diet.vegan ?? 0} accent="oro" hint="Platos veganos" />
            <StatCard label="Vegetarianos" value={totals?.diet.vegetarian ?? 0} accent="oro" hint="Platos vegetarianos" />
            <StatCard label="Sin restricciones" value={totals?.diet.none ?? 0} accent="terracota" hint="Menú estándar" />
            <StatCard label="Otras dietas" value={totals?.diet.other ?? 0} accent="muted" hint="Pedir detalles" />
          </div>
          <div className="rounded-2xl bg-blanco ring-1 ring-marron/10 p-5">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-marron/55 mb-3">
              Alergias e intolerancias
            </p>
            {totals && Object.keys(totals.allergies).length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {Object.entries(totals.allergies)
                  .sort((a, b) => b[1] - a[1])
                  .map(([key, count]) => (
                    <span
                      key={key}
                      className="inline-flex items-center gap-2 rounded-full bg-terracota/10 px-3 py-1.5 text-xs"
                    >
                      <span className="text-marron font-medium">
                        {ALLERGY_LABEL[key] ?? key}
                      </span>
                      <span className="text-terracota font-mono font-bold">
                        {count}
                      </span>
                    </span>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-marron/55">Sin alergias registradas todavía.</p>
            )}
          </div>
        </section>

        <section className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <input
            type="search"
            placeholder="Buscar por nombre, email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-full bg-blanco border border-marron/15 px-5 py-2.5 text-sm text-marron placeholder:text-marron/40 focus:border-terracota outline-none"
          />
          <div className="flex gap-2">
            <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>
              Todos
            </FilterPill>
            <FilterPill active={filter === "yes"} onClick={() => setFilter("yes")}>
              Confirmados
            </FilterPill>
            <FilterPill active={filter === "no"} onClick={() => setFilter("no")}>
              No vienen
            </FilterPill>
          </div>
          <a
            href="/api/admin/rsvps/export"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-marron text-blanco px-5 py-2.5 text-xs font-semibold tracking-wide hover:bg-marron-deep transition"
          >
            Descargar Excel ↓
          </a>
          <button
            type="button"
            onClick={load}
            className="inline-flex items-center justify-center gap-1 rounded-full border border-marron/20 px-4 py-2.5 text-xs font-semibold tracking-wide text-marron hover:border-terracota/40 hover:text-terracota transition"
            aria-label="Recargar"
          >
            ↻
          </button>
        </section>

        <section className="rounded-2xl bg-blanco ring-1 ring-marron/10 overflow-hidden">
          {loading ? (
            <p className="px-6 py-12 text-center text-marron/60">Cargando…</p>
          ) : error ? (
            <p className="px-6 py-12 text-center text-terracota">Error: {error}</p>
          ) : filtered.length === 0 ? (
            <p className="px-6 py-12 text-center text-marron/60">
              {rows.length === 0
                ? "Aún no hay confirmaciones."
                : "Nada coincide con tu búsqueda."}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-marron/5 text-marron/70">
                  <tr className="text-left">
                    <Th>Fecha</Th>
                    <Th>Nombre</Th>
                    <Th>Email</Th>
                    <Th>Asiste</Th>
                    <Th>Bus</Th>
                    <Th>Dieta</Th>
                    <Th>Alergias</Th>
                    <Th>Idioma</Th>
                    <Th> </Th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr
                      key={r.key}
                      className={[
                        "border-t border-marron/5 hover:bg-crema/40 transition",
                        i % 2 === 0 ? "bg-transparent" : "bg-crema/20",
                      ].join(" ")}
                    >
                      <Td className="whitespace-nowrap text-marron/70">
                        {r.isPlusOne ? "" : formatDate(r.created_at)}
                      </Td>
                      <Td>
                        <div className="font-semibold text-marron">{r.name}</div>
                        {r.isPlusOne && (
                          <span className="inline-block mt-1 rounded-full bg-oro/15 text-oro-deep px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide">
                            +1 de {r.parentName}
                          </span>
                        )}
                      </Td>
                      <Td className={r.isPlusOne ? "text-marron/50 italic" : "text-marron/80"}>
                        {r.email}
                      </Td>
                      <Td>
                        <Badge variant={r.attending === "yes" ? "terracota" : "muted"}>
                          {r.attending === "yes" ? "Sí" : "No"}
                        </Badge>
                      </Td>
                      <Td>{r.bus === "yes" ? "Sí" : r.bus === "no" ? "No" : "—"}</Td>
                      <Td>
                        {r.diet_pref ? (
                          <>
                            {DIET_LABEL[r.diet_pref] ?? r.diet_pref}
                            {r.diet_other && (
                              <span className="block text-xs text-marron/55">
                                {r.diet_other}
                              </span>
                            )}
                          </>
                        ) : (
                          "—"
                        )}
                      </Td>
                      <Td>
                        {r.allergies?.length ? (
                          <>
                            <span>
                              {r.allergies
                                .map((a) => ALLERGY_LABEL[a] ?? a)
                                .join(", ")}
                            </span>
                            {r.allergy_other && (
                              <span className="block text-xs text-marron/55">
                                {r.allergy_other}
                              </span>
                            )}
                          </>
                        ) : (
                          "—"
                        )}
                      </Td>
                      <Td>
                        <span className="font-mono text-[0.7rem] uppercase tracking-wider text-marron/60">
                          {r.locale}
                        </span>
                      </Td>
                      <Td className="text-right">
                        <button
                          type="button"
                          onClick={() => openEdit(r.rsvpId)}
                          className="text-xs font-semibold tracking-wide text-terracota hover:text-terracota-soft transition"
                          aria-label={`Editar ${r.name}`}
                        >
                          Editar
                        </button>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <p className="text-center text-xs text-marron/50">
          {filtered.length} {filtered.length === 1 ? "persona visible" : "personas visibles"} ·{" "}
          {totals?.submissions ?? 0} confirmaciones totales
        </p>
      </main>

      {editing && (
        <EditRsvpModal
          row={editing}
          onClose={() => setEditing(null)}
          onSaved={load}
        />
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: number;
  hint?: string;
  accent: "terracota" | "oro" | "marron" | "muted";
}) {
  const accentClass = {
    terracota: "text-terracota",
    oro: "text-oro-deep",
    marron: "text-marron",
    muted: "text-marron/50",
  }[accent];
  return (
    <div className="rounded-2xl bg-blanco ring-1 ring-marron/10 p-5">
      <p className="text-[0.65rem] uppercase tracking-[0.3em] text-marron/55 mb-2">
        {label}
      </p>
      <p className={`font-display italic text-4xl sm:text-5xl leading-none ${accentClass}`}>
        {value}
      </p>
      {hint && <p className="mt-2 text-[0.7rem] text-marron/50">{hint}</p>}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition",
        active
          ? "bg-terracota text-blanco"
          : "bg-blanco text-marron/70 border border-marron/15 hover:border-terracota/40 hover:text-terracota",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 font-semibold text-[0.65rem] uppercase tracking-[0.2em]">
      {children}
    </th>
  );
}

function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}

function Badge({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "terracota" | "muted";
}) {
  const v = {
    terracota: "bg-terracota/15 text-terracota ring-terracota/30",
    muted: "bg-marron/10 text-marron/60 ring-marron/15",
  }[variant];
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold ring-1 ${v}`}
    >
      {children}
    </span>
  );
}
