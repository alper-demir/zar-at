# Zar At — Mağaza ve Yayın Rehberi

Bu belge, `Zar At` uygulamasını Google Play'e hazırlamak, listelemeyi doldurmak,
ilk sürümü yayınlamak ve sonraki sürümleri güncellemek için kullanılacak çalışma
rehberidir. Play Console arayüzü veya Google politikaları değişebileceği için
yayın anında Console'un gösterdiği zorunlu alanlar esas alınmalıdır.

## 1. Mevcut durum

| Konu | Durum |
| --- | --- |
| Paket adı | `com.zarat.app` sabit |
| Uygulama adı | Türkçe `Zar At`; mağaza İngilizce adı `Roll Dice` olarak yerelleştirilebilir |
| Temel uygulama | Hazır ve gerçek cihazda test edildi |
| Türkçe/İngilizce uygulama içi dil | Hazır; otomatik + Ayarlar'dan manuel seçim |
| Preview APK | Hazır; A52 güncelleme kurulumu test edildi |
| Production AAB | Henüz alınmadı |
| Play Console hesabı | Doğrulama bekliyor |
| Premium kodu | Hazır; gerçek Play ürünüyle test bekliyor |
| Play one-time product | `dice_premium_unlock` henüz Console'da oluşturulmalı |
| Gizlilik politikası | `docs/privacy-policy.html` taslağı hazır; herkese açık HTTPS URL'ye taşınmalı |
| Data Safety | Taslak hazır; son release ve SDK davranışına göre Console'da doldurulmalı |
| Mağaza ekran görüntüleri | Emülatörden adaylar alındı; Expo/debug overlay olmadan son set hazırlanmalı |
| Ses lisansı | `SOUND_LICENSES.md` içindeki eksik Envato item/lisans bilgileri tamamlanmalı |

## 2. Ürün ve politika çerçevesi

Uygulama sanal D6 zar atar; gerçek para, bahis, kumar, ödül veya şans oyunu
ödülü içermez. Mağaza metinlerinde şu çerçeve korunmalıdır:

- Reklamsız, hesap gerektirmeyen ve çevrimdışı kullanılabilen temel deneyim.
- Tek veya çift standart D6.
- Sonuçların cihazda üretilmesi; uygulama hesabı ve özel backend yoktur.
- Premium, tek seferlik non-consumable kişiselleştirme kilididir; abonelik değildir.
- Premium'un iptal edilemeyen bir abonelik gibi tanıtılmaması gerekir. Satın alma,
  Google Play'in normal iade ve tüketici kurallarına tabidir.
- “Kazan”, “para ödülü”, “bahis”, “casino”, “şansını paraya çevir” gibi ifadeler
  kullanılmamalıdır.
- “Adil” veya “garantili rastgelelik” gibi ispat gerektiren iddialar yerine
  “güvenilir sanal D6 deneyimi” gibi ölçülü ifadeler kullanılmalıdır.

## 3. Hazır mağaza metinleri

### Türkçe

**Uygulama adı:** `Zar At`

**Kısa açıklama:**

> Kişiselleştirilebilir, reklamsız tek veya çift zar deneyimi.

**Uzun açıklama:**

> Zar At, hızlı kararlar, masa oyunları ve masaüstü RPG hazırlıkları için sade ve
> keyifli bir sanal zar uygulamasıdır.
>
> Tek veya çift standart D6 atın; akıcı animasyonu, sesleri ve haptik geri bildirimi
> kendi tercihlerinize göre ayarlayın.
>
> Öne çıkanlar:
> - Tek zar ve çift zar modu
> - Stilize 3D atış animasyonu
> - Ses, haptik ve azaltılmış hareket seçenekleri
> - Telefonu sallayarak zar atma
> - Zar gövdesi ve pip renklerini kişiselleştirme
> - Tema, malzeme ve ses/his profilleri
> - Cihazda saklanan atış geçmişi ve temel istatistikler
> - Reklam, hesap ve özel bulut senkronizasyonu yok
>
> Zar At gerçek para, bahis veya kumar içermez. Tüm sonuçlar sanal D6 zarlarıyla
> üretilir.
>
> Ücretsiz sürüm temel zar deneyimini sunar. Tek seferlik Zar Premium satın alımı;
> ek temalar, kişiselleştirme seçenekleri ve gelişmiş efektlerin kilidini açar.
> Uygulama verileri cihazınızda tutulur; özel bir hesap oluşturmanız gerekmez.

