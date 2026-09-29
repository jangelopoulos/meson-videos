import { loadFont } from "@remotion/google-fonts/SourceSans3";
import { Easing } from "remotion";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

export const FONT = fontFamily;

export const COLORS = {
  navy: "#0B1220",
  navySoft: "#151E31",
  ink: "#111827",
  muted: "#6B7280",
  line: "#E5E7EB",
  paper: "#F7F7F5",
  white: "#FFFFFF",
  green: "#15803D",
  greenSoft: "#E8F5EC",
  blue: "#3B4FE4",
  blueSoft: "#E8EBFF",
  amber: "#C2410C",
  amberSoft: "#FFF1E6",
  beige: "#F2EFE6",
};

/** Smooth "ease out expo" used for camera, scroll and cursor moves. */
export const EASE = Easing.bezier(0.22, 1, 0.36, 1);

/** Standard fade/slide-in easing for text. */
export const EASE_IN = Easing.bezier(0.16, 1, 0.3, 1);

export type Keyframe = { at: number; value: number };

/**
 * Interpolate a list of {at, value} keyframes. Segments with equal values act as holds.
 * Clamped on both ends.
 */
export const kf = (frame: number, keys: Keyframe[], easing = EASE): number => {
  if (keys.length === 1) {
    return keys[0].value;
  }
  return interpolateKeys(frame, keys, easing);
};

const interpolateKeys = (
  frame: number,
  keys: Keyframe[],
  easing: (t: number) => number,
) => {
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

/** 0 → 1 fade helper with clamping. */
export const fadeIn = (frame: number, from: number, duration = 12) => {
  if (frame <= from) {
    return 0;
  }
  if (frame >= from + duration) {
    return 1;
  }
  return EASE_IN((frame - from) / duration);
};

/** 1 → 0 fade helper with clamping. */
export const fadeOut = (frame: number, from: number, duration = 12) => {
  return 1 - fadeIn(frame, from, duration);
};
