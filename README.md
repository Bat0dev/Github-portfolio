# Github-portfolio

Batu Özkan'ın portfolio sitesi. Sade HTML + CSS + JavaScript; kurulum, build ya da paket yok.
Hero kısmındaki arka plan, gerçek zamanlı çalışan bir WebGL fragment shader.

## Dosyalar

| Dosya | Ne işe yarar |
|---|---|
| `data.js` | **Sitenin tüm içeriği.** İsim, yazılar, yetenekler, linkler ve projeler burada. Normalde sadece bunu düzenlersin. |
| `index.html` | Sayfanın iskeleti |
| `style.css` | Tasarım (renkler en üstte `:root` içinde) |
| `script.js` | Proje kartları, filtreler, proje penceresi ve shader |
| `assets/` | Proje görsellerin ve videoların |

## Proje ekleme

1. `assets/` içine proje için bir klasör aç, örn. `assets/proje-adi/`, görsellerini at.
2. `data.js` içinde `PROJECTS` listesindeki şablonu kopyala, `//` işaretlerini sil, doldur.
3. `category` alanına `"My Games"`, `"3D"` veya `"Shaders"` yaz (filtre butonlarıyla birebir aynı olmalı).
4. `cover` alanına kart görselini yaz: `"assets/proje-adi/cover.jpg"`
5. `media` alanına projeye tıklayınca açılacak görselleri/videoları ekle. YouTube linki de olur.

Filtre butonlarını değiştirmek istersen `data.js` içindeki `CATEGORIES` listesini düzenle.

## Fotoğrafların

"Who are you?" kısmındaki iki yuvarlak fotoğraf için görsellerini `assets/` klasörüne at,
sonra `data.js` içindeki `photos` satırına yollarını yaz:
`photos: ["assets/foto-1.jpg", "assets/foto-2.jpg"]`. Kare fotoğraf en iyi sonucu verir.

Görseller için ipucu: kart görseli yatay olsun (16:10 civarı, ~1600px genişlik yeter),
JPG veya WebP kaydet ki site hızlı açılsın.

## Bilgisayarında görüntüleme

`index.html` dosyasına çift tıkla, tarayıcıda açılır. Değişiklik yaptıktan sonra sayfayı yenile.

## İnternette yayınlama (GitHub Pages, ücretsiz)

1. GitHub Desktop'ta değişiklikleri **commit** et, sonra **Push origin**.
2. GitHub'da repoya git → **Settings** → **Pages**.
3. **Source:** `Deploy from a branch`, **Branch:** `main` ve `/ (root)` → **Save**.
4. Birkaç dakika sonra site şu adreste açılır: https://bat0dev.github.io/Github-portfolio/

Daha kısa adres istersen: repo adını `Bat0dev.github.io` olarak değiştir,
site https://bat0dev.github.io adresinde açılır.
