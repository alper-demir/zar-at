# Git ve sürümleme düzeni

## Branch'ler

- `main`: Emülatörde doğrulanmış, yayınlanabilir veya demo edilebilir sürümler.
- `develop`: Bir sonraki sürümün birleştiği günlük geliştirme branch'i.
- `feature/<konu>`: Tek bir özellik veya iyileştirme için kısa ömürlü branch.
- `fix/<konu>`: Hata düzeltmeleri için kısa ömürlü branch.
- `release/<surum>`: Yalnızca mağaza öncesi stabilizasyon gerektiğinde kullanılır.

Özellik branch'leri `develop` üzerinden açılır ve doğrulandıktan sonra tekrar `develop` içine alınır. Bir sürüm hazır olduğunda `develop`, `main` ile birleştirilir ve `vMAJOR.MINOR.PATCH` etiketi oluşturulur.

## Sürüm numarası

Semantik sürümleme kullanılır:

- `PATCH`: Davranışı değiştirmeyen hata düzeltmesi ve küçük polish.
- `MINOR`: Geriye uyumlu yeni özellik veya kullanıcı deneyimi paketi.
- `MAJOR`: Ürün davranışında veya veri modelinde büyük değişiklik.

Expo `app.json`, `package.json` ve `package-lock.json` sürümleri birlikte güncellenir. Android `versionCode` her mağaza yüklemesinde artırılır; geliştirme commit'lerinde artırılması gerekmez.

## Commit biçimi

Conventional Commits'in sade alt kümesi kullanılır:

- `feat: ...`
- `fix: ...`
- `polish: ...`
- `docs: ...`
- `chore: ...`

Her commit tek bir anlaşılır amacı kapsamalıdır. Derleme çıktıları, emülatör ekran görüntüleri ve yerel gizli dosyalar commit'lenmez.
