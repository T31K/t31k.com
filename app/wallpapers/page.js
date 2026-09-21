"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

/* ──────────────────────────────────────────────────────────────
   WALLPAPERS — curated by T31K, grouped by the X post they came
   from. Images live in /public/wallpapers/.
   To add a post: add a group below with its credit + href and the
   image files (downloaded into /public/wallpapers/).
   ────────────────────────────────────────────────────────────── */
const POSTS = [
  {
    name: "Vice City",
    description: "Painterly, neon-soaked riffs on Vice City.",
    credit: "@craftian_keskin",
    href: "https://x.com/craftian_keskin/status/2094839090663272722",
    images: [
      { src: "/wallpapers/craftian_keskin-2094839090663272722-1.jpg" },
      { src: "/wallpapers/craftian_keskin-2094839090663272722-2.jpg" },
      { src: "/wallpapers/craftian_keskin-2094839090663272722-3.jpg" },
      { src: "/wallpapers/craftian_keskin-2094839090663272722-4.jpg" },
    ],
  },
  {
    name: "Lone Shores",
    description: "A solitary figure on palm-fringed tropical sand.",
    credit: "@unseenai",
    href: "https://x.com/unseenai/status/2098714178655580323",
    images: [
      { src: "/wallpapers/unseenai-2098714178655580323-1.jpg" },
      { src: "/wallpapers/unseenai-2098714178655580323-2.jpg" },
      { src: "/wallpapers/unseenai-2098714178655580323-3.jpg" },
      { src: "/wallpapers/unseenai-2098714178655580323-4.jpg" },
    ],
  },
  {
    name: "Arcadia",
    description: "Sun-drenched classical gardens, statues and fountains.",
    credit: "@buildwithsid",
    href: "https://x.com/buildwithsid/status/2098394726148055318",
    images: [
      { src: "/wallpapers/buildwithsid-2098394726148055318-1.jpg" },
      { src: "/wallpapers/buildwithsid-2098394726148055318-2.jpg" },
      { src: "/wallpapers/buildwithsid-2098394726148055318-3.jpg" },
    ],
  },
  {
    name: "Soft Days in Green",
    description: "Muted, green-washed calm.",
    credit: "@aestheticwabi",
    href: "https://x.com/aestheticwabi/status/2098089311426023728",
    images: [
      { src: "/wallpapers/aestheticwabi-2098089311426023728-1.jpg" },
      { src: "/wallpapers/aestheticwabi-2098089311426023728-2.jpg" },
      { src: "/wallpapers/aestheticwabi-2098089311426023728-3.jpg" },
      { src: "/wallpapers/aestheticwabi-2098089311426023728-4.jpg" },
    ],
  },
  {
    name: "Planetary Brutalism",
    description: "Monolithic brutalist forms on alien worlds.",
    credit: "@gridzzle",
    href: "https://x.com/gridzzle/status/2098000686378074126",
    images: [
      { src: "/wallpapers/gridzzle-2098000686378074126-1.jpg" },
      { src: "/wallpapers/gridzzle-2098000686378074126-2.jpg" },
      { src: "/wallpapers/gridzzle-2098000686378074126-3.jpg" },
      { src: "/wallpapers/gridzzle-2098000686378074126-4.jpg" },
    ],
  },
  {
    name: "Home on Mars",
    description: "Martian vistas that could one day feel like home.",
    credit: "@martianprompts",
    href: "https://x.com/martianprompts/status/2096596826841592072",
    images: [
      { src: "/wallpapers/martianprompts-2096596826841592072-1.jpg" },
      { src: "/wallpapers/martianprompts-2096596826841592072-2.jpg" },
      { src: "/wallpapers/martianprompts-2096596826841592072-3.jpg" },
      { src: "/wallpapers/martianprompts-2096596826841592072-4.jpg" },
    ],
  },
  {
    name: "Dithered Alps",
    description: "Halftone-dithered alpine towns by still water.",
    credit: "@fayazara",
    href: "https://x.com/fayazara/status/2091424101894422613",
    images: [
      { src: "/wallpapers/fayazara-2091424101894422613-1.png" },
      { src: "/wallpapers/fayazara-2091424101894422613-2.png" },
      { src: "/wallpapers/fayazara-2091424101894422613-3.png" },
      { src: "/wallpapers/fayazara-2091424101894422613-4.jpg" },
    ],
  },
  {
    name: "A Fortune on Tennis Balls",
    description: "Playful Midjourney + GPT experiments.",
    credit: "@gizakdag",
    href: "https://x.com/gizakdag/status/2091457365413400840",
    images: [
      { src: "/wallpapers/gizakdag-2091457365413400840-1.jpg" },
      { src: "/wallpapers/gizakdag-2091457365413400840-2.jpg" },
      { src: "/wallpapers/gizakdag-2091457365413400840-3.jpg" },
      { src: "/wallpapers/gizakdag-2091457365413400840-4.jpg" },
    ],
  },
  {
    name: "My Future House",
    description: "Dream architecture from tomorrow.",
    credit: "@gizakdag",
    href: "https://x.com/gizakdag/status/2091142329964933216",
    images: [
      { src: "/wallpapers/gizakdag-2091142329964933216-1.jpg" },
      { src: "/wallpapers/gizakdag-2091142329964933216-2.jpg" },
      { src: "/wallpapers/gizakdag-2091142329964933216-3.jpg" },
      { src: "/wallpapers/gizakdag-2091142329964933216-4.jpg" },
    ],
  },
  {
    name: "Dithered",
    description: "Dither-processed, retro gradients.",
    credit: "@praveenisomer",
    href: "https://x.com/praveenisomer/status/2091223884095979535",
    images: [
      { src: "/wallpapers/praveenisomer-2091223884095979535-1.png" },
      { src: "/wallpapers/praveenisomer-2091223884095979535-2.png" },
      { src: "/wallpapers/praveenisomer-2091223884095979535-3.png" },
      { src: "/wallpapers/praveenisomer-2091223884095979535-4.png" },
    ],
  },
  {
    name: "Blue Riders",
    description: "Cobalt riso — cloaked riders crossing an endless desert.",
    credit: "@Palakonweb",
    href: "https://x.com/Palakonweb/status/2090003678103265595",
    images: [
      { src: "/wallpapers/Palakonweb-2090003678103265595-1.jpg" },
      { src: "/wallpapers/Palakonweb-2090003678103265595-2.jpg" },
      { src: "/wallpapers/Palakonweb-2090003678103265595-3.jpg" },
      { src: "/wallpapers/Palakonweb-2090003678103265595-4.jpg" },
    ],
  },
  {
    name: "Shades of Blue",
    description: "Studies in a single color — blue.",
    credit: "@Palakonweb",
    href: "https://x.com/Palakonweb/status/2087197064220520779",
    images: [
      { src: "/wallpapers/Palakonweb-2087197064220520779-1.jpg" },
      { src: "/wallpapers/Palakonweb-2087197064220520779-2.jpg" },
      { src: "/wallpapers/Palakonweb-2087197064220520779-3.jpg" },
      { src: "/wallpapers/Palakonweb-2087197064220520779-4.jpg" },
    ],
  },
  {
    name: "Coastal Calm",
    description: "Organic Mediterranean architecture above a deep blue sea.",
    credit: "@purelivn",
    href: "https://x.com/purelivn/status/2089352450780086661",
    images: [
      { src: "/wallpapers/purelivn-2089352450780086661-1.jpg" },
      { src: "/wallpapers/purelivn-2089352450780086661-2.jpg" },
      { src: "/wallpapers/purelivn-2089352450780086661-3.jpg" },
      { src: "/wallpapers/purelivn-2089352450780086661-4.jpg" },
    ],
  },
  {
    name: "Finance",
    description: "",
    credit: "@gizakdag",
    href: "https://x.com/gizakdag/status/2089346630642278516",
    images: [
      { src: "/wallpapers/gizakdag-2089346630642278516-1.jpg" },
      { src: "/wallpapers/gizakdag-2089346630642278516-2.jpg" },
      { src: "/wallpapers/gizakdag-2089346630642278516-3.jpg" },
      { src: "/wallpapers/gizakdag-2089346630642278516-4.jpg" },
    ],
  },
  {
    name: "Odysseus & the Suitors",
    description: "Odysseus among Penelope’s suitors — a painterly myth.",
    credit: "@craftian_keskin",
    href: "https://x.com/craftian_keskin/status/2089444402523500603",
    images: [
      { src: "/wallpapers/craftian_keskin-2089444402523500603-1.jpg" },
      { src: "/wallpapers/craftian_keskin-2089444402523500603-2.jpg" },
      { src: "/wallpapers/craftian_keskin-2089444402523500603-3.jpg" },
      { src: "/wallpapers/craftian_keskin-2089444402523500603-4.jpg" },
    ],
  },
  {
    name: "Meet Me in Hong Kong",
    description: "Neon-soaked Hong Kong streets.",
    credit: "@Eryth_Studio",
    href: "https://x.com/Eryth_Studio/status/2089324176456949888",
    images: [
      { src: "/wallpapers/Eryth_Studio-2089324176456949888-1.jpg" },
      { src: "/wallpapers/Eryth_Studio-2089324176456949888-2.jpg" },
      { src: "/wallpapers/Eryth_Studio-2089324176456949888-3.jpg" },
    ],
  },
  {
    name: "Once in a Lifetime",
    description: "A folding world — meadows curling into an endless sky.",
    credit: "@MaxVOAO",
    href: "https://x.com/MaxVOAO/status/2089365934871920768",
    images: [
      { src: "/wallpapers/MaxVOAO-2089365934871920768-1.jpg" },
      { src: "/wallpapers/MaxVOAO-2089365934871920768-2.jpg" },
      { src: "/wallpapers/MaxVOAO-2089365934871920768-3.jpg" },
      { src: "/wallpapers/MaxVOAO-2089365934871920768-4.jpg" },
    ],
  },
  {
    name: "The Odyssey VII",
    description: "Part VII of the Odyssey series.",
    credit: "@alban_gz",
    href: "https://x.com/alban_gz/status/2089428045257978034",
    images: [
      { src: "/wallpapers/alban_gz-2089428045257978034-1.jpg" },
      { src: "/wallpapers/alban_gz-2089428045257978034-2.jpg" },
      { src: "/wallpapers/alban_gz-2089428045257978034-3.jpg" },
      { src: "/wallpapers/alban_gz-2089428045257978034-4.jpg" },
    ],
  },
  {
    name: "The Odyssey III",
    description: "Part III of the Odyssey series.",
    credit: "@alban_gz",
    href: "https://x.com/alban_gz/status/2086381989200838702",
    images: [
      { src: "/wallpapers/alban_gz-2086381989200838702-1.jpg" },
      { src: "/wallpapers/alban_gz-2086381989200838702-2.jpg" },
      { src: "/wallpapers/alban_gz-2086381989200838702-3.jpg" },
      { src: "/wallpapers/alban_gz-2086381989200838702-4.jpg" },
    ],
  },
  {
    name: "The Odyssey",
    description: "The Odyssey, made with Midjourney.",
    credit: "@alban_gz",
    href: "https://x.com/alban_gz/status/2086017572294848657",
    images: [
      { src: "/wallpapers/alban_gz-2086017572294848657-1.jpg" },
      { src: "/wallpapers/alban_gz-2086017572294848657-2.jpg" },
      { src: "/wallpapers/alban_gz-2086017572294848657-3.jpg" },
      { src: "/wallpapers/alban_gz-2086017572294848657-4.jpg" },
    ],
  },
  {
    name: "Homeric",
    description: "A lone warrior above the Aegean — myth in ink.",
    credit: "@houseofuday_",
    href: "https://x.com/houseofuday_/status/2089331579156152612",
    images: [
      { src: "/wallpapers/houseofuday_-2089331579156152612-1.jpg" },
      { src: "/wallpapers/houseofuday_-2089331579156152612-2.jpg" },
      { src: "/wallpapers/houseofuday_-2089331579156152612-3.jpg" },
      { src: "/wallpapers/houseofuday_-2089331579156152612-4.jpg" },
    ],
  },
  {
    name: "Less Screen",
    description: "A nudge to look up.",
    credit: "@Synthetic_Copy",
    href: "https://x.com/Synthetic_Copy/status/2089544756300816493",
    images: [
      { src: "/wallpapers/Synthetic_Copy-2089544756300816493-1.jpg" },
      { src: "/wallpapers/Synthetic_Copy-2089544756300816493-2.jpg" },
      { src: "/wallpapers/Synthetic_Copy-2089544756300816493-3.jpg" },
      { src: "/wallpapers/Synthetic_Copy-2089544756300816493-4.jpg" },
    ],
  },
  {
    name: "Have a Stance",
    description: "",
    credit: "@Synthetic_Copy",
    href: "https://x.com/Synthetic_Copy/status/2087713566912561637",
    images: [
      { src: "/wallpapers/Synthetic_Copy-2087713566912561637-1.jpg" },
      { src: "/wallpapers/Synthetic_Copy-2087713566912561637-2.jpg" },
      { src: "/wallpapers/Synthetic_Copy-2087713566912561637-3.jpg" },
      { src: "/wallpapers/Synthetic_Copy-2087713566912561637-4.jpg" },
    ],
  },
  {
    name: "",
    description: "",
    credit: "@Synthetic_Copy",
    href: "https://x.com/Synthetic_Copy/status/2073461323594125608",
    images: [
      { src: "/wallpapers/Synthetic_Copy-2073461323594125608-1.jpg" },
      { src: "/wallpapers/Synthetic_Copy-2073461323594125608-2.jpg" },
      { src: "/wallpapers/Synthetic_Copy-2073461323594125608-3.jpg" },
    ],
  },
];

