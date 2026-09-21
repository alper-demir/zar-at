# Değişiklik Günlüğü

Bu proje semantik sürümleme kullanır.

## [Unreleased]

### Değişti

- Monetizasyon modeli ücretsiz temel sürüm + tek seferlik Lifetime Premium olarak kesinleştirildi.
- Abonelik ve uygulama verileri için özel bulut/backend kapsam dışı bırakıldı.
- `v0.2.0`–`v1.0.0` uygulama fazları ve zorunlu kalite kapıları tanımlandı.

### Düzeltildi

- Ses efektleri için atış başına native player oluşturma kaldırıldı; Expo Go Android ANR'ını önlemek için kalıcı player'lar kullanılıyor.
- Çift zarın gecikmeli animasyonu ile sonuç/buton kilidi senkronlandı; hızlı ardışık dokunuşlar engellendi.

### Eklendi

- Gelecekteki Google Play adapter'ından bağımsız `checking | free | premium` entitlement katmanı.

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
