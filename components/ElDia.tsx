import { useLocale, useTranslations } from "next-intl";
import FadeUp from "./FadeUp";
import { WEDDING } from "@/lib/constants";
import {
  BusIcon,
  RingIcon,
  GlassIcon,
  MicIcon,
  PinIcon,
  CalendarIcon,
} from "./icons";
import ElDiaActions from "./ElDiaActions";
import TimelineBus from "./TimelineBus";

type CalEvent = "embarque" | "ceremonia" | "fiesta" | "all";
const icsUrl = (event: CalEvent) => `/api/ics?event=${event}`;

type Accent = {
  text: string;
  bg: string;
  bgSoft: string;
  ring: string;
  ringStrong: string;
  border: string;
  shadow: string;
};

const ACCENTS: Accent[] = [
  {
    text: "text-oro-bright",
    bg: "bg-oro-bright",
    bgSoft: "bg-oro-bright/15",
    ring: "ring-oro-bright/30",
    ringStrong: "ring-oro-bright/70",
    border: "border-oro-bright/40",
    shadow: "shadow-[0_0_30px_rgba(232,200,117,0.25)]",
  },
  {
    text: "text-coral",
    bg: "bg-coral",
    bgSoft: "bg-coral/15",
    ring: "ring-coral/30",
    ringStrong: "ring-coral/70",
    border: "border-coral/40",
    shadow: "shadow-[0_0_30px_rgba(201,105,78,0.3)]",
  },
  {
    text: "text-oro-deep",
    bg: "bg-oro-deep",
    bgSoft: "bg-oro-deep/15",
    ring: "ring-oro-deep/30",
    ringStrong: "ring-oro-deep/70",
    border: "border-oro-deep/40",
    shadow: "shadow-[0_0_30px_rgba(201,169,97,0.3)]",
  },
  {
    text: "text-terracota-soft",
    bg: "bg-terracota",
    bgSoft: "bg-terracota/15",
    ring: "ring-terracota/30",
    ringStrong: "ring-terracota/70",
    border: "border-terracota/40",
    shadow: "shadow-[0_0_30px_rgba(184,106,69,0.3)]",
  },
];

const NUMERALS = ["I", "II", "III", "IV"];

type Item = {
  time: string;
  title: string;
  desc: string;
  tip: string;
  locationLabel: string;
  locationUrl: string;
  Icon: typeof BusIcon;
  accent: Accent;
  numeral: string;
  giftCta?: boolean;
};

