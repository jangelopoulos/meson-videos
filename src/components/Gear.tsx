import React, { useMemo } from "react";
import { strokes } from "../brand";
import { gearPath, pitchRadius } from "../lib/gears";

type Props = {
  /** Centre, in px. */
  x: number;
  y: number;
  teeth: number;
  /** Tooth module in mechanism units; multiplied by `scale` for px. */
  module: number;
  scale: number;
  /** Rotation in degrees. */
  rotation: number;
  color: string;
  /** 0..1 stroke draw-on progress. */
  draw?: number;
  /** Hub ring radius in px (0 to omit). */
  hubRadius?: number;
  /** Number of spokes between hub and inner ring (0 to omit). */
  spokes?: number;
  strokeWidth?: number;
};

/**
 * Thin-line spur gear drawn as an SVG group. Strokes stay a constant pixel
 * width because geometry is scaled, not the group.
 */
export const Gear: React.FC<Props> = ({
  x,
  y,
  teeth,
  module,
  scale,
  rotation,
  color,
  draw = 1,
  hubRadius = 0,
  spokes = 0,
  strokeWidth = strokes.gear,
}) => {
  const d = useMemo(
    () => gearPath(teeth, module, scale),
    [teeth, module, scale],
  );
  const r = pitchRadius(module, teeth) * scale;
  const innerRing = r - module * 2.6 * scale;
  if (draw <= 0) return null;

  const dash = { pathLength: 1, strokeDasharray: `${draw} 1` };
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotation})`}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    >
      <path d={d} {...dash} />
      {spokes > 0 ? (
        <>
          <circle r={innerRing} {...dash} />
          {Array.from({ length: spokes }).map((_, i) => {
            const a = (i / spokes) * Math.PI * 2;
            const r0 = hubRadius;
            return (
              <line
                key={i}
                x1={Math.cos(a) * r0}
                y1={Math.sin(a) * r0}
                x2={Math.cos(a) * innerRing}
                y2={Math.sin(a) * innerRing}
                {...dash}
              />
            );
          })}
        </>
      ) : null}
      {hubRadius > 0 ? <circle r={hubRadius} {...dash} /> : null}
    </g>
  );
};
