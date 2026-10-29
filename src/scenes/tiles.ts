import type { IconName } from "../brand";
import { copy } from "../brand";
import type { Layout } from "../lib/layout";

/**
 * Shared tile choreography for the problem -> cost -> connect scenes, so the
 * tiles hand over seamlessly between scenes.
 *
 * "Primary" tiles carry a price label (from copy.problem.tiles).
 * "Extra" tiles are smaller, unlabelled, and fill out the clutter.
 */
type Pt = { x: number; y: number; rot: number };

export type TilePlan = {
  icon: IconName;
  label?: string;
  size: number;
  primary: boolean;
  /** Where the tile first pops in. */
  spread: Pt;
  /** The cluttered, overlapping arrangement it drifts into. */
  mess: Pt;
  /** The jammed cluster in the cost scene. */
  cluster: Pt;
};

const LANDSCAPE = {
  primarySize: 170,
  extraSize: 116,
  spread: [
    { x: 400, y: 300, rot: 0 },
    { x: 960, y: 300, rot: 0 },
    { x: 1520, y: 300, rot: 0 },
    { x: 400, y: 620, rot: 0 },
    { x: 960, y: 620, rot: 0 },
    { x: 1520, y: 620, rot: 0 },
  ],
  mess: [
    { x: 560, y: 330, rot: -6 },
    { x: 900, y: 300, rot: 4 },
    { x: 1300, y: 340, rot: -3 },
    { x: 700, y: 570, rot: 7 },
    { x: 1060, y: 595, rot: -5 },
    { x: 1400, y: 575, rot: 3 },
  ],
  extras: [
    { x: 790, y: 440, rot: 12 },
    { x: 1180, y: 470, rot: -10 },
    { x: 450, y: 540, rot: -8 },
    { x: 1560, y: 430, rot: 9 },
    { x: 1000, y: 430, rot: -14 },
    { x: 1240, y: 640, rot: 6 },
  ],
  messCenter: { x: 990, y: 470 },
  clusterCenter: { x: 470, y: 380 },
  clusterSpread: 0.3,
};

const VERTICAL = {
  primarySize: 190,
  extraSize: 130,
  spread: [
    { x: 290, y: 850, rot: 0 },
    { x: 790, y: 850, rot: 0 },
    { x: 660, y: 1170, rot: 0 },
    { x: 250, y: 1170, rot: 0 },
    { x: 290, y: 1490, rot: 0 },
    { x: 790, y: 1490, rot: 0 },
  ],
  mess: [
    { x: 350, y: 870, rot: -6 },
    { x: 765, y: 930, rot: 5 },
    { x: 600, y: 1130, rot: -3 },
    { x: 330, y: 1340, rot: 7 },
    { x: 730, y: 1360, rot: -5 },
    { x: 480, y: 1530, rot: 3 },
  ],
  extras: [
    { x: 560, y: 1000, rot: 12 },
    { x: 860, y: 1180, rot: -10 },
    { x: 220, y: 1100, rot: -8 },
    { x: 560, y: 1330, rot: 9 },
    { x: 820, y: 1530, rot: -14 },
    { x: 230, y: 1520, rot: 6 },
  ],
  messCenter: { x: 540, y: 1200 },
  clusterCenter: { x: 540, y: 820 },
  clusterSpread: 0.3,
};

const EXTRA_ICONS: IconName[] = [
  "chart",
  "chat",
  "grid",
  "envelope",
  "calendar",
  "phone",
];

export const tilePlan = (layout: Layout): TilePlan[] => {
  const c = layout.vertical ? VERTICAL : LANDSCAPE;
  const toCluster = (p: Pt, i: number): Pt => ({
    x: c.clusterCenter.x + (p.x - c.messCenter.x) * c.clusterSpread,
    y: c.clusterCenter.y + (p.y - c.messCenter.y) * c.clusterSpread,
    rot: p.rot * 1.6 + (i % 2 ? 4 : -4),
  });

  const extras: TilePlan[] = c.extras.map((p, i) => ({
    icon: EXTRA_ICONS[i % EXTRA_ICONS.length],
    size: c.extraSize,
    primary: false,
    spread: p,
    mess: p,
    cluster: toCluster(p, i + 6),
  }));
  const primaries: TilePlan[] = copy.problem.tiles.map((t, i) => ({
    icon: t.icon,
    label: t.label,
    size: c.primarySize,
    primary: true,
    spread: c.spread[i % c.spread.length],
    mess: c.mess[i % c.mess.length],
    cluster: toCluster(c.mess[i % c.mess.length], i),
  }));
  // Extras first so they sit behind the labelled tiles.
  return [...extras, ...primaries];
};

/** Scale tiles take on in the jammed cluster. */
export const CLUSTER_SCALE = 0.62;

/** Small deterministic jitter used while the tiles are jammed. */
export const jamShake = (frame: number, i: number, amount: number) => ({
  x: Math.sin(frame * 1.7 + i * 2.1) * amount,
  y: Math.cos(frame * 1.3 + i * 1.3) * amount,
});

/** Animate the first number found in `label` from 0 up to its value. */
export const tickLabel = (label: string, progress: number) =>
  label.replace(/\d+(?:\.\d+)?/, (m) => {
    const decimals = m.includes(".") ? m.split(".")[1].length : 0;
    return (parseFloat(m) * progress).toFixed(decimals);
  });
