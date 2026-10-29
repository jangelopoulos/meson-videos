import type { Layout } from "../lib/layout";

/** Mechanism position (px), scale and tilt (deg, rotateX) per scene. */
export type MechPose = { cx: number; cy: number; scale: number; tilt: number };

export const mechPose = (
  layout: Layout,
  scene: "connect" | "ai" | "stick",
): MechPose => {
  if (layout.vertical) {
    return {
      connect: { cx: 540, cy: 1150, scale: 0.95, tilt: 0 },
      ai: { cx: 540, cy: 820, scale: 0.85, tilt: 52 },
      stick: { cx: 540, cy: 1130, scale: 0.82, tilt: 0 },
    }[scene];
  }
  return {
    connect: { cx: 960, cy: 420, scale: 0.72, tilt: 0 },
    ai: { cx: 600, cy: 480, scale: 0.86, tilt: 54 },
    stick: { cx: 960, cy: 420, scale: 0.72, tilt: 0 },
  }[scene];
};

export const mixPose = (a: MechPose, b: MechPose, t: number): MechPose => ({
  cx: a.cx + (b.cx - a.cx) * t,
  cy: a.cy + (b.cy - a.cy) * t,
  scale: a.scale + (b.scale - a.scale) * t,
  tilt: a.tilt + (b.tilt - a.tilt) * t,
});

/** People gathered around the mechanism: angles (deg) on an ellipse (px). */
export const peopleRing = (layout: Layout) => ({
  angles: layout.vertical
    ? [-90, -30, 30, 90, 150, 210]
    : [-36, 0, 36, 144, 180, 216],
  rx: layout.vertical ? 420 : 480,
  ry: layout.vertical ? 400 : 330,
  size: layout.vertical ? 132 : 124,
});
