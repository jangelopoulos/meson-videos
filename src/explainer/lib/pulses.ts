import { HUB_R, PULSE_ROUTES, SATELLITES } from "../components/Mechanism";
import { pointOnPolyline, polylineLength } from "./gears";

const SPEED = 7; // mechanism units per frame
const TRAIL = 10; // points per comet
const GAP = 11; // units between trail points
const STAGGER = 14; // frames between pulses starting

const LENGTHS = PULSE_ROUTES.map(polylineLength);

/**
 * Comet trails for every pulse at a given *absolute* frame, so pulses flow
 * continuously across scene cuts. `count` limits how many routes are active.
 */
export const pulseTrails = (
  absoluteFrame: number,
  startFrame: number,
  count = PULSE_ROUTES.length,
) =>
  PULSE_ROUTES.slice(0, count).flatMap((route, k) => {
    const t = absoluteFrame - startFrame - k * STAGGER;
    if (t < 0) return [];
    const L = LENGTHS[k];
    const head = t * SPEED;
    return [
      Array.from({ length: TRAIL }, (_, j) => {
        const d = head - j * GAP;
        return pointOnPolyline(route, d < 0 ? 0 : d % L);
      }),
    ];
  });

/** 0..1 for how close any pulse head is to satellite hub `i`. */
export const hubLight = (trails: { x: number; y: number }[][], i: number) => {
  const s = SATELLITES[i];
  return trails.reduce((acc, tr) => {
    const d = Math.hypot(tr[0].x - s.x, tr[0].y - s.y);
    return Math.max(acc, 1 - d / (HUB_R * 1.6));
  }, 0);
};
