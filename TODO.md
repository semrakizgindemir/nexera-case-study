# Yapılacaklar Listesi / To-Do List

> Türkçe önce, İngilizce aşağıda. / Turkish first, English below.

---

## Türkçe

### Temel (zorunlu)
- [ ] `app/api/chat/route.ts` içindeki yer tutucuyu kaldırın ve seçtiğiniz bir dil modeline bağlanın.
- [ ] Asistana tanımlı bir amaç ve kimlik verin.
- [ ] Yükleniyor durumu, boş mesaj kontrolü ve hata yönetimini gözden geçirin.
- [ ] README dosyasındaki karar günlüğünü doldurun.

### Teknik Çerçeve (zorunlu)
- [ ] **i18n:** Tüm arayüz metinleri bir dil sözlüğünden gelmeli; koda gömülmemeli (hardcode yok).
- [ ] **Karakter seti:** Türkçe metinler tam aksanlı ve UTF-8 olmalı. ASCII Türkçe (ş, ç, ğ, ü, ö, ı yerine s, c, g, u, o, i) kullanılmamalı.
- [ ] **Dil davranışı:** Kullanıcı hangi dilde yazarsa yazsın, asistan arayüzde seçili olan dilde yanıt vermeli (yanıt dili = arayüz dili). Arayüz dili istek gövdesinde `locale` olarak gelir; system prompt ile zorlanmalı.
- [ ] **Loglama:** Asistan iç adımlarını kullanıcıya GÖSTERMEMELİ (kullanıcı yalnızca temiz yanıtı görür). Sistem tarafında (sunucu logu) hangi modeli çağırdığını ve attığı adımları kaydetmeli; bu kayıtları kullanıcı görmez, değerlendirmede biz inceleriz.

### Artı puan (zorunlu değil)
- [ ] Belgeye dayalı yanıt (RAG): `sample-docs/` içindeki metinlere dayanarak cevap verin, uydurmayın.
- [ ] Konuşma hafızası: önceki mesajları dikkate alın.
- [ ] Maliyet bilinci: milyonlarca kullanıcıda her mesajda modeli çağırmamak için fikrinizi README'de anlatın.

### Teslim
- [ ] Çalışan bir kod deposu (kurulum adımları net).
- [ ] Doldurulmuş karar günlüğü.
- [ ] `AGENTS.md` doğrultusunda doldurulmuş `/responses` klasörü: cevaplar (zaman damgası + geçen süre dahil), prompt günlüğü (`prompts.md`), değişiklik günlüğü (`changelog.md`) ve aday kaydı (`candidate-record.md`).
- [ ] Kısa bir sunum hazırlığı.

---

## English

### Core (required)
- [ ] Remove the placeholder in `app/api/chat/route.ts` and connect a language model of your choice.
- [ ] Give the assistant a defined purpose and identity.
- [ ] Handle loading state, empty input, and errors.
- [ ] Fill in the decision log in the README.

### Technical Frame (required)
- [ ] **i18n:** All UI strings must come from a locale dictionary; no hardcoded text.
- [ ] **Charset:** Turkish text must be properly accented UTF-8. No ASCII-substituted Turkish.
- [ ] **Language behavior:** No matter which language the user types in, the assistant must answer in the language selected in the UI (response language = UI language). The UI language arrives as `locale` in the request body and must be enforced via the system prompt.
- [ ] **Logging:** The assistant must NOT show its internal steps to the user (the user sees only a clean answer). On the system side (server logs), record which model it called and the steps it took; the user never sees these logs, we review them during evaluation.

### Bonus (optional)
- [ ] Grounded answers (RAG): answer based on the texts in `sample-docs/`, do not make things up.
- [ ] Conversation memory: take previous messages into account.
- [ ] Cost awareness: explain in the README how you would avoid calling the model on every message at scale.

### Submission
- [ ] A working repository (with clear setup steps).
- [ ] A completed decision log.
- [ ] A `/responses` folder filled in per `AGENTS.md`: answers (including timestamp + elapsed time), prompt log (`prompts.md`), change log (`changelog.md`), and candidate record (`candidate-record.md`).
- [ ] A short presentation prepared.
