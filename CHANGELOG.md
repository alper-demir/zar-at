# Değişiklik Günlüğü

Bu proje semantik sürümleme kullanır.

## [Unreleased]

## [0.5.0] - 2026-09-21

### Eklendi

- Shake-to-roll: yanlış tetiklemeye karşı eşik ve cooldown.
- Geçmiş temizleme, temel atış sayısı ve ortalama istatistikleri.
- Shake-to-roll ve azaltılmış hareket ayarları.
- Ayar store şeması v4 migration.

### Doğrulandı

- 15 Jest testi, TypeScript, ESLint ve Prettier kontrolleri.
- Android emülatörde geçmiş istatistiği ve yeni ayarlar.
- Emülatör ivme olayı sonrası uygulama açık kaldı; temiz logcat'te ANR/fatal/React hatası yok.

### Devam güncellemesi

- Atış geçmişi AsyncStorage ile son 50 kayıt olarak kalıcılaştırıldı.
- Premium geçmiş modalı, ücretsiz son 5 kayıt sınırı ve ortalama istatistiği eklendi.
- Favori preset seçimi ve açılışta otomatik uygulanması eklendi.
- Emülatör yeniden başlatma sonrasında geçmişin korunması doğrulandı.

### Kapsam kararı

- Sonuç paylaşımı kaldırıldı; uygulamanın tek amaçlı zar deneyimine katkısı düşük bulundu.
- Geçmiş kapasitesi Premium için 20, ücretsiz görünüm için 5 kayıt olarak sınırlandı.
- Uygulama adı `Zar At`, paket adı `com.zarat.app` olarak sabitlendi.

## [0.4.0] - 2026-09-21

### Eklendi

- Premium malzeme görünümleri: ahşap, mermer ve cam.
- Ses profilleri (Cinematic/Minimal) ve haptik profilleri (Soft/Standard/Strong).
- Kritik sonuçlar için premium hero mesaj efekti.
- Ayar store şeması v3 migration ve eski görünüm kayıtları için normalize katmanı.

### Doğrulandı

- 13 Jest testi, TypeScript, ESLint, Prettier ve Expo Doctor kontrolleri.
- Android emülatörde mock premium açma, premium kilitlerinin kalkması, Ahşap zar/Minimal profil seçimi ve zar atışı.
- Temiz logcat'te ANR, fatal exception, Metro çözümleme veya React runtime hatası görülmedi.

## [0.3.0] - 2026-09-21

### Değişti

- Monetizasyon modeli ücretsiz temel sürüm + tek seferlik Lifetime Premium olarak kesinleştirildi.
- Abonelik ve uygulama verileri için özel bulut/backend kapsam dışı bırakıldı.
- `v0.2.0`–`v1.0.0` uygulama fazları ve zorunlu kalite kapıları tanımlandı.

### Düzeltildi

- Ses efektleri için atış başına native player oluşturma kaldırıldı; Expo Go Android ANR'ını önlemek için kalıcı player'lar kullanılıyor.
- Çift zarın gecikmeli animasyonu ile sonuç/buton kilidi senkronlandı; hızlı ardışık dokunuşlar engellendi.

### Eklendi

- Gelecekteki Google Play adapter'ından bağımsız `checking | free | premium` entitlement katmanı.
- `jest-expo` tabanlı otomatik test altyapısı ve RNG, animasyon zamanlaması, entitlement ve sonuç sunumu testleri.
- Çift zar geçmişinde işlem gösterimi (`4 + 2 = 6`) ve Android erişilebilirlik sonuç duyurusu.
- Zar Atölyesi veri modelleri: bağımsız zar görünümleri, masa görünümü ve yerel preset yapısı.
- Zar 1/Zar 2 için gövde rengi, pip rengi ve mat/parlak/neon yüzey seçenekleri.

### Doğrulandı

- Android emülatörde ses açıkken 50 ardışık tekli atış: ANR, native crash, React hatası veya `expo-audio` hatası görülmedi.
- Android emülatörde çift zar sonucu, toplam ve yeni geçmiş formatı doğrulandı.
- Android emülatörde v0.3 hot-reload sonrası tekli atış ve sonuç görünümü doğrulandı; runtime hata görülmedi.
- Ayarlar ekranında ses kapalıyken atış sonrası yeni playback log'u oluşmadı ve ayar yeniden açıldığında kapalı kaldı.
- Açık renkli zar gövdelerinde pip okunabilirliği için otomatik kontrast fallback'i doğrulandı.
- Emülatörde preset kaydetme, preset satırını görüntüleme ve preset silme akışı doğrulandı.

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
