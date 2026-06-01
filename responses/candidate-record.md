# Aday Kayıt Yapısı / Candidate Record

> Bu kısa kayıt, çalışmanı daha iyi anlamamıza yardımcı olur. Hızlıca
> doldurulacak şekilde tasarlandı; uzun yazmana gerek yok. Bir AI ajanı
> kullanıyorsan, sana sorup bu dosyayı doldurabilir. Cevaplar kendi
> sözlerinle olmalıdır.

---

## 1. Öz Değerlendirme / Self-assessment

- Mimari ve tasarım / Architecture and design: 4/5 - Temiz ve ölçeklenebilir bir Next.js Route + i18n + RAG mimarisi kurduğum için.
- Kod kalitesi / Code quality: 4/5 - Gereksiz karmaşıklıktan kaçındığım ve hata yakalamayı iyi kurduğum için.
- AI yönlendirme (prompt) / AI direction (prompting): 4/5 - Tech Lead gibi davranarak yapay zekayı bir Junior gibi etkili şekilde yönlendirdiğim için.
- Hata ayıklama / Debugging: 4/5 - Beklenmedik API kotalarını ve dil kaymalarını hızlı tespit edip çözebildiğim için.

## 2. Açıklayıcı Sorular ve Varsayımlar / Clarifying Questions and Assumptions

Uygulamanın şimdilik dev bir kullanıcı kitlesine ulaşmayacağını, bu nedenle Pinecone gibi ağır vektör veritabanlarına veya harici bir Express backend'ine şimdilik gerek olmadığını varsaydım. RAG için 4 dokümanın keyword (anahtar kelime) araması ile çözülebileceğini öngördüm.

## 3. Takıldığın Noktalar ve Çözümün / Blockers and How You Resolved Them

En çok sorunu Gemini API kota sorununda yaşadım. Google Generative AI sürekli `429 Limit:0` hatası döndü. Bir çözüme ulaşamayınca vakit kaybı olmaması adına hızlıca esnek davranıp model değişimi kararı verdim ve Llama 3 70B için Groq kullanmaya başladım. 

RAG katmanında ise herhangi bir zorluk yaşamadım. Önce embedding yapmayı düşündüm ancak sonrasında bunun elimizdeki doküman miktarının az olması nedeniyle aşırı mühendislik olacağına ve şimdilik ihtiyaç olmadığına karar verdim.

## 4. Zaman Dağılımı / Time Allocation

- Planlama / Planning: %30
- Kodlama (AI ile) / Coding with AI: %40
- Hata ayıklama / Debugging: %30
