"use client";

import { useState } from "react";
import type { ChatMessage } from "@/lib/types";
import { getStrings, type Locale } from "@/lib/i18n";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("tr");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const t = getStrings(locale);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const next: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // NOTE: the UI language is sent as "locale". The assistant must
        // answer in this language, regardless of the language the user typed.
        body: JSON.stringify({ messages: next, locale }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: t.error }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <div className="header">
        <div className="header-row">
          <h1>{t.title}</h1>
          <div className="lang-toggle" role="group" aria-label="Language">
            <button
              type="button"
              className={locale === "tr" ? "active" : ""}
              onClick={() => setLocale("tr")}
            >
              TR
            </button>
            <button
              type="button"
              className={locale === "en" ? "active" : ""}
              onClick={() => setLocale("en")}
            >
              EN
            </button>
          </div>
        </div>
        <p>{t.subtitle}</p>
      </div>

      <div className="messages">
        {messages.length === 0 ? (
          <div className="empty">{t.empty}</div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={`bubble ${m.role}`}>
              {m.content}
            </div>
          ))
        )}
        {loading && <div className="bubble assistant thinking">{t.thinking}</div>}
      </div>

      <form className="composer" onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.placeholder}
          aria-label={t.inputLabel}
        />
        <button type="submit" disabled={loading || !input.trim()}>
          {t.send}
        </button>
      </form>
    </main>
  );
}
