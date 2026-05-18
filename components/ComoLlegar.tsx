import { useTranslations } from "next-intl";
import FadeUp from "./FadeUp";
import { WEDDING, TRANSPORT } from "@/lib/constants";
import {
  BusIcon,
  CarIcon,
  TaxiIcon,
  MetroIcon,
  AppleIcon,
  GooglePlayIcon,
} from "./icons";

function MapPin() {
  return (
    <svg width="40" height="50" viewBox="0 0 36 46" fill="none" aria-hidden>
      <path
        d="M18 44s14-12.5 14-26a14 14 0 0 0-28 0c0 13.5 14 26 14 26z"
        fill="#A0522D"
        stroke="#C9A96E"
        strokeWidth="1.5"
      />
      <circle cx="18" cy="18" r="5" fill="#FFF8F0" />
    </svg>
  );
}

export default function ComoLlegar() {
  const t = useTranslations("llegar");

  return (
    <section
      id="llegar"
      className="relative bg-crema pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden"
    >
      {/* warm radial glows for life */}
      <div
        aria-hidden
        className="absolute -top-32 -right-20 w-[40rem] h-[40rem] rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(160,82,45,0.55) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 -left-20 w-[36rem] h-[36rem] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(232,200,117,0.65) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <FadeUp className="text-center">
          <p className="font-body text-xs uppercase tracking-[0.4em] text-terracota mb-4">
            — {t("eyebrow")}
          </p>
          <h2 className="font-display italic text-4xl sm:text-5xl text-marron mb-4">
            {t("title")}
          </h2>
        </FadeUp>

        <FadeUp delay={0.05} className="flex items-center justify-center gap-3 text-terracota/50 mb-14">
          <span aria-hidden className="h-px w-12 bg-terracota/30" />
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 4l1.6 5.2L19 11l-5.4 1.8L12 18l-1.6-5.2L5 11l5.4-1.8L12 4z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
          <span aria-hidden className="h-px w-12 bg-terracota/30" />
        </FadeUp>

        {/* MAP — full width, landscape */}
        <FadeUp delay={0.1}>
          <a
            href={WEDDING.venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("openMaps")}
            className="group relative block aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden rounded-3xl shadow-xl ring-1 ring-marron/10 hover:ring-terracota/40 transition"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #efe5d4 0%, #e5d8c2 100%)",
              }}
            />
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 800 400"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden
            >
              {/* major roads */}
              <path
                d="M-20 90 Q 200 70, 400 110 T 820 140"
                stroke="#C9A96E"
                strokeWidth="3.5"
                fill="none"
                opacity="0.55"
              />
              <path
                d="M-20 220 Q 260 200, 420 240 T 820 260"
                stroke="#C9A96E"
                strokeWidth="2.5"
                fill="none"
                opacity="0.5"
              />
              <path
                d="M-20 320 Q 220 290, 460 320 T 820 350"
                stroke="#C9A96E"
                strokeWidth="2"
                fill="none"
                opacity="0.45"
              />
              <path
                d="M150 -20 Q 200 150, 350 220 T 480 420"
                stroke="#A0522D"
                strokeWidth="2"
                fill="none"
                opacity="0.35"
              />
              <path
                d="M620 -20 Q 580 160, 460 240 T 380 420"
                stroke="#A0522D"
                strokeWidth="1.5"
                fill="none"
                opacity="0.3"
              />
              {/* secondary streets */}
              <path
                d="M-20 160 L 820 180"
                stroke="#C9A96E"
                strokeWidth="0.6"
                fill="none"
                opacity="0.35"
              />
              <path
                d="M-20 280 L 820 300"
                stroke="#C9A96E"
                strokeWidth="0.6"
                fill="none"
                opacity="0.35"
              />

              {/* blocks */}
              {[
                [70, 40, 70, 35], [170, 25, 60, 50], [260, 50, 80, 30],
                [380, 30, 70, 40], [490, 45, 60, 35], [590, 20, 80, 45],
                [690, 50, 60, 35], [50, 270, 100, 60], [180, 290, 80, 50],
                [310, 270, 90, 55], [430, 280, 70, 50], [550, 290, 90, 55],
                [680, 270, 90, 60], [120, 130, 60, 30], [250, 150, 50, 25],
                [550, 120, 70, 35],
              ].map(([x, y, w, h], i) => (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  fill="#d4c3a8"
                  opacity={0.55 - (i % 3) * 0.08}
                  rx="3"
                />
              ))}

              {/* river (tiber-ish) */}
              <path
                d="M-20 240 Q 200 200, 380 260 T 820 270"
                stroke="#9ab8b8"
                strokeWidth="18"
                fill="none"
                opacity="0.45"
                strokeLinecap="round"
              />
              <path
                d="M-20 240 Q 200 200, 380 260 T 820 270"
                stroke="#b3cccc"
                strokeWidth="8"
                fill="none"
                opacity="0.5"
                strokeLinecap="round"
              />
            </svg>

            {/* pulsing pin at the center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
              {/* ping ring */}
              <span
                aria-hidden
                className="absolute left-1/2 bottom-1 -translate-x-1/2 inline-flex h-6 w-6 rounded-full bg-terracota/40 animate-ping"
              />
              {/* dot under the pin */}
              <span
                aria-hidden
                className="absolute left-1/2 bottom-1 -translate-x-1/2 inline-block h-2.5 w-2.5 rounded-full bg-terracota ring-2 ring-blanco shadow-md"
              />
              <div className="relative drop-shadow-lg transition-transform group-hover:-translate-y-1">
                <MapPin />
              </div>
            </div>

            {/* venue label */}
            <div className="absolute left-1/2 top-1/2 mt-4 -translate-x-1/2 whitespace-nowrap rounded-full bg-blanco/95 px-4 py-1.5 text-xs font-semibold text-marron shadow-md ring-1 ring-marron/10">
              {WEDDING.venue.name}
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-marron-deep/75 via-marron-deep/30 to-transparent flex items-end justify-between gap-3">
              <p className="text-blanco text-xs sm:text-sm font-medium">
                {t("mapCaption")}
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blanco/95 text-marron px-3 py-1.5 text-xs font-semibold tracking-wide ring-1 ring-marron/10 group-hover:bg-terracota group-hover:text-blanco transition">
                {t("openMaps")} <span aria-hidden>↗</span>
              </span>
            </div>
          </a>
        </FadeUp>

        {/* Transport cards — 2 columns below the map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          <FadeUp delay={0.15}>
            <article className="group relative h-full flex overflow-hidden rounded-2xl bg-blanco shadow-sm ring-1 ring-marron/5 hover:ring-terracota/40 hover:shadow-md transition">
              <span aria-hidden className="w-1.5 shrink-0 bg-terracota" />
              <div className="flex-1 p-6 sm:p-7">
                <div className="flex items-center gap-4 mb-3">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-terracota/15 text-terracota ring-1 ring-terracota/30">
                    <BusIcon size={28} />
                  </span>
                  <div>
                    <p className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-terracota mb-0.5">
                      10:30 h
                    </p>
                    <h3 className="font-display text-2xl text-marron leading-tight">
                      {t("busTitle")}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-marron/75 leading-relaxed mb-4">
                  {t("busDesc")}
                </p>
                <a
                  href={WEDDING.hotelNhow.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-terracota/10 hover:bg-terracota/20 text-terracota px-4 py-2 text-xs font-semibold tracking-wide ring-1 ring-terracota/30 hover:ring-terracota/60 transition"
                >
                  {WEDDING.hotelNhow.name}
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </article>
          </FadeUp>

          <FadeUp delay={0.2}>
            <article className="group relative h-full flex overflow-hidden rounded-2xl bg-blanco shadow-sm ring-1 ring-marron/5 hover:ring-oro-deep/40 hover:shadow-md transition">
              <span aria-hidden className="w-1.5 shrink-0 bg-oro-deep" />
              <div className="flex-1 p-6 sm:p-7">
                <div className="flex items-center gap-4 mb-3">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-oro/20 text-oro-deep ring-1 ring-oro-deep/30">
                    <CarIcon size={28} />
                  </span>
                  <div>
                    <p className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-oro-deep mb-0.5">
                      Parking
                    </p>
                    <h3 className="font-display text-2xl text-marron leading-tight">
                      {t("carTitle")}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-marron/75 leading-relaxed mb-4">
                  {t("carDesc")}
                </p>
                <a
                  href={WEDDING.venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-oro/15 hover:bg-oro/25 text-oro-deep px-4 py-2 text-xs font-semibold tracking-wide ring-1 ring-oro-deep/30 hover:ring-oro-deep/60 transition"
                >
                  {WEDDING.venue.name}
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </article>
          </FadeUp>
        </div>

        {/* Moverse por Roma — full-width prose block */}
        <div className="mt-20 sm:mt-24 pt-14 border-t border-marron/10">
          <FadeUp className="text-center mb-10">
            <p className="font-body text-xs uppercase tracking-[0.4em] text-terracota mb-3">
              — {t("moverseTitle")}
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <FadeUp>
              <article className="h-full rounded-2xl bg-blanco p-6 sm:p-7 shadow-sm ring-1 ring-marron/5 hover:ring-terracota/30 transition">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-terracota/10 text-terracota">
                    <TaxiIcon size={20} />
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-terracota/10 text-terracota">
                    <MetroIcon size={20} />
                  </span>
                </div>
                <h3 className="font-display text-xl text-marron mb-2">
                  {t("moverseCityTitle")}
                </h3>
                <p className="text-sm text-marron/80 leading-relaxed mb-4">
                  {t.rich("moverseCity", {
                    k: (chunks) => (
                      <span className="font-semibold text-terracota">{chunks}</span>
                    ),
                  })}
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={TRANSPORT.itTaxi.appStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="itTaxi en App Store"
                    className="inline-flex items-center gap-2 rounded-full bg-marron-deep text-blanco px-3.5 py-2 text-[0.7rem] font-semibold tracking-wide hover:bg-marron transition shadow-sm"
                  >
                    <AppleIcon size={14} />
                    <span className="leading-none">
                      <span className="block text-[0.55rem] uppercase tracking-[0.2em] opacity-70 leading-none mb-0.5">
                        Download
                      </span>
                      <span className="block leading-none">App Store</span>
                    </span>
                  </a>
                  <a
                    href={TRANSPORT.itTaxi.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="itTaxi en Google Play"
                    className="inline-flex items-center gap-2 rounded-full bg-marron-deep text-blanco px-3.5 py-2 text-[0.7rem] font-semibold tracking-wide hover:bg-marron transition shadow-sm"
                  >
                    <GooglePlayIcon size={14} />
                    <span className="leading-none">
                      <span className="block text-[0.55rem] uppercase tracking-[0.2em] opacity-70 leading-none mb-0.5">
                        Get it on
                      </span>
                      <span className="block leading-none">Google Play</span>
                    </span>
                  </a>
                </div>
              </article>
            </FadeUp>

            <FadeUp delay={0.08}>
              <article className="h-full rounded-2xl bg-blanco p-6 sm:p-7 shadow-sm ring-1 ring-marron/5 hover:ring-terracota/30 transition">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-oro/15 text-oro-deep">
                    <CarIcon size={20} />
                  </span>
                </div>
                <h3 className="font-display text-xl text-marron mb-2">
                  {t("moverseCarTitle")}
                </h3>
                <p className="text-sm text-marron/80 leading-relaxed">
                  {t.rich("moverseCar", {
                    l: (chunks) => (
                      <a
                        href={TRANSPORT.free2move.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-terracota hover:text-terracota-soft underline-offset-2 hover:underline"
                      >
                        {chunks}
                        <span aria-hidden> ↗</span>
                      </a>
                    ),
                  })}
                </p>
              </article>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
