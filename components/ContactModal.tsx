"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CONTACTS } from "@/lib/constants";
import { CloseIcon, MailIcon, PhoneIcon } from "./icons";

export function openContact() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("contact:open"));
  }
}

function telHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

function waHref(phone: string) {
  return `https://wa.me/${phone.replace(/[^0-9]/g, "")}`;
}

export default function ContactModal() {
  const t = useTranslations("contact");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("contact:open", handler);
    return () => window.removeEventListener("contact:open", handler);
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
          aria-labelledby="contact-title"
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
            className="relative w-full max-w-md rounded-2xl bg-crema shadow-2xl ring-1 ring-marron/10"
          >
            <button
              type="button"
              onClick={close}
              aria-label={t("close")}
              className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-blanco text-marron transition hover:bg-blanco/70 shadow-sm ring-1 ring-marron/10"
            >
              <CloseIcon size={16} />
            </button>

            <div className="px-6 sm:px-8 pt-10 pb-2 text-center">
              <p className="font-body text-[0.65rem] uppercase tracking-[0.4em] text-terracota mb-3">
                — {t("eyebrow")}
              </p>
              <h2
                id="contact-title"
                className="font-display italic text-3xl sm:text-4xl text-marron mb-3"
              >
                {t("title")}
              </h2>
              <p className="font-display text-base text-marron/75 max-w-sm mx-auto">
                {t("intro")}
              </p>
            </div>

            <div className="px-4 sm:px-6 pb-6 pt-2 space-y-3">
              {/* Email */}
              <a
                href={`mailto:${CONTACTS.email}`}
                className="group flex items-center gap-4 rounded-xl bg-blanco p-4 ring-1 ring-marron/10 hover:ring-terracota/40 transition"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-terracota/10 text-terracota">
                  <MailIcon size={20} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.65rem] uppercase tracking-[0.25em] text-marron/55 mb-0.5">
                    {t("emailLabel")}
                  </p>
                  <p className="font-display text-base text-marron truncate">
                    {CONTACTS.email}
                  </p>
                </div>
                <span aria-hidden className="text-terracota/60 group-hover:text-terracota transition">
                  ↗
                </span>
              </a>

              {/* People */}
              {CONTACTS.people.map((person) => (
                <div
                  key={person.name}
                  className="rounded-xl bg-blanco p-4 ring-1 ring-marron/10"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-oro/15 text-oro-deep">
                      <PhoneIcon size={20} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-base text-marron leading-tight">
                        {person.name}
                        {"role" in person && person.role && (
                          <span className="text-marron/55 font-body text-xs ml-2">
                            · {t("weddingPlanner")}
                          </span>
                        )}
                      </p>
                      <p className="font-mono text-sm text-marron/70 mt-0.5">
                        {person.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 pl-[60px]">
                    <a
                      href={telHref(person.phone)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-terracota text-blanco px-3 py-1.5 text-[0.7rem] font-semibold tracking-wide hover:bg-terracota-soft transition"
                    >
                      <PhoneIcon size={12} />
                      <span>{t("callLabel")}</span>
                    </a>
                    <a
                      href={waHref(person.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-terracota/40 text-terracota px-3 py-1.5 text-[0.7rem] font-semibold tracking-wide hover:bg-terracota/5 transition"
                    >
                      <span>{t("whatsappLabel")}</span>
                      <span aria-hidden>↗</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
