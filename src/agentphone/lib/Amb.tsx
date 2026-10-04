import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

type Kind = "ccFloat" | "ccWave" | "ccShimmer" | "ccPulse" | "ccRing";

// Frame-driven replacements for the brief's CSS keyframes, so the ambient
// motion (aurora drift, waveform, ringing halos) renders deterministically.
export const ambStyle = (
  kind: Kind,
  seconds: number,
  dur: number,
  delay = 0,
  reverse = false,
): React.CSSProperties => {
  const t0 = Math.max(0, seconds - delay) / dur;
  let t = t0 - Math.floor(t0);
  if (reverse) t = 1 - t;
  const wave = (1 - Math.cos(2 * Math.PI * t)) / 2; // 0→1→0, eased
  switch (kind) {
    case "ccFloat":
      return { translate: `${22 * wave}px ${26 * wave}px` };
    case "ccWave":
      return { scale: `1 ${0.3 + 0.7 * wave}` };
    case "ccShimmer":
      return { backgroundPosition: `${-180 + 360 * t}px 0` };
    case "ccPulse":
      return { opacity: 1 - 0.65 * wave };
    case "ccRing": {
      const e = 1 - Math.pow(1 - t, 2);
      return { scale: `${1 + 0.5 * e}`, opacity: 0.5 * (1 - e) };
    }
  }
};

export const Amb: React.FC<{
  as?: string;
  kind: Kind;
  dur: number;
  delay?: number;
  reverse?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ as = "div", kind, dur, delay = 0, reverse, style, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = ambStyle(kind, frame / fps, dur, delay, reverse);
  const merged: React.CSSProperties = { ...style, ...a };
  if (a.opacity !== undefined && style?.opacity !== undefined) {
    merged.opacity = Number(style.opacity) * Number(a.opacity);
  }
  return React.createElement(as, { style: merged }, children);
};
