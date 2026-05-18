import Image from "next/image";
import { useTranslations } from "next-intl";
import FadeUp from "./FadeUp";

export default function Historia() {
  const t = useTranslations("historia");

  return (
    <section id="historia" className="relative bg-crema py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Text column */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <FadeUp>
              <p className="font-body text-xs uppercase tracking-[0.4em] text-terracota mb-6">
                — {t("eyebrow")}
              </p>
            </FadeUp>

            <FadeUp delay={0.05}>
              <p className="font-display text-xl sm:text-2xl leading-relaxed text-marron mb-10 max-w-xl">
                {t("p1")}
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="font-display italic text-lg sm:text-xl text-marron/75 mb-4 max-w-xl">
                {t("p2Lead")}
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <blockquote className="mb-12">
                <p className="font-display italic text-[clamp(2.2rem,5.8vw,4.2rem)] leading-[1.05] text-terracota">
                  «{t("pullQuote")}»
                </p>
              </blockquote>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="font-display text-lg sm:text-xl leading-relaxed text-marron mb-6 max-w-xl">
                {t("p3")}
              </p>
            </FadeUp>

            <FadeUp delay={0.25}>
              <p className="font-display italic text-base sm:text-lg leading-relaxed text-marron/80 max-w-xl">
                {t("p4")}
              </p>
            </FadeUp>
          </div>

          {/* Image column */}
          <FadeUp delay={0.1} className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-24">
            <div className="relative">
              <div
                className="relative aspect-[5/4] w-full overflow-hidden bg-marron"
                style={{
                  clipPath: "polygon(0 6%, 100% 0, 100% 94%, 0 100%)",
                }}
              >
                <Image
                  src="/historia.png"
                  alt="Ariane y Giuseppe"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover grayscale"
                  priority={false}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-marron/40 to-transparent pointer-events-none" />
              </div>
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-20 h-20 border border-oro/60 rounded-full pointer-events-none" />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
