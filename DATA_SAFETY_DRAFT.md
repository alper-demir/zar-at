# Google Play Data Safety Taslağı

Bu taslak uygulamanın mevcut kodu ve kullanılan SDK'lar incelenerek hazırlanmıştır. Play Console formu gönderilmeden önce son release build'i, SDK davranışları ve Google Play'in güncel form seçenekleriyle tekrar doğrulanmalıdır.

## Uygulama davranışı

- Uygulama hesabı oluşturulmaz.
- Özel backend, veritabanı, analitik veya reklam SDK'sı kullanılmaz.
- Zar sonuçları, ayarlar, temalar, presetler ve yerel geçmiş cihazda tutulur.
- Shake-to-roll yalnızca cihaz sensörünü yerel atış tetiklemek için kullanır; sensör verisi dışarı gönderilmez.
- Ses ve haptik geri bildirim cihaz üzerinde çalışır.
- Premium satın alma ve geri yükleme Google Play satın alma altyapısı üzerinden yürütülür; ödeme bilgileri uygulama tarafından toplanmaz.

## Form için mevcut teknik değerlendirme

- Geliştirici tarafından toplanan kişisel veri: Yok.
- Üçüncü taraflarla paylaşılan veri: Yok.
- Veri aktarımı: Uygulamanın kendi sunucusuna aktarım yok.
- Hesap silme talebi: Uygulama hesabı bulunmadığı için uygulanmaz.
- Şifreleme: Uygulamanın özel bir uzak veri aktarımı yok; Google Play ödeme akışı kendi platform kurallarıyla değerlendirilmelidir.
- Veri silme: Yerel ayarlar/geçmiş uygulama içindeki temizleme seçenekleriyle veya uygulama verisi temizlenerek kaldırılabilir.

## Play Console'da ayrıca doğrulanacaklar

1. Kullanılan `expo-iap`, `expo-audio`, `expo-sensors` ve diğer SDK'ların güncel veri güvenliği beyanları.
2. Google Play Billing işleminin formda hangi hizmet sağlayıcı kategorisiyle gösterileceği.
3. Gizlilik politikası için herkese açık, HTTPS bir URL.
4. Uygulamanın gerçek production/release build'inde debug, test ve mock satın alma davranışının bulunmadığı.

Bu belge hukuki danışmanlık değildir; Play Console beyanları gerçek release davranışıyla birebir eşleşmelidir.
