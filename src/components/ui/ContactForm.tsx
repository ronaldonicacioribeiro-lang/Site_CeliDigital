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
 * Netlify Forms + Next.js 13.5+ (the Netlify Next.js Runtime v5 / OpenNext
 * adapter) can't detect forms from React-rendered pages anymore — only
 * static HTML in `public/` is scanned at deploy time. `data-netlify` on
 * THIS form has no effect and even fails the build (Netlify's plugin treats
 * it as a sign of an unmigrated form). The real form schema lives in the
 * static `public/__forms.html` twin; this one just needs matching field
 * `name`s and posts to that static file's path.
 * See https://opennext.js.org/netlify/forms
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
      const response = await fetch("/__forms.html", {
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
        Seus dados são usados só pra entrarmos em contato — nada de spam.{" "}
        <a href="/politica-de-privacidade" className="underline underline-offset-2 hover:text-foreground">
          Política de Privacidade
        </a>
        .
      </p>
    </form>
  );
}
