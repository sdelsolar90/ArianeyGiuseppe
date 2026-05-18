"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import FadeUp from "./FadeUp";
import { GiftIcon, MusicNoteIcon } from "./icons";
import { openPlaylist } from "./PlaylistModal";
import { openGifts } from "./GiftModal";

type Status = "idle" | "submitting" | "success" | "error";
type Diet = "vegan" | "vegetarian" | "none" | "other" | "";
type YesNo = "yes" | "no" | "";

const ALLERGY_KEYS = ["gluten", "lactose", "nuts", "seafood", "egg", "other"] as const;
type AllergyKey = (typeof ALLERGY_KEYS)[number];

function allergyMessageKey(k: AllergyKey) {
  return ("allergy" + k.charAt(0).toUpperCase() + k.slice(1)) as
    | "allergyGluten"
    | "allergyLactose"
    | "allergyNuts"
    | "allergySeafood"
    | "allergyEgg"
    | "allergyOther";
}

export default function RSVP() {
  const t = useTranslations("rsvp");
  const tPlaylist = useTranslations("playlist");
  const tGifts = useTranslations("gifts");

  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState<1 | 2>(1);

  // Main person
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [plusOne, setPlusOne] = useState(false);
  const [bus, setBus] = useState<YesNo>("");
  const [dietPref, setDietPref] = useState<Diet>("");
  const [dietOther, setDietOther] = useState("");
  const [allergies, setAllergies] = useState<Set<AllergyKey>>(new Set());
  const [allergyOther, setAllergyOther] = useState("");

  // Plus one
  const [p2Name, setP2Name] = useState("");
  const [p2Diet, setP2Diet] = useState<Diet>("");
  const [p2DietOther, setP2DietOther] = useState("");
  const [p2Allergies, setP2Allergies] = useState<Set<AllergyKey>>(new Set());
  const [p2AllergyOther, setP2AllergyOther] = useState("");

  const needsStep2 = attending === "yes" && plusOne;

  const toggleSet = (
    set: Set<AllergyKey>,
    setter: React.Dispatch<React.SetStateAction<Set<AllergyKey>>>,
    key: AllergyKey
  ) => {
    const next = new Set(set);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setter(next);
  };

  const validateStep1 = () => {
    if (!name.trim() || !email.trim()) return false;
    if (attending === "no") return true;
    if (!bus || !dietPref) return false;
    if (dietPref === "other" && !dietOther.trim()) return false;
    if (allergies.has("other") && !allergyOther.trim()) return false;
    return true;
  };

  const validateStep2 = () => {
    if (!p2Name.trim()) return false;
    if (!p2Diet) return false;
    if (p2Diet === "other" && !p2DietOther.trim()) return false;
    if (p2Allergies.has("other") && !p2AllergyOther.trim()) return false;
    return true;
  };

  const submit = async () => {
    setStatus("submitting");
    const payload = {
      name,
      email,
      attending,
      plusOne,
      plusOneName: plusOne ? p2Name : "",
      bus,
      dietPref,
      dietOther: dietPref === "other" ? dietOther : "",
      allergies: Array.from(allergies),
      allergyOther: allergies.has("other") ? allergyOther : "",
      plusOneBus: plusOne ? bus : "",
      plusOneDietPref: plusOne ? p2Diet : "",
      plusOneDietOther: plusOne && p2Diet === "other" ? p2DietOther : "",
      plusOneAllergies: plusOne ? Array.from(p2Allergies) : [],
      plusOneAllergyOther: plusOne && p2Allergies.has("other") ? p2AllergyOther : "",
      locale: document.documentElement.lang,
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("bad");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    if (step === 1) {
      if (!validateStep1()) return;
      if (needsStep2) {
        setStep(2);
        return;
      }
      submit();
      return;
    }
    if (step === 2) {
      if (!validateStep2()) return;
      submit();
    }
  };

  const primaryLabel =
    step === 1 && needsStep2
      ? t("next")
      : status === "submitting"
        ? t("submitting")
        : t("submit");

  return (
    <section
      id="rsvp"
      className="relative bg-terracota text-blanco py-24 sm:py-32 px-6"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <FadeUp className="text-center mb-12">
          <p className="font-body text-xs uppercase tracking-[0.4em] text-oro mb-4">
            — {t("eyebrow")}
          </p>
          <h2 className="font-display italic text-4xl sm:text-5xl mb-3">
            {t("title")}
          </h2>
          <p className="font-body text-sm text-blanco/85">{t("subtitle")}</p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <FadeUp delay={0.05} className="lg:col-span-5 lg:self-center order-2 lg:order-1">
            <div>
              <div className="relative aspect-[4/5] lg:aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-marron-deep/20">
                <Image
                  src="/images/rsvp-car.webp"
                  alt="El coche de los novios"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-marron-deep/40 via-transparent to-transparent pointer-events-none"
                />
                <div className="absolute bottom-4 right-5">
                  <span className="font-mono text-[0.7rem] tracking-[0.25em] text-oro/90 drop-shadow-md">
                    10 · 10 · 26
                  </span>
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1} className="lg:col-span-7 order-1 lg:order-2">
            <div className="rounded-3xl bg-blanco text-marron p-6 sm:p-10 shadow-2xl">
              {status === "success" ? (
                <div className="py-10 text-center">
                  <p className="font-display italic text-4xl text-terracota mb-3">
                    {t("successTitle")}
                  </p>
                  <p className="text-marron/80 mb-7">{t("successDesc")}</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={openPlaylist}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-terracota text-blanco px-5 py-3 text-sm font-semibold tracking-wide ring-1 ring-oro/50 hover:bg-terracota-soft transition shadow-md"
                    >
                      <MusicNoteIcon size={16} />
                      <span>{tPlaylist("suggestCta")}</span>
                    </button>
                    <button
                      type="button"
                      onClick={openGifts}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-terracota/40 text-terracota px-5 py-3 text-sm font-semibold tracking-wide hover:bg-terracota/5 transition"
                    >
                      <GiftIcon size={16} />
                      <span>{tGifts("openButton")}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={onFormSubmit} className="space-y-5">
                  {/* Step indicator — only when there are 2 steps */}
                  {needsStep2 && (
                    <div className="flex flex-col items-center gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={[
                            "h-1.5 w-10 rounded-full transition-colors",
                            step >= 1 ? "bg-terracota" : "bg-marron/15",
                          ].join(" ")}
                        />
                        <span
                          className={[
                            "h-1.5 w-10 rounded-full transition-colors",
                            step >= 2 ? "bg-terracota" : "bg-marron/15",
                          ].join(" ")}
                        />
                      </div>
                      <p className="text-[0.65rem] uppercase tracking-[0.3em] text-marron/55">
                        {t("stepOf", { n: step, total: 2 })} ·{" "}
                        {step === 1 ? t("step1Title") : t("step2Title")}
                      </p>
                    </div>
                  )}

                  <AnimatePresence mode="wait" initial={false}>
                    {step === 1 && (
                      <motion.div
                        key="s1"
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="space-y-5"
                      >
                        <Field label={t("name")}>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoComplete="name"
                            className="w-full bg-transparent border-b border-marron/20 focus:border-terracota outline-none py-2 text-marron placeholder:text-marron/40"
                          />
                        </Field>

                        <Field label={t("email")}>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                            className="w-full bg-transparent border-b border-marron/20 focus:border-terracota outline-none py-2 text-marron placeholder:text-marron/40"
                          />
                        </Field>

                        <fieldset>
                          <legend className="block text-xs uppercase tracking-[0.3em] text-marron/60 mb-3">
                            {t("attending")}
                          </legend>
                          <div className="grid grid-cols-2 gap-3">
                            <Choice
                              checked={attending === "yes"}
                              onChange={() => setAttending("yes")}
                              label={t("yes")}
                            />
                            <Choice
                              checked={attending === "no"}
                              onChange={() => setAttending("no")}
                              label={t("no")}
                            />
                          </div>
                        </fieldset>

                        {attending === "yes" && (
                          <>
                            <label className="flex items-center gap-3 cursor-pointer select-none pt-2">
                              <input
                                type="checkbox"
                                checked={plusOne}
                                onChange={(e) => setPlusOne(e.target.checked)}
                                className="h-4 w-4 accent-terracota"
                              />
                              <span className="text-sm">{t("plusOne")}</span>
                            </label>

                            <BusField
                              label={t("bus")}
                              hint={t("busHint")}
                              value={bus}
                              onChange={setBus}
                              yesLabel={t("yes")}
                              noLabel={t("no")}
                            />

                            <DietField
                              label={t("dietPref")}
                              value={dietPref}
                              onChange={setDietPref}
                              otherValue={dietOther}
                              onOtherChange={setDietOther}
                              labels={{
                                vegan: t("dietVegan"),
                                vegetarian: t("dietVegetarian"),
                                none: t("dietNone"),
                                other: t("dietOther"),
                                otherPlaceholder: t("dietOtherPlaceholder"),
                              }}
                            />

                            <AllergyField
                              label={t("allergies")}
                              hint={t("allergiesHint")}
                              selected={allergies}
                              toggle={(k) => toggleSet(allergies, setAllergies, k)}
                              otherValue={allergyOther}
                              onOtherChange={setAllergyOther}
                              otherPlaceholder={t("allergyOtherPlaceholder")}
                              chipLabel={(k) => t(allergyMessageKey(k))}
                            />
                          </>
                        )}
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="s2"
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="space-y-5"
                      >
                        <p className="font-display italic text-marron/75 text-base sm:text-lg">
                          {t("step2Intro")}
                        </p>

                        <Field label={t("plusOneName")}>
                          <input
                            type="text"
                            value={p2Name}
                            onChange={(e) => setP2Name(e.target.value)}
                            required
                            className="w-full bg-transparent border-b border-marron/20 focus:border-terracota outline-none py-2 text-marron placeholder:text-marron/40"
                          />
                        </Field>

                        <DietField
                          label={t("dietPref")}
                          value={p2Diet}
                          onChange={setP2Diet}
                          otherValue={p2DietOther}
                          onOtherChange={setP2DietOther}
                          labels={{
                            vegan: t("dietVegan"),
                            vegetarian: t("dietVegetarian"),
                            none: t("dietNone"),
                            other: t("dietOther"),
                            otherPlaceholder: t("dietOtherPlaceholder"),
                          }}
                        />

                        <AllergyField
                          label={t("allergies")}
                          hint={t("allergiesHint")}
                          selected={p2Allergies}
                          toggle={(k) => toggleSet(p2Allergies, setP2Allergies, k)}
                          otherValue={p2AllergyOther}
                          onOtherChange={setP2AllergyOther}
                          otherPlaceholder={t("allergyOtherPlaceholder")}
                          chipLabel={(k) => t(allergyMessageKey(k))}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Buttons */}
                  <div className="pt-4 flex flex-col sm:flex-row-reverse gap-3">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="flex-1 rounded-full bg-terracota text-blanco py-3 text-sm font-semibold tracking-wide ring-1 ring-oro/70 hover:bg-terracota-soft transition disabled:opacity-60"
                    >
                      {primaryLabel}
                    </button>
                    {step === 2 && (
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        disabled={status === "submitting"}
                        className="sm:flex-none rounded-full border border-marron/20 text-marron py-3 px-5 text-sm font-semibold tracking-wide hover:border-terracota/40 hover:text-terracota transition disabled:opacity-60"
                      >
                        ← {t("back")}
                      </button>
                    )}
                  </div>

                  {status === "error" && (
                    <div className="mt-3 rounded-lg bg-terracota/10 px-4 py-3 text-sm text-terracota">
                      <strong className="font-semibold">{t("errorTitle")}.</strong>{" "}
                      {t("errorDesc")}
                    </div>
                  )}
                </form>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.3em] text-marron/60 mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}

function Choice({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={[
        "cursor-pointer rounded-xl border px-4 py-3 text-sm text-center transition",
        checked
          ? "border-terracota bg-terracota/10 text-terracota font-semibold"
          : "border-marron/15 text-marron/80 hover:border-terracota/40",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function BusField({
  label,
  hint,
  value,
  onChange,
  yesLabel,
  noLabel,
}: {
  label: string;
  hint: string;
  value: YesNo;
  onChange: (v: YesNo) => void;
  yesLabel: string;
  noLabel: string;
}) {
  return (
    <fieldset>
      <legend className="block text-xs uppercase tracking-[0.3em] text-marron/60 mb-1">
        {label} <span className="text-terracota">*</span>
      </legend>
      <p className="text-[0.7rem] text-marron/55 mb-3">{hint}</p>
      <div className="grid grid-cols-2 gap-3">
        <Choice
          checked={value === "yes"}
          onChange={() => onChange("yes")}
          label={yesLabel}
        />
        <Choice
          checked={value === "no"}
          onChange={() => onChange("no")}
          label={noLabel}
        />
      </div>
    </fieldset>
  );
}

function DietField({
  label,
  value,
  onChange,
  otherValue,
  onOtherChange,
  labels,
}: {
  label: string;
  value: Diet;
  onChange: (v: Diet) => void;
  otherValue: string;
  onOtherChange: (v: string) => void;
  labels: {
    vegan: string;
    vegetarian: string;
    none: string;
    other: string;
    otherPlaceholder: string;
  };
}) {
  return (
    <fieldset>
      <legend className="block text-xs uppercase tracking-[0.3em] text-marron/60 mb-3">
        {label} <span className="text-terracota">*</span>
      </legend>
      <div className="grid grid-cols-2 gap-3">
        <Choice
          checked={value === "vegan"}
          onChange={() => onChange("vegan")}
          label={labels.vegan}
        />
        <Choice
          checked={value === "vegetarian"}
          onChange={() => onChange("vegetarian")}
          label={labels.vegetarian}
        />
        <Choice
          checked={value === "none"}
          onChange={() => onChange("none")}
          label={labels.none}
        />
        <Choice
          checked={value === "other"}
          onChange={() => onChange("other")}
          label={labels.other}
        />
      </div>
      {value === "other" && (
        <input
          type="text"
          value={otherValue}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder={labels.otherPlaceholder}
          className="mt-3 w-full bg-transparent border-b border-marron/20 focus:border-terracota outline-none py-2 text-marron placeholder:text-marron/40"
        />
      )}
    </fieldset>
  );
}

function AllergyField({
  label,
  hint,
  selected,
  toggle,
  otherValue,
  onOtherChange,
  otherPlaceholder,
  chipLabel,
}: {
  label: string;
  hint: string;
  selected: Set<AllergyKey>;
  toggle: (k: AllergyKey) => void;
  otherValue: string;
  onOtherChange: (v: string) => void;
  otherPlaceholder: string;
  chipLabel: (k: AllergyKey) => string;
}) {
  return (
    <fieldset>
      <legend className="block text-xs uppercase tracking-[0.3em] text-marron/60 mb-1">
        {label}
      </legend>
      <p className="text-[0.7rem] text-marron/55 mb-3">{hint}</p>
      <div className="flex flex-wrap gap-2">
        {ALLERGY_KEYS.map((key) => {
          const isOn = selected.has(key);
          return (
            <button
              key={key}
              type="button"
              onClick={() => toggle(key)}
              aria-pressed={isOn}
              className={[
                "rounded-full px-4 py-2 text-xs font-medium tracking-wide ring-1 transition",
                isOn
                  ? "bg-terracota/15 text-terracota ring-terracota/40 font-semibold"
                  : "bg-transparent text-marron/75 ring-marron/15 hover:ring-terracota/40 hover:text-terracota",
              ].join(" ")}
            >
              {chipLabel(key)}
            </button>
          );
        })}
      </div>
      {selected.has("other") && (
        <input
          type="text"
          value={otherValue}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder={otherPlaceholder}
          className="mt-3 w-full bg-transparent border-b border-marron/20 focus:border-terracota outline-none py-2 text-marron placeholder:text-marron/40"
        />
      )}
    </fieldset>
  );
}
