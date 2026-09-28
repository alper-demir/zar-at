# Release Öncesi Test Planı

## Otomatik kapı

- `npm run format:check`
- `npm run typecheck`
- `npm run lint`
- `npm test -- --runInBand`
- `git diff --check`
- `npx expo-doctor`
- Android production bundle/export

## Manuel cihaz matrisi

Her cihazda temiz kurulum ve mevcut uygulama güncellemesi ayrı ayrı kontrol edilir:

- Android emülatör: tek zar, çift zar, hızlı tekrar dokunuşu, reduced motion
- Samsung A52: ses, haptik, shake-to-roll, arka plana alıp geri dönme
- Farklı ekran boyutu: safe-area, ayarlar paneli, sonuç kartı ve taşma kontrolü

## Premium kapısı

- Expo Go/development mock satın alma akışı
- Release build'de ürün bulunamadığında güvenli hata mesajı
- Gerçek Play ürünü ile satın alma
- Satın alma sonrası uygulamayı kapatıp açınca entitlement korunması
- Restore purchases ile aynı Google Play hesabında premium'un geri gelmesi
- Pending işlemde premium'un erken açılmaması

## Mağaza materyalleri

- Son ikon ve splash
- Gerçek uygulama ekran görüntüleri
- Herkese açık HTTPS gizlilik politikası
- Data Safety beyanı
- Mağaza açıklaması ve içerik derecelendirmesi
