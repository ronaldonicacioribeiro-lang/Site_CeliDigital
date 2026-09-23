"use client";

import { useState, type FormEvent } from "react";
import { trackContactFormSubmit } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

function encodeFormData(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
}

/**
 * Netlify Forms — detected automatically at deploy time from the static HTML
 * (needs the plain `data-netlify` form + a matching hidden `form-name` input;
 * see https://docs.netlify.com/forms/setup). Submitted here via fetch so the
 * page doesn't reload; email notifications are configured in the Netlify
 * dashboard (Site settings → Forms → Form notifications), not in code.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, string> = {};
    formData.forEach((value, key) => {
      payload[key] = String(value);
    });

    setStatus("submitting");
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData(payload),
      });
      if (!response.ok) throw new Error("Falha no envio");
      trackContactFormSubmit();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-center text-sm text-muted">
        Recebemos seu contato! Vamos falar com você em breve.
      </p>
    );
  }

  return (
    <form
      name="contato"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-3"
    >
      <input type="hidden" name="form-name" value="contato" />
      <p className="hidden">
        <label>
          Não preencha este campo: <input name="bot-field" />
        </label>
      </p>

      <input
        type="text"
        name="nome"
        placeholder="Seu nome"
        required
        autoComplete="name"
        className="glass rounded-full px-5 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
      />
      <input
        type="tel"
        name="telefone"
        placeholder="WhatsApp / telefone"
        required
        autoComplete="tel"
        className="glass rounded-full px-5 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
      />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-7 py-3.5 text-base font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset] transition-colors hover:brightness-110 disabled:opacity-60"
      >
        {status === "submitting" ? "Enviando..." : "Quero ser contatado"}
      </button>

      {status === "error" && (
        <p className="text-center text-xs text-red-400">
          Não deu pra enviar agora — tenta de novo ou chama no WhatsApp.
        </p>
      )}

      <p className="text-center text-[11px] text-muted/70">
        Seus dados são usados só pra entrarmos em contato — nada de spam.
      </p>
    </form>
  );
}
