export type Locale = "tr" | "en";

export interface UIStrings {
  title: string;
  subtitle: string;
  empty: string;
  placeholder: string;
  send: string;
  error: string;
  inputLabel: string;
  thinking: string;
  languageLabel: string;
}

const strings: Record<Locale, UIStrings> = {
  tr: {
    title: "Nexera Yapay Zekâ Asistanı",
    subtitle: "Eğitim ve kariyer yolculuğunuzda size yardımcı olan yapay zekâ danışmanınız.",
    empty: "Sohbete başlamak için bir mesaj gönderin.",
    placeholder: "Bir mesaj yazın…",
    send: "Gönder",
    error: "Bir hata oluştu. Lütfen tekrar deneyin.",
    inputLabel: "Mesaj girişi",
    thinking: "Düşünüyor…",
    languageLabel: "Dil",
  },
  en: {
    title: "Nexera AI Assistant",
    subtitle: "Your AI advisor for education and career guidance.",
    empty: "Send a message to start the conversation.",
    placeholder: "Type a message…",
    send: "Send",
    error: "Something went wrong. Please try again.",
    inputLabel: "Message input",
    thinking: "Thinking…",
    languageLabel: "Language",
  },
};

export function getStrings(locale: Locale): UIStrings {
  return strings[locale] ?? strings.tr;
}
