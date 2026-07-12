"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Press_Start_2P, JetBrains_Mono } from "next/font/google";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

/* ── QUEST CONFIG — edit PRICE and TIERS, everything scales ── */
const PRICE = 9.99;
const TIERS = [
  { sales: 15, name: "MINIMUM SUCCESS" },
  { sales: 30, name: "GOOD MONTH" },
  { sales: 50, name: "AMAZING MONTH" },
];
// old goals:
// const GOAL_SALES = 501; // ~$5,000 by end of July
// const GOAL_SALES = 30;  // $299.70

const GOAL_SALES = TIERS[TIERS.length - 1].sales; // bar ends at the top tier
const GOAL = PRICE * GOAL_SALES;
const CELLS = Math.min(GOAL_SALES, 50); // one cell per sale, capped for big goals

const tierIndex = (s) => TIERS.filter((t) => s >= t.sales).length;
const tierName = (s) => (tierIndex(s) === 0 ? "GRINDING" : TIERS[tierIndex(s) - 1].name);
const nextTier = (s) => TIERS.find((t) => s < t.sales);
const STORAGE_KEY = "revenue-quest-v1";
const DEADLINE = new Date("2026-07-31T23:59:59");


/* ---------- 8-bit sound engine (WebAudio, zero assets) ---------- */
function useSfx() {
  const ctxRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);
  mutedRef.current = muted;

  const ctx = () => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  };

  const blip = (freq, t0, dur, type = "square", vol = 0.12) => {
    const ac = ctx();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ac.currentTime + t0);
    gain.gain.setValueAtTime(vol, ac.currentTime + t0);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + t0 + dur);
    osc.connect(gain).connect(ac.destination);
    osc.start(ac.currentTime + t0);
    osc.stop(ac.currentTime + t0 + dur + 0.02);
  };

  return {
    muted,
    toggleMute: () => setMuted((m) => !m),
    coin: () => {
      if (mutedRef.current) return;
      blip(987.77, 0, 0.09); // B5
      blip(1318.51, 0.08, 0.28); // E6 — classic coin
    },
    minus: () => {
      if (mutedRef.current) return;
      blip(392, 0, 0.1);
      blip(261.63, 0.09, 0.22);
    },
    levelUp: () => {
      if (mutedRef.current) return;
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
        blip(f, i * 0.09, 0.14, "square", 0.14)
      );
    },
    fanfare: () => {
      if (mutedRef.current) return;
      const melody = [523.25, 523.25, 523.25, 659.25, 783.99, 659.25, 1046.5];
      melody.forEach((f, i) => blip(f, i * 0.13, 0.18, "square", 0.16));
      melody.forEach((f, i) => blip(f / 2, i * 0.13, 0.18, "triangle", 0.1));
    },
  };
}

/* ---------- animated number count-up ---------- */
function useCountUp(target) {
  const [display, setDisplay] = useState(target);
  const fromRef = useRef(target);
  const rafRef = useRef(null);

  useEffect(() => {
    const from = fromRef.current;
    if (from === target) return;
    const start = performance.now();
    const dur = 350;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (target - from) * eased);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target]);

  return display;
}

let particleId = 0;

