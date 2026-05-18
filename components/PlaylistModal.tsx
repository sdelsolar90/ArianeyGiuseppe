"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { PLAYLIST } from "@/lib/constants";
import { CloseIcon, DiscIcon, MusicNoteIcon } from "./icons";

export function openPlaylist() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("playlist:open"));
  }
}

export default function PlaylistModal() {
  const t = useTranslations("playlist");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("playlist:open", handler);
    return () => window.removeEventListener("playlist:open", handler);
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
          aria-labelledby="playlist-title"
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
            {/* rotating disc watermark */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 opacity-[0.06] text-terracota animate-disc"
            >
              <DiscIcon size={320} />
            </div>

            {/* close */}
            <button
              type="button"
              onClick={close}
              aria-label={t("close")}
              className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-blanco text-marron transition hover:bg-blanco/70 shadow-sm ring-1 ring-marron/10"
            >
              <CloseIcon size={16} />
            </button>

            <div className="relative px-6 sm:px-8 pt-10 pb-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 text-terracota mb-4">
                  <span aria-hidden className="h-px w-8 bg-terracota/40" />
                  <MusicNoteIcon size={18} />
                  <span aria-hidden className="h-px w-8 bg-terracota/40" />
                </div>
                <p className="font-body text-[0.65rem] uppercase tracking-[0.4em] text-terracota mb-2">
                  — {t("eyebrow")}
                </p>
                <h2
                  id="playlist-title"
                  className="font-display italic text-3xl sm:text-4xl text-marron mb-4"
                >
                  {t("title")}
                </h2>
                <p className="font-display text-base sm:text-lg text-marron/75 max-w-md mx-auto leading-relaxed">
                  {t("intro")}
                </p>
              </div>

              <div className="flex justify-center mt-6">
                <a
                  href={PLAYLIST.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-marron text-blanco px-5 py-2.5 text-xs font-semibold tracking-wide hover:bg-marron-deep transition shadow-md"
                >
                  <DiscIcon size={16} />
                  <span>{t("spotifyCta")}</span>
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </div>

            <ol className="relative px-3 sm:px-5 pb-6 pt-2">
              {PLAYLIST.tracks.map((track, i) => (
                <li
                  key={i}
                  className="group flex items-center gap-4 py-2.5 px-3 border-b border-marron/10 last:border-b-0 transition hover:bg-blanco/60 rounded-md"
                >
                  <span className="font-mono text-[0.7rem] text-oro-deep tracking-[0.15em] w-7 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-display italic text-base sm:text-lg text-marron truncate leading-tight">
                      {track.title}
                    </p>
                    <p className="text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.2em] text-marron/55 truncate mt-0.5">
                      {track.artist}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="text-terracota/25 group-hover:text-terracota transition shrink-0"
                  >
                    <MusicNoteIcon size={14} />
                  </span>
                </li>
              ))}
            </ol>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
