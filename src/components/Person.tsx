import React from "react";
import { strokes } from "../brand";

/** Minimal line-drawn person: head and shoulders. Positioned by centre. */
export const Person: React.FC<{
  x: number;
  y: number;
  size: number;
  color: string;
  opacity?: number;
}> = ({ x, y, size, color, opacity = 1 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    stroke={color}
    strokeWidth={(strokes.icon * 40) / size}
    strokeLinecap="round"
    style={{
      position: "absolute",
      left: x - size / 2,
      top: y - size / 2,
      opacity,
      overflow: "visible",
    }}
  >
    <circle cx="20" cy="13" r="7" />
    <path d="M6 36 C6 27 12 23 20 23 C28 23 34 27 34 36" />
  </svg>
);
