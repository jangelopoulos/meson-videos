import React from "react";
import { COLORS, fadeIn, fadeOut } from "./theme";

/**
 * Dims everything except a rounded rectangle. Place it inside the scrolling
 * content so the rectangle is expressed in content coordinates.
 */
export const Spotlight: React.FC<{
  frame: number;
  from: number;
  until: number;
  x: number;
  y: number;
  w: number;
  h: number;
  color?: string;
  radius?: number;
}> = ({ frame, from, until, x, y, w, h, color = COLORS.green, radius = 18 }) => {
  if (frame < from || frame > until + 12) {
    return null;
  }
  const opacity = Math.min(fadeIn(frame, from, 12), fadeOut(frame, until, 12));
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: radius,
        boxShadow: `0 0 0 4px ${color}, 0 0 0 6000px rgba(11,18,32,0.55)`,
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};

/** Thin outline used for hover states on cards and buttons. */
export const Outline: React.FC<{
  frame: number;
  from: number;
  until: number;
  x: number;
  y: number;
  w: number;
  h: number;
  color?: string;
  radius?: number;
}> = ({ frame, from, until, x, y, w, h, color = COLORS.blue, radius = 16 }) => {
  if (frame < from || frame > until + 10) {
    return null;
  }
  const opacity = Math.min(fadeIn(frame, from, 8), fadeOut(frame, until, 10));
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: radius,
        boxShadow: `0 0 0 3px ${color}, 0 16px 40px rgba(17,24,39,0.25)`,
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};
