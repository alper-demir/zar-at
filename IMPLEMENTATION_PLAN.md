# Uygulama planı ve kalite kapıları

Bu plan `v0.1.0` çalışan alpha tabanından `v1.0.0` mağaza sürümüne kadar uygulanacaktır. Bir faz; kodu, kabul kriterleri ve faz sonu kontrolleri tamamlanmadan bitmiş sayılmaz.

## Her fazda zorunlu çalışma düzeni

1. Çalışma `develop` üzerinden açılan kısa ömürlü `feature/*`, `fix/*` veya `polish/*` branch'inde yapılır.
2. Değişiklik küçük, anlamlı commit'lere ayrılır.
3. Fazın otomatik kontrolleri çalıştırılır.
4. Android emülatörde kabul senaryoları uygulanır; ANR, crash ve görünür hata kontrol edilir.
5. `AGENTS.md` ve `CHANGELOG.md` güncellenir.
6. Faz branch'leri `develop` içine alınır.
7. Fazın tamamı doğrulanınca `main` güncellenir ve sürüm etiketi oluşturulur.

## Ortak kalite kapısı

Her faz sonunda en az şu kontroller geçmelidir:

```text
npm run typecheck
npm run lint
npm run format:check
npx expo-doctor
fazda tanımlanan otomatik testler
Android emülatör smoke/regresyon testi
git diff --check
```

Kod değişen fazlarda ayrıca Android export veya ilgili development/preview build alınır. Emülatör testinde logcat üzerinden JavaScript hatası, native crash ve ANR kontrol edilir.

## Faz 1 — v0.2.0: Güvenilir temel

### Hedef

Mevcut çekirdek deneyimi donma, zamanlama ve yanıltıcı ayar sorunlarından arındırmak.

### İşler

- `fix/persistent-audio`: Ses player'larını component yaşam döngüsünde bir kez oluşturup tekrar kullanmak.
- `fix/roll-timing`: Tek/çift zar animasyonu, sonuç ve giriş kilidini aynı state machine üzerinden senkronlamak.
- `feature/entitlement-foundation`: `checking | free | premium` entitlement durumunu oluşturmak; mock ve gelecekteki Google Play adapter'ını ayırmak.
- `polish/core-ux`: Çift zar geçmişini `4 + 2 = 6` göstermek, sonuç duyurusu ve temel erişilebilirlik iyileştirmeleri.
- Otomatik test altyapısı ve çekirdek RNG/roll testleri.
- Doküman format uyarılarını temizlemek.

### Kabul kriterleri

- Ses açıkken art arda en az 50 tek/çift atışta ANR veya crash oluşmaz.
- Atış tamamlanmadan sonuç değişmez ve buton yeniden etkinleşmez.
- Ses kapalıyken hiçbir player tetiklenmez.
- Premium durumu kontrol edilirken kilitli içerik kısa süreliğine görünmez.
- Ücretsiz kullanıcı Premium görünümü store seviyesini atlayarak seçemez.

### Faz sonu testleri

- RNG sınır ve dağılım smoke testleri.
- Tek/çift roll state ve spam-tap testleri.
- Ses açık/kapalı regresyonu.
- Ayar kalıcılığı ve entitlement mock testleri.
- Android emülatörde 50 tekrarlı atış ve logcat ANR/crash taraması.

## Faz 2 — v0.3.0: Zar Atölyesi temeli

### Hedef

Premium değerinin çekirdeği olan kişiselleştirilebilir zar modelini kurmak.

### İşler

- `DiceAppearance` ve `TableAppearance` veri modelleri.
- Zar gövdesi ve pip rengi seçimi.
- Çift zar için ayrı görünüm seçimi.
- Mat, parlak ve neon başlangıç stilleri.
- Masa/arka plan seçimi.
- Persist edilen ayarlar için şema sürümü ve migration.
- Ücretsiz/Premium özellik matrisi.

### Kabul kriterleri

- Seçilen görünüm yeniden başlatma sonrasında korunur.
- Çift zar stilleri birbirinden bağımsızdır.
- Kilitli özellikler satın alma ekranını açar, ücretsiz ayarı bozmaz.
- Eski `v0.2.0` ayarları veri kaybı/crash olmadan yeni şemaya taşınır.
- Renk kombinasyonları pip okunabilirliğini kabul edilen kontrastın altına düşürmez.

### Faz sonu testleri

- Store migration ve kişiselleştirme testleri.
- Entitlement matrisi testleri.
- Küçük/orta/büyük Android ekranlarında görsel kontrol.
- Açık/koyu renk kombinasyonlarında okunabilirlik kontrolü.
- 50 atışlık performans regresyonu.

## Faz 3 — v0.4.0: Premium deneyim

### Hedef

Kişiselleştirmeyi tek seferlik ödeme için ikna edici, hissedilir bir pakete dönüştürmek.

### İşler