// flat list + per-card offset so a slide click maps to the right lightbox index
const FLAT = POSTS.flatMap((p) =>
  p.images.map((img) => ({ ...img, credit: p.credit, href: p.href }))
);
const OFFSETS = (() => {
  let acc = 0;
  return POSTS.map((p) => {
    const o = acc;
    acc += p.images.length;
    return o;
  });
})();

const css = `
.wp-page{
  width:100%; max-width:1400px; margin:0 auto;
  font-family:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --wp-h:min(74vh, 700px);
}
.wp-head{ text-align:center; margin-bottom:52px; }
.wp-title{ font-size:40px; font-weight:800; letter-spacing:0; margin:0 0 10px; }
.wp-sub{ font-size:16px; line-height:1.6; opacity:.6; margin:0 auto; max-width:36rem; text-wrap:balance; }

.wp-group{ margin:0 0 300px; }
.wp-group:last-child{ margin-bottom:40px; }
.wp-meta-card{
  display:flex; align-items:flex-start; justify-content:space-between; gap:20px;
  max-width:1100px; margin:0 auto 20px; padding:20px 24px;
  border-radius:16px;
  background:rgba(120,120,120,.06);
  border:1px solid rgba(120,120,120,.14);
}
.wp-meta-left{ min-width:0; }
.wp-name{ font-size:20px; font-weight:800; letter-spacing:-.01em; margin-bottom:4px; }
.wp-desc{ font-size:14px; line-height:1.55; opacity:.6; max-width:46ch; }
.wp-meta-right{
  display:flex; flex-direction:column; align-items:flex-end; gap:8px;
  flex:0 0 auto; text-align:right;
}
.wp-by{ font-size:15px; font-weight:700; text-decoration:none; color:inherit; white-space:nowrap; }
.wp-by:hover{ text-decoration:underline; }
.wp-viewx{
  display:inline-flex; align-items:center; gap:6px;
  font-size:13px; font-weight:600; text-decoration:none; opacity:.55; color:inherit;
  white-space:nowrap;
}
.wp-viewx:hover{ opacity:1; }
@media (max-width:640px){
  .wp-meta-card{ padding:16px 18px; gap:14px; }
  .wp-name{ font-size:17px; }
}

/* ── embla carousel ── */
.wp-embla{ position:relative; }
.wp-embla-vp{ overflow:hidden; }
.wp-embla-container{ display:flex; gap:18px; align-items:center; padding:0 max(4vw, 24px) 0 0; }
.wp-embla-slide{ flex:0 0 auto; min-width:0; }
.wp-embla-slide img{
  display:block; height:var(--wp-h); width:auto;
  object-fit:contain; border-radius:18px; cursor:zoom-in;
  background:none;
}

/* arrows */
.wp-arrow{
  position:absolute; top:50%; transform:translateY(-50%); z-index:5;
  width:52px; height:52px; border-radius:50%; border:0; cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  background:rgba(20,20,20,.55); color:#fff; font-size:24px; line-height:1;
  backdrop-filter:blur(6px); transition:background .15s, opacity .15s;
}
.wp-arrow:hover{ background:rgba(20,20,20,.8); }
.wp-arrow:disabled{ opacity:0; pointer-events:none; }
.wp-arrow-prev{ left:14px; } .wp-arrow-next{ right:14px; }

/* dots */
.wp-dots{ display:flex; justify-content:center; gap:8px; margin-top:16px; }
.wp-dot{
  width:8px; height:8px; border-radius:50%; border:0; padding:0; cursor:pointer;
  background:rgba(120,120,120,.35); transition:transform .15s, background .15s;
}
.wp-dot.is-sel{ background:currentColor; transform:scale(1.35); }

.wp-empty{
  text-align:center; padding:60px 20px; opacity:.5; font-size:14px;
  border:1px dashed rgba(120,120,120,.35); border-radius:14px;
}

/* lightbox */
.wp-lb{
  position:fixed; inset:0; z-index:100; display:flex; align-items:center; justify-content:center;
  background:rgba(0,0,0,.92); padding:24px; cursor:zoom-out;
}
.wp-lb img{ max-width:100%; max-height:88vh; border-radius:10px; box-shadow:0 20px 60px rgba(0,0,0,.6); }
.wp-lb-bar{
  position:absolute; bottom:26px; left:0; right:0;
  display:flex; align-items:center; justify-content:center; gap:14px; flex-wrap:wrap;
  color:#fff; font-size:13px;
}
.wp-lb-bar a{ color:#fff; }
.wp-x{ display:inline-flex; align-items:center; gap:6px; text-decoration:none; opacity:.85; font-weight:600; }
.wp-x:hover{ opacity:1; }
.wp-lb-bar a.wp-dl{
  display:inline-flex; align-items:center; gap:8px;
  background:#fff; color:#0a0a0a; text-decoration:none;
  font-weight:700; font-size:13px; padding:10px 18px; border-radius:10px;
}
.wp-lb-close{
  position:absolute; top:18px; right:20px; color:#fff; font-size:30px;
  background:none; border:0; cursor:pointer; line-height:1; opacity:.8;
}
.wp-lb-close:hover{ opacity:1; }
.wp-nav{
  position:absolute; top:50%; transform:translateY(-50%);
  background:rgba(255,255,255,.12); color:#fff; border:0; cursor:pointer;
  width:44px; height:44px; border-radius:50%; font-size:22px; line-height:1;
  display:flex; align-items:center; justify-content:center;
}
.wp-nav:hover{ background:rgba(255,255,255,.25); }
.wp-prev{ left:20px; } .wp-next{ right:20px; }

@media (max-width:640px){
  .wp-page{ --wp-h:min(72vh, 640px); }
  .wp-title{ font-size:30px; }
  .wp-embla-container{ gap:12px; padding:0 16px; }
  .wp-embla-slide img{ max-width:86vw; border-radius:14px; }
  .wp-arrow{ width:42px; height:42px; font-size:20px; }
}
`;

