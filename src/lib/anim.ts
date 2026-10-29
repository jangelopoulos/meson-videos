import { Easing, interpolate, spring } from "remotion";
import { FPS, motion } from "../brand";

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;
export const snap = Easing.bezier(...motion.bezier);

/** High-damping spring, 0 -> 1, starting at `delay`. */
export const ease = (frame: number, delay = 0, durationInFrames?: number) =>
  spring({
    frame: frame - delay,
    fps: FPS,
    config: motion.spring,
    durationInFrames,
  });

/** cubic-bezier(0.22, 1, 0.36, 1) progress between two frames. */
export const prog = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], { ...clamp, easing: snap });

/** Accelerating progress (ease-in). */
export const progIn = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], {
    ...clamp,
    easing: Easing.in(Easing.cubic),
  });

export const lin = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], clamp);

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/** Fast exit, 1 -> 0 over the last `motion.out` frames of a shot. */
export const exitAt = (frame: number, duration: number, len: number = motion.out) =>
  1 - progIn(frame, duration - len, duration);

/** Motion-blur smear (px) for a move whose progress is `p` (peaks mid-move). */
export const smear = (p: number, amount = 14) =>
  Math.sin(Math.PI * Math.min(1, Math.max(0, p))) * amount;