- Cam, mermer, ahşap gibi performans dostu zar stilleri.
- Ses ve haptik profilleri.
- Kritik sonuç hero efektleri.
- Ek masa temaları ve görünüm önizlemeleri.
- Premium ekranında özelliklerin canlı önizlemesi.
- Ses dosyalarının kaynak/lisans kayıtları.

### Kabul kriterleri

- Premium efektler temel atış performansını bozmaz.
- Efektler azaltılmış hareket tercihine saygı gösterir.
- Ses/haptik kapalıyken ilgili hiçbir efekt tetiklenmez.
- Ücretsiz deneyim reklamsız ve tam işlevsel kalır.

### Faz sonu testleri

- Her stil ve efekt kombinasyonu için smoke test.
- Kritik sonuçların kontrollü test modu ile doğrulanması.
- Düşük/orta segment Android profili üzerinde frame/ANR kontrolü.
- Ses odağı, sessiz mod ve arka plan/ön plan geçiş testi.

## Faz 4 — v0.5.0: Fonksiyonel polish

### Hedef

Uygulamayı günlük kullanımda daha doğal ve erişilebilir hale getirmek.

### İşler

- Shake-to-roll ve yanlışlıkla tetiklemeyi önleyen eşik/cooldown.
- Geçmiş temizleme ve geniş Premium geçmiş görünümü.
- Basit dağılım istatistikleri.
- Paylaşılabilir sonuç kartı; veri cihazdan sunucuya gönderilmez.
- Ekran okuyucu, büyük yazı ve reduced-motion desteği.

### Kabul kriterleri

- Shake-to-roll cebinde veya küçük hareketlerde yanlış tetiklenmez.
- Paylaşım iptal edildiğinde dosya/artık bırakılmaz.
- Büyük yazıda ana işlem ve sonuç görünür kalır.
- Screen reader tüm temel akışı anlaşılır sırada okuyabilir.

### Faz sonu testleri

- Sensör cooldown ve tekrar tetikleme testleri.
- Geçmiş/istatistik doğruluk testleri.
- TalkBack ve büyük font manuel testi.
- Uçak modu ve uygulama yaşam döngüsü regresyonu.

## Faz 5 — v0.9.0: Billing ve mağaza adayı

### Hedef

Backend/veritabanı kurmadan Google Play üzerinden tek seferlik Lifetime Premium'u güvenilir şekilde bağlamak.

### İşler

- Play Console'da `dice_premium_unlock` non-consumable ürünü.
- Client-only Google Play Billing adapter'ı.
- Satın alma, pending, acknowledge, restore ve refund sonrası entitlement kontrolü.
- Yerel entitlement cache'i; Google Play kaynak gerçekliği.
- İkon, splash, mağaza metinleri, ekran görüntüleri ve gizlilik URL'si.
- Data Safety ve kapalı test hazırlığı.

### Kabul kriterleri

- License tester ile satın alma ve restore çalışır.
- Pending satın alma Premium'u erken açmaz.
- Acknowledge edilmeyen satın alma bırakılmaz.
- Aynı Google hesabıyla yeniden kurulumda Premium geri gelir.
- Google Play sahiplik bildirmediğinde Premium kapanır ve ücretsiz fallback uygulanır.
- Uygulama içinde abonelik veya iptal ifadesi bulunmaz; tek seferlik ve otomatik yenilenmeyen ürün açıkça anlatılır.

### Faz sonu testleri

- Google Play license tester satın alma matrisi.
- Başarılı, iptal, pending, restore ve yeniden kurulum senaryoları.
- Çevrimdışı cache ve yeniden çevrimiçi doğrulama.
- Preview AAB/APK, kapalı test cihazları ve crash/ANR raporları.

## Faz 6 — v1.0.0: Yayın kapısı

### Hedef

Kapalı test geri bildirimleriyle doğrulanmış ilk production sürümünü hazırlamak.

### İşler

- Açık kritik/yüksek öncelikli hataların kapatılması.
- Son performans, erişilebilirlik ve cihaz uyumluluk turu.
- Sürüm notları, destek iletişimi ve mağaza beyanları.
- Production AAB ve kontrollü rollout.

### Kabul kriterleri

- Açık P0/P1 hata yoktur.
- Temel atış ve satın alma akışında bilinen ANR/crash yoktur.
- Tüm lisans, gizlilik ve mağaza içerikleri tamamdır.
- `main` temizdir ve `v1.0.0` etiketi doğrulanmış commit'i gösterir.

### Faz sonu testleri

- Tam regresyon matrisi.
- En az bir düşük ve bir güncel Android cihaz profili.
- Production imzalı build üzerinde satın alma smoke testi.
- Rollout öncesi Play Console uyarılarının tamamının incelenmesi.

## Faz raporu biçimi

Her faz sonunda kullanıcıya şu bilgiler raporlanır:

- Yapılan değişiklikler.
- Çalıştırılan kontroller ve sonuçları.
- Emülatör/cihaz test senaryoları.
- Bilinen eksikler ve ertelenen işler.
- Commit, merge ve sürüm etiketi.
- Sonraki fazın başlangıç noktası.
