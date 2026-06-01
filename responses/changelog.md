# Değişiklik Günlüğü / Change Log

> Geliştirme boyunca yapılan anlamlı değişiklikleri buraya kaydedin. Bir AI
> ajanı kullanıyorsanız, ajan bu günlüğü tutabilir. Her madde bir zaman
> damgası ve tek satırlık açıklama içermelidir.
>
> Record meaningful changes made during development here. If you use an AI
> agent, it can maintain this log. Each entry should include a timestamp and
> a one-line description.

---

- 2026-05-30 20:03:00 - Proje yapısı düzeltildi: backslash dosya isimleri doğru dizin yapısına dönüştürüldü
- 2026-05-30 20:04:00 - `lib/i18n.ts` oluşturuldu: tüm UI metinleri merkezi sözlüğe taşındı (TR/EN)
- 2026-05-30 20:05:00 - `app/page.tsx` güncellendi: inline STRINGS kaldırıldı, `lib/i18n.ts`'den import edildi
- 2026-05-30 20:05:15 - `@google/generative-ai` SDK kuruldu
- 2026-05-30 20:06:00 - `lib/rag.ts` oluşturuldu: keyword-based RAG modülü (sample-docs'tan arama)
- 2026-05-30 20:06:20 - `app/api/chat/route.ts` tamamen yeniden yazıldı: Gemini Flash entegrasyonu, system prompt, dil zorlaması, RAG, konuşma hafızası, loglama, hata yönetimi
- 2026-05-30 20:07:00 - Eski backslash dosyaları temizlendi
- 2026-05-30 20:07:40 - `globals.css` güncellendi: thinking animasyonu, fade-in efekti, hover/active geçişleri eklendi
- 2026-05-30 20:08:30 - TypeScript ve build testleri başarılı geçti (sıfır hata)
- 2026-05-30 20:27:00 - Gemini kota limitleri nedeniyle `groq-sdk` kuruldu, backend kodları baştan yazılarak LLM entegrasyonu Llama 3 8B modeline taşındı.
- 2026-05-30 20:29:00 - Llama 3 8B decommissioned hatası düzeltildi, model `llama-3.1-8b-instant` olarak değiştirildi.
- 2026-05-30 20:40:00 - System prompt dil hatası düzeltildi: RAG komutları İngilizce ve Türkçe olarak ayrıldı (language leak önlendi).
- 2026-05-30 22:21:00 - TypeScript temizliği: `route.ts` içerisindeki `as any` casting işlemi kaldırılarak spesifik model objesi tipi eklendi.
- 2026-05-30 23:21:00 - Model güncellendi (`llama-3.3-70b-versatile`), ve `README.md` karar günlüğü (Decision Log) dolduruldu, kurulum adımları detaylandırıldı.
- 2026-06-01 10:45:00 - `responses/answers.md` ve `responses/candidate-record.md` soruları röportajla sorularak yanıtlandı.
