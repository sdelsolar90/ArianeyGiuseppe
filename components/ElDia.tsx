"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import FadeUp from "./FadeUp";
import { WEDDING } from "@/lib/constants";
import { BusIcon, RingIcon, GlassIcon, PinIcon, CalendarIcon, MusicNoteIcon } from "./icons";
import { openPlaylist } from "./PlaylistModal";

type CalEvent = "embarque" | "ceremonia" | "fiesta" | "all";
const icsUrl = (event: CalEvent) => `/api/ics?event=${event}`;

type Accent = {
  text: string;
  bg: string;
  bgSoft: string;
  ring: string;
  ringStrong: string;
  shadow: string;
};

const ACCENTS: Accent[] = [
  {
    // Morning warmth — bright gold
    text: "text-oro-bright",
    bg: "bg-oro-bright",
    bgSoft: "bg-oro-bright/15",
    ring: "ring-oro-bright/30",
    ringStrong: "ring-oro-bright/70",
    shadow: "shadow-[0_0_30px_rgba(232,200,117,0.25)]",
  },
  {
    // Emotional heart — coral
    text: "text-coral",
    bg: "bg-coral",
    bgSoft: "bg-coral/15",
    ring: "ring-coral/30",
    ringStrong: "ring-coral/70",
    shadow: "shadow-[0_0_30px_rgba(201,105,78,0.3)]",
  },
  {
    // Evening fire — terracotta
    text: "text-terracota-soft",
    bg: "bg-terracota",
    bgSoft: "bg-terracota/15",
    ring: "ring-terracota/30",
    ringStrong: "ring-terracota/70",
    shadow: "shadow-[0_0_30px_rgba(184,106,69,0.3)]",
  },
];

const NUMERALS = ["I", "II", "III"];

type Item = {
  time: string;
  title: string;
  desc: string;
  tip: string;
  locationLabel: string;
  locationUrl: string;
  calEvent: CalEvent;
  Icon: typeof BusIcon;
  accent: Accent;
  numeral: string;
};