### English

**App name:** `Roll Dice`

**Short description:**

> A customizable, ad-free one- or two-dice rolling experience.

**Full description:**

> Roll Dice is a simple and satisfying virtual dice roller for quick decisions,
> board games, and tabletop RPG preparation.
>
> Roll one or two standard D6 dice and tune the experience with smooth animation,
> sound, and haptic feedback.
>
> Features:
> - Single-die and two-dice modes
> - Stylized 3D rolling animation
> - Sound, haptics, and reduced-motion options
> - Shake-to-roll
> - Custom die body and pip colors
> - Themes, materials, and sound/feel profiles
> - On-device roll history and simple statistics
> - No ads, account, or private cloud sync
>
> Roll Dice is not a gambling or betting app. It contains no real-money play or
> rewards; it generates virtual D6 results only.
>
> The free version includes the complete basic dice experience. A one-time Dice
> Premium purchase unlocks additional themes, customization options, and advanced
> effects. App settings and history stay on the device.

## 4. Premium ürün metni

Play Console one-time product:

- **Product ID:** `dice_premium_unlock`
- **Product name:** `Zar Premium` / `Dice Premium`
- **Type:** One-time product, non-consumable
- **Description (TR):** Ek temalar, kişiselleştirme seçenekleri ve gelişmiş efektler.
- **Description (EN):** Extra themes, customization options, and advanced effects.

Ürün oluşturulduktan sonra aktif edilmesi ve gerçek uygulama paketiyle Internal
Testing üzerinden test edilmesi gerekir. Preview APK'da “failed to query product”
görülmesi, ürün Console'da henüz bulunmadığı sürece beklenebilir.

## 5. Play Console doldurma sırası

1. Geliştirici hesabı doğrulamasını tamamla.
2. Play Console'da `Zar At` uygulamasını oluştur ve paket adını
   `com.zarat.app` olarak koru.
3. Mağaza adını, kısa/uzun açıklamayı ve Türkçe/İngilizce yerelleştirmeleri gir.
4. Uygulama ikonu, feature graphic ve ekran görüntülerini ekle.
5. İçerik derecelendirme anketini gerçek uygulama davranışına göre doldur.
6. Hedef kitle ve içerik beyanlarını doldur; kumar/bahis içermediğini doğru şekilde belirt.
7. Data Safety formunu `DATA_SAFETY_DRAFT.md` ve final release davranışına göre doldur.
8. `docs/privacy-policy.html` dosyasını herkese açık HTTPS URL'de yayınla ve URL'yi
   Console'a gir.
9. `dice_premium_unlock` one-time ürününü oluştur, fiyatlandır ve aktif et.
10. Google hesabını license tester olarak ekle.
11. Production profiliyle AAB alıp önce Internal Testing kanalına yükle.
12. Uygulamayı Google Play Internal Testing bağlantısından kur; elle APK kurarak
    gerçek Billing testi yapma.
13. Satın alma, iptal, pending, yeniden açma ve restore senaryolarını test et.
14. Test sorunları kapandıktan sonra kapalı test/production gereksinimlerine ilerle.

## 6. Ekran görüntüsü planı

Play listelemesi için önerilen 5 ekran:

1. **Ana deneyim:** Tek zar ve büyük `Zar At` butonu — “Tek dokunuşla zar at.”
2. **Çift zar:** İki zar ve toplam — “Çift zarla toplamı anında gör.”
3. **Zar Atölyesi:** Farklı gövde/pip renkleri — “Zarını kendi tarzına göre oluştur.”
4. **Ayarlar:** Dil, ses, haptik, shake ve azaltılmış hareket — “Deneyimi kendine göre ayarla.”
5. **Premium:** Kilitli temalar ve kişiselleştirme — “Tek seferlik Premium ile daha fazla seçenek.”

Görsel kuralları:

