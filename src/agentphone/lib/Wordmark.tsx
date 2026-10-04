import React from "react";
import { C, FONT } from "../theme";

// Measured Geist 600 advance widths at −0.035em tracking, in em.
const A_EM = 3.86; // "AgentPh"
const N_EM = 1.11; // "ne"
const D_EM = 0.7; // handset circle = the "o"
const G_EM = 0.03; // gap either side of the circle

export const HANDSET =
  "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z";

/** Where the circle sits once the wordmark is open, relative to centre. */
export const circleOffset = (fs: number) => {
  const a = A_EM * fs;
  const n = N_EM * fs;
  const d = D_EM * fs;
  const g = G_EM * fs;
  const total = a + g + d + g + n;
  return a + g + d / 2 - total / 2;
};

/**
 * AgentPh○ne. `pill` 0→1 stretches the circle into the pill mark (handset +
 * 3 bars); `open` 0→1 slides the circle into the "o" slot while the letters
 * slide out from behind it. pill=0, open=0 is the loop-seam frame: the
 * handset circle alone, centred.
 */
export const Wordmark: React.FC<{
  fs: number;
  cx: number;
  cy: number;
  pill?: number;
  open?: number;
  rotate?: number;
  bars?: number[]; // live waveform heights 0..1
  halo?: { scale: number; opacity: number }[];
  circleScale?: number;
}> = ({ fs, cx, cy, pill = 0, open = 0, rotate = 0, bars = [0.55, 1, 0.5], halo = [], circleScale = 1 }) => {
  const d = D_EM * fs;
  const g = G_EM * fs;
  const a = A_EM * fs;
  const n = N_EM * fs;
  const ccx = cx + open * circleOffset(fs); // circle centre
  const w = d + pill * 0.85 * d;
  const left = ccx - w / 2;
  const top = cy - d / 2;
  const textStyle: React.CSSProperties = {
    fontFamily: FONT,
    fontWeight: 600,
    fontSize: fs,
    lineHeight: 1,
    letterSpacing: "-0.035em",
    color: C.onDark,
    whiteSpace: "pre",
    position: "absolute",
    top: 0,
  };
  return (
    <>
      {/* AgentPh — slides out to the left from behind the circle */}
      <div style={{ position: "absolute", left: ccx - d / 2 - g - a, top: cy - fs * 0.54, width: a, height: fs * 1.2, overflow: "hidden" }}>
        <span style={{ ...textStyle, left: 0, translate: `${(1 - open) * (a + g + d / 2)}px 0px`, opacity: Math.min(1, open * 3) }}>AgentPh</span>
      </div>
      {/* ne — slides out to the right */}
      <div style={{ position: "absolute", left: ccx + d / 2 + g, top: cy - fs * 0.54, width: n + fs * 0.1, height: fs * 1.2, overflow: "hidden" }}>
        <span style={{ ...textStyle, left: 0, translate: `${-(1 - open) * (n + g + d / 2)}px 0px`, opacity: Math.min(1, open * 3) }}>ne</span>
      </div>
      {/* Amber ringing halos */}
      {halo.map((h, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left,
            top,
            width: w,
            height: d,
            borderRadius: d / 2,
            border: `${Math.max(3, d * 0.05)}px solid ${C.ringing}`,
            boxShadow: `0 0 ${d * 0.4}px rgba(245,158,11,.45)`,
            scale: `${h.scale}`,
            opacity: h.opacity,
          }}
        />
      ))}
      {/* The pill / circle */}
      <div
        style={{
          position: "absolute",
          left,
          top,
          width: w,
          height: d,
          borderRadius: d / 2,
          background: C.mint,
          rotate: `${rotate}deg`,
          scale: `${circleScale}`,
          boxShadow: `0 0 ${d * 0.6}px rgba(125,240,182,${0.18 + 0.12 * pill})`,
        }}
      >
        <svg width={d} height={d} viewBox="0 0 40 40" style={{ position: "absolute", left: 0, top: 0 }}>
          <path d={HANDSET} fill={C.callLayer} transform="translate(9.5 9.5) scale(.95)" />
        </svg>
        {pill > 0.01
          ? bars.map((b, i) => {
              const bh = d * (0.25 + 0.3 * b) * Math.min(1, pill * 1.4);
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: d * (0.98 + i * 0.22),
                    top: d / 2 - bh / 2,
                    width: d * 0.125,
                    height: bh,
                    borderRadius: d,
                    background: C.callLayer,
                    opacity: (i === 1 ? 1 : 0.6) * Math.min(1, Math.max(0, pill * 2 - 0.6)),
                  }}
                />
              );
            })
          : null}
      </div>
    </>
  );
};
