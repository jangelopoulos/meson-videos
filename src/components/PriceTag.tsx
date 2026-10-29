import React from "react";
import { colors, fonts, typography } from "../brand";

/** Price badge: a black pill, centred above a point (its bottom edge sits at y). */
export const PriceTag: React.FC<{
  text: string;
  x: number;
  y: number;
  fontSize: number;
  opacity?: number;
  /** Extra upward offset in px (for the tick-up entrance). */
  rise?: number;
}> = ({ text, x, y, fontSize, opacity = 1, rise = 0 }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y - rise,
      translate: "-50% -100%",
      fontFamily: fonts.label,
      fontWeight: typography.labelWeight,
      fontVariantNumeric: "tabular-nums",
      fontSize,
      lineHeight: 1,
      letterSpacing: typography.labelTracking,
      color: colors.white,
      backgroundColor: colors.black,
      borderRadius: 999,
      padding: `${fontSize * 0.28}px ${fontSize * 0.5}px`,
      whiteSpace: "nowrap",
      opacity,
      zIndex: 10,
    }}
  >
    {text}
  </div>
);
