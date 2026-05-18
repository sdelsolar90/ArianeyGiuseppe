"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GIFTS } from "@/lib/constants";
import { CheckIcon, CloseIcon, CopyIcon, GiftIcon } from "./icons";

export function openGifts() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("gifts:open"));
  }
}

type AccountProps = {
  badge: string;
  holder: string;
  fields: ReadonlyArray<{ label: string; value: string }>;
  copyLabel: string;
  copiedLabel: string;
};

function AccountCard({ badge, holder, fields, copyLabel, copiedLabel }: AccountProps) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copy = async (value: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(value.replace(/\s+/g, ""));
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx((c) => (c === idx ? null : c)), 1800);
    } catch {
      // clipboard blocked — quietly ignore; values are visible
    }
  };

  return (
    <div className="rounded-2xl bg-blanco p-5 sm:p-6 ring-1 ring-marron/10 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-terracota">
          {badge}
        </span>
        <span className="font-display italic text-marron text-lg">{holder}</span>
      </div>
      <dl className="space-y-3">
        {fields.map((f, i) => {
          const isCopied = copiedIdx === i;
          return (
            <div
              key={f.label}
              className="flex items-center gap-3 border-t border-marron/10 pt-3"
            >
              <div className="flex-1 min-w-0">
                <dt className="text-[0.65rem] uppercase tracking-[0.25em] text-marron/55 mb-1">
                  {f.label}
                </dt>
                <dd className="font-mono text-sm sm:text-[0.95rem] text-marron break-all leading-relaxed">
                  {f.value}
                </dd>
              </div>
              <button
                type="button"
                onClick={() => copy(f.value, i)}
                aria-label={isCopied ? copiedLabel : copyLabel}
                className={[
                  "shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.7rem] font-semibold tracking-wide transition",
                  isCopied
                    ? "bg-oro/20 text-oro-deep ring-1 ring-oro/50"
                    : "bg-terracota/10 text-terracota ring-1 ring-terracota/20 hover:bg-terracota/15 hover:ring-terracota/40",
                ].join(" ")}
              >
                {isCopied ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
                <span>{isCopied ? copiedLabel : copyLabel}</span>
              </button>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

export default function GiftModal() {
  const t = useTranslations("gifts");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("gifts:open", handler);
    return () => window.removeEventListener("gifts:open", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gifts-title"
        >
          <button
            type="button"
            onClick={close}
            aria-label={t("close")}
            className="absolute inset-0 bg-marron-deep/75 backdrop-blur-sm cursor-default"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-crema shadow-2xl ring-1 ring-marron/10"
          >
            {/* gift decoration */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 text-terracota/10"
            >
              <GiftIcon size={220} />
            </div>

            <button
              type="button"
              onClick={close}
              aria-label={t("close")}
              className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-blanco text-marron transition hover:bg-blanco/70 shadow-sm ring-1 ring-marron/10"
            >
              <CloseIcon size={16} />
            </button>

            <div className="relative px-6 sm:px-8 pt-10 pb-6 text-center">
              <div className="flex justify-center mb-4 text-terracota">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-terracota/10">
                  <GiftIcon size={22} />
                </span>
              </div>
              <p className="font-body text-[0.65rem] uppercase tracking-[0.4em] text-terracota mb-3">
                — {t("eyebrow")}
              </p>
              <h2
                id="gifts-title"
                className="font-display italic text-3xl sm:text-4xl text-marron mb-4"
              >
                {t("title")}
              </h2>
              <p className="font-display text-base sm:text-lg text-marron/75 max-w-md mx-auto leading-relaxed">
                {t("intro")}
              </p>
            </div>

            <div className="relative px-4 sm:px-6 pb-6 space-y-4">
              <AccountCard
                badge={t("italyAccount")}
                holder={GIFTS.giuseppe.holder}
                fields={GIFTS.giuseppe.fields}
                copyLabel={t("copy")}
                copiedLabel={t("copied")}
              />
              <AccountCard
                badge={t("peruAccount")}
                holder={GIFTS.ariane.holder}
                fields={GIFTS.ariane.fields}
                copyLabel={t("copy")}
                copiedLabel={t("copied")}
              />

              <p className="text-center pt-3 font-display italic text-terracota text-base">
                {t("thanks")}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
