"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CloseIcon, GiftIcon } from "./icons";
import GiftAccountsList from "./GiftAccountsList";

export function openGifts() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("gifts:open"));
  }
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
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl bg-crema shadow-2xl ring-1 ring-marron/10"
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
              <GiftAccountsList />

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
