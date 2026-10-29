import React from "react";
import { AbsoluteFill } from "remotion";
import { copy } from "../brand";
import { AppTile } from "../components/AppTile";
import {
  hubPx,
  Mechanism,
  MechanismProps,
  TILE,
} from "../components/Mechanism";
import type { MechPose } from "./mech";

/**
 * The mechanism plus the app icons sitting in its hubs, on a plane that can
 * tilt back in 3D (rotateX around the mechanism centre).
 */
export const MechStage: React.FC<{
  pose: MechPose;
  angle: number;
  draw?: MechanismProps["draw"];
  glow?: number;
  pulses?: MechanismProps["pulses"];
  /** Show the six hub icons. */
  hubTiles?: boolean;
  /** Per-hub orange light, 0..1. */
  lit?: (i: number) => number;
  opacity?: number;
  children?: React.ReactNode;
}> = ({
  pose,
  angle,
  draw,
  glow,
  pulses,
  hubTiles = true,
  lit,
  opacity = 1,
  children,
}) => (
  <AbsoluteFill
    style={{
      transform: `perspective(2400px) rotateX(${pose.tilt}deg)`,
      transformOrigin: `${pose.cx}px ${pose.cy}px`,
      opacity,
    }}
  >
    <Mechanism
      cx={pose.cx}
      cy={pose.cy}
      scale={pose.scale}
      angle={angle}
      draw={draw}
      glow={glow}
      pulses={pulses}
    />
    {hubTiles
      ? copy.problem.tiles.map((t, i) => {
          const p = hubPx(i, pose.cx, pose.cy, pose.scale);
          const l = lit ? lit(i) : 0;
          return (
            <AppTile
              key={i}
              icon={t.icon}
              x={p.x}
              y={p.y}
              size={TILE * pose.scale}
              tone={i}
              lit={l}
              scale={1 + 0.1 * l}
            />
          );
        })
      : null}
    {children}
  </AbsoluteFill>
);
