# Play Store yayın kontrol listesi

Detaylı metinler, politika notları, ekran görüntüsü planı ve build akışı için
[`STORE_RELEASE_GUIDE.md`](STORE_RELEASE_GUIDE.md) dosyasına bakılmalıdır.

## 2026-09-28 durum notu

Google Play Console geliştirici hesabı oluşturuldu ve doğrulama bekleniyor. Hesap doğrulanana kadar mağaza listeleme taslağı `STORE_LISTING.md`, Data Safety taslağı `DATA_SAFETY_DRAFT.md` ve release kontrolü hazırlanabilir. Play Console'da uygulama oluşturma, ürün açma ve test grubu başlatma hesabın doğrulanmasından sonra yapılacak.

- [ ] Play Console uygulaması oluşturulmalı ve `com.zarat.app` paket adı rezerve edilmeli.
- [ ] `dice_premium_unlock` non-consumable ürünü oluşturulmalı.
- [x] IAP sağlayıcısının production adapter'ı `src/hooks/usePurchase.ts` içine bağlandı; gerçek Play Store ürünüyle test bekliyor.
- [ ] Gizlilik politikası herkese açık bir URL'de yayınlanmalı.
- [x] Uygulama ikonu ve splash ilk marka tasarımıyla yenilendi; son mağaza ekran görüntüleri hâlâ alınmalı.
- [ ] Data Safety formunda kişisel veri ve reklam kullanılmadığı belirtilmeli.
- [ ] `eas build --platform android --profile preview` ile internal testing APK alınmalı.
- [ ] Kapalı testten sonra production build gönderilmeli.