function XIcon({ size = 13 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function Carousel({ images, baseIndex, onOpen }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    loop: false,
  });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback((api) => {
    setSelected(api.selectedScrollSnap());
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const multi = images.length > 1;

  return (
    <div className="wp-embla">
      <div className="wp-embla-vp" ref={emblaRef}>
        <div className="wp-embla-container">
          {images.map((img, i) => (
            <div className="wp-embla-slide" key={img.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt="Wallpaper"
                loading="lazy"
                onClick={() => onOpen(baseIndex + i)}
              />
            </div>
          ))}
        </div>
      </div>

      {multi && (
        <>
          <button
            className="wp-arrow wp-arrow-prev"
            aria-label="Previous"
            disabled={!canPrev}
            onClick={() => emblaApi && emblaApi.scrollPrev()}
          >
            ‹
          </button>
          <button
            className="wp-arrow wp-arrow-next"
            aria-label="Next"
            disabled={!canNext}
            onClick={() => emblaApi && emblaApi.scrollNext()}
          >
            ›
          </button>
          <div className="wp-dots">
            {snaps.map((_, i) => (
              <button
                key={i}
                className={`wp-dot${i === selected ? " is-sel" : ""}`}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => emblaApi && emblaApi.scrollTo(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function WallpapersPage() {
  const [active, setActive] = useState(null); // index into FLAT

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (d) => setActive((i) => (i === null ? i : (i + d + FLAT.length) % FLAT.length)),
    []
  );

  const onKey = useCallback(
    (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    },
    [close, step]
  );

  useEffect(() => {
    if (active === null) return;
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, onKey]);

  const current = active !== null ? FLAT[active] : null;

  return (
    <div className="wp-page">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="wp-head">
        <h1 className="wp-title">Wallpapers</h1>
        <p className="wp-sub">
          A collection of highly aesthetic, extremely niche wallpapers I curated,
          because <em>someone</em> has to have taste in this golden era of AI slop.
        </p>
      </div>

      {POSTS.length === 0 ? (
        <div className="wp-empty">No wallpapers yet — coming soon.</div>
      ) : (
        POSTS.map((post, pi) => (
          <section className="wp-group" key={post.href}>
            <div className="wp-meta-card">
              <div className="wp-meta-left">
                {post.name && <div className="wp-name">{post.name}</div>}
                {post.description && <div className="wp-desc">{post.description}</div>}
              </div>
              <div className="wp-meta-right">
                <a className="wp-by" href={post.href} target="_blank" rel="noreferrer">
                  by {post.credit}
                </a>
                <a className="wp-viewx" href={post.href} target="_blank" rel="noreferrer">
                  <XIcon /> View on X
                </a>
              </div>
            </div>
            <Carousel
              images={post.images}
              baseIndex={OFFSETS[pi]}
              onOpen={setActive}
            />
          </section>
        ))
      )}

      {current && (
        <div className="wp-lb" onClick={close}>
          <button className="wp-lb-close" aria-label="Close" onClick={close}>
            &times;
          </button>
          {FLAT.length > 1 && (
            <>
              <button
                className="wp-nav wp-prev"
                aria-label="Previous"
                onClick={(e) => { e.stopPropagation(); step(-1); }}
              >
                ‹
              </button>
              <button
                className="wp-nav wp-next"
                aria-label="Next"
                onClick={(e) => { e.stopPropagation(); step(1); }}
              >
                ›
              </button>
            </>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current.src} alt={current.credit} onClick={(e) => e.stopPropagation()} />
          <div className="wp-lb-bar" onClick={(e) => e.stopPropagation()}>
            <a className="wp-dl" href={current.src} download>
              ↓ Download
            </a>
            <span>
              via{" "}
              <a href={current.href} target="_blank" rel="noreferrer">
                {current.credit}
              </a>
            </span>
            <a className="wp-x" href={current.href} target="_blank" rel="noreferrer">
              <XIcon /> View on X
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
