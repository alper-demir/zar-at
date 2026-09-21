# Ürün stratejisi — kişisel zar deneyimi

## Neden biri ödeme yapsın?

Temel zar atma ücretsiz alternatiflerde zaten kolayca bulunuyor. Ücretli değer, daha fazla zar türü eklemekten değil, fiziksel bir aksesuar seçer gibi uygulamayı kişiye ait hale getirmekten gelmeli.

Ürün vaadi:

> Reklamsız, çevrimdışı ve adil; görünümü, sesi ve hissi sana ait olan cep zarı.

## Ücretsiz temel

- Tek ve çift D6.
- Kriptografik rastgelelik.
- Temel animasyon, haptik ve bir dengeli tema.
- Son beş atış.
- Reklam, hesap ve takip yok.

## Tek seferlik Premium değeri

### Zar Atölyesi

- Zar gövdesi ve pip rengi için renk seçici.
- Mat, neon, cam, ahşap ve mermer gibi hazır stil paketleri.
- Çift zar modunda iki zarı ayrı renklendirme.
- Köşe yumuşaklığı, pip görünümü ve parlaklık için kontrollü seçenekler.

### Kişisel masa

- Minimal, keçe, ahşap, neon ve gece masa temaları.
- Sistem fotoğraf seçicisiyle yalnızca cihazda kalan özel arka plan.
- Zar, masa ve efekt kombinasyonlarını isim vererek preset olarak kaydetme.

### Kişisel his

- Sessiz, klasik, arcade ve yumuşak ses profilleri.
- Haptik şiddeti ve atış karakteri seçenekleri.
- Kritik sonuçlar için seçilebilir ama ölçülü hero efektleri.
- Telefonu sallayarak zar atma seçeneği.

### Faydalı ama sade ekstralar

- Geniş geçmiş ve temel dağılım istatistiği.
- Favori mod ve preset ile doğrudan açılma.
- Sonucu görsel kart olarak paylaşma; kullanıcı verisi sunucuya gönderilmez.

## Ürün sınırları

- V1'de yalnızca standart D6 ve en fazla iki zar korunur.
- Reklam, abonelik, hesap, özel bulut/backend, sosyal akış ve oyunlaştırılmış para birimi eklenmez.
- Özel yüz metinleri veya ağırlıklı zar gibi adalet algısını bozan seçenekler eklenmez.
- Kişiselleştirme okunabilirliği ve düşük segment Android performansını bozamaz.

## Önerilen sürüm yol haritası

### v0.2.0 — Güvenilir his

- Kalıcı player mimarisiyle ANR'sız ses.
- Sonuç geçmişinde `4 + 2 = 6` gösterimi.
- Erişilebilirlik ve atış geri bildirimi iyileştirmeleri.

### v0.3.0 — Kişiselleştirme temeli

- Zar gövdesi/pip rengi seçici.
- Çift zarda ayrı renk seçimi.
- Masa arka planı ve yerel preset saklama.

### v0.4.0 — Premium deneyim

- Malzeme/stil paketleri.
- Ses-haptik profilleri ve kritik sonuç efektleri.
- Premium yetkilendirme arayüzünün ürün sınırlarına bağlanması; gerçek billing hâlâ ertelenebilir.

### v0.5.0 — Ürün kalitesi

- Geniş geçmiş/istatistik, shake-to-roll ve paylaşılabilir sonuç kartı.
- Düşük segment cihaz performans testi, erişilebilirlik ve hata dayanıklılığı.

### v1.0.0 — Mağaza sürümü

- Gerçek tek seferlik satın alma ve restore.
- Lisans, gizlilik, mağaza metinleri ve kapalı test.

## Monetizasyon kararı

Uygulama ücretsiz çalışan temel deneyim + tek seferlik non-consumable Lifetime Premium kilidiyle sunulacaktır. Abonelik kullanılmayacaktır. Kullanıcı kaliteyi satın almadan deneyebilir; ödeme, kişiselleştirme ve uzun vadeli kullanım içindir.

Ayarlar, presetler ve geçmiş cihazda saklanır. Uygulama verileri için hesap veya özel bulut/backend kurulmaz. Satın alma hakkının doğrulanması ve geri yüklenmesi Google Play altyapısı üzerinden yapılır.
