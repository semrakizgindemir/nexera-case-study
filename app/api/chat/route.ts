import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import type { ChatMessage } from "@/lib/types";
import { searchDocs, formatDocsForPrompt } from "@/lib/rag";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
const MODEL_NAME = "llama-3.3-70b-versatile"; // Fast and free open-source model

const SYSTEM_PROMPTS: Record<"tr" | "en", string> = {
  tr: `Sen "Nexera Asistan" adında bir eğitim ve kariyer danışmanısın.
Görevin, kullanıcılara yazılım geliştirme, öğrenme yolları, kariyer planlaması ve beceri geliştirme konularında yardımcı olmaktır.

KESİN KURALLAR:
- Yanıtlarını MUTLAKA Türkçe ver. Kullanıcı hangi dilde yazarsa yazsın, sen her zaman Türkçe yanıt ver.
- Türkçe karakterleri (ş, ç, ğ, ü, ö, ı, İ, Ş, Ç, Ğ, Ü, Ö) doğru kullan, ASCII ikamesi kullanma.
- İç düşünce sürecini veya meta yorumları kullanıcıya gösterme. Yalnızca temiz ve doğrudan yanıt ver.
- Yanıtlarını kısa ve odaklı tut. Gerekmedikçe uzun listeler yapma.
- Eğer bağlam dokümanları sağlanmışsa yanıtlarını bunlara dayandır. Emin olmadığın şeyleri uydurma, "bu konuda bilgim yok" de.
- Samimi, profesyonel ve yüreklendirici ol. Kullanıcı hayal kırıklığı yaşıyorsa bunu fark et.`,

  en: `You are "Nexera Assistant", an education and career advisor.
Your role is to help users with software development, learning paths, career planning, and skill development.

STRICT RULES:
- You MUST answer in English. No matter what language the user writes in, always respond in English.
- Do not show your internal thinking process or meta-commentary. Give only clean, direct answers.
- Keep answers concise and focused. Avoid unnecessary long lists.
- If context documents are provided, base your answers on them. If you don't know something, say so — do not make things up.
- Be friendly, professional, and encouraging. Acknowledge frustration when the user expresses it.`,
};

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  const startTime = Date.now();

  // --- Parse request ---
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    console.error("[chat] Failed to parse request body");
    return NextResponse.json(
      { reply: "Invalid request." },
      { status: 400 }
    );
  }

  const messages: ChatMessage[] = Array.isArray(body?.messages)
    ? body.messages
    : [];
  const locale: "tr" | "en" = body?.locale === "en" ? "en" : "tr";
  const lastUserMessage = messages[messages.length - 1]?.content ?? "";

  // --- Validate ---
  if (!lastUserMessage.trim()) {
    const emptyReply =
      locale === "tr"
        ? "Lütfen bir mesaj yazın."
        : "Please type a message.";
    console.log(`[chat] Empty message received, locale=${locale}`);
    return NextResponse.json({ reply: emptyReply });
  }

  // --- Check API key ---
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("[chat] GROQ_API_KEY is not set in environment variables");
    const errorReply =
      locale === "tr"
        ? "Sistem yapılandırma hatası. Lütfen daha sonra tekrar deneyin."
        : "System configuration error. Please try again later.";
    return NextResponse.json({ reply: errorReply }, { status: 500 });
  }

  // --- RAG: Search relevant documents ---
  const relevantDocs = searchDocs(lastUserMessage);
  const docsContext = formatDocsForPrompt(relevantDocs);
  const docsUsed = relevantDocs.map((d) => d.filename);

  // --- Build system prompt ---
  let systemPrompt = SYSTEM_PROMPTS[locale];
  if (docsContext) {
    const ragInstruction =
      locale === "tr"
        ? `\n\nAşağıda sana sağlanan bağlam dokümanları var. Yanıtlarını mümkün olduğunca bu dokümanlara dayandır:\n\n${docsContext}`
        : `\n\nBelow are context documents provided to you. Base your answers on these documents as much as possible:\n\n${docsContext}`;
    systemPrompt += ragInstruction;
  }

  // --- Build conversation history for Groq ---
  const groqMessages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
    { role: "system", content: systemPrompt },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];

  // --- Server-side logging (never sent to user) ---
  console.log(
    `[chat] locale=${locale} | model=${MODEL_NAME} | messageCount=${messages.length} | ` +
    `lastMsgLength=${lastUserMessage.length} | docsUsed=[${docsUsed.join(", ")}]`
  );

  try {
    // --- Call Groq ---
    const groq = new Groq({ apiKey });
    const chatCompletion = await groq.chat.completions.create({
      messages: groqMessages,
      model: MODEL_NAME,
      temperature: 0.7,
      max_tokens: 1024,
    });

    const reply = chatCompletion.choices[0]?.message?.content || "";

    const elapsed = Date.now() - startTime;
    console.log(
      `[chat] SUCCESS | responseLength=${reply.length} | elapsed=${elapsed}ms`
    );

    return NextResponse.json({ reply });
  } catch (err: unknown) {
    const elapsed = Date.now() - startTime;
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error(
      `[chat] ERROR | elapsed=${elapsed}ms | error=${errorMessage}`
    );

    const userErrorReply =
      locale === "tr"
        ? "Bir hata oluştu. Lütfen tekrar deneyin."
        : "Something went wrong. Please try again.";

    return NextResponse.json({ reply: userErrorReply }, { status: 500 });
  }
}
