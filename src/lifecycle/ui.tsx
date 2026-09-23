import React from "react";
import { Easing, interpolate } from "remotion";

// Shared look and motion helpers for the lifecycle stages. All stage
// components receive `t`: frames since that stage's connector arrived.

export const FPS = 30;

export const K = {
  teal: "#14B8A6",
  tealDark: "#0E8A7D",
  mintBg: "#E4F3F0",
  ink: "#111111",
  body: "#4E4E4B",
  muted: "#7D7D79",
  faint: "#9C9C98",
  line: "#EFEFEC",
  soft: "#F4F4F1",
  white: "#FFFFFF",
};

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
export const popEase = Easing.out(Easing.back(1.7));

// 0 -> 1 over [start, start + dur] frames.
export const prog = (t: number, start: number, dur: number, easing = easeOut) =>
  interpolate(t, [start, start + dur], [0, 1], { ...clamp, easing });

// Fade + rise entrance (the source spec: "fade + 18px rise, 0.5s").
export const rise = (t: number, start: number, dur = 15, dist = 18): React.CSSProperties => {
  const p = prog(t, start, dur);
  return { opacity: p, translate: `0 ${(1 - p) * dist}px` };
};

export const pop = (t: number, start: number, dur = 14): React.CSSProperties => ({
  opacity: prog(t, start, dur * 0.5, Easing.linear),
  scale: String(interpolate(t, [start, start + dur], [0.4, 1], { ...clamp, easing: popEase })),
});

// Gentle hover, matching the source's alternate ease-in-out bubbleFloat (-4px..5px).
export const hover = (t: number, periodS: number, phaseS: number) => {
  const s = t / FPS + phaseS;
  return -4 + 9 * (0.5 - 0.5 * Math.cos((Math.PI * s) / periodS));
};

// Expanding ring used for "live" dots (the source's pulseDot).
export const pulseShadow = (t: number, size = 6, periodF = 48) => {
  const c = ((t % periodF) + periodF) % periodF / periodF;
  const p = Math.min(1, c / 0.7);
  return `0 0 0 ${size * p}px rgba(14,138,125,${0.45 * (1 - p)})`;
};

// Apple-like surface: generous continuous-looking corners, a soft layered
// shadow, a faint top highlight and a hairline edge so it reads as a solid
// object on the dark background.
export const CARD_RADIUS = 28;
export const CARD_PAD = 22;
export const cardStyle: React.CSSProperties = {
  background: "linear-gradient(180deg, #FFFFFF 0%, #FAFAF8 100%)",
  color: K.ink,
  borderRadius: CARD_RADIUS,
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,.9), 0 0 0 1px rgba(255,255,255,.06), 0 2px 6px rgba(0,0,0,.18), 0 18px 48px rgba(0,0,0,.45)",
  boxSizing: "border-box",
};

// Tick that draws itself on.
export const Check: React.FC<{ p: number; size?: number; color?: string; width?: number }> = ({
  p,
  size = 14,
  color = K.tealDark,
  width = 2.6,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display: "block" }}>
    <path
      d="M20 6 9 17l-5-5"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={23}
      strokeDashoffset={23 * (1 - p)}
    />
  </svg>
);

export const PhoneIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 11 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const DatabaseIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" />
    <path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3" />
  </svg>
);

// A white orbiting bubble (lead sources, CRM logos) that flies in from further
// out, then hovers. Positioned by its centre in the parent's coordinates.
export type Bubble = {
  key: string;
  cx: number;
  cy: number;
  size: number;
  periodS: number;
  phaseS: number;
  content: React.ReactNode;
};

export const OrbitBubble: React.FC<{
  b: Bubble;
  t: number;
  enterAt: number;
  center: { x: number; y: number };
}> = ({ b, t, enterAt, center }) => {
  const p = prog(t, enterAt, 20);
  const dx = (b.cx - center.x) * 0.45 * (1 - p);
  const dy = (b.cy - center.y) * 0.45 * (1 - p);
  return (
    <span
      style={{
        position: "absolute",
        left: b.cx - b.size / 2,
        top: b.cy - b.size / 2,
        width: b.size,
        height: b.size,
        borderRadius: "50%",
        background: K.white,
        boxShadow: "0 8px 22px rgba(0,0,0,.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        opacity: prog(t, enterAt, 10, Easing.linear),
        translate: `${dx}px ${dy + hover(t, b.periodS, b.phaseS)}px`,
        scale: String(0.7 + 0.3 * p),
      }}
    >
      {b.content}
    </span>
  );
};

// Small dot travelling between two points (data flowing between nodes).
export const FlowDot: React.FC<{
  from: { x: number; y: number };
  to: { x: number; y: number };
  t: number;
  start: number;
  dur?: number;
}> = ({ from, to, t, start, dur = 16 }) => {
  const p = prog(t, start, dur, easeInOut);
  if (p <= 0 || p >= 1) return null;
  const x = from.x + (to.x - from.x) * p;
  const y = from.y + (to.y - from.y) * p;
  return (
    <span
      style={{
        position: "absolute",
        left: x - 4,
        top: y - 4,
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: K.teal,
        boxShadow: "0 0 10px rgba(20,184,166,.9)",
        opacity: Math.min(1, p * 4, (1 - p) * 4),
      }}
    />
  );
};
