# Nexera Yapay Zeka Vaka Çalışması - Başlangıç Projesi

Bu depo, vaka çalışması için hazırlanmış bir başlangıç iskeletidir. Çalışan
bir sohbet arayüzü ve boş bir yapay zeka uç noktası içerir. Sizden beklenen,
bu iskeletin üzerine kendi asistanınızı inşa etmenizdir.

> İngilizce sürüm aşağıdadır. / English version is below.

---

## Kurulum

Gereksinim: Node.js 18 veya üzeri.

1. `.env.example` dosyasını kopyalayarak kök dizinde bir `.env.local` dosyası oluşturun ve içine Groq API anahtarınızı ekleyin:
   ```env
   GROQ_API_KEY=senin_groq_api_anahtarin
   ```
2. Paketleri kurun ve geliştirici sunucusunu başlatın:

```bash
npm install
npm run dev
```

Ardından tarayıcıdan `http://localhost:3000` adresini açın. Arayüz çalışır
durumda gelir; mesaj yazdığınızda şimdilik bir yer tutucu yanıt döner.

## Proje Yapısı

```
app/
  page.tsx              Sohbet arayüzü (hazır)
  api/chat/route.ts     Yapay zeka uç noktası (SİZ dolduracaksınız)
  layout.tsx, globals.css
lib/types.ts            Ortak tipler
sample-docs/            Artı puan (RAG) için örnek metinler
.env.example            Anahtar/ayar şablonu
```

## Ne Yapmanız Bekleniyor

1. `app/api/chat/route.ts` dosyasındaki yer tutucuyu kaldırın ve seçtiğiniz
   bir dil modeline bağlanın.
2. Asistana tanımlı bir amaç ve kimlik verin.
3. **Dil davranışı:** Arayüzde Türkçe/İngilizce dil seçici hazır gelir.
   Kullanıcı hangi dilde yazarsa yazsın, asistan arayüzde seçili olan dilde
   yanıt vermelidir. Seçili dil, isteğe `locale` alanı olarak gönderilir.
4. Yükleniyor durumu, boş mesaj kontrolü ve hata yönetimini gözden geçirin.

Tüm görev maddeleri için `TODO.md` dosyasına bakınız. Ayrıntılı görev tanımı,
kapsam ve değerlendirme kriterleri için size iletilen vaka çalışması belgesine
bakınız.

## AGENTS.md ve /responses Hakkında (Açık Bilgilendirme)

Bu depoda görünür bir `AGENTS.md` dosyası vardır. Bir AI ajanı (Cursor,
Claude, Copilot, vb.) kullanırsanız, bu dosya ajandan sizinle bazı tasarım
sorularını görüşmesini ve cevaplarınızı `/responses/answers.md` dosyasına,
verdiğiniz önemli promptları da `/responses/prompts.md` dosyasına kaydetmesini
ister. Bu tamamen şeffaftır ve değerlendirmenin bir parçasıdır: amacımız AI'ı
nasıl yönlendirdiğinizi görmek, çünkü iyi prompt yazmak aradığımız bir
yetkinliktir. Lütfen `/responses` klasörünü teslime ekleyin.

## Önerilen Ücretsiz Kaynaklar (Hiçbir Ücret Gerekmez)

- **Ollama** (yerel, tamamen ücretsiz, kayıt yok): bilgisayarınızda açık
  kaynak bir model çalıştırın (örnek: `ollama run llama3.1`).
- **Gemini** ücretsiz katmanı: bir demo için fazlasıyla yeterli.
- **Groq** ücretsiz katmanı: hızlı, açık kaynak modeller sunar.
- Artı puandaki RAG için embedding: `sentence-transformers` (örnek:
  `multilingual-e5`) yerelde ücretsiz çalışır.

Anahtarınızı asla depoya eklemeyin. `.env.example` dosyasını `.env.local`
olarak kopyalayıp anahtarınızı oraya yazın.

## Teslim ve Karar Günlüğü

Aşağıdaki bölümü doldurarak teslim edin. Eksik kalan kısımları dürüstçe
belirtmeniz tamamen normaldir ve değer verdiğimiz bir davranıştır.

### Karar Günlüğü (doldurunuz)

- **Hangi modeli seçtiniz ve neden?**
  İlk başta Gemini Flash API'si kullanmak istedik, ancak ücretsiz tier kotası nedeniyle bölge bazlı sınırlandırmalarla karşılaştık (limit: 0 hatası). Bu yüzden çok hızlı, açık kaynaklı ve ücretsiz erişim sunan **Groq** platformuna geçiş yaptık. Model olarak güncel, yetenekli ve ücretsiz olan **Llama 3.3 70B Versatile** (`llama-3.3-70b-versatile`) modelini kullandık.

