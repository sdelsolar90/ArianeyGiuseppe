"use client";

import { useEffect, useMemo, useState } from "react";

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

type Filter = "all" | "yes" | "no";

const DIET_LABEL: Record<string, string> = {
  vegan: "Vegana",
  vegetarian: "Vegetariana",
  none: "Ninguna",
  other: "Otra",
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

export default function AdminDashboard() {
  const [rows, setRows] = useState<Row[]>([]);
  const [totals, setTotals] = useState<Totals | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

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

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter === "yes" && r.attending !== "yes") return false;
      if (filter === "no" && r.attending !== "no") return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.plus_one_name.toLowerCase().includes(q)
      );
    });
  }, [rows, filter, search]);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen">
      {/* Top bar */}
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
        {/* Stats */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <StatCard label="Confirmados" value={totals?.attending ?? 0} accent="terracota" />
          <StatCard label="Personas" value={totals?.headcount ?? 0} accent="oro" hint="Incluye acompañantes" />
          <StatCard label="Bus" value={totals?.busSeats ?? 0} accent="marron" hint="Asientos solicitados" />
          <StatCard label="No vienen" value={totals?.declined ?? 0} accent="muted" />
        </section>

        {/* Catering */}
        <section>
          <h2 className="font-body text-[0.65rem] uppercase tracking-[0.4em] text-terracota mb-3">
            — Catering
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
            <StatCard
              label="Veganos"
              value={totals?.diet.vegan ?? 0}
              accent="oro"
              hint="Platos veganos"
            />
            <StatCard
              label="Vegetarianos"
              value={totals?.diet.vegetarian ?? 0}
              accent="oro"
              hint="Platos vegetarianos"
            />
            <StatCard
              label="Sin restricciones"
              value={totals?.diet.none ?? 0}
              accent="terracota"
              hint="Menú estándar"
            />
            <StatCard
              label="Otras dietas"
              value={totals?.diet.other ?? 0}
              accent="muted"
              hint="Pedir detalles"
            />
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

        {/* Toolbar */}
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

        {/* Table */}
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
                    <Th>Acompañante</Th>
                    <Th>Idioma</Th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr
                      key={r.id}
                      className={[
                        "border-t border-marron/5 hover:bg-crema/40 transition",
                        i % 2 === 0 ? "bg-transparent" : "bg-crema/20",
                      ].join(" ")}
                    >
                      <Td className="whitespace-nowrap text-marron/70">
                        {formatDate(r.created_at)}
                      </Td>
                      <Td className="font-semibold text-marron">{r.name}</Td>
                      <Td className="text-marron/80">{r.email}</Td>
                      <Td>
                        <Badge
                          variant={r.attending === "yes" ? "terracota" : "muted"}
                        >
                          {r.attending === "yes" ? "Sí" : "No"}
                        </Badge>
                      </Td>
                      <Td>
                        {r.bus ? (r.bus === "yes" ? "Sí" : "No") : "—"}
                      </Td>
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
                            <span>{r.allergies.join(", ")}</span>
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
                        {r.plus_one ? (
                          <div>
                            <span className="font-semibold">{r.plus_one_name || "—"}</span>
                            <span className="block text-xs text-marron/55">
                              {DIET_LABEL[r.plus_one_diet_pref] ?? r.plus_one_diet_pref}
                              {r.plus_one_allergies?.length
                                ? ` · ${r.plus_one_allergies.join(", ")}`
                                : ""}
                            </span>
                          </div>
                        ) : (
                          "—"
                        )}
                      </Td>
                      <Td>
                        <span className="font-mono text-[0.7rem] uppercase tracking-wider text-marron/60">
                          {r.locale}
                        </span>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <p className="text-center text-xs text-marron/50">
          {filtered.length} {filtered.length === 1 ? "fila visible" : "filas visibles"} ·{" "}
          {totals?.submissions ?? 0} totales
        </p>
      </main>
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
