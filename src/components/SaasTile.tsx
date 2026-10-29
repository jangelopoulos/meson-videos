import React from "react";
import { colors, fonts, type } from "../brand";
import { GlassCard } from "./GlassCard";

/**
 * A third-party product shown by name only: frosted tile, monochrome initial,
 * product name and a mono price tag. `peel` (0..1) lifts the name and price off.
 */
export const SaasTile: React.FC<{
  name: string;
  price: string;
  width: number;
  solid?: boolean;
  peel?: number;
  style?: React.CSSProperties;
}> = ({ name, price, width, solid, peel = 0, style }) => {
  const h = width * 0.34;
  const d = h * 0.52;
  return (
    <GlassCard
      solid={solid}
      radius={h * 0.3}
      style={{
        width,
        height: h,
        display: "flex",
        alignItems: "center",
        gap: h * 0.2,
        padding: `0 ${h * 0.24}px`,
        ...style,
      }}
    >
      <div
        style={{
          width: d,
          height: d,
          flexShrink: 0,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.35)",
          backgroundColor: "rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: fonts.headline,
          fontWeight: 600,
          fontSize: d * 0.46,
          color: colors.white,
        }}
      >
        {name[0]}
      </div>
      <div
        style={{
          minWidth: 0,
          opacity: 1 - peel,
          translate: `${peel * width * 0.25}px ${-peel * h * 0.8}px`,
          rotate: `${peel * -8}deg`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.body,
            fontWeight: 600,
            fontSize: h * 0.24,
            lineHeight: 1.1,
            color: colors.white,
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </div>
        <div
          style={{
            marginTop: h * 0.06,
            fontFamily: fonts.mono,
            fontSize: h * 0.15,
            letterSpacing: type.monoTracking,
            color: colors.grey,
            whiteSpace: "nowrap",
          }}
        >
          {price}
        </div>
      </div>
    </GlassCard>
  );
};
