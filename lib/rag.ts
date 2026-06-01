import { readFileSync, readdirSync } from "fs";
import path from "path";

interface DocChunk {
  filename: string;
  content: string;
}

// Load all markdown files from sample-docs at startup
const DOCS_DIR = path.join(process.cwd(), "sample-docs");

let cachedDocs: DocChunk[] | null = null;

function loadDocs(): DocChunk[] {
  if (cachedDocs) return cachedDocs;

  try {
    const files = readdirSync(DOCS_DIR).filter(
      (f) => f.endsWith(".md") || f.endsWith(".txt")
    );

    cachedDocs = files.map((filename) => ({
      filename,
      content: readFileSync(path.join(DOCS_DIR, filename), "utf-8"),
    }));

    console.log(
      `[rag] Loaded ${cachedDocs.length} documents: ${cachedDocs.map((d) => d.filename).join(", ")}`
    );

    return cachedDocs;
  } catch (err) {
    console.error("[rag] Failed to load documents:", err);
    return [];
  }
}

/**
 * Simple keyword-based search: splits the query into words and scores
 * each document by how many query words appear in it (case-insensitive).
 * Returns the top N most relevant document chunks.
 */
export function searchDocs(query: string, topN: number = 3): DocChunk[] {
  const docs = loadDocs();
  if (docs.length === 0) return [];

  const queryWords = query
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 2); // ignore very short words

  if (queryWords.length === 0) return [];

  const scored = docs.map((doc) => {
    const lowerContent = doc.content.toLowerCase();
    let score = 0;
    for (const word of queryWords) {
      // Count occurrences of each query word
      const regex = new RegExp(word, "gi");
      const matches = lowerContent.match(regex);
      if (matches) {
        score += matches.length;
      }
    }
    return { doc, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map((s) => s.doc);
}

/**
 * Format matched documents as context for the system prompt.
 */
export function formatDocsForPrompt(docs: DocChunk[]): string {
  if (docs.length === 0) return "";

  const sections = docs.map(
    (d) => `--- ${d.filename} ---\n${d.content.trim()}`
  );

  return sections.join("\n\n");
}
