import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, strokes } from "../brand";
import { GearSpec, solveTrain } from "../lib/gears";
import { Gear } from "./Gear";

/**
 * The Pinax "mechanism": a centre gear driving six satellites, a ring of
 * fine dial ticks behind, and connecting lines between the hubs.
 * All geometry is in mechanism units and scaled to px at render time.
 */
export const MODULE = 8;
export const HUB_R = 46;
export const TILE = 58;
export const CORE_HUB_R = 34;
export const EXTENT = 404; // outer radius of the dial, in units

const SAT_TEETH = [18, 24, 18, 24, 18, 24];
const CORE_TEETH = 36;

const specs: GearSpec[] = [
  { id: "core", teeth: CORE_TEETH, x: 0, y: 0 },
  ...SAT_TEETH.map((teeth, i) => {
    const a = ((-90 + i * 60) * Math.PI) / 180;
    const dist = (MODULE * (CORE_TEETH + teeth)) / 2;
    return {
      id: `s${i}`,
      teeth,
      x: Math.cos(a) * dist,
      y: Math.sin(a) * dist,
      parent: "core",
    };
  }),
];

export const GEARS = solveTrain(specs, MODULE);
export const SATELLITES = GEARS.slice(1);

/** Route the Signal dot travels: through every hub and back to the core. */
export const DOT_ROUTE = [
  { x: 0, y: 0 },
  SATELLITES[0],
  SATELLITES[1],
  { x: 0, y: 0 },
  SATELLITES[2],
  SATELLITES[3],
  { x: 0, y: 0 },
  SATELLITES[4],
  SATELLITES[5],
  { x: 0, y: 0 },
].map(({ x, y }) => ({ x, y }));

/** Lines between hubs, trimmed to the hub rings. */
const LINKS: {
  a: { x: number; y: number };
  b: { x: number; y: number };
  ra: number;
  rb: number;
}[] = [
  ...SATELLITES.map((s) => ({
    a: { x: 0, y: 0 },
    b: s,
    ra: CORE_HUB_R,
    rb: HUB_R,
  })),
  ...SATELLITES.map((s, i) => ({
    a: s,
    b: SATELLITES[(i + 1) % SATELLITES.length],
    ra: HUB_R,
    rb: HUB_R,
  })),
];

export type MechanismProps = {
  cx: number;
  cy: number;
  scale: number;
  /** Driver (centre gear) angle in degrees. */
  angle: number;
  draw?: {
    rings?: number;
    core?: number;
    /** Per-satellite draw progress. */
    satellites?: number[];
    lines?: number;
  };
  gearColor?: string;
  lineColor?: string;
  ringColor?: string;
  /** Signal dot position in mechanism units, or null. */
  dot?: { x: number; y: number } | null;
  /** Point colour overriding Signal for the dot (e.g. white in the outro). */
  dotColor?: string;
  dotRadius?: number;
  opacity?: number;
};

export const Mechanism: React.FC<MechanismProps> = ({
  cx,
  cy,
  scale,
  angle,
  draw = {},
  gearColor = colors.grey,
  lineColor = colors.black,
  ringColor = colors.rule,
  dot = null,
  dotColor = colors.signal,
  dotRadius = 9,
  opacity = 1,
}) => {
  const rings = draw.rings ?? 1;
  const lines = draw.lines ?? 1;
  const s = scale;
  const dash = (p: number) => ({ pathLength: 1, strokeDasharray: `${p} 1` });

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="100%" height="100%" style={{ overflow: "visible" }}>
        <g transform={`translate(${cx} ${cy})`}>
          {/* Dial: concentric rings with fine ticks, counter-rotating slowly. */}
          {rings > 0 ? (
            <g
              fill="none"
              stroke={ringColor}
              strokeWidth={strokes.gear}
              transform={`rotate(${-angle * 0.25})`}
            >
              <circle r={EXTENT * s} {...dash(rings)} />
              <circle r={(EXTENT - 30) * s} {...dash(rings)} />
              {Array.from({ length: 120 }).map((_, i) => {
                const a = (i / 120) * Math.PI * 2;
                const long = i % 10 === 0;
                const r0 = (EXTENT - (long ? 22 : 12)) * s;
                const r1 = (EXTENT - 4) * s;
                return i / 120 < rings ? (
                  <line
                    key={i}
                    x1={Math.cos(a) * r0}
                    y1={Math.sin(a) * r0}
                    x2={Math.cos(a) * r1}
                    y2={Math.sin(a) * r1}
                  />
                ) : null;
              })}
            </g>
          ) : null}

          {GEARS.map((g, i) => (
            <Gear
              key={g.id}
              x={g.x * s}
              y={g.y * s}
              teeth={g.teeth}
              module={MODULE}
              scale={s}
              rotation={g.ratio * angle + g.phase}
              color={gearColor}
              draw={
                i === 0 ? (draw.core ?? 1) : (draw.satellites?.[i - 1] ?? 1)
              }
              hubRadius={(i === 0 ? CORE_HUB_R : HUB_R) * s}
              spokes={i === 0 ? 6 : g.teeth >= 24 ? 4 : 0}
            />
          ))}

          {/* Connecting lines between hubs. */}
          {lines > 0 ? (
            <g
              stroke={lineColor}
              strokeWidth={strokes.line}
              strokeLinecap="round"
            >
              {LINKS.map(({ a, b, ra, rb }, i) => {
                const len = Math.hypot(b.x - a.x, b.y - a.y);
                const ux = (b.x - a.x) / len;
                const uy = (b.y - a.y) / len;
                // Spokes draw first, then the outer ring of links.
                const local = Math.min(
                  1,
                  Math.max(0, lines * 2 - (i < SATELLITES.length ? 0 : 1)),
                );
                return local > 0 ? (
                  <line
                    key={i}
                    x1={(a.x + ux * ra) * s}
                    y1={(a.y + uy * ra) * s}
                    x2={(b.x - ux * rb) * s}
                    y2={(b.y - uy * rb) * s}
                    {...dash(local)}
                  />
                ) : null;
              })}
            </g>
          ) : null}

          {dot ? (
            <circle
              cx={dot.x * s}
              cy={dot.y * s}
              r={dotRadius}
              fill={dotColor}
            />
          ) : null}
        </g>
      </svg>
    </AbsoluteFill>
  );
};

/** Pixel position of a satellite hub for a mechanism at (cx, cy, scale). */
export const hubPx = (i: number, cx: number, cy: number, scale: number) => ({
  x: cx + SATELLITES[i].x * scale,
  y: cy + SATELLITES[i].y * scale,
});