export default function GoalPage() {
  const [sales, setSales] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [particles, setParticles] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [levelFlash, setLevelFlash] = useState(null);
  const [shake, setShake] = useState(false);
  const sfx = useSfx();

  const revenue = sales * PRICE;
  const pct = Math.min(revenue / GOAL, 1);
  const complete = sales >= GOAL_SALES;
  const displayRevenue = useCountUp(revenue);

  const daysLeft = useMemo(() => {
    const ms = DEADLINE.getTime() - Date.now();
    return Math.max(Math.ceil(ms / 86400000), 0);
  }, [sales]);

  /* load / save */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSales(JSON.parse(raw).sales || 0);
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify({ sales }));
  }, [sales, loaded]);

  const spawnParticle = (text, color) => {
    const id = particleId++;
    const x = 42 + Math.random() * 16;
    setParticles((p) => [...p, { id, text, color, x }]);
    setTimeout(() => setParticles((p) => p.filter((q) => q.id !== id)), 1100);
  };

  const spawnConfetti = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const burst = Array.from({ length: 28 }, () => ({
      id: particleId++,
      x: Math.random() * 100,
      delay: Math.random() * 0.3,
      dur: 1.4 + Math.random() * 1.2,
      color: ["#ffd23f", "#3ddc84", "#ff5d5d", "#5db9ff", "#ffffff"][
        Math.floor(Math.random() * 5)
      ],
    }));
    setConfetti(burst);
    setTimeout(() => setConfetti([]), 3000);
  };

  const addSale = () => {
    const next = sales + 1;
    setSales(next);
    spawnParticle(`+$${PRICE}`, "#3ddc84");

    if (next >= GOAL_SALES && sales < GOAL_SALES) {
      sfx.fanfare();
      spawnConfetti();
      setLevelFlash(`${TIERS[TIERS.length - 1].name}!`);
      setTimeout(() => setLevelFlash(null), 2600);
    } else if (tierIndex(next) > tierIndex(sales)) {
      sfx.levelUp();
      spawnConfetti();
      setLevelFlash(`${tierName(next)}!`);
      setTimeout(() => setLevelFlash(null), 2200);
    } else {
      sfx.coin();
    }
  };

  const removeSale = () => {
    if (sales === 0) return;
    setSales(sales - 1);
    sfx.minus();
    spawnParticle(`-$${PRICE}`, "#ff5d5d");
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }
  };

  const filledCells = Math.floor(pct * CELLS);
  const partial = pct * CELLS - filledCells > 0.001;

  const cellColor = (i) => {
    const salesAtCell = ((i + 1) * GOAL_SALES) / CELLS;
    if (salesAtCell > TIERS[1].sales) return "#ffd23f";
    if (salesAtCell > TIERS[0].sales) return "#7be04f";
    return "#3ddc84";
  };

  return (
    <div
      className={`${pressStart.variable} ${jetbrains.variable} rq-page ${
        shake ? "rq-shake" : ""
      }`}
    >
      <style>{css}</style>

      {/* confetti layer */}
      <div className="rq-confetti-layer" aria-hidden="true">
        {confetti.map((c) => (
          <span
            key={c.id}
            className="rq-confetti"
            style={{
              left: `${c.x}%`,
              background: c.color,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.dur}s`,
            }}
          />
        ))}
      </div>

      {/* level up flash */}
      {levelFlash && (
        <div className="rq-flash" role="status">
          {levelFlash}
        </div>
      )}

      <main className="rq-frame">
        {/* header */}
        <header className="rq-header">
          <div>
            <p className="rq-eyebrow">JULY QUEST · {daysLeft} DAYS LEFT</p>
            <h1 className="rq-title">REVENUE QUEST</h1>
          </div>
          <button
            className="rq-mute"
            onClick={sfx.toggleMute}
            aria-label={sfx.muted ? "Unmute sounds" : "Mute sounds"}
          >
            {sfx.muted ? "SFX OFF" : "SFX ON"}
          </button>
        </header>

        {/* score */}
        <section className="rq-score-row">
          <div className="rq-score">
            <span className="rq-money">
              ${displayRevenue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="rq-goal">/ ${GOAL.toFixed(2)} GOAL</span>
          </div>
          <div className="rq-pct">{Math.floor(pct * 100)}%</div>
        </section>

        {/* THE quest bar */}
        <section
          className="rq-bar-wrap"
          role="progressbar"
          aria-valuenow={Math.round(revenue)}
          aria-valuemin={0}
          aria-valuemax={GOAL}
          aria-label="Revenue progress toward $5,000"
        >
          <div className="rq-bar">
            {Array.from({ length: CELLS }, (_, i) => (
              <span
                key={i}
                className={`rq-cell ${
                  i < filledCells
                    ? "rq-cell-on"
                    : i === filledCells && partial
                    ? "rq-cell-edge"
                    : ""
                }`}
                style={
                  i < filledCells
                    ? { background: cellColor(i) }
                    : i === filledCells && partial
                    ? { background: cellColor(i) }
                    : undefined
                }
              />
            ))}
            <img
              src="/goal-flag.png"
              alt=""
              className={`rq-flag ${complete ? "rq-flag-won" : ""}`}
              aria-hidden="true"
            />
          </div>
          {/* tier milestones */}
          <div className="rq-ticks" aria-hidden="true">
            {TIERS.slice(0, -1).map((t) => (
              <span
                key={t.sales}
                className={`rq-tick ${sales >= t.sales ? "rq-tick-hit" : ""}`}
                style={{ left: `${(t.sales * 100) / GOAL_SALES}%` }}
              >
                <i />
                {t.sales}
              </span>
            ))}
          </div>
        </section>

        {/* controls */}
        <section className="rq-controls">
          <button className="rq-btn rq-btn-minus" onClick={removeSale} disabled={sales === 0}>
            −
          </button>
          <div className="rq-controls-mid">
            <p className="rq-controls-label">1 SALE = ${PRICE}</p>
            {particles.map((p) => (
              <span
                key={p.id}
                className="rq-particle"
                style={{ left: `${p.x}%`, color: p.color }}
              >
                {p.text}
              </span>
            ))}
          </div>
          <button className="rq-btn rq-btn-plus" onClick={addSale}>
            +
          </button>
        </section>

        {/* stats */}
        <section className="rq-stats">
          <div className="rq-stat">
            <span className="rq-stat-label">SALES</span>
            <span className="rq-stat-value">{sales}</span>
          </div>
          <div className="rq-stat">
            <span className="rq-stat-label">TIER {tierIndex(sales)}/{TIERS.length}</span>
            <span className="rq-stat-value rq-stat-rank">{tierName(sales)}</span>
          </div>
          <div className="rq-stat">
            <span className="rq-stat-label">
              {complete ? "TO GOAL" : `TO ${nextTier(sales).name.split(" ")[0]}`}
            </span>
            <span className="rq-stat-value">
              {complete ? "DONE!" : `${nextTier(sales).sales - sales} sales`}
            </span>
          </div>
        </section>

        {complete && (
          <p className="rq-complete-msg">★ YOU BEAT THE GAME. GO TOUCH GRASS. ★</p>
        )}
      </main>
    </div>
  );
}

const css = `
.rq-page {
  position: fixed;
  inset: 0;
  z-index: 30;
  overflow-y: auto;
  min-height: 100vh;
  background: #0b0b12;
  color: #fff;
  font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  overflow-x: hidden;
  image-rendering: pixelated;
  background-image:
    linear-gradient(rgba(139,139,167,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(139,139,167,0.05) 1px, transparent 1px);
  background-size: 24px 24px;
}
.rq-shake { animation: rq-shake 0.3s steps(2) 2; }
@keyframes rq-shake {
  0%,100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.rq-frame {
  width: 100%;
  max-width: 720px;
  background: #101019;
  border: 4px solid #fff;
  box-shadow: 0 0 0 4px #0b0b12, 0 0 0 8px #2a2a3d, 12px 12px 0 8px #000;
  padding: 32px 28px 28px;
  position: relative;
}

.rq-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 28px;
}
.rq-eyebrow {
  font-size: 10px;
  letter-spacing: 2px;
  color: #ff5d5d;
  margin-bottom: 10px;
}
.rq-title {
  font-family: var(--font-press-start), monospace;
  font-size: clamp(16px, 4vw, 26px);
  color: #ffd23f;
  text-shadow: 3px 3px 0 #b8471b, 6px 6px 0 #000;
  line-height: 1.3;
}
.rq-mute {
  font-family: var(--font-press-start), monospace;
  font-size: 8px;
  color: #8b8ba7;
  background: none;
  border: 2px solid #2a2a3d;
  padding: 8px 10px;
  cursor: pointer;
  flex-shrink: 0;
}
.rq-mute:hover { color: #fff; border-color: #8b8ba7; }
.rq-mute:focus-visible, .rq-btn:focus-visible {
  outline: 3px solid #ffd23f;
  outline-offset: 3px;
}

.rq-score-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}
.rq-score { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; }
.rq-money {
  font-family: var(--font-press-start), monospace;
  font-size: clamp(20px, 5vw, 32px);
  color: #3ddc84;
  text-shadow: 3px 3px 0 #0a4d26;
  font-variant-numeric: tabular-nums;
}
.rq-goal { font-size: 11px; color: #8b8ba7; letter-spacing: 1px; }
.rq-pct {
  font-family: var(--font-press-start), monospace;
  font-size: 16px;
  color: #fff;
  padding-right: 44px;
}

.rq-bar-wrap { margin-top: 64px; margin-bottom: 44px; position: relative; }
.rq-bar {
  display: flex;
  gap: 2px;
  background: #0b0b12;
  border: 3px solid #fff;
  box-shadow: 4px 4px 0 #000;
  padding: 4px;
  height: 36px;
  position: relative;
}
.rq-cell {
  flex: 1;
  background: #1c1c2b;
  transition: background 0.15s steps(2);
}
.rq-cell-edge { animation: rq-blink 0.6s steps(1) infinite; }
@keyframes rq-blink { 50% { background: #1c1c2b !important; } }
.rq-flag {
  position: absolute;
  right: -4px;
  bottom: calc(100% - 6px);
  height: 88px;
  width: auto;
  image-rendering: pixelated;
  filter: drop-shadow(2px 2px 0 #000);
}
.rq-flag-won {
  filter: drop-shadow(2px 2px 0 #000) drop-shadow(0 0 6px #ffd23f);
  animation: rq-hop 0.5s steps(2) infinite;
}
@keyframes rq-hop {
  50% { transform: translateY(-6px); }
}
.rq-ticks { position: relative; height: 22px; }
.rq-tick {
  position: absolute;
  transform: translateX(-50%);
  font-size: 9px;
  color: #4a4a63;
  letter-spacing: 1px;
  text-align: center;
  padding-top: 8px;
}
.rq-tick i {
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 6px;
  background: #4a4a63;
}
.rq-tick-hit { color: #ffd23f; }
.rq-tick-hit i { background: #ffd23f; }

.rq-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}
.rq-btn {
  font-family: var(--font-press-start), monospace;
  font-size: 28px;
  width: 84px;
  height: 72px;
  border: 3px solid #fff;
  cursor: pointer;
  color: #0b0b12;
  flex-shrink: 0;
  transition: transform 0.05s steps(1), box-shadow 0.05s steps(1);
}
.rq-btn-plus { background: #3ddc84; box-shadow: 0 6px 0 #0a4d26, 0 6px 0 3px #000; }
.rq-btn-minus { background: #ff5d5d; box-shadow: 0 6px 0 #7a1f1f, 0 6px 0 3px #000; }
.rq-btn:active:not(:disabled) { transform: translateY(6px); box-shadow: 0 0 0 #000; }
.rq-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.rq-controls-mid {
  flex: 1;
  text-align: center;
  position: relative;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.rq-controls-label { font-size: 10px; letter-spacing: 2px; color: #8b8ba7; }
.rq-particle {
  position: absolute;
  bottom: 40%;
  font-family: var(--font-press-start), monospace;
  font-size: 13px;
  text-shadow: 2px 2px 0 #000;
  animation: rq-float 1.1s steps(8) forwards;
  pointer-events: none;
}
@keyframes rq-float {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-64px); opacity: 0; }
}

.rq-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.rq-stat {
  border: 2px solid #2a2a3d;
  background: #0b0b12;
  padding: 14px 12px;
  text-align: center;
}
.rq-stat-label {
  display: block;
  font-size: 9px;
  letter-spacing: 2px;
  color: #8b8ba7;
  margin-bottom: 10px;
}
.rq-stat-value {
  font-family: var(--font-press-start), monospace;
  font-size: 14px;
  color: #fff;
  line-height: 1.5;
}
.rq-stat-rank { font-size: 10px; color: #ffd23f; }

.rq-complete-msg {
  margin-top: 24px;
  text-align: center;
  font-family: var(--font-press-start), monospace;
  font-size: 11px;
  color: #ffd23f;
  animation: rq-blink 1s steps(1) infinite;
}

.rq-flash {
  position: fixed;
  top: 18%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  font-family: var(--font-press-start), monospace;
  font-size: clamp(14px, 3.5vw, 24px);
  color: #ffd23f;
  text-shadow: 3px 3px 0 #b8471b, 6px 6px 0 #000;
  animation: rq-pop 0.4s steps(3);
  white-space: nowrap;
  pointer-events: none;
}
@keyframes rq-pop {
  0% { transform: translateX(-50%) scale(0); }
  60% { transform: translateX(-50%) scale(1.3); }
  100% { transform: translateX(-50%) scale(1); }
}

.rq-confetti-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 40;
  overflow: hidden;
}
.rq-confetti {
  position: absolute;
  top: -12px;
  width: 8px;
  height: 8px;
  animation: rq-fall linear forwards;
}
@keyframes rq-fall {
  from { transform: translateY(0) rotate(0deg); }
  to { transform: translateY(105vh) rotate(540deg); }
}

@media (prefers-reduced-motion: reduce) {
  .rq-cell-edge, .rq-complete-msg, .rq-flag-won { animation: none; }
  .rq-particle { animation-duration: 0.01s; }
}

@media (max-width: 520px) {
  .rq-frame { padding: 24px 16px; }
  .rq-btn { width: 64px; height: 60px; font-size: 22px; }
  .rq-stats { grid-template-columns: 1fr; }
  .rq-stat { display: flex; justify-content: space-between; align-items: center; }
  .rq-stat-label { margin-bottom: 0; }
}
`;
