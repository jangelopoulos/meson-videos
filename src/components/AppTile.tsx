import React from "react";
import type { IconName } from "../brand";
import { Icon } from "./Icon";

/**
 * A generic app icon: a solid squircle with a line glyph knocked out of it.
 * Positioned by its centre.
 */
export const AppTile: React.FC<{
  icon: IconName;
  x: number;
  y: number;
  size: number;
  /** Squircle fill. */
  fill: string;
  /** Glyph colour. */
  color: string;
  rotate?: number;
  scale?: number;
  opacity?: number;
  zIndex?: number;
}> = ({
  icon,
  x,
  y,
  size,
  fill,
  color,
  rotate = 0,
  scale = 1,
  opacity = 1,
  zIndex,
}) => (
  <div
    style={{
      position: "absolute",
      left: x - size / 2,
      top: y - size / 2,
      width: size,
      height: size,
      borderRadius: size * 0.27,
      backgroundColor: fill,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      rotate: `${rotate}deg`,
      scale: String(scale),
      opacity,
      zIndex,
    }}
  >
    <Icon
      name={icon}
      size={size * 0.5}
      color={color}
      strokeWidth={Math.max(1.5, size * 0.022)}
    />
  </div>
);