export default function ElDia() {
  const t = useTranslations("elDia");
  const tPlaylist = useTranslations("playlist");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const items: Item[] = [
    {
      time: t("item1Time"),
      title: t("item1Title"),
      desc: t("item1Desc"),
      tip: t("item1Tip"),
      locationLabel: t("item1Location"),
      locationUrl: WEDDING.hotelNhow.mapsUrl,
      calEvent: "embarque",
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
      calEvent: "ceremonia",
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
      calEvent: "fiesta",
      Icon: GlassIcon,
      accent: ACCENTS[2],
      numeral: NUMERALS[2],
    },
  ];

  const allDayUrl = icsUrl("all");

  return (
    <section
      id="el-dia"
      className="relative text-blanco py-24 sm:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #4a2818 0%, #3d1f0d 35%, #3a1f12 65%, #4a2818 100%)",
      }}
    >
      {/* Warm color blobs — stronger so the section pulses with warmth */}
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

      <div className="relative mx-auto max-w-3xl px-6">
        <FadeUp className="text-center mb-3">
          <p className="font-body text-xs uppercase tracking-[0.4em] text-oro-bright mb-4">
            — {t("eyebrow")}
          </p>
          <h2 className="font-display italic text-4xl sm:text-6xl text-blanco mb-4">
            {t("title")}
          </h2>
        </FadeUp>

        <FadeUp delay={0.05} className="text-center mb-3">
          <div className="flex items-center justify-center gap-3 text-oro-bright/60">
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
          </div>
        </FadeUp>

        <FadeUp delay={0.1} className="text-center mb-14">
          <p className="font-display italic text-lg sm:text-xl text-blanco/70">
            {t("subtitle")}
          </p>
          <p className="font-body text-[0.65rem] uppercase tracking-[0.4em] text-oro-bright/50 mt-6">
            ↓ {t("expandHint")}
          </p>
        </FadeUp>

        <ol className="relative space-y-5">
          {/* vertical timeline line — fades through the accents */}
          <div
            aria-hidden
            className="absolute left-[22px] top-4 bottom-4 w-px"
            style={{
              background:
                "linear-gradient(to bottom, rgba(232,200,117,0.5), rgba(201,105,78,0.5) 50%, rgba(160,82,45,0.5))",
            }}
          />

          {items.map((it, i) => {
            const open = openIdx === i;
            const calUrl = icsUrl(it.calEvent);

            return (
              <FadeUp as="li" key={i} delay={i * 0.06} className="relative pl-14 sm:pl-16">
                {/* timeline dot — accent colored, glows when open */}
                <span
                  aria-hidden
                  className={[
                    "absolute left-[14px] top-7 w-4 h-4 rounded-full ring-4 ring-marron transition-all duration-300",
                    it.accent.bg,
                    open ? `scale-125 ${it.accent.shadow}` : "",
                  ].join(" ")}
                />

                <article
                  className={[
                    "relative rounded-2xl ring-1 transition-all duration-300 overflow-hidden",
                    open
                      ? `bg-marron-deep/65 ${it.accent.ringStrong} ${it.accent.shadow}`
                      : "bg-marron-deep/35 ring-blanco/5 hover:ring-blanco/15 hover:bg-marron-deep/50",
                  ].join(" ")}
                >
                  {/* big editorial numeral */}
                  <span
                    aria-hidden
                    className={[
                      "absolute -right-2 -top-4 font-display italic font-light leading-none select-none pointer-events-none transition-opacity duration-500",
                      it.accent.text,
                      open ? "opacity-25 text-[10rem] sm:text-[14rem]" : "opacity-10 text-[8rem] sm:text-[11rem]",
                    ].join(" ")}
                  >
                    {it.numeral}
                  </span>

                  <button
                    type="button"
                    onClick={() => setOpenIdx(open ? null : i)}
                    aria-expanded={open}
                    className="relative w-full p-5 sm:p-6 text-left flex items-center gap-4 sm:gap-5"
                  >
                    {/* icon badge */}
                    <span
                      className={[
                        "flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full ring-1 transition-all",
                        it.accent.bgSoft,
                        it.accent.ring,
                        it.accent.text,
                        open ? `${it.accent.ringStrong} ${it.accent.shadow}` : "",
                      ].join(" ")}
                    >
                      <it.Icon size={26} />
                    </span>

                    <div className="flex-1 min-w-0">
                      <div
                        className={[
                          "font-mono text-[0.7rem] sm:text-xs tracking-[0.25em] uppercase mb-1 transition-colors",
                          it.accent.text,
                        ].join(" ")}
                      >
                        {it.time}
                      </div>
                      <h3 className="font-display italic text-2xl sm:text-3xl text-blanco leading-tight">
                        {it.title}
                      </h3>
                      <AnimatePresence initial={false}>
                        {!open && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-blanco/55 text-xs sm:text-sm truncate mt-1"
                          >
                            {it.locationLabel}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <motion.div
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={[
                        "shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-2xl leading-none ring-1 transition-colors",
                        open
                          ? `${it.accent.bgSoft} ${it.accent.text} ${it.accent.ringStrong}`
                          : "bg-blanco/5 text-blanco/60 ring-blanco/10",
                      ].join(" ")}
                      aria-hidden
                    >
                      +
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="relative overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                          <div
                            className={[
                              "border-t pt-5",
                              "border-blanco/10",
                            ].join(" ")}
                          >
                            <p className="text-blanco/85 text-sm sm:text-base leading-relaxed mb-4">
                              {it.desc}
                            </p>
                            <p
                              className={[
                                "font-display italic text-sm sm:text-base mb-5 border-l-2 pl-3",
                                it.accent.text,
                                it.accent.ring.replace("ring-", "border-"),
                              ].join(" ")}
                            >
                              {it.tip}
                            </p>
                            <div className="flex flex-wrap gap-2.5">
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
                              <a
                                href={calUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={[
                                  "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium tracking-wide ring-1 transition",
                                  it.accent.bgSoft,
                                  it.accent.text,
                                  it.accent.ring,
                                  "hover:" + it.accent.ringStrong,
                                ].join(" ")}
                              >
                                <CalendarIcon size={14} />
                                <span>{t("addToCalendar")}</span>
                              </a>
                              {i === 2 && (
                                <button
                                  type="button"
                                  onClick={openPlaylist}
                                  className="inline-flex items-center gap-2 rounded-full bg-coral/15 hover:bg-coral/25 text-coral px-3.5 py-2 text-xs font-medium tracking-wide ring-1 ring-coral/30 hover:ring-coral/60 transition"
                                >
                                  <MusicNoteIcon size={14} />
                                  <span>{tPlaylist("openButton")}</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </FadeUp>
            );
          })}
        </ol>

        <FadeUp delay={0.2} className="mt-14 flex flex-col items-center gap-5">
          <a
            href={allDayUrl}
            target="_blank"
            rel="noopener noreferrer"
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
