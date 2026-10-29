import type { Layout } from "../lib/layout";

/** Mechanism position (px) and scale for each scene that shows it. */
export type MechPose = { cx: number; cy: number; scale: number };

export const mechPose = (
  layout: Layout,
  scene: "connect" | "ai" | "stick",
): MechPose => {
  if (layout.vertical) {
    return {
      connect: { cx: 540, cy: 1130, scale: 1.0 },
      ai: { cx: 540, cy: 870, scale: 0.6 },
      stick: { cx: 540, cy: 1130, scale: 0.8 },
    }[scene];
  }
  return {
    connect: { cx: 960, cy: 440, scale: 0.78 },
    ai: { cx: 560, cy: 440, scale: 0.78 },
    stick: { cx: 960, cy: 440, scale: 0.78 },
  }[scene];
};

export const mixPose = (a: MechPose, b: MechPose, t: number): MechPose => ({
  cx: a.cx + (b.cx - a.cx) * t,
  cy: a.cy + (b.cy - a.cy) * t,
  scale: a.scale + (b.scale - a.scale) * t,
});

/** People gathered around the mechanism, as offsets (px) from its centre. */
export const peopleOffsets = (layout: Layout) => {
  const angles = layout.vertical
    ? [-90, -30, 30, 90, 150, 210]
    : [-35, 0, 35, 145, 180, 215];
  const r = layout.vertical ? 420 : 455;
  return angles.map((a) => {
    const rad = (a * Math.PI) / 180;
    return {
      x: Math.cos(rad) * r,
      y: Math.sin(rad) * r,
      ux: Math.cos(rad),
      uy: Math.sin(rad),
    };
  });
};

export const PERSON_SIZE = { landscape: 120, vertical: 120 };
