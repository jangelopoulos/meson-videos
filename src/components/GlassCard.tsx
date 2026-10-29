import React from "react";
import { glass } from "../brand";

/**
 * Frosted glass: translucent white fill, backdrop blur, hairline border and a
 * long soft shadow. `solid` swaps backdrop blur for an opaque fill (perf).
 */
export const GlassCard: React.FC<{
  children?: React.ReactNode;
  style?: React.CSSProperties;
  radius?: number;
  solid?: boolean;
  light?: boolean;
  /** Signal glow along the top edge. */
  glowEdge?: number;
}> = ({
  children,
  style,
  radius = glass.radius,
  solid = false,
  light = false,
  glowEdge = 0,
}) => (
  <div
    style={{
      position: "relative",
      borderRadius: radius,
      backgroundColor: light
        ? glass.lightFill
        : solid
          ? glass.solidFill
          : glass.fill,
      backdropFilter:
        solid || light ? undefined : `blur(${glass.blur}px) saturate(1.2)`,
      border: `1px solid ${light ? glass.lightBorder : glass.border}`,
      boxShadow: `${light ? glass.lightShadow : glass.shadow}${
        glowEdge > 0
          ? `, inset 0 1.5px 0 rgba(228,87,30,${glowEdge}), 0 -6px 40px rgba(228,87,30,${0.25 * glowEdge})`
          : ", inset 0 1px 0 rgba(255,255,255,0.12)"
      }`,
      boxSizing: "border-box",
      ...style,
    }}
  >
    {children}
  </div>
);
