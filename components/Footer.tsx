import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="bg-marron-deep text-blanco/70 py-12 px-6 text-center">
      <p className="font-display italic text-2xl text-oro mb-2">
        {t("tagline")}
      </p>
      <p className="font-body text-xs uppercase tracking-[0.4em] mb-6">
        {t("credit")}
      </p>
      <p className="font-body text-[0.65rem] uppercase tracking-[0.35em] text-blanco/40">
        {t("developedBy")}{" "}
        <a
          href="https://www.enigmasac.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-oro/70 hover:text-oro transition"
        >
          Enigma
        </a>
      </p>
    </footer>
  );
}
