# AGENTS.md — "Zar" (Dice Roller) Mobil Uygulaması

## Kullanım kuralı

Bu dosyayı her görevden önce oku. Mimari kararlara, klasör yapısına ve isimlendirmelere uy. Büyük mimari kararları (ör. fizik motoru veya IAP sağlayıcısı değişikliği) kullanıcıya sormadan değiştirme. Belirsiz varsayımları Bölüm 11'e yaz. Her oturum sonunda Bölüm 10'u güncelle.

## 1. Ürün özeti

Tek amaçlı, reklamsız bir mobil uygulama: kullanıcı tek dokunuşla 1 veya 2 standart 6 yüzlü zar atar. V1'de yalnızca D6, tek/çift zar modu vardır; RPG zar setleri, 3+ zar, çoklu oyuncu, hesap sistemi, online senkronizasyon ve reklam yoktur. Farkımız yüksek kaliteli animasyon/ses/his ve tek seferlik premium modelidir.

## 2. Platform ve teknoloji

- React Native + Expo managed workflow + EAS Build; Expo'nun güncel stabil sürümünü kullan.
- TypeScript strict; ilk hedef Android, kod platform bağımsız kalmalı.
- Tek ekran yeterli; gerekirse hafif modal/bottom-sheet.
- Zustand state yönetimi.
- Reanimated 3+ animasyon; Skia görsel efektler için.
- Expo'nun güncel önerisiyle uyumlu ses API'si ve `expo-haptics`.
- IAP non-consumable tek seferlik ürün olarak soyutlanmalı ve mock'lanabilir olmalı.
- Yerel ayarlar için SecureStore veya AsyncStorage; satın alma durumu yalnızca yerelde tutulmamalı.

## 3. Animasyon ve adalet kararı

V1'de gerçek 3D fizik motoru kullanılmayacak. Stilize sahte-3D yaklaşım: Reanimated perspective/rotateX/Y/Z, üç fazlı wind-up/flight/settle, küçük bounce ve screen shake. Skia ile dinamik gölge kullanılacak. Rastgelelik Faz 1'den itibaren kriptografik RNG (`expo-crypto` `getRandomBytesAsync`) ile yapılacak. Çift zar staggered oynayacak. Gerçek fizik için `expo-gl` + R3F/Rapier yolu yalnızca v2 değerlendirmesidir.

## 4. Ekran akışı

Ana ekranda ortada zar/zarlar, üstte tek/çift modu, zar veya büyük butonla atış, atış sırasında kilit, sonuç ve çift zarda toplam bulunur. Ayarlar küçük modal/bottom-sheet olabilir; ses/haptik, tema, premium satın alma/restore ve gizlilik/kumar değildir ibaresi içerir.

## 5. Monetizasyon

Karar: uygulama ücretsiz temel sürüm + tek seferlik, non-consumable "Lifetime Premium" kilidiyle sunulacak. Abonelik kullanılmayacak. Ücretsiz sürüm tam temel işlev + 1 tema içerir ve reklamsızdır. Premium; ek temalar, gelişmiş kritik sonuç efektleri ve opsiyonel geçmiş/istatistik açar. Ürün ID placeholder: `dice_premium_unlock`.

Ürün yönü "kişisel zar deneyimi" olarak netleştirildi. Premium değeri temel zar atma işlevini kısıtlamak yerine kullanıcının kendi zarını ve masasını oluşturmasına dayanacak: özel renk paletleri, iki zar için ayrı stiller, masa/arka plan temaları, ses-haptik profilleri, atış efektleri ve kaydedilebilir görünüm presetleri. Hesap veya bulut zorunluluğu olmayacak; kişiselleştirme cihazda saklanacak.

Uygulama ayarları, presetler, geçmiş ve kişiselleştirme verileri için özel backend/bulut kurulmayacak. Satın alma doğrulama ve geri yükleme işlemleri mağaza altyapısı üzerinden yürütülecek; bu karar uygulama verisini buluta taşıma gerektirmez.

