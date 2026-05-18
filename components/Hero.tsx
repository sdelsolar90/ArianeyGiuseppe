"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { WEDDING } from "@/lib/constants";

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="5"
        width="17"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3.5 10h17M8 3v4M16 3v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setLoaded(true), 50);
    return () => window.clearTimeout(id);
  }, []);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-night text-blanco isolate"
    >
      {/* Layer 1 — Image with Ken Burns */}
      <div className="absolute inset-0 -z-10">
        <div
          className={[
            "absolute inset-0 will-change-transform origin-center",
            reduce ? "" : "animate-ken-burns",
          ].join(" ")}
        >
          <Image
            src="/images/hero-table.png"
            alt="Mesa larga de la Residenza Antica Flaminia con chandeliers y velas al atardecer"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Layer 2 — Brown multiply tint */}
      <div
        aria-hidden
        className="absolute inset-0 bg-tabaco/30 mix-blend-multiply pointer-events-none"
      />

      {/* Layer 3 — Vertical gradient (top dark → mid transparent → bottom dark) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,12,6,0.7) 0%, rgba(26,12,6,0) 45%, rgba(26,12,6,0) 55%, rgba(26,12,6,0.75) 100%)",
        }}
      />

      {/* Layer 4 — Radial vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(26,12,6,0) 35%, rgba(26,12,6,0.5) 100%)",
        }}
      />

      {/* Layer 5 — Film grain */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.12]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='g'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23g)'/></svg>\")",
        }}
      />

      {/* Layer 6 — Candle glow (centered, flickering) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none animate-candle"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(232,200,117,0.22) 0%, rgba(232,200,117,0.08) 35%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Language selector — top right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
        <LanguageSwitcher />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Eyebrow with decorative lines */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease }}
          className="flex items-center gap-4 mb-10 sm:mb-14"
        >
          <span
            aria-hidden
            className="h-px w-12 sm:w-20"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(232,200,117,0.7))",
            }}
          />
          <span className="font-body text-[0.65rem] sm:text-xs uppercase tracking-[0.5em] text-oro-bright">
            10 · 10 · 26 · Roma
          </span>
          <span
            aria-hidden
            className="h-px w-12 sm:w-20"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(232,200,117,0.7))",
            }}
          />
        </motion.div>

        {/* Names */}
        <h1 className="font-display flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-6 leading-none">
          <motion.span
            initial={{ opacity: 0, x: reduce ? 0 : -60 }}
            animate={loaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.4, delay: 0.3, ease }}
            className="italic font-light text-crema text-5xl sm:text-7xl lg:text-[8.5rem]"
            style={{
              textShadow:
                "0 0 24px rgba(232,200,117,0.25), 0 2px 12px rgba(0,0,0,0.4)",
            }}
          >
            Ariane
          </motion.span>

          <motion.span
            initial={{
              opacity: 0,
              scale: reduce ? 1 : 0.5,
              rotate: reduce ? 0 : -12,
            }}
            animate={loaded ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1.6, delay: 0.5, ease }}
            className="italic font-light text-oro-bright text-7xl sm:text-8xl lg:text-[11rem] mx-1 sm:mx-0"
            style={{
              textShadow:
                "0 0 40px rgba(232,200,117,0.55), 0 0 12px rgba(232,200,117,0.4)",
            }}
            aria-hidden
          >
            &amp;
          </motion.span>

          <motion.span
            initial={{ opacity: 0, x: reduce ? 0 : 60 }}
            animate={loaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.4, delay: 0.7, ease }}
            className="italic font-light text-crema text-5xl sm:text-7xl lg:text-[8.5rem]"
            style={{
              textShadow:
                "0 0 24px rgba(232,200,117,0.25), 0 2px 12px rgba(0,0,0,0.4)",
            }}
          >
            Giuseppe
          </motion.span>
        </h1>

        {/* Pills */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.1, ease }}
          className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
        >
          <span
            className="inline-flex items-center gap-2.5 rounded-full backdrop-blur-md px-5 py-2.5 text-xs sm:text-sm tracking-wide"
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(232,200,117,0.25)",
            }}
          >
            <span className="text-oro-bright">
              <CalendarIcon />
            </span>
            <span className="text-crema">{t("datePill")}</span>
          </span>

          <a
            href={WEDDING.venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full backdrop-blur-md px-5 py-2.5 text-xs sm:text-sm tracking-wide transition hover:bg-black/50"
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(232,200,117,0.25)",
            }}
          >
            <span className="text-oro-bright">
              <PinIcon />
            </span>
            <span className="text-crema">{t("venuePill")}</span>
            <span
              aria-hidden
              className="text-oro-bright/70 group-hover:text-oro-bright transition"
            >
              ↗
            </span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() =>
          document
            .getElementById("historia")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.5, ease }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        aria-label={t("scrollHint")}
      >
        <span className="font-body text-[0.625rem] uppercase tracking-[0.5em] text-oro-bright">
          {t("scrollHint")}
        </span>
        <span
          aria-hidden
          className="block h-14 w-px origin-top animate-scroll-pulse"
          style={{
            background:
              "linear-gradient(to bottom, rgba(232,200,117,0.9), rgba(232,200,117,0))",
          }}
        />
      </motion.button>
    </section>
  );
}
