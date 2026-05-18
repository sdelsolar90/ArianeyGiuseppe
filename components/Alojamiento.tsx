import type { ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import FadeUp from "./FadeUp";
import { WEDDING } from "@/lib/constants";

type Card = {
  name: string;
  address: string;
  mapsUrl: string;
  note: ReactNode;
  image: string;
  email?: string;
  bookingUrl?: string;
};

function HotelCard({ card, delay = 0 }: { card: Card; delay?: number }) {
  const t = useTranslations("alojamiento");
  return (
    <FadeUp delay={delay}>
      <article className="group grid grid-cols-1 sm:grid-cols-12 overflow-hidden rounded-2xl bg-blanco shadow-sm ring-1 ring-marron/5 hover:ring-terracota/30 transition">
        <div className="sm:col-span-5 aspect-[4/3] sm:aspect-auto sm:min-h-[260px] relative overflow-hidden">
          <Image
            src={card.image}
            alt={card.name}
            fill
            sizes="(min-width: 640px) 40vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-marron-deep/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-3 right-3">
            <span className="inline-block rounded-full bg-blanco/90 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-marron font-semibold">
              Hotel
            </span>
          </div>
        </div>

        {/* content */}
        <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col">
          <h3 className="font-display text-2xl sm:text-3xl text-marron mb-1">
            {card.name}
          </h3>
          <p className="text-sm text-marron/65 mb-4">{card.address}</p>
          <p className="text-sm text-marron leading-relaxed mb-5 flex-1">
            {card.note}
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={card.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-terracota text-blanco px-4 py-2 text-xs font-semibold tracking-wide hover:bg-terracota-soft transition"
            >
              {t("viewMaps")} <span aria-hidden>↗</span>
            </a>
            {card.email && (
              <a
                href={`mailto:${card.email}`}
                className="inline-flex items-center gap-1 rounded-full border border-terracota/40 text-terracota px-4 py-2 text-xs font-semibold tracking-wide hover:bg-terracota/5 transition"
              >
                {t("sendEmail")} <span aria-hidden>↗</span>
              </a>
            )}
            {card.bookingUrl && (
              <a
                href={card.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-terracota/40 text-terracota px-4 py-2 text-xs font-semibold tracking-wide hover:bg-terracota/5 transition"
              >
                {t("viewBooking")} <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        </div>
      </article>
    </FadeUp>
  );
}

export default function Alojamiento() {
  const t = useTranslations("alojamiento");

  const nhowNote = t.rich("nhowNote", {
    k: (chunks) => (
      <a
        href={`mailto:${WEDDING.hotelNhow.bookingEmail}`}
        className="font-semibold text-terracota hover:text-terracota-soft underline-offset-2 hover:underline"
      >
        {chunks}
      </a>
    ),
  });

  return (
    <section id="alojamiento" className="relative bg-crema pt-12 sm:pt-16 pb-24 sm:pb-32">
      <div className="mx-auto max-w-5xl px-6">
        <FadeUp className="text-center mb-10">
          <p className="font-body text-xs uppercase tracking-[0.4em] text-terracota mb-4">
            — {t("eyebrow")}
          </p>
          <h2 className="font-display italic text-4xl sm:text-5xl text-marron">
            {t("title")}
          </h2>
        </FadeUp>

        <FadeUp delay={0.05} className="max-w-2xl mx-auto text-center mb-10">
          <p className="font-display text-lg sm:text-xl text-marron/80 leading-relaxed">
            {t("intro")}
          </p>
        </FadeUp>

        <HotelCard
          card={{
            name: WEDDING.hotelNhow.name,
            address: WEDDING.hotelNhow.address,
            mapsUrl: WEDDING.hotelNhow.mapsUrl,
            note: nhowNote,
            email: WEDDING.hotelNhow.bookingEmail,
            image: "/images/hotel-nhow.jpg",
          }}
        />

        <FadeUp delay={0.1} className="my-12 max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 text-terracota/40 mb-5">
            <span className="h-px w-12 bg-terracota/30" aria-hidden />
            <span className="text-[0.6rem] uppercase tracking-[0.4em]">·</span>
            <span className="h-px w-12 bg-terracota/30" aria-hidden />
          </div>
          <p className="font-display italic text-lg sm:text-xl text-marron/80 leading-relaxed">
            {t("bridge")}
          </p>
        </FadeUp>

        <HotelCard
          delay={0.15}
          card={{
            name: WEDDING.hotelRio.name,
            address: WEDDING.hotelRio.address,
            mapsUrl: WEDDING.hotelRio.mapsUrl,
            note: t("rioNote"),
            image: "/images/hotel-rio.jpg",
            bookingUrl: WEDDING.hotelRio.bookingUrl,
          }}
        />
      </div>
    </section>
  );
}
