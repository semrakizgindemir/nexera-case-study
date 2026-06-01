# Cevaplar / Answers

> Bu dosyayı, AGENTS.md içindeki sorulara verdiğiniz cevaplarla doldurun.
> Bir AI ajanı kullanıyorsanız, ajan bu dosyayı sizin cevaplarınızla
> doldurabilir. Cevaplar sizin kendi sözlerinizle olmalıdır.
>
> Her cevap için ajan zaman bilgisini de kaydeder: soru ne zaman soruldu,
> cevap ne zaman geldi ve aradaki geçen süre. Bu yaklaşık bir ölçümdür.

---

1. **Mimari / Architecture:**
   - Soruldu / Asked: 2026-05-30 17:00:00
   - Cevaplandı / Answered: 2026-05-30 17:05:00
   - Geçen süre / Elapsed: ~5m 00s
   "Next.js API route'unu seçtim çünkü iskelet zaten Next.js üzerine kurulu ve ayrı bir backend eklemek bu ölçekte gereksiz karmaşıklık yaratırdı."

2. **Model / sağlayıcı, maliyet, gecikme / Model, provider, cost, latency:**
   - Soruldu / Asked: 2026-05-30 17:00:00
   - Cevaplandı / Answered: 2026-05-30 17:03:00
   - Geçen süre / Elapsed: ~3m 00s
   "İlk başta gemini flash modelini seçeceğimi belirttim çünkü önceki deneyimlerimde gemini, llama ve groq api kullandım, en iyi sonuçları gemini ile elde ettim (hızlı ve kaliteli cümleler). Ancak ücretsiz kotaya takılınca daha hızlı ve tamamen açık kaynak/ücretsiz olan Groq (Llama 3.3 70B) modeline geçtik."

3. **i18n yapısı / i18n structure:**
   - Soruldu / Asked: 2026-06-01 10:20:49
   - Cevaplandı / Answered: 2026-06-01 10:23:20
   - Geçen süre / Elapsed: 2m 31s
   "Tüm UI metinlerini lib/i18n.ts dosyasında merkezi bir sözlükte topladım. getStrings fonksiyonu ile locale'e göre doğru metinleri çekiyorum. 2 dil ve az sayıda string için büyük bir kütüphaneye gerek duymadım. TypeScript sözlük yapısı şu anlık ihtiyaçları karşılıyor. Proje büyüseydi next-intl'e geçebilirdim."

4. **Yanıt dili zorlaması, system prompt / Response language enforcement, system prompt:**
   - Soruldu / Asked: 2026-06-01 10:23:30
   - Cevaplandı / Answered: 2026-06-01 10:25:09
   - Geçen süre / Elapsed: 1m 39s
   "Frontend'den locale parametresi gönderdim, backend'de buna göre TR veya EN system prompt seçtim. Sonrasında keskin bir prompt ile destekledim, System prompt'a 'kullanıcı hangi dilde yazarsa yazsın Türkçe yanıt ver' yazdım. Dil kararı kullanıcının inputuna değil, UI seçimine bağlı."

5. **Türkçe karakter (UTF-8) / Turkish characters (UTF-8):**
   - Soruldu / Asked: 2026-06-01 10:25:30
   - Cevaplandı / Answered: 2026-06-01 10:28:30
   - Geçen süre / Elapsed: 3m 00s
   "System prompt'a Türkçe karakterleri açıkça listeleyip ASCII ikamesi kullanma kuralı koydum. UI metinleri i18n sözlüğünden geliyor, hardcode yok. Next.js zaten UTF-8 kullanıyor. Model olarak llama 70B gibi türkçe metinler konusunda başarılı bir model seçmek -az parametreli modellere gore- de bu riski azalttı."

6. **Hata yönetimi ve uç durumlar / Error handling and edge cases:**
   - Soruldu / Asked: 2026-06-01 10:28:45
   - Cevaplandı / Answered: 2026-06-01 10:30:10
   - Geçen süre / Elapsed: 1m 25s
   "Backend'de 4 ayrı katmanda hata yakaladım: parse hatası, boş mesaj, eksik API key, model hatası. Her birinde kullanıcıya locale'e uygun temiz mesaj döndüm, iç hata detayı göstermedim. Frontend'de loading state finally bloğunda kapatılıyor."

7. **API anahtarı / gizli bilgi yönetimi / API key and secret management:**
   - Soruldu / Asked: 2026-06-01 10:31:30
   - Cevaplandı / Answered: 2026-06-01 10:34:45
   - Geçen süre / Elapsed: 3m 15s
   "Anahtar .env.local'da, .gitignore'a ekli. Sunucu tarafında process.env ile okunuyor, frontend'e ulaşmıyor. Bir yere deploy edecek olsam şifreli saklama gibi yontemler deneyebilirdim."

8. **Ölçekte maliyet / Cost at scale:**
   - Soruldu / Asked: 2026-06-01 10:35:00
   - Cevaplandı / Answered: 2026-06-01 10:41:32
   - Geçen süre / Elapsed: 6m 32s
   "Semantic caching ile tekrar eden sorularda modeli çağırmayı engellerim. Rate limiting ile kullanıcı başına istek sınırı koyarım. Konuşma geçmişini kırparım, token maliyetini düşürürüm. Basit sorular için küçük model kullanırım. Rag mimarisini geliştirerek embedding tabanlı aramalar ile dökümanlar içerisinde arama yerine vektörel benzerliğe bakılır böylece tüm dokümanlar yerine sadece ilgili chunk'lar modele gönderilir, gereksiz token tüketimi azalır."

9. **Kendi katkınız vs AI / Your work vs AI:**
   - Soruldu / Asked: 2026-06-01 10:41:45
   - Cevaplandı / Answered: 2026-06-01 10:43:10
   - Geçen süre / Elapsed: 1m 25s
   "Mimari kararları ve model seçimini ben yaptım. Başlangıç promptunu ben yazdım, adım adım onaylayarak ve inceleyerek ilerledim. Kod büyük ölçüde Antigravity tarafından yazıldı, ben review edip yönlendirdim. Gemini'den Groq'a geçiş kararını ben aldım, sorunu ben tespit ettim."

10. **Ödünleşmeler ve daha fazla vakit / Trade-offs and with more time:**
    - Soruldu / Asked: 2026-06-01 10:43:30
    - Cevaplandı / Answered: 2026-06-01 10:45:27
    - Geçen süre / Elapsed: 1m 57s
    "Zaman kısıtı ve şu anda elimizde bununan dökümanların az olması nedeniyle embedding yerine keyword search tercih ettim. Test yazmadım. Token kırpma eklemedim. Daha fazla vaktim olsa embedding tabanlı RAG, semantic caching ve konuşma geçmişi yönetimi eklerdim."
