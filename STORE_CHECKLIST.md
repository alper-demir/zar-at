# Play Store yayın kontrol listesi

## 2026-09-28 durum notu

Google Play Console geliştirici hesabı oluşturuldu ve doğrulama bekleniyor. Hesap doğrulanana kadar mağaza listeleme taslağı `STORE_LISTING.md`, Data Safety taslağı `DATA_SAFETY_DRAFT.md` ve release kontrolü hazırlanabilir. Play Console'da uygulama oluşturma, ürün açma ve test grubu başlatma hesabın doğrulanmasından sonra yapılacak.

- [ ] Play Console uygulaması oluşturulmalı ve `com.zarat.app` paket adı rezerve edilmeli.
- [ ] `dice_premium_unlock` non-consumable ürünü oluşturulmalı.
- [x] IAP sağlayıcısının production adapter'ı `src/hooks/usePurchase.ts` içine bağlandı; gerçek Play Store ürünüyle test bekliyor.
- [ ] Gizlilik politikası herkese açık bir URL'de yayınlanmalı.
- [ ] Uygulama ikonu, splash ve ekran görüntüleri son marka kimliğiyle yenilenmeli.
- [ ] Data Safety formunda kişisel veri ve reklam kullanılmadığı belirtilmeli.
- [ ] `eas build --platform android --profile preview` ile internal testing APK alınmalı.
- [ ] Kapalı testten sonra production build gönderilmeli.
