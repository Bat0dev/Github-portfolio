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
    slug: "cursed-cargo",
    title: "Cursed Cargo",
    year: 2026,
    category: "My Games",
    tags: ["3D Modeling", "Shaders", "Online co-op"],
    summary: "Online co-op horror on Steam, where I handled the 3D modeling and shaders.",
    description: [
      "I handled the 3D modeling and shaders on Cursed Cargo, from modeling the game's assets to writing the shaders behind its look.",
      "Cursed Cargo is a physics-based online co-op horror game for 1–4 players by gogot games, in Early Access on Steam since July 2026. One player carries a sentient, easily scared cargo while the rest of the team protects it on the way to the extraction point.",
    ],
    cover: "assets/cursed-cargo/03.jpg",
    media: [
      "assets/cursed-cargo/01.jpg",
      "assets/cursed-cargo/02.jpg",
      "assets/cursed-cargo/03.jpg",
      "assets/cursed-cargo/04.jpg",
      "assets/cursed-cargo/05.jpg",
      "assets/cursed-cargo/06.jpg",
    ],
    links: { steam: "https://store.steampowered.com/app/4400900/Cursed_Cargo/" },
  },
  {
    slug: "library",
    title: "Library",
    category: "3D",
    tags: ["Environment", "Modeling", "Lighting"],
    summary: "Renders and clay renders of the main room from Cursed Cargo, the co-op horror game I worked on.",
    description: [
      "Renders and clay renders of the main room from Cursed Cargo, the co-op horror game I worked on.",
      "The room is a dark, multi-level library built around an open atrium, with balconies, an arched bridge and a grand staircase connecting the floors. Candles and wall lanterns carry most of the lighting, and the clay renders at the end show the modeling without materials.",
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
