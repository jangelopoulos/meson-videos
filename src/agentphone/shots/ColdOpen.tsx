import React from "react";
import { AbsoluteFill, Easing, interpolate, useVideoConfig } from "remotion";
import { EASE_POP, enter, pop, prog } from "../lib/anim";
import { HANDSET } from "../lib/Wordmark";
import { useT } from "../lib/time";
import { C, FONT, MONO } from "../theme";

export const COLD_LEN = 116;
const SPREAD = 4; // the handset circle multiplies into 40 calls
const RED = 62; // most of them flash red: missed or never logged
const NOTES = 87; // "0 notes" lands on the downbeat (beat 6)
const MERGE = 100; // survivors fly back into one circle for the logo

// Deterministic pseudo-random so every render is identical.
const rand = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** 40 positions around the frame, leaving the centre clear for the type. */
const field = (w: number, h: number) => {
  const v = h > w;
  const cols = v ? 6 : 10;
  const rows = v ? 11 : 6;
  const cells: { x: number; y: number; i: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = ((c + 0.5) / cols) * w;
      const y = ((r + 0.5) / rows) * h;
      const clear = v ? Math.abs(y - h / 2) < 330 : Math.abs(x - w / 2) < 520 && Math.abs(y - h / 2) < 200;
      if (!clear) cells.push({ x, y, i: cells.length });
    }
  }
  return cells
    .map((c) => ({ ...c, k: rand(c.i) }))
    .sort((a, b) => a.k - b.k)
    .slice(0, 40)
    .map((c, n) => ({
      x: c.x + (rand(n + 50) - 0.5) * (w / cols) * 0.5,
      y: c.y + (rand(n + 90) - 0.5) * (h / rows) * 0.5,
      red: n % 5 !== 0, // 32 of 40 go red
      n,
    }));
};

// 0:00–0:04 · Cold open on the problem: 40 calls a day → 0 notes.
export const ColdOpenShot: React.FC<{ muted?: boolean }> = ({ muted = false }) => {
  const f = useT();
  const { width: w, height: h } = useVideoConfig();
  const v = h > w;
  const D = 140; // matches the wordmark circle, so frame 0 = the loop seam
  const d = 54;
  const pts = field(w, h);
  const count = Math.round(interpolate(f, [SPREAD + 2, SPREAD + 34], [0, 40], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) }));
  const seed = 1 - prog(f, SPREAD, 8, Easing.in(Easing.quad)); // the opening circle
  const textOut = 1 - prog(f, MERGE - 6, 8, Easing.linear);
  const line1 = enter(f, SPREAD + 6, 24);
  const line2 = pop(f, NOTES, 0.85);
  const merged = prog(f, COLD_LEN - 5, 4, Easing.linear);
  return (
    <AbsoluteFill style={{ background: C.callLayer }}>
      {pts.map((p) => {
        const at = SPREAD + 2 + p.n * 0.8;
        const out = prog(f, at, 10, EASE_POP);
        if (out <= 0) return null;
        const red = p.red ? prog(f, RED + (p.n % 7), 3, Easing.linear) : 0;
        const fadeRed = p.red ? 1 - 0.85 * prog(f, RED + 10 + (p.n % 7), 10, Easing.linear) : 1;
        // survivors fly to the centre and merge into the logo circle
        const m = p.red ? 0 : prog(f, MERGE, COLD_LEN - MERGE - 2, Easing.inOut(Easing.cubic));
        const goneRed = p.red ? 1 - prog(f, MERGE - 4, 8, Easing.linear) : 1;
        const x = interpolate(m, [0, 1], [w / 2 + (p.x - w / 2) * out, w / 2]);
        const y = interpolate(m, [0, 1], [h / 2 + (p.y - h / 2) * out, h / 2]);
        const size = interpolate(m, [0, 1], [d, D]);
        return (
          <div
            key={p.n}
            style={{
              position: "absolute",
              left: x - size / 2,
              top: y - size / 2,
              width: size,
              height: size,
              borderRadius: "50%",
              background: red > 0.5 ? C.terminal : C.mint,
              boxShadow: red > 0.5 ? "0 0 24px rgba(225,29,72,.55)" : `0 0 ${size * 0.6}px rgba(125,240,182,.25)`,
              opacity: Math.min(1, out * 1.5) * fadeRed * goneRed * (1 - merged),
              scale: `${0.6 + 0.4 * out}`,
            }}
          >
            <svg width={size} height={size} viewBox="0 0 40 40">
              <path d={HANDSET} fill={red > 0.5 ? "#fff" : C.callLayer} transform="translate(9.5 9.5) scale(.95)" />
            </svg>
          </div>
        );
      })}
      {/* The handset circle: first frame (loop seam) and last frame (into the logo). */}
      <div
        style={{
          position: "absolute",
          left: w / 2 - D / 2,
          top: h / 2 - D / 2,
          width: D,
          height: D,
          borderRadius: "50%",
          background: C.mint,
          boxShadow: `0 0 ${D * 0.6}px rgba(125,240,182,.18)`,
          opacity: Math.max(seed, merged),
          scale: `${f < MERGE ? 0.4 + 0.6 * seed : 1}`,
        }}
      >
        <svg width={D} height={D} viewBox="0 0 40 40">
          <path d={HANDSET} fill={C.callLayer} transform="translate(9.5 9.5) scale(.95)" />
        </svg>
      </div>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: v ? 26 : 18, opacity: textOut }}>
        <div style={{ ...line1, display: "flex", alignItems: "baseline", gap: 24, flexDirection: v ? "column" : "row", ...(v ? { alignItems: "center", gap: 0 } : {}) }}>
          <span style={{ fontFamily: MONO, fontWeight: 600, fontSize: v ? 220 : 200, color: C.onDark, lineHeight: 1, letterSpacing: "-0.04em" }}>
            {String(count).padStart(2, " ")}
          </span>
          <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: v ? 84 : 88, color: C.onDark, letterSpacing: "-0.035em" }}>calls a day.</span>
        </div>
        <div style={{ ...line2, display: "flex", alignItems: "baseline", gap: 20, fontFamily: FONT, fontWeight: 600, fontSize: v ? 76 : 80, letterSpacing: "-0.035em", color: C.onDark, textAlign: "center", flexWrap: "wrap", justifyContent: "center", maxWidth: v ? 900 : 1500 }}>
          <span style={{ color: "rgba(232,245,238,.5)" }}>→</span>
          <span style={{ fontFamily: MONO, color: "#fb5e7e" }}>0</span>
          <span>{muted ? "notes in the CRM." : "notes."}</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
