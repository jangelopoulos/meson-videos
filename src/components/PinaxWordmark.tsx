import React from "react";
import { colors, fonts } from "../brand";

/**
 * The Pinax wordmark, set live in Schibsted Grotesk 600. Proportions follow
 * public/brand/pinax-wordmark.svg: -0.06em tracking, ™ at ~18% size, raised
 * 0.583em (top-aligned to the ascenders) with a 0.05em gap.
 */
export const PinaxWordmark: React.FC<{
  size: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ size, color = colors.black, style }) => (
  <div
    style={{
      fontFamily: fonts.headline,
      fontWeight: 600,
      fontSize: size,
      lineHeight: 1,
      color,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    <span style={{ letterSpacing: "-0.06em" }}>pinax</span>
    <span
      style={{
        fontSize: size * 0.183,
        letterSpacing: 0,
        marginLeft: size * 0.05,
        position: "relative",
        top: -size * 0.583,
      }}
    >
      ™
    </span>
  </div>
);
