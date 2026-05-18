"use client";

import { useTranslations } from "next-intl";
import { GiftIcon, MusicNoteIcon } from "./icons";
import { openGifts } from "./GiftModal";
import { openPlaylist } from "./PlaylistModal";

type Accent = {
  text: string;
  bgSoft: string;
  ring: string;
};

export default function ElDiaActions({
  accent,
  variant,
}: {
  accent: Accent;
  variant: "gifts" | "playlist";
}) {
  const tGifts = useTranslations("gifts");
  const tPlaylist = useTranslations("playlist");

  if (variant === "gifts") {
    return (
      <button
        type="button"
        onClick={openGifts}
        className={[
          "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold tracking-wide ring-1 transition",
          accent.bgSoft,
          accent.text,
          accent.ring,
        ].join(" ")}
      >
        <GiftIcon size={14} />
        <span>{tGifts("openButton")}</span>
        <span aria-hidden>→</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openPlaylist}
      className="inline-flex items-center gap-2 rounded-full bg-coral text-blanco px-4 py-2.5 text-xs font-semibold tracking-wide ring-1 ring-coral/60 hover:bg-coral/85 transition shadow-sm"
    >
      <MusicNoteIcon size={14} />
      <span>{tPlaylist("openButton")}</span>
    </button>
  );
}