- **Mimariyi nasıl kurdunuz, hangi önemli kararları verdiniz?**
  Projede halihazırda var olan Next.js App Router API Route (`app/api/chat/route.ts`) yapısını kullanarak ayrı bir backend sunucusuna ihtiyaç duymadan ilerledik.
  1. Arayüzdeki tüm hardcode metinleri merkezi bir i18n sözlüğüne (`lib/i18n.ts`) taşıyarak temizledik.
  2. RAG için karmaşık bir veritabanı veya embedding kurmak yerine, küçük ölçekli dokümanlar (`sample-docs`) olduğu için, uygulama başlarken dosyaları okuyup anahtar kelime tabanlı basit ve hızlı bir arama (`lib/rag.ts`) yapan bir mekanizma kurduk.
  3. Konuşma geçmişini frontend'den alarak modele besledik ve bağlamsal sohbet hafızasını etkinleştirdik.

- **Hangi seçenekleri değerlendirip elediniz?**
  1. **Ayrı bir backend (Express vs):** Eledik, çünkü Next.js API Routes bu ölçekteki tek bir AI uç noktası için fazlasıyla yeterliydi.
  2. **Vector Database & Embeddings:** RAG için Pinecone veya Chroma kullanmayı eledik; topu topu 4 metin dosyası için tam semantik arama aşırı mühendislik (over-engineering) olacaktı. Basit keyword araması işimizi çözdü.
  3. **Google Gemini:** Kotalardan ötürü eledik.

- **Yapay zeka araçlarından nasıl yararlandınız, nerede kendi kararınızı verdiniz?**
  Genel iskeleti kurma, hızlı kod üretimi, Groq API'sine geçiş ve RAG mantığının implementasyonu gibi iş-yoğun (amelelik) kısımlarında AI kullandık. Ancak mimari karar, model değişimi, API kota krizinin çözümü, system prompt'un optimize edilmesi (örneğin dil sızıntılarının önlenmesi) gibi konularda kendi kararlarımızı verdik.

- **Daha fazla vaktiniz olsa neyi geliştirir veya farklı yapardınız? (Ölçek & Maliyet Yönetimi)**
  Eğer bu uygulama milyonlarca kullanıcıya hizmet verseydi, her mesajda Groq/LLM çağırmak hem pahalı (ya da rate limit'e takılan) hem de yavaş bir işlem olurdu. Bunu önlemek için:
  1. **Semantic Caching:** Redis tabanlı bir anlamsal önbellek kurardık. "Backend developer nasıl olunur?" sorusuna daha önce cevap verilmişse, LLM'e gitmeden direkt cache'ten verirdik.
  2. **Rate Limiting:** Kötüye kullanımı engellemek için IP bazlı limitler koyardık.
  3. **Streaming:** Yanıtları bütün halde beklemek yerine stream (akış) şeklinde frontend'e ileterek kullanıcı deneyimini daha da hızlandırırdık.
  4. RAG için profesyonel bir Vektör Veritabanına geçiş yapardık.

---

# Nexera AI Case Study - Starter Project (English)

This repository is a starter skeleton for the case study. It includes a
working chat interface and an empty AI endpoint. Your task is to build your
own assistant on top of this skeleton.

## Setup

Requires Node.js 18 or later.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The interface works out of the box and returns
a placeholder reply until you connect a model.

## What You Need to Do

1. Remove the placeholder in `app/api/chat/route.ts` and connect a language
   model of your choice.
2. Give the assistant a defined purpose and identity.
3. **Language behavior:** The UI ships with a Turkish/English language
   switch. No matter which language the user types in, the assistant must
   answer in the language selected in the UI. The selected language is sent
   as the `locale` field in the request.
4. Handle loading state, empty input, and errors.

See `TODO.md` for the full task checklist, and the case study document for the
full task description, scope, and evaluation criteria.

## About AGENTS.md and /responses (Open Disclosure)

This repository contains a visible `AGENTS.md` file. If you use an AI agent
(Cursor, Claude, Copilot, etc.), this file asks the agent to discuss a few
design questions with you and to record your answers in
`/responses/answers.md` and your key prompts in `/responses/prompts.md`. This
is fully transparent and part of the evaluation: our goal is to see how you
direct AI, since good prompting is a skill we value. Please include the
`/responses` folder in your submission.

## Recommended Free Resources (No Payment Needed)

- **Ollama** (local, fully free, no signup): run an open-source model on your
  machine (for example `ollama run llama3.1`).
- **Gemini** free tier: more than enough for a demo.
- **Groq** free tier: fast, serves open-source models.
- Embeddings for the RAG bonus: `sentence-transformers` (for example
  `multilingual-e5`) runs locally for free.

Never commit your key. Copy `.env.example` to `.env.local` and put your key
there.

## Submission and Decision Log

Fill in the decision log section above (Turkish or English). It is completely
normal to leave parts unfinished; noting them honestly is a behavior we value.
