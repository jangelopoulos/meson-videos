import { Easing, interpolate } from "remotion";
import { FPS } from "../theme";

// The brief's three motion helpers, frame-driven.
export const EASE_ENTER = Easing.bezier(0.2, 0.8, 0.2, 1);
export const EASE_POP = Easing.bezier(0.34, 1.56, 0.64, 1);
export const EASE_DRAW = Easing.inOut(Easing.cubic);
export const EASE_CAM = Easing.bezier(0.45, 0, 0.2, 1);

export const ms = (n: number) => (n / 1000) * FPS;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0→1 over `dur` frames starting at `at`, with an easing. */
export const prog = (
  f: number,
  at: number,
  dur: number,
  easing: (t: number) => number = EASE_ENTER,
) => interpolate(f, [at, at + dur], [0, 1], { ...clamp, easing });

/** enter = translateY 16→0 + fade, 420ms */
export const enter = (f: number, at: number, dist = 16) => {
  const p = prog(f, at, ms(420));
  return { opacity: p, translate: `0px ${dist * (1 - p)}px` };
};

/** pop = scale .92→1 + fade, 360ms, overshooting curve */
export const pop = (f: number, at: number, from = 0.92) => {
  const p = prog(f, at, ms(360), EASE_POP);
  const o = prog(f, at, ms(200), Easing.linear);
  return { opacity: o, scale: `${from + (1 - from) * p}` };
};

/** draw = 0→1, 600ms ease-in-out cubic */
export const draw = (f: number, at: number, dur = ms(600)) =>
  prog(f, at, dur, EASE_DRAW);

/** Numbers count up over 600ms with ease-out. */
export const count = (
  f: number,
  at: number,
  to: number,
  dur = ms(600),
  from = 0,
) => from + (to - from) * prog(f, at, dur, Easing.out(Easing.cubic));

/** Slide in horizontally from `dx` px + fade. */
export const slide = (f: number, at: number, dx = 40, dur = ms(420)) => {
  const p = prog(f, at, dur);
  return { opacity: p, translate: `${dx * (1 - p)}px 0px` };
};

export const fade = (f: number, at: number, dur = ms(300)) => ({
  opacity: prog(f, at, dur, Easing.linear),
});

/** A one-shot pulse (0→1→0) centred on `at`. */
export const pulse = (f: number, at: number, dur = 14) =>
  interpolate(f, [at, at + dur / 2, at + dur], [0, 1, 0], {
    ...clamp,
    easing: Easing.inOut(Easing.sin),
  });

/** Typewriter: how many chars are visible at ~cps chars/sec. */
export const typed = (text: string, f: number, at: number, cps = 14) =>
  text.slice(0, Math.max(0, Math.floor(((f - at) / FPS) * cps)));
