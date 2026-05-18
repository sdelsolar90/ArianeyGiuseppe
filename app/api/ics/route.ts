import { buildIcs } from "@/lib/ics";

export const runtime = "nodejs";

const SUMMARY = "Boda Ariane & Giuseppe";
const VENUE = "Residenza Antica Flaminia, Roma";
const HOTEL = "Hotel Nhow Roma, Corso d'Italia 1, Roma";

const EVENTS = {
  all: {
    uid: "boda-ariane-giuseppe-2026-10-10@arianeygiuseppe.enigmasac.com",
    start: new Date("2026-10-10T08:30:00Z"),
    end: new Date("2026-10-10T21:00:00Z"),
    location: VENUE,
    description:
      "10:30 — Bus desde Hotel Nhow Roma.\n12:30 — Ceremonia en Residenza Antica Flaminia.\nTarde — Aperitivo, comida, brindis y baile.",
  },
  embarque: {
    uid: "embarque-2026-10-10@arianeygiuseppe.enigmasac.com",
    start: new Date("2026-10-10T08:30:00Z"),
    end: new Date("2026-10-10T10:00:00Z"),
    location: HOTEL,
    description:
      "Bus de ida hacia la Residenza Antica Flaminia. Llega 10 minutos antes.",
  },
  ceremonia: {
    uid: "ceremonia-2026-10-10@arianeygiuseppe.enigmasac.com",
    start: new Date("2026-10-10T10:30:00Z"),
    end: new Date("2026-10-10T11:30:00Z"),
    location: VENUE,
    description: "Ceremonia en la Residenza Antica Flaminia.",
  },
  fiesta: {
    uid: "fiesta-2026-10-10@arianeygiuseppe.enigmasac.com",
    start: new Date("2026-10-10T11:30:00Z"),
    end: new Date("2026-10-10T21:00:00Z"),
    location: VENUE,
    description: "Aperitivo en el jardín, comida, brindis y baile.",
  },
} as const;

type EventKey = keyof typeof EVENTS;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = (url.searchParams.get("event") ?? "all") as EventKey;
  const event = EVENTS[key] ?? EVENTS.all;

  const ics = buildIcs([
    {
      uid: event.uid,
      start: event.start,
      end: event.end,
      summary: SUMMARY,
      location: event.location,
      description: event.description,
    },
  ]);

  return new Response(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="boda-ariane-giuseppe.ics"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