## 6. Klasör yapısı

```text
/app veya /src
  /components/dice -> Dice3D.tsx, DiceShadow.tsx, DicePair.tsx
  /components/ui -> Button.tsx, SettingsSheet.tsx, ThemePicker.tsx
  /hooks -> useDiceRoll.ts, usePurchase.ts, useSettings.ts
  /store -> settingsStore.ts
  /assets/sounds
  /assets/themes
  /lib -> rng.ts, haptics.ts, sounds.ts
  App.tsx
AGENTS.md
```

## 7. Kod standartları

Fonksiyonel bileşenler/hooks; class component ve gereksiz `any` yok. Reanimated UI thread'de çalışmalı. Yeni bağımlılıkların Expo managed uyumluluğunu kontrol et. Android düşük/orta segmentte 60 FPS hedefle. Her faz sonunda bu dosyayı güncelle.

## 8. Mağaza ve yasal notlar

Uygulama kumar/bahis değildir ve gerçek para içermez ibaresi bulunmalı. Veri toplama minimum tutulmalı; gizlilik politikası hazırlanmalı. Reklam ve üçüncü taraf veri paylaşımı yoktur.

## 9. Yol haritası

Detaylı uygulama sırası, kabul kriterleri ve faz sonu test kapıları `IMPLEMENTATION_PLAN.md` dosyasında tutulur.

0. `v0.1.0` — Çalışan alpha temel (tamamlandı).
1. `v0.2.0` — Güvenilir ses, zamanlama, entitlement temeli ve test altyapısı.
2. `v0.3.0` — Zar Atölyesi, kişiselleştirme modeli ve yerel presetler.
3. `v0.4.0` — Premium malzemeler, ses/haptik profilleri ve hero efektleri.
4. `v0.5.0` — Shake-to-roll, geçmiş/istatistik, paylaşım ve erişilebilirlik.
5. `v0.9.0` — Client-only Play Billing ve mağaza adayı.
6. `v1.0.0` — Kapalı test sonrası production yayın kapısı.

Her faz kendi otomatik kontrolleri ve Android emülatör/cihaz kabul testleri geçmeden tamamlanmış sayılmaz, `main` branch'ine alınmaz ve sürüm etiketi oluşturulmaz.

## 10. İlerleme Günlüğü

> Format: `[Tarih] Faz X — Ne yapıldı / hangi kararlar alındı / sıradaki adım`

