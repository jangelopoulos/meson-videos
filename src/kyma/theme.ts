import { loadFont as loadSerif } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadSans } from "@remotion/google-fonts/SourceSans3";
import { Easing } from "remotion";

const sans = loadSans("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});
const serif = loadSerif("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});
loadSerif("italic", { weights: ["400", "500"], subsets: ["latin"] });

/** UI sans, matching the product. */
export const SANS = sans.fontFamily;
/** Editorial display serif for the luxury layer. */
export const SERIF = serif.fontFamily;
export const FONT = SANS;

export const COLORS = {
  night: "#050B15",
  navy: "#0B1220",
  deep: "#0A1A2E",
  aegean: "#123A5E",
  gold: "#C8A56A",
  goldLight: "#E8D3A6",
  ivory: "#F6F1E7",
  ivoryMuted: "rgba(246,241,231,0.72)",
  ink: "#111827",
  muted: "#6B7280",
  white: "#FFFFFF",
  green: "#3CCB82",
  blue: "#3B4FE4",
  line: "#E5E7EB",
};

/** Smooth "ease out expo" used for camera and object moves. */
export const EASE = Easing.bezier(0.22, 1, 0.36, 1);
export const EASE_IN = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_INOUT = Easing.bezier(0.65, 0, 0.35, 1);
/** Slight overshoot, for things that pop. */
export const EASE_POP = Easing.bezier(0.34, 1.56, 0.64, 1);

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Eased 0 → 1 progress of `duration` frames starting at `start`. */
export const prog = (
  frame: number,
  start: number,
  duration: number,
  easing: (t: number) => number = EASE,
) => easing(clamp01((frame - start) / duration));

export type Keyframe = { at: number; value: number };

/** Interpolate {at, value} keyframes. Equal neighbouring values act as holds. */
export const kf = (frame: number, keys: Keyframe[], easing = EASE): number => {
  if (frame <= keys[0].at) {
    return keys[0].value;
  }
  const last = keys[keys.length - 1];
  if (frame >= last.at) {
    return last.value;
  }
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i];
    const b = keys[i + 1];
    if (frame >= a.at && frame <= b.at) {
      const t = (frame - a.at) / Math.max(1, b.at - a.at);
      return a.value + (b.value - a.value) * easing(t);
    }
  }
  return last.value;
};

export const fadeIn = (frame: number, from: number, duration = 12) =>
  prog(frame, from, duration, EASE_IN);

export const fadeOut = (frame: number, from: number, duration = 12) =>
  1 - fadeIn(frame, from, duration);

export const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
