// ============================================================
//  SİTENİN TÜM İÇERİĞİ BURADA
//  Yazıları, linkleri ve projeleri sadece bu dosyadan düzenle.
// ============================================================

const SITE = {
  name: "Batu Özkan",
  role: "Technical Artist · Shaders & 3D",
  tagline: "Crafting shaders in HLSL and rigging characters in Blender.",

  // "Who are you?" kısmı
  aboutHeading: "Who are you?",

  // Kendini anlatan yazı. Her tırnak içi ayrı bir paragraf olur.
  about: [
    "I'm Batu. I write shaders, mostly in HLSL, and build 3D assets and characters for games.",
    "Away from code I'm usually in Blender rigging characters or texturing assets in Substance 3D Painter.",
  ],

  // Soldaki iki yuvarlak fotoğraf: ilki büyük daire, ikincisi köşedeki küçük daire.
  // Fotoğrafları assets/ klasörüne koy. Kare fotoğraf en iyisi (örn. 600x600).
  // Boş bırakırsan yer tutucu görünür.
  photos: ["", ""], // örn: ["assets/foto-1.jpg", "assets/foto-2.jpg"]

  // Yazının altındaki yetenek etiketleri
  skills: ["HLSL", "GLSL", "Real-time rendering", "Blender", "Character rigging", "Substance 3D Painter", "PBR texturing"],

  // Boş bıraktığın linkler sitede görünmez.
  links: {
    github: "https://github.com/Bat0dev",
    email: "",       // örn: "isim@mail.com"
    artstation: "https://www.artstation.com/devgrey",
    linkedin: "",
    youtube: "",
    itch: "",
  },
};

// ============================================================
//  FİLTRE BUTONLARI — "All" otomatik en başa eklenir.
//  Projedeki category alanı bunlardan biriyle birebir aynı yazılmalı.
// ============================================================

const CATEGORIES = ["My Games", "3D", "Shaders"];

// ============================================================
//  PROJELER — yeni proje eklemek için aşağıdaki şablonu kopyala,
//  başındaki // işaretlerini sil ve doldur.
//  Sıralama sitede de aynı olur (en üstteki ilk görünür).
//
//  slug        : adres çubuğunda görünen kısa ad (#proje-adi). Boşluksuz, küçük harf.
//  category    : "My Games", "3D" veya "Shaders"
//  cover       : kart görseli. Boş bırakırsan otomatik desen çıkar.
//                Görseli assets/ klasörüne koy, örn: "assets/proje-adi/cover.jpg"
//  media       : projeye tıklayınca açılan galeri. Resim, .mp4/.webm video
//                veya YouTube linki olabilir. Açıklama eklemek istersen:
//                { src: "assets/x.jpg", caption: "Wireframe" }
//  description : tek yazı ya da paragraf listesi.
//  links       : github / demo / video / itch / artstation — boşlar görünmez.
// ============================================================

const PROJECTS = [
  {
    slug: "library",
    title: "Library",
    category: "3D",
    tags: ["Environment", "Modeling", "Lighting"],
    summary: "A multi-level gothic library lit by candles and lanterns, with balconies, an arched bridge and a grand staircase.",
    description: [
      "A dark, multi-level library environment built around an open central atrium. Balconies, an arched bridge and a grand staircase connect the floors.",
      "Candles and wall lanterns carry most of the lighting, catching the rune-carved shelves, stacked books and scattered papers. The clay renders at the end show the modeling without materials.",
    ],
    // Klasör adı büyük L ile "Library" — GitHub Pages büyük/küçük harfe duyarlı, aynen böyle kalmalı.
    cover: "assets/Library/batu-library1.jpg",
    media: [
      "assets/Library/batu-library1.jpg",
      "assets/Library/batu-library2.jpg",
      "assets/Library/batu-library3.jpg",
      "assets/Library/batu-library4.jpg",
      "assets/Library/batu-library6.jpg",
      { src: "assets/Library/batu-libraryclay.jpg", caption: "Clay render" },
      { src: "assets/Library/batu-libraryclay2.jpg", caption: "Clay render" },
    ],
    links: { artstation: "https://www.artstation.com/artwork/lE1DxV" },
  },

  // ---- ŞABLON ----
  // {
  //   slug: "proje-adi",
  //   title: "Proje Adı",
  //   year: 2026,
  //   category: "My Games",
  //   tags: ["Unity", "HLSL"],
  //   summary: "Kartta görünen tek cümlelik özet.",
  //   description: ["Birinci paragraf.", "İkinci paragraf."],
  //   cover: "assets/proje-adi/cover.jpg",
  //   media: ["assets/proje-adi/1.jpg", "https://youtu.be/VIDEO_ID"],
  //   links: { github: "", demo: "", video: "" },
  // },
];