- [2026-09-21] Faz 0 — Expo SDK 57 + TypeScript managed workflow iskeleti kuruldu; `zustand`, ESLint ve Prettier eklendi. Tek ekran ve çalışan placeholder `Zar At` butonu oluşturuldu.
- [2026-09-21] Faz 1–2 — `expo-crypto` ile bias azaltılmış kriptografik D6 RNG, atış state machine'i, Reanimated 3D dönüş/uçuş/iniş animasyonu, staggered zar hareketi, haptik geri bildirim, screen shake ve Skia gölgesi eklendi. Sonuç yalnızca animasyon tamamlanınca kesinleşiyor.
- [2026-09-21] Faz 3 — Tek/çift zar modu, toplam sonucu, son 5 atış geçmişi ve dört temalı tema sistemi eklendi. Ücretsiz tema `classic`; premium temalar kilitli.
- [2026-09-21] Faz 4 — AsyncStorage ile ayar kalıcılığı, ses/haptik anahtarları, ayarlar bottom-sheet'i, premium/restore UI'sı ve `dice_premium_unlock` için mock'lanabilir satın alma sınırı eklendi. Production Play Billing bağlantısı Play Console ürünü hazır olduğunda `usePurchase.ts` içine bağlanmalı.
- [2026-09-21] Faz 5 — Android paket adı/sürüm bilgisi, `eas.json`, gizlilik politikası ve Play Store kontrol listesi eklendi. Bir sonraki adım gerçek cihazda preview APK testi, ses kayıtlarının eklenmesi ve Play Console/IAP production adapter bağlantısıdır.
- [2026-09-21] Ses entegrasyonu — Kullanıcının sağladığı `arrow-whoosh.wav`, `dice-rolling.mp3`, `impact.wav` ve `sparkle.wav` dosyaları `src/assets/sounds` altına alındı. `expo-audio` ile atış başlangıcı, iniş ve kritik sonuç sesleri bağlandı; Android export dört ses varlığını başarıyla paketledi. Bu dosyaların kaynak/lisans kayıtları yayın öncesi doğrulanmalı.
- [2026-09-21] Kapsam kararı — Billing, mağaza yayını, fiyatlandırma ve yayın hazırlığı son aşamaya bırakıldı. Mevcut oturumda öncelik yalnızca cihaz üzerinde çekirdek fonksiyonelliği test etmek; Expo LAN geliştirme sunucusu çalıştırıldı.
- [2026-09-21] Performans düzeltmesi — Emülatördeki Expo Go ANR'si için ekran sarsıntısındaki yanlış Reanimated `modify` çağrısı `set` ile değiştirildi; çift eksenli 3D dönüş tek eksenli daha hafif dönüşe indirildi; aynı anda iki ses oynatıcı başlatılması kaldırıldı. TypeScript/lint kontrolleri geçti ve emülatör hot-reload edildi. Kullanıcı dokunma testi ile doğrulama bekleniyor.
- [2026-09-21] Emülatör ANR teşhisi — Tek/çift zar animasyonları yerel gölgeyle emülatörde başarıyla test edildi. `expo-audio` ile her atışta dinamik player oluşturma, Expo Go Android'de ANR üretiyor; ses tetikleme geçici olarak devre dışı bırakıldı. Bir sonraki ses çalışmasında player'lar mount sırasında kalıcı oluşturulup gerçek cihaz/dev build üzerinde test edilmeli.
- [2026-09-21] Görsel polish — Header/alt başlık, sonuç kartı, geçmiş chip'leri, safe-area kullanımı, buton gölgesi ve zarın pip tabanlı yüz tasarımı iyileştirildi. Reanimated animasyonu hafif tutuldu ve native gölge fallback'i korundu. TypeScript, ESLint, Prettier kontrolleri geçti; emülatörde tekli ve çiftli atış görsel olarak doğrulandı. Sıradaki adım: ANR oluşturmayan kalıcı ses player mimarisiyle ses efektlerini geri eklemek.
- [2026-09-21] Sürümleme ve ürün yönü — Çalışan uygulama `0.1.0` alpha sürümü olarak tanımlandı; `main` kararlı sürümler, `develop` entegrasyon, `feature/*` kısa ömürlü geliştirme branch'leri olacak. Premium değer önerisi "kişisel zar deneyimi" olarak netleştirildi ve `PRODUCT_STRATEGY.md` içinde sürüm yol haritasına bağlandı. Sıradaki adım: `v0.2.0` için güvenli ses katmanı ve temel fonksiyonel polish.
- [2026-09-21] Monetizasyon kararı — Abonelik ve uygulama verisi için özel bulut/backend kapsam dışı bırakıldı. Ücretsiz temel deneyim + tek seferlik non-consumable `Lifetime Premium` modeli kesinleştirildi; geri yükleme Google Play hesabı üzerinden yapılacak. Sıradaki adım değişmedi: `v0.2.0` güvenli ses ve fonksiyonel polish.
- [2026-09-21] Faz ve kalite planı — `v0.2.0`–`v1.0.0` işleri, kabul kriterleri, branch düzeni ve faz sonu test kapıları `IMPLEMENTATION_PLAN.md` içinde tanımlandı. Her faz otomatik kontroller ve Android emülatör/cihaz regresyonu geçmeden sürümlenmeyecek. Sıradaki başlangıç: `fix/persistent-audio`.
- [2026-09-21] v0.2.0 ses stabilizasyonu — Atış başına dinamik `expo-audio` player oluşturma kaldırıldı; dört asset uygulama yaşam döngüsünde kalıcı player olarak hazırlanıyor ve ses anahtarı gerçek tetiklemeyi kontrol ediyor. Expo Go Android emülatöründe ses açıkken tek zar 25 + çift zar en az 25 tekrar atış yapıldı; ANR, native crash ve React hatası görülmedi. Sıradaki adım: çift zar animasyon/sonuç zamanlamasını senkronlamak.
- [2026-09-21] v0.2.0 çekirdek ilerleme — Çift zar gecikmesi ortak animasyon süresine bağlandı ve ref tabanlı kilit spam-tap yarışını engelliyor. `checking | free | premium` entitlement katmanı eklendi; ücretsiz kullanıcı Premium tema seçerse klasik temaya güvenli fallback uygulanıyor. TypeScript, ESLint, Prettier ve Expo Doctor geçti. Fazı kapatmak için otomatik test altyapısı, geçmiş/erişilebilirlik polish'i ve final emülatör regresyonu kaldı.
- [2026-09-21] v0.2.0 kalite turu — Jest/`jest-expo` test altyapısı eklendi; RNG sınırları, animasyon süresi, entitlement tema korumaları ve sonuç sunumu için 9 otomatik test yazıldı. Çift zar geçmişi `4 + 2 = 6` formatına alındı; sonuç kartı Android erişilebilirlik duyurusu ve `polite` canlı bölge desteği kazandı. Emülatörde 50 tekli atış sonrası ANR/crash/React/audio log hatası görülmedi; çiftli atışta toplam ve geçmiş formatı doğrulandı. Ayarlar fiziksel toggle testi Expo Go araç overlay'i nedeniyle ertelendi. Sıradaki adım: kalite kapısını tamamlayıp `develop` üzerinde v0.2.0 temelini etiketlemek, sonra v0.3 Zar Atölyesi modellerine geçmek.
- [2026-09-21] Oturum kapanışı — `test/v020-core`, `develop` içine `97a035b` merge commit'iyle alındı. Otomatik kalite kapısı ve emülatör 50-atış regresyonu geçti; `v0.2.0` etiketi yalnızca Expo Go overlay'i nedeniyle manuel ses aç/kapat kabul testi kaldığı için henüz oluşturulmadı. Bir sonraki oturumda temiz bir dev build/Expo Go ekranında ses toggle'ı kontrol edilip etiketleme kararı verilecek; ardından v0.3 Zar Atölyesi veri modelleri ve yerel preset akışına başlanacak.
- [2026-09-21] Faz 2 başlangıcı — `feature/dice-workshop` üzerinde `DiceAppearance`, `TableAppearance` ve `DicePreset` modelleri eklendi. Ayar store'u şema v2 migration, yerel preset CRUD'u ve iki zar için bağımsız görünüm saklamayı destekliyor. Ayarlar içine Zar Atölyesi; gövde/pip rengi, mat/parlak/neon yüzey, Zar 1/Zar 2 ayrımı ve preset kaydetme/uygulama/silme akışları eklendi. Premium seçenekler ücretsiz kullanıcıda kilitli kalıyor ve satın alma akışına yönleniyor. TypeScript, lint, format, 10 Jest testi ve Expo Doctor 21/21 geçti; emülatörde hot-reload sonrası atış sonucu görünür ve runtime hata yok. Sıradaki adım: ayarlar ekranını overlay olmayan dev build'de manuel kabul testi, migration/preset kalıcılığı testi ve faz merge kararı.

## 11. Açık kararlar / varsayımlar

- V1 görsel yönü minimal/modern flat + gradient/glow; gerçekçi dokular premiumda değerlendirilecek.
- Uygulama adı/marka kimliği netleşene kadar placeholder `Zar`.
- Koyu tonlu, hafif gradient arka plan; zar öne çıkacak.
- Ücretsiz temel sürüm + tek seferlik Lifetime Premium kararı kesinleşti. Abonelik ve uygulama verileri için özel bulut/backend kullanılmayacak.
