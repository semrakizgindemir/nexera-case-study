# Nexera AI Assistant

A bilingual AI career and learning assistant built as a case study with **Next.js, TypeScript, Groq-hosted Llama 3.3, and lightweight retrieval-augmented generation (RAG)**.

The assistant answers in the language selected by the user interface—Turkish or English—while grounding responses in local learning-path and skills documents when relevant.

## Highlights

- Turkish and English interface and response control
- Groq API integration with `llama-3.3-70b-versatile`
- Conversation history for contextual multi-turn chat
- Lightweight document retrieval for a small local knowledge base
- Server-side validation, structured logging, and user-friendly error handling
- Transparent decision and prompt records under `responses/`

## Architecture

```text
app/page.tsx             Chat interface and language selection
app/api/chat/route.ts    Validation, prompt assembly, Groq request, errors
lib/i18n.ts              Centralized Turkish/English UI copy
lib/rag.ts               Local document loading, ranking, and prompt context
sample-docs/             Career and learning knowledge base
responses/               Decision log, changelog, and prompt record
```

The knowledge base contains only a few documents, so the retrieval layer deliberately uses keyword scoring instead of a vector database. This keeps the solution simple and proportionate to the problem while leaving a clear migration path to embeddings and semantic search.

## Run locally

Requirements: Node.js 18+ and a Groq API key.

```bash
npm install
cp .env.example .env.local
# Add GROQ_API_KEY to .env.local
npm run dev
```

Open `http://localhost:3000`.

## Key technical decisions

- **Next.js API Routes:** avoided a separate backend for a single AI endpoint.
- **Groq + Llama 3.3:** selected after free-tier availability issues with the initially considered provider.
- **Lightweight retrieval:** matched the small corpus without over-engineering.
- **Explicit locale prompts:** prevents language leakage when the user's message and UI language differ.

## Next steps

- Stream model responses
- Add rate limiting and semantic caching
- Replace keyword retrieval with embeddings as the document collection grows
- Add automated tests for locale behavior, retrieval, and error paths

## Stack

Next.js · TypeScript · React · Groq · Llama 3.3 · RAG · i18n