- Expo Go araç balonu, debug yazısı, terminal, kişisel hesap veya cihaz bildirimi
  mümkünse görünmemeli.
- Gerçek uygulama ekranı kullanılmalı; sahte özellik veya çalışmayan Premium ekranı
  gösterilmemeli.
- Ekran üzerine eklenen pazarlama başlıkları uygulamadaki gerçek metinlerle çelişmemeli.
- Türkçe ve İngilizce için ayrı ekran seti hazırlanabilir.

Emülatörden alınan mevcut adaylar:

- [Türkçe ana ekran adayı](C:/Users/Alper/Downloads/zar-at-store-home.png)
- [Türkçe ayarlar adayı](C:/Users/Alper/Downloads/zar-at-store-settings.png)

Bu dosyalar başlangıç adayıdır; final mağaza görseli olarak kullanılmadan önce temiz
status bar/debug görünümü ve Play Console ekran boyutu gereksinimleri kontrol edilmelidir.

## 7. Build ve güncelleme akışı

### Test APK'sı

```bash
npx eas-cli build --platform android --profile preview-a52 --non-interactive --no-wait
```

Bu build A52 üzerinde test içindir; mağazaya yüklenmez.

### Mağaza AAB'si

```bash
npx eas-cli build --platform android --profile production
```

Her mağaza güncellemesinde:

1. Kod değiştir.
2. Otomatik testleri ve cihaz regresyonunu çalıştır.
3. Commit al.
4. Production AAB oluştur.
5. Play Console'a yeni release olarak yükle.
6. Yeni release'i önce test kanalında doğrula.
7. Sonra production rollout başlat.

GitHub bağlantısı şart değildir. EAS build mevcut commit'i kullanır. GitHub Actions
ileride otomatik build/submit için bağlanabilir, ancak ilk yayın için gerekli değildir.

Bir güncellemenin kabul edilmesi için paket adı aynı, imza aynı ve `versionCode` daha
yüksek olmalıdır. Kullanıcının Play Store sürümü bu şartlarla otomatik güncellenebilir.

## 8. Mevcut eksiklerin öncelik sırası

### P0 — Mağazaya çıkmadan önce zorunlu

- Play Console hesabı doğrulaması.
- Herkese açık HTTPS gizlilik politikası URL'si.
- Uygulama Ayarları içine aynı gizlilik politikası URL'sinin bağlantısı.
- Final Data Safety ve içerik derecelendirme beyanları.
- `dice_premium_unlock` ürününün aktif edilmesi.
- Production AAB ve Internal Testing kurulumu.
- Billing license tester satın alma/restore testi.
- Ses dosyalarının Envato item ve lisans kayıtlarının tamamlanması.

### P1 — Listeleme kalitesi

- Türkçe/İngilizce store listing redaksiyonu.
- Temiz ana ekran, çift zar, atölye ve ayarlar ekran görüntüleri.
- Feature graphic ve ikon güvenli alan kontrolü.
- Destek e-posta adresi ve kısa destek metni.
- İlk sürüm notları.

### P2 — Sonradan yapılabilir

- GitHub Actions ile otomatik production build.
- EAS Submit ile otomatik Play Console gönderimi.
- Ek mağaza dilleri.
- Küçük tanıtım videosu veya daha gelişmiş store görselleri.

## 9. İlk sürüm notu taslağı

### Türkçe

> Zar At'ın ilk sürümü yayında! Tek veya çift zar atın, görünümünüzü kişiselleştirin,
> ses ve haptik tercihlerinizi ayarlayın. Reklamsız ve sade bir zar deneyimi.

### English

> Roll Dice is here! Roll one or two dice, customize your look, and tune sound and
> haptic feedback. A simple, ad-free dice experience.

## 10. Son karar

Uygulamanın uygulama tarafında mağaza için temel bilgi ve davranışları büyük ölçüde
hazırdır. Kalan işlerin çoğu kod değil; Play Console beyanları, ürün tanımı, gerçek
Billing testi, herkese açık gizlilik URL'si ve mağaza materyalleridir. Zar uygulamasına
bu aşamada gereksiz backend, hesap sistemi veya daha karmaşık oyun özellikleri eklenmemelidir.
