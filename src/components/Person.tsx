import React from "react";
import { colors, gradients } from "../brand";

/** A team member: a glossy graphite disc with a simple head-and-shoulders glyph. */
export const Person: React.FC<{
  x: number;
  y: number;
  size: number;
  tone?: number;
  opacity?: number;
  scale?: number;
}> = ({ x, y, size, tone = 0, opacity = 1, scale = 1 }) => (
  <div
    style={{
      position: "absolute",
      left: x - size / 2,
      top: y - size / 2,
      width: size,
      height: size,
      borderRadius: "50%",
      backgroundImage: gradients.icon[tone % gradients.icon.length],
      border: "1px solid rgba(255,255,255,0.14)",
      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.18), 0 ${size * 0.12}px ${size * 0.3}px rgba(0,0,0,0.5)`,
      boxSizing: "border-box",
      overflow: "hidden",
      opacity,
      scale: String(scale),
    }}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill={colors.white}
      opacity={0.85}
    >
      <circle cx="20" cy="16" r="6.5" />
      <path d="M7 40 C7 30 13 25.5 20 25.5 C27 25.5 33 30 33 40 Z" />
    </svg>
  </div>
);
