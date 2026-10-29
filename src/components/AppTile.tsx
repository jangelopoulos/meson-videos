import React from "react";
import type { IconName } from "../brand";
import { colors, gradients } from "../brand";
import { Icon } from "./Icon";

/**
 * A generic app icon: a glossy graphite squircle with a white line glyph.
 * Positioned by its centre.
 */
export const AppTile: React.FC<{
  icon: IconName;
  x: number;
  y: number;
  size: number;
  /** Picks one of the graphite tones. */
  tone?: number;
  rotate?: number;
  scale?: number;
  opacity?: number;
  /** Depth-of-field blur in px. */
  blur?: number;
  /** 0..1 orange rim light (when data arrives). */
  lit?: number;
  zIndex?: number;
}> = ({
  icon,
  x,
  y,
  size,
  tone = 0,
  rotate = 0,
  scale = 1,
  opacity = 1,
  blur = 0,
  lit = 0,
  zIndex,
}) => {
  const shadow = `0 ${size * 0.12}px ${size * 0.3}px rgba(0,0,0,0.55)`;
  const rim =
    lit > 0 ? `, 0 0 ${size * 0.5 * lit}px rgba(255,138,61,${0.6 * lit})` : "";
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: size * 0.27,
        backgroundImage: gradients.icon[tone % gradients.icon.length],
        border: `${Math.max(1, size * 0.008)}px solid ${
          lit > 0.05
            ? `rgba(255,170,110,${0.25 + 0.6 * lit})`
            : "rgba(255,255,255,0.12)"
        }`,
        boxShadow: `inset 0 ${Math.max(1, size * 0.012)}px 0 rgba(255,255,255,0.18), ${shadow}${rim}`,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        rotate: `${rotate}deg`,
        scale: String(scale),
        opacity,
        filter: blur > 0.3 ? `blur(${blur}px)` : undefined,
        zIndex,
      }}
    >
      <Icon
        name={icon}
        size={size * 0.48}
        color={lit > 0.05 ? colors.signalPale : colors.white}
        strokeWidth={Math.max(1.4, size * 0.024)}
      />
    </div>
  );
};
