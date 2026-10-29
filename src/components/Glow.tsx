import React from "react";
import { colors } from "../brand";

/** A soft radial light, centred on (x, y). */
export const Glow: React.FC<{
  x: number;
  y: number;
  size: number;
  opacity?: number;
  color?: string;
}> = ({ x, y, size, opacity = 1, color = colors.signal }) =>
  opacity <= 0 ? null : (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(closest-side, ${color}66 0%, ${color}26 45%, ${color}00 100%)`,
        opacity,
        pointerEvents: "none",
      }}
    />
  );
