"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { GIFTS } from "@/lib/constants";
import { CheckIcon, CopyIcon } from "./icons";

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
      // clipboard blocked — values are visible anyway
    }
  };

  return (
    <div className="rounded-2xl bg-crema/60 p-5 sm:p-6 ring-1 ring-marron/10">
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

export default function GiftAccountsList() {
  const t = useTranslations("gifts");
  return (
    <div className="space-y-4">
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
      {/* Stripe card slot — leave here for when we wire payments */}
    </div>
  );
}
