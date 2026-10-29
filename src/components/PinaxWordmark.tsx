import React from "react";
import { colors, fonts, typography } from "../brand";

/**
 * The Pinax wordmark, set live in Schibsted Grotesk 600 so the font is
 * guaranteed in renders. Proportions follow public/brand/pinax-wordmark.svg:
 * ™ at ~18% of the wordmark size, raised 0.583em, with a 0.05em gap.
 */
export const PinaxWordmark: React.FC<{
  size: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ size, color = colors.black, style }) => (
  <div
    style={{
      fontFamily: fonts.wordmark,
      fontWeight: 600,
      fontSize: size,
      lineHeight: 1,
      color,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    <span style={{ letterSpacing: typography.wordmarkTracking }}>pinax</span>
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
