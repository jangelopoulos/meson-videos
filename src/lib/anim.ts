import { Easing, interpolate, spring } from "remotion";
import { motion } from "../brand";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Critically damped spring (0 -> 1) starting at `delay` frames. */
export const ease = (
  frame: number,
  fps: number,
  delay = 0,
  durationInFrames?: number,
) =>
  spring({
    frame: frame - delay,
    fps,
    config: motion.spring,
    durationInFrames,
  });

/** Quick eased fade/progress 0 -> 1 between two frames. */
export const ramp = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

/** Symmetric ease-in-out progress 0 -> 1. */
export const rampInOut = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });

/** Opacity that fades out over the last `motion.textExit` frames of a scene. */
export const exitFade = (frame: number, sceneDuration: number) =>
  interpolate(frame, [sceneDuration - motion.textExit, sceneDuration], [1, 0], {
    ...clamp,
    easing: Easing.in(Easing.cubic),
  });

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
