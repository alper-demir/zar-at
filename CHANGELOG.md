# Değişiklik Günlüğü

Bu proje semantik sürümleme kullanır.

## [0.1.0] - 2026-09-21

### Eklendi

- Expo SDK 57 ve TypeScript tabanlı uygulama iskeleti.
- Kriptografik tek/çift D6 atışı.
- Reanimated tabanlı hafif atış animasyonu ve haptik geri bildirim.
- Tek ve çift zar modu, toplam ve son beş atış geçmişi.
- Tema seçimi, kalıcı ayarlar ve mock Premium akışı.
- Pip tabanlı zar görünümü, sonuç kartı ve görsel polish.
- Gizlilik metni ve EAS/mağaza hazırlık dosyaları.

### Bilinen sorunlar

- Expo Go Android'de dinamik `expo-audio` player oluşturmak ANR ürettiği için oyun içi sesler geçici olarak devre dışıdır.
- Gerçek Play Billing bağlantısı mağaza hazırlığına kadar mock olarak kalacaktır.
