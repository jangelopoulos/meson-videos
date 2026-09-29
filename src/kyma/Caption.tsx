import React from "react";
import { COLORS, EASE_IN, FONT, fadeIn, fadeOut } from "./theme";

/**
 * Bottom-centre caption pill. Slides up at `from`, fades away at `until`.
 */
export const Caption: React.FC<{
  frame: number;
  from: number;
  until: number;
  children: React.ReactNode;
  accent?: string;
  y?: number;
}> = ({ frame, from, until, children, accent = COLORS.green, y = 1000 }) => {
  if (frame < from || frame > until + 12) {
    return null;
  }
  const inT = fadeIn(frame, from, 14);
  const outT = fadeOut(frame, until, 12);
  const opacity = Math.min(inT, outT);
  const rise = (1 - EASE_IN(Math.min(1, Math.max(0, (frame - from) / 14)))) * 24;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: y,
        display: "flex",
        justifyContent: "center",
        opacity,
        translate: `0px ${rise}px`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "14px 28px 14px 22px",
          borderRadius: 999,
          backgroundColor: COLORS.white,
          color: COLORS.ink,
          fontFamily: FONT,
          fontSize: 30,
          fontWeight: 600,
          boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            backgroundColor: accent,
            flexShrink: 0,
          }}
        />
        {children}
      </div>
    </div>
  );
};
