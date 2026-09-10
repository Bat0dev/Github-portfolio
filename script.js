(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);

  // Tiny DOM helper. Everything from data.js goes through textContent, never innerHTML.
  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else if (k === "style") node.style.cssText = v;
      else node.setAttribute(k, v === true ? "" : v);
    }
    for (const c of [].concat(children)) if (c != null) node.append(c);
    return node;
  }

  const initials = (text) =>
    text.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  /* ---------------- site info ---------------- */

  document.title = `${SITE.name} — ${SITE.role}`;
  $("#logo-name").textContent = SITE.name;
  $("#footer-name").textContent = SITE.name;
  $("#hero-name").textContent = SITE.name;
  $("#hero-role").textContent = SITE.role;
  $("#hero-tagline").textContent = SITE.tagline;
  $("#about-heading").textContent = SITE.aboutHeading;
  $("#about-text").append(...[].concat(SITE.about).filter(Boolean).map((p) => el("p", { text: p })));
  $("#skills").append(...SITE.skills.map((s) => el("li", { text: s })));

  // Two round photos in "Who are you?"; empty slots show placeholders.
  const [photoMain, photoSecond] = SITE.photos || [];
  $("#about-photos").append(
    el("div", { class: "photo photo-main" },
      photoMain
        ? el("img", { src: photoMain, alt: SITE.name })
        : el("span", { class: "photo-initials", text: initials(SITE.name) })),
    el("div", { class: "photo photo-second" },
      photoSecond ? el("img", { src: photoSecond, alt: "" }) : null)
  );
  $("#year").textContent = new Date().getFullYear();

  const CONTACT_LABELS = {
    github: "GitHub", email: "Email", artstation: "ArtStation",
    linkedin: "LinkedIn", youtube: "YouTube", itch: "itch.io",
  };
  for (const [key, value] of Object.entries(SITE.links)) {
    if (!value) continue;
    const isMail = key === "email";
    $("#contact-links").append(
      el("a", {
        class: "contact-link",
        href: isMail ? `mailto:${value}` : value,
        target: isMail ? null : "_blank",
        rel: isMail ? null : "noopener",
      }, [
        el("span", { class: "contact-label mono", text: CONTACT_LABELS[key] || key }),
        el("span", { class: "contact-value", text: isMail ? value : value.replace(/^https?:\/\/(www\.)?/, "") }),
        el("span", { class: "contact-arrow", "aria-hidden": "true", text: "↗" }),
      ])
    );
  }

  /* ---------------- projects ---------------- */

  const slugOf = (p) =>
    p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  // FNV-1a, so each placeholder cover is stable per title.
  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function cover(p) {
    if (p.cover) return el("img", { src: p.cover, alt: "", loading: "lazy" });
    const h = hash(p.title);
    const style =
      `--h:${10 + (h % 30)};` +
      `--x1:${15 + ((h >>> 5) % 55)}%;--y1:${15 + ((h >>> 11) % 55)}%;` +
      `--x2:${25 + ((h >>> 17) % 55)}%;--y2:${25 + ((h >>> 23) % 55)}%`;
    return el("div", { class: "placeholder", style }, el("span", { text: initials(p.title) }));
  }

  const tagList = (tags) => el("div", { class: "tags" }, (tags || []).map((t) => el("span", { class: "tag", text: t })));

  function card(p) {
    return el("a", { class: "card reveal", href: `#${slugOf(p)}`, "data-slug": slugOf(p) }, [
      el("div", { class: "card-media" }, cover(p)),
      el("div", { class: "card-body" }, [
        el("div", { class: "card-meta" }, [el("span", { text: p.category }), el("span", { text: p.year })]),
        el("h3", { text: p.title }),
        el("p", { text: p.summary }),
        tagList(p.tags),
      ]),
    ]);
  }

  const grid = $("#grid");
  const filters = $("#filters");
  // Fixed categories from data.js first, then any extra ones a project uses.
  const categories = ["All", ...new Set([...CATEGORIES, ...PROJECTS.map((p) => p.category).filter(Boolean)])];
  let activeCategory = "All";

  const revealer = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("in");
          revealer.unobserve(e.target);
        }
      }, { rootMargin: "0px 0px -40px 0px" })
    : null;

  function renderGrid() {
    const list = PROJECTS.filter((p) => activeCategory === "All" || p.category === activeCategory);
    grid.replaceChildren(...list.map(card));
    if (!list.length) {
      grid.append(el("p", { class: "empty", text: PROJECTS.length ? "Nothing here yet." : "Projects coming soon." }));
    }
    grid.querySelectorAll(".reveal").forEach((node, i) => {
      node.style.setProperty("--d", `${Math.min(i, 6) * 70}ms`);
      revealer ? revealer.observe(node) : node.classList.add("in");
    });
  }

  function renderFilters() {
    filters.replaceChildren(
      ...categories.map((c) => {
        const b = el("button", { class: "chip", type: "button", "aria-pressed": String(c === activeCategory), text: c });
        b.addEventListener("click", () => {
          activeCategory = c;
          renderFilters();
          renderGrid();
        });
        return b;
      })
    );
  }

  renderFilters();
  renderGrid();

  /* ---------------- project modal ---------------- */

  const modal = $("#modal");
  const modalContent = $("#modal-content");
  const LINK_TEXT = {
    github: "Source code", demo: "Live demo", video: "Watch video",
    itch: "Play on itch.io", artstation: "View on ArtStation",
  };

  function mediaNode(item) {
    const { src, caption } = typeof item === "string" ? { src: item } : item;
    let node;
    const yt = src.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
    if (yt) {
      node = el("div", { class: "embed" }, el("iframe", {
        src: `https://www.youtube-nocookie.com/embed/${yt[1]}`,
        title: caption || "Video",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowfullscreen: true,
        loading: "lazy",
      }));
    } else if (/\.(mp4|webm|mov)$/i.test(src)) {
      node = el("video", { src, controls: true, playsinline: true, preload: "metadata" });
    } else {
      node = el("img", { src, alt: caption || "", loading: "lazy" });
    }
    return el("figure", {}, [node, caption ? el("figcaption", { text: caption }) : null]);
  }

  function openProject(slug) {
    const p = PROJECTS.find((x) => slugOf(x) === slug);
    if (!p) return;
    const links = Object.entries(p.links || {}).filter(([, v]) => v);
    const media = p.media && p.media.length ? p.media : p.cover ? [p.cover] : [];

    modalContent.replaceChildren(
      ...[
        el("header", { class: "modal-head" }, [
          el("p", { class: "section-label", text: [p.category, p.year].filter(Boolean).join(" · ") }),
          el("h2", { id: "modal-title", text: p.title }),
          tagList(p.tags),
        ]),
        el("div", { class: "modal-desc" }, [].concat(p.description || p.summary).map((t) => el("p", { text: t }))),
        links.length
          ? el("div", { class: "modal-links" }, links.map(([k, v]) =>
              el("a", { class: "btn btn-ghost", href: v, target: "_blank", rel: "noopener", text: `${LINK_TEXT[k] || k} ↗` })))
          : null,
        media.length ? el("div", { class: "modal-media" }, media.map(mediaNode)) : null,
      ].filter(Boolean)
    );

    if (!modal.open) modal.showModal();
    modal.scrollTop = 0;
    document.body.classList.add("modal-open");
    history.replaceState(null, "", `#${slug}`);
  }

  modal.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    modalContent.replaceChildren(); // stops videos and embeds
    history.replaceState(null, "", location.pathname + location.search);
  });

  // Clicking the backdrop targets the <dialog> itself.
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.closest("[data-close]")) modal.close();
  });

  grid.addEventListener("click", (e) => {
    const link = e.target.closest(".card");
    if (!link || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    openProject(link.dataset.slug);
  });

  // Shared links like site.com/#my-game open the project directly.
  const openFromHash = () => openProject(decodeURIComponent(location.hash.slice(1)));
  window.addEventListener("hashchange", openFromHash);
  openFromHash();

  /* ---------------- nav ---------------- */

  const nav = $(".nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- hero shader ---------------- */

  const VERT = "attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }";

  const FRAG = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif

    uniform vec2 uRes;
    uniform float uTime;
    uniform vec2 uMouse;

    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
                 mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
    }

    float fbm(vec2 p) {
      float v = 0.0, a = 0.5;
      mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
      for (int i = 0; i < 5; i++) { v += a * noise(p); p = rot * p * 2.02; a *= 0.5; }
      return v;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / uRes;
      vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y * 2.4;
      float t = uTime * 0.06;
      vec2 m = (uMouse - 0.5) * 0.5;

      // Domain warping: feed fbm into itself twice.
      vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
      vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + m + 1.5 * t),
                    fbm(p + 3.0 * q + vec2(8.3, 2.8) - m));
      float f = fbm(p + 3.0 * r);

      vec3 col = mix(vec3(0.047, 0.047, 0.055), vec3(0.22, 0.22, 0.25), smoothstep(0.25, 0.85, f));
      col = mix(col, vec3(1.0, 0.42, 0.17), smoothstep(0.45, 0.85, r.x) * 0.9);
      col = mix(col, vec3(1.0, 0.74, 0.45), smoothstep(0.6, 0.95, q.y * f * 1.6) * 0.6);

      col *= 1.0 - 0.6 * length(uv - 0.5);                          // vignette
      col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.025;    // film grain
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function initShader() {
    const canvas = $("#shader");
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    }

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    // One oversized triangle covers the screen — no diagonal seam, fewer verts than a quad.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");

    // Half resolution: the noise is smooth, so the upscale is invisible and the cost drops 4x.
    const SCALE = 0.5;
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr * SCALE));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr * SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
    }

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    window.addEventListener("pointermove", (e) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    }, { passive: true });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let raf = 0, inView = true;

    function frame(now) {
      raf = 0;
      resize();
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      gl.uniform1f(uTime, reduceMotion ? 20 : (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      canvas.classList.add("ready");
      if (!reduceMotion && inView) raf = requestAnimationFrame(frame);
    }

    function kick() {
      if (raf) return;
      raf = requestAnimationFrame(frame);
    }

    // Stop rendering entirely once the hero is scrolled away.
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        if (inView) kick();
      }).observe(canvas);
    }
    window.addEventListener("resize", kick);
    kick();
  }

  initShader();
})();
