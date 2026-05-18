"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { GiftIcon, MailIcon, PhoneIcon } from "./icons";
import { openContact } from "./ContactModal";
import { openGifts } from "./GiftModal";

export default function StickyActions() {
  const tSticky = useTranslations("sticky");
  const tContact = useTranslations("contact");
  const tGifts = useTranslations("gifts");
  const [scrolled, setScrolled] = useState(false);
  const [rsvpInView, setRsvpInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const target = document.getElementById("rsvp");
    if (!target) return;
    const obs = new IntersectionObserver(
      ([entry]) =>
        setRsvpInView(
          entry.isIntersecting || entry.boundingClientRect.top < 0
        ),
      { threshold: 0, rootMargin: "0px 0px -20% 0px" }
    );
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  const show = scrolled && !rsvpInView;

  const scrollToRsvp = () => {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Desktop / tablet — vertical stack bottom-right */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3"
          >
            <button
              type="button"
              onClick={openGifts}
              aria-label={tGifts("openButton")}
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-blanco text-terracota shadow-xl ring-1 ring-oro/40 hover:ring-oro/70 transition"
              title={tGifts("openButton")}
            >
              <GiftIcon size={20} />
            </button>
            <button
              type="button"
              onClick={openContact}
              aria-label={tContact("openButton")}
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-blanco text-terracota shadow-xl ring-1 ring-oro/40 hover:ring-oro/70 transition"
              title={tContact("openButton")}
            >
              <PhoneIcon size={20} />
            </button>
            <button
              type="button"
              onClick={scrollToRsvp}
              aria-label={tSticky("label")}
              className="inline-flex items-center gap-2.5 rounded-full bg-terracota text-blanco px-5 py-3 text-sm font-semibold tracking-wide shadow-xl ring-1 ring-oro/70 hover:bg-terracota-soft transition"
            >
              <MailIcon size={16} />
              <span>{tSticky("label")}</span>
            </button>
          </motion.div>

          {/* Mobile — bottom bar: 2 small icons + 1 wide pill */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="sm:hidden fixed inset-x-0 bottom-0 z-40 px-3 pb-3 pt-2"
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openGifts}
                aria-label={tGifts("openButton")}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blanco text-terracota shadow-xl ring-1 ring-oro/40"
              >
                <GiftIcon size={20} />
              </button>
              <button
                type="button"
                onClick={openContact}
                aria-label={tContact("openButton")}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blanco text-terracota shadow-xl ring-1 ring-oro/40"
              >
                <PhoneIcon size={20} />
              </button>
              <button
                type="button"
                onClick={scrollToRsvp}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-terracota text-blanco py-3 text-sm font-semibold tracking-wide shadow-xl ring-1 ring-oro/70 active:bg-terracota-soft"
              >
                <MailIcon size={16} />
                <span>{tSticky("labelShort")}</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
