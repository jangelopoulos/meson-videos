import React, { useId } from "react";
import { AbsoluteFill } from "remotion";
import { colors, strokes } from "../brand";
import { GearSpec, solveTrain } from "../lib/gears";
import { Gear } from "./Gear";

/**
 * The Pinax "mechanism": a centre gear driving six satellites, a dial of
 * fine ticks behind, connecting lines between the hubs, and a core that
 * glows when the system is alive. A nod to the Antikythera mechanism.
 * All geometry is in mechanism units and scaled to px at render time.
 */
export const MODULE = 8;
export const HUB_R = 46;
export const TILE = 64;
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

type P = { x: number; y: number };

/** Hub-to-hub links: six spokes from the core, then the outer ring. */
export const LINKS: { a: P; b: P; ra: number; rb: number }[] = [
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

/** Closed loops the light pulses travel (in mechanism units). */
export const PULSE_ROUTES: P[][] = [
  [{ x: 0, y: 0 }, SATELLITES[0], SATELLITES[1], { x: 0, y: 0 }],
  [{ x: 0, y: 0 }, SATELLITES[2], SATELLITES[3], { x: 0, y: 0 }],
  [{ x: 0, y: 0 }, SATELLITES[4], SATELLITES[5], { x: 0, y: 0 }],
  [
    SATELLITES[1],
    SATELLITES[2],
    { x: 0, y: 0 },
    SATELLITES[5],
    SATELLITES[0],
    SATELLITES[1],
  ],
  [SATELLITES[3], SATELLITES[4], { x: 0, y: 0 }, SATELLITES[3]],
].map((r) => r.map(({ x, y }) => ({ x, y })));

export type MechanismProps = {
  cx: number;
  cy: number;
  scale: number;
  /** Driver (centre gear) angle in degrees. */
  angle: number;
  draw?: {
    rings?: number;
    core?: number;
    satellites?: number[];
    lines?: number;
  };
  /** 0..1 intensity of the orange core light. */
  glow?: number;
  /** Light pulses: each is a list of points, head first, in mechanism units. */
  pulses?: P[][];
  opacity?: number;
};

export const Mechanism: React.FC<MechanismProps> = ({
  cx,
  cy,
  scale,
  angle,
  draw = {},
  glow = 0,
  pulses = [],
  opacity = 1,
}) => {
  const id = useId().replace(/:/g, "");
  const rings = draw.rings ?? 1;
  const lines = draw.lines ?? 1;
  const s = scale;
  const dash = (p: number) => ({ pathLength: 1, strokeDasharray: `${p} 1` });

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="100%" height="100%" style={{ overflow: "visible" }}>
        <defs>
          <radialGradient id={`${id}-core`}>
            <stop offset="0%" stopColor={colors.signalHot} stopOpacity={0.55} />
            <stop offset="35%" stopColor={colors.signal} stopOpacity={0.22} />
            <stop offset="100%" stopColor={colors.signal} stopOpacity={0} />
          </radialGradient>
          <radialGradient id={`${id}-pulse`}>
            <stop offset="0%" stopColor={colors.signalHot} stopOpacity={0.9} />
            <stop offset="100%" stopColor={colors.signal} stopOpacity={0} />
          </radialGradient>
        </defs>
        <g transform={`translate(${cx} ${cy})`}>
          {glow > 0 ? (
            <circle
              r={EXTENT * 1.25 * s * (0.6 + 0.4 * glow)}
              fill={`url(#${id}-core)`}
              opacity={glow}
            />
          ) : null}

          {/* Dial: concentric rings with fine ticks, counter-rotating slowly. */}
          {rings > 0 ? (
            <g
              fill="none"
              strokeWidth={strokes.gear}
              transform={`rotate(${-angle * 0.25})`}
            >
              <circle
                r={EXTENT * s}
                stroke="rgba(255,255,255,0.16)"
                {...dash(rings)}
              />
              <circle
                r={(EXTENT - 30) * s}
                stroke="rgba(255,255,255,0.10)"
                {...dash(rings)}
              />
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
                    stroke={
                      long ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.18)"
                    }
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
              color="rgba(255,255,255,0.34)"
              draw={
                i === 0 ? (draw.core ?? 1) : (draw.satellites?.[i - 1] ?? 1)
              }
              hubRadius={(i === 0 ? CORE_HUB_R : HUB_R) * s}
              spokes={i === 0 ? 6 : g.teeth >= 24 ? 4 : 0}
            />
          ))}

          {lines > 0 ? (
            <g
              stroke={colors.lineStrong}
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

          {/* Light pulses with comet trails. */}
          {pulses.map((trail, pi) => (
            <g key={pi}>
              <circle
                cx={trail[0].x * s}
                cy={trail[0].y * s}
                r={34}
                fill={`url(#${id}-pulse)`}
                opacity={0.7}
              />
              {trail.map((p, ti) => {
                const t = 1 - ti / trail.length;
                return (
                  <circle
                    key={ti}
                    cx={p.x * s}
                    cy={p.y * s}
                    r={6 * t + 1}
                    fill={ti === 0 ? colors.signalPale : colors.signalHot}
                    opacity={ti === 0 ? 1 : t * 0.6}
                  />
                );
              })}
            </g>
          ))}

          {/* The core. */}
          {glow > 0 ? (
            <>
              <circle
                r={22 * s * glow}
                fill={colors.signal}
                opacity={0.35 * glow}
              />
              <circle r={11 * s * glow + 3} fill={colors.signalPale} />
            </>
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