export default function ElDia() {
  const t = useTranslations("elDia");
  const locale = useLocale() as keyof typeof WEDDING.weekday;

  const items: Item[] = [
    {
      time: t("item1Time"),
      title: t("item1Title"),
      desc: t("item1Desc"),
      tip: t("item1Tip"),
      locationLabel: t("item1Location"),
      locationUrl: WEDDING.hotelNhow.mapsUrl,
      Icon: BusIcon,
      accent: ACCENTS[0],
      numeral: NUMERALS[0],
    },
    {
      time: t("item2Time"),
      title: t("item2Title"),
      desc: t("item2Desc"),
      tip: t("item2Tip"),
      locationLabel: t("item2Location"),
      locationUrl: WEDDING.venue.mapsUrl,
      Icon: RingIcon,
      accent: ACCENTS[1],
      numeral: NUMERALS[1],
    },
    {
      time: t("item3Time"),
      title: t("item3Title"),
      desc: t("item3Desc"),
      tip: t("item3Tip"),
      locationLabel: t("item3Location"),
      locationUrl: WEDDING.venue.mapsUrl,
      Icon: MicIcon,
      accent: ACCENTS[2],
      numeral: NUMERALS[2],
      giftCta: true,
    },
    {
      time: t("item4Time"),
      title: t("item4Title"),
      desc: t("item4Desc"),
      tip: t("item4Tip"),
      locationLabel: t("item4Location"),
      locationUrl: WEDDING.venue.mapsUrl,
      Icon: GlassIcon,
      accent: ACCENTS[3],
      numeral: NUMERALS[3],
    },
  ];

  const allDayUrl = icsUrl("all");
  const weekday = WEDDING.weekday[locale] ?? WEDDING.weekday.es;

  return (
    <section
      id="el-dia"
      className="relative text-blanco py-24 sm:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #4a2818 0%, #3d1f0d 35%, #3a1f12 65%, #4a2818 100%)",
      }}
    >
      {/* Warm color blobs */}
      <div
        aria-hidden
        className="absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full opacity-55 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(232,200,117,0.7) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute top-1/3 -right-40 w-[40rem] h-[40rem] rounded-full opacity-50 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,105,78,0.8) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 left-1/4 w-[38rem] h-[38rem] rounded-full opacity-50 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(160,82,45,0.85) 0%, transparent 65%)",
        }}
      />
      {/* film grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='g'><feTurbulence baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23g)'/></svg>\")",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6">
        <FadeUp className="text-center mb-3">
          <p className="font-body text-xs uppercase tracking-[0.4em] text-oro-bright mb-4">
            — {t("eyebrow")}
          </p>
          <h2 className="font-display italic text-4xl sm:text-6xl text-blanco mb-4">
            {t("title")}
          </h2>
          <a
            href="/api/ics?event=all"
            className="group inline-flex items-center gap-2.5 rounded-full border border-oro-bright/40 hover:border-oro-bright/70 px-4 py-1.5 text-[0.7rem] sm:text-xs uppercase tracking-[0.3em] text-oro-bright transition"
          >
            <CalendarIcon size={14} />
            <span>
              {weekday} · {WEDDING.dateDisplay} · {WEDDING.time} h
            </span>
            <span
              aria-hidden
              className="text-oro-bright/70 group-hover:text-oro-bright transition"
            >
              ↗
            </span>
          </a>
        </FadeUp>

        <FadeUp delay={0.05} className="flex items-center justify-center gap-3 text-oro-bright/60 mt-6 mb-14">
          <span aria-hidden className="h-px w-10 bg-oro-bright/40" />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 4l1.6 5.2L19 11l-5.4 1.8L12 18l-1.6-5.2L5 11l5.4-1.8L12 4z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
          <span aria-hidden className="h-px w-10 bg-oro-bright/40" />
        </FadeUp>

        <ol className="relative">
          {/* vertical line — mobile left, desktop center */}
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[22px] lg:left-1/2 w-px lg:-translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, rgba(232,200,117,0.5), rgba(201,105,78,0.5) 35%, rgba(201,169,97,0.5) 65%, rgba(160,82,45,0.5))",
            }}
          />

          {/* moving bus on the center line — only animates when section enters viewport */}
          <TimelineBus />

          {items.map((it, i) => {
            const isLeft = i % 2 === 0;
            return (
              <FadeUp
                as="li"
                key={i}
                delay={i * 0.08}
                className="relative pb-12 lg:pb-20 last:pb-0"
              >
                {/* dot */}
                <span
                  aria-hidden
                  className={[
                    "absolute top-7 w-4 h-4 rounded-full ring-4 ring-marron",
                    "left-[14px] lg:left-1/2 lg:-translate-x-1/2",
                    it.accent.bg,
                    it.accent.shadow,
                  ].join(" ")}
                />

                <div className="pl-14 lg:pl-0">
                  <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                    <div
                      className={[
                        "relative",
                        isLeft
                          ? "lg:col-start-1 lg:pr-10 lg:text-right"
                          : "lg:col-start-2 lg:pl-10",
                      ].join(" ")}
                    >
                      {/* big editorial numeral */}
                      <span
                        aria-hidden
                        className={[
                          "absolute font-display italic font-light leading-none select-none pointer-events-none opacity-15",
                          "text-[7rem] sm:text-[9rem] -top-8",
                          it.accent.text,
                          isLeft ? "right-0 lg:-right-2" : "left-0 lg:-left-2",
                        ].join(" ")}
                      >
                        {it.numeral}
                      </span>

                      <div className="relative">
                        {/* icon badge */}
                        <span
                          className={[
                            "inline-flex h-14 w-14 items-center justify-center rounded-full ring-1 mb-4",
                            it.accent.bgSoft,
                            it.accent.ring,
                            it.accent.text,
                          ].join(" ")}
                        >
                          <it.Icon size={26} />
                        </span>

                        <div
                          className={[
                            "font-mono text-[0.7rem] sm:text-xs tracking-[0.25em] uppercase mb-1",
                            it.accent.text,
                          ].join(" ")}
                        >
                          {it.time}
                        </div>

                        <h3 className="font-display italic text-2xl sm:text-3xl text-blanco leading-tight mb-3">
                          {it.title}
                        </h3>

                        <p className="text-blanco/85 text-sm sm:text-base leading-relaxed mb-4 max-w-md lg:max-w-none lg:ml-auto">
                          {it.desc}
                        </p>

                        <p
                          className={[
                            "font-display italic text-sm sm:text-base mb-5 border-y border-current/30 py-2 inline-block",
                            it.accent.text,
                          ].join(" ")}
                        >
                          {it.tip}
                        </p>

                        <div
                          className={[
                            "flex flex-wrap gap-2.5",
                            isLeft ? "lg:justify-end" : "lg:justify-start",
                          ].join(" ")}
                        >
                          <a
                            href={it.locationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-blanco/10 hover:bg-blanco/15 text-blanco px-3.5 py-2 text-xs font-medium tracking-wide ring-1 ring-blanco/15 hover:ring-blanco/30 transition"
                          >
                            <span className={it.accent.text}>
                              <PinIcon size={14} />
                            </span>
                            <span>{it.locationLabel}</span>
                            <span aria-hidden className="text-blanco/60">↗</span>
                          </a>
                          {it.giftCta && (
                            <ElDiaActions accent={it.accent} variant="gifts" />
                          )}
                          {i === items.length - 1 && (
                            <ElDiaActions accent={it.accent} variant="playlist" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </ol>

        <FadeUp delay={0.2} className="mt-14 flex flex-col items-center gap-5">
          <a
            href={allDayUrl}
            className="inline-flex items-center gap-2.5 rounded-full bg-oro-bright text-marron-deep px-6 py-3 text-sm font-semibold tracking-wide hover:bg-oro-bright/90 transition shadow-[0_0_30px_rgba(232,200,117,0.5)]"
          >
            <CalendarIcon size={16} />
            <span>{t("addAllToCalendar")}</span>
          </a>
          <span className="inline-block rounded-full border border-oro-bright/50 px-5 py-2 text-xs tracking-[0.3em] uppercase text-oro-bright">
            {t("dressCode")}
          </span>
        </FadeUp>
      </div>
    </section>
  );
}
