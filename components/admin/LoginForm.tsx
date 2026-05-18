"use client";

import { useState } from "react";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      window.location.href = "/admin";
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-sm rounded-2xl bg-blanco shadow-xl ring-1 ring-marron/10 p-8"
    >
      <p className="font-body text-[0.65rem] uppercase tracking-[0.4em] text-terracota mb-3 text-center">
        — Admin
      </p>
      <h1 className="font-display italic text-3xl text-marron mb-2 text-center">
        Ariane &amp; Giuseppe
      </h1>
      <p className="text-sm text-marron/70 mb-6 text-center">
        Introduce la contraseña.
      </p>
      <label className="block">
        <span className="block text-xs uppercase tracking-[0.3em] text-marron/60 mb-1">
          Contraseña
        </span>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          required
          autoFocus
          className="w-full bg-transparent border-b border-marron/20 focus:border-terracota outline-none py-2 text-marron"
        />
      </label>
      {status === "error" && (
        <p className="mt-3 text-sm text-terracota">Contraseña incorrecta.</p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full rounded-full bg-terracota text-blanco py-3 text-sm font-semibold tracking-wide ring-1 ring-oro/60 hover:bg-terracota-soft transition disabled:opacity-60"
      >
        {status === "submitting" ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
