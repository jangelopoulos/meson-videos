/**
 * Gear-train maths.
 *
 * Gears are spur gears sharing one module (tooth size), so the pitch radius is
 * `module * teeth / 2` and two gears mesh when their centres sit
 * `r1 + r2` apart. A driven gear turns the opposite way at
 * `-(teethDriver / teethDriven)` times the driver's speed, with a phase offset
 * so its teeth sit in the driver's gaps.
 */

export type GearSpec = {
  id: string;
  teeth: number;
  /** Centre, in mechanism units (centre gear at 0,0). */
  x: number;
  y: number;
  /** Id of the gear that drives this one; omit for the driver. */
  parent?: string;
};

export type SolvedGear = GearSpec & {
  pitchRadius: number;
  /** Rotation (deg) = ratio * driverAngle + phase. */
  ratio: number;
  phase: number;
};

export const pitchRadius = (module: number, teeth: number) =>
  (module * teeth) / 2;

/**
 * Solve ratios and phases through the train. Tooth centres are drawn at local
 * angle 0 + k * 360/teeth; the phase puts a tooth of the driver against a gap
 * of the driven gear at their contact point.
 */
export const solveTrain = (specs: GearSpec[], module: number): SolvedGear[] => {
  const solved = new Map<string, SolvedGear>();
  for (const g of specs) {
    const r = pitchRadius(module, g.teeth);
    if (!g.parent) {
      solved.set(g.id, { ...g, pitchRadius: r, ratio: 1, phase: 0 });
      continue;
    }
    const p = solved.get(g.parent);
    if (!p) throw new Error(`Gear ${g.id}: parent ${g.parent} not solved yet`);
    const k = p.teeth / g.teeth;
    const theta = (Math.atan2(g.y - p.y, g.x - p.x) * 180) / Math.PI;
    // phi_child = -k * phi_parent + theta * (1 + k) + 180 - 180 / teeth_child
    const ratio = -k * p.ratio;
    const phase = -k * p.phase + theta * (1 + k) + 180 - 180 / g.teeth;
    solved.set(g.id, { ...g, pitchRadius: r, ratio, phase });
  }
  return specs.map((g) => solved.get(g.id)!);
};

/** Closed SVG path for a gear outline centred on 0,0. */
export const gearPath = (teeth: number, module: number, scale = 1) => {
  const r = pitchRadius(module, teeth) * scale;
  const outer = r + module * 0.9 * scale;
  const root = r - module * 1.05 * scale;
  const step = (Math.PI * 2) / teeth;
  // Fractions of one tooth pitch: tip land, flank, root land, flank.
  const tip = 0.18;
  const flank = 0.14;
  const pts: [number, number][] = [];
  for (let i = 0; i < teeth; i++) {
    const c = i * step; // tooth centre
    const a = [
      [c - step * (tip + flank), root],
      [c - step * tip, outer],
      [c + step * tip, outer],
      [c + step * (tip + flank), root],
    ] as const;
    for (const [ang, rad] of a) {
      pts.push([Math.cos(ang) * rad, Math.sin(ang) * rad]);
    }
  }
  return (
    pts
      .map(
        ([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`,
      )
      .join(" ") + " Z"
  );
};

/** Point along a polyline at distance `d` (clamped). */
export const pointOnPolyline = (pts: { x: number; y: number }[], d: number) => {
  let remaining = Math.max(0, d);
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    if (remaining <= len) {
      const t = len === 0 ? 0 : remaining / len;
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
    }
    remaining -= len;
  }
  return pts[pts.length - 1];
};

export const polylineLength = (pts: { x: number; y: number }[]) =>
  pts.reduce(
    (acc, p, i) =>
      i === 0 ? 0 : acc + Math.hypot(p.x - pts[i - 1].x, p.y - pts[i - 1].y),
    0,
  );
