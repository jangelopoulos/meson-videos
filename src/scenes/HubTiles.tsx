import React from "react";
import { colors, copy } from "../brand";
import { AppTile } from "../components/AppTile";
import { hubPx, TILE } from "../components/Mechanism";
import type { MechPose } from "./mech";

/** The six app tiles sitting in the satellite hubs of the mechanism. */
export const HubTiles: React.FC<{
  pose: MechPose;
  color?: string;
  fill?: string;
  /** Per-tile scale multiplier (e.g. a pulse when data arrives). */
  pulse?: (i: number) => number;
  opacity?: number;
}> = ({
  pose,
  color = colors.white,
  fill = colors.black,
  pulse,
  opacity = 1,
}) => (
  <>
    {copy.problem.tiles.map((t, i) => {
      const p = hubPx(i, pose.cx, pose.cy, pose.scale);
      return (
        <AppTile
          key={i}
          icon={t.icon}
          x={p.x}
          y={p.y}
          size={TILE * pose.scale}
          color={color}
          fill={fill}
          scale={pulse ? pulse(i) : 1}
          opacity={opacity}
        />
      );
    })}
  </>
);
