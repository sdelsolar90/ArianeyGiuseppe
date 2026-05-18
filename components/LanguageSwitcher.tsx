"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LABELS: Record<string, string> = { es: "ES", en: "EN", it: "IT" };

type Props = {
  className?: string;
};

export default function LanguageSwitcher({ className = "" }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const change = (next: string) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next as "es" | "en" | "it" });
    });
  };

  return (
    <div
      className={[
        "flex items-center gap-0.5 rounded-full px-1 py-1 backdrop-blur-md",
        "bg-night/40 ring-1 ring-oro-bright/25 shadow-lg shadow-night/30",
        className,
      ].join(" ")}
      aria-label="Language selector"
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => change(l)}
            disabled={isPending}
            aria-pressed={active}
            aria-label={`Switch language to ${LABELS[l]}`}
            className={[
              "px-3 py-1.5 rounded-full text-[0.7rem] font-semibold tracking-[0.2em] transition-all",
              active
                ? "bg-coral text-blanco shadow-[0_0_18px_rgba(201,105,78,0.55)]"
                : "text-oro-bright/80 hover:text-oro-bright hover:bg-oro-bright/5",
            ].join(" ")}
          >
            {LABELS[l]}
          </button>
        );
      })}
    </div>
  );
}
