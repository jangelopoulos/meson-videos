import React from "react";
import { COLORS, EASE, kf } from "./theme";

export type CursorKey = { at: number; x: number; y: number };

/**
 * Animated pointer. Moves between keyframes (scene coordinates) and
 * shows a click ripple at each frame listed in `clicks`.
 */
export const Cursor: React.FC<{
  frame: number;
  keys: CursorKey[];
  clicks?: number[];
  hideAfter?: number;
}> = ({ frame, keys, clicks = [], hideAfter }) => {
  if (frame < keys[0].at - 8) {
    return null;
  }
  if (hideAfter !== undefined && frame > hideAfter) {
    return null;
  }
  const x = kf(
    frame,
    keys.map((k) => ({ at: k.at, value: k.x })),
    EASE,
  );
  const y = kf(
    frame,
    keys.map((k) => ({ at: k.at, value: k.y })),
    EASE,
  );
  const appear = Math.min(1, Math.max(0, (frame - (keys[0].at - 8)) / 8));

  // Press animation: cursor scales down briefly on click.
  let press = 1;
  for (const c of clicks) {
    if (frame >= c && frame <= c + 6) {
      press = 0.85;
    }
  }

  return (
    <>
      {clicks.map((c) => {
        if (frame < c || frame > c + 22) {
          return null;
        }
        const t = (frame - c) / 22;
        return (
          <div
            key={c}
            style={{
              position: "absolute",
              left: x - 36,
              top: y - 36,
              width: 72,
              height: 72,
              borderRadius: 36,
              border: `3px solid ${COLORS.blue}`,
              backgroundColor: "rgba(59,79,228,0.18)",
              scale: String(0.3 + t * 0.9),
              opacity: 1 - t,
              pointerEvents: "none",
            }}
          />
        );
      })}
      <svg
        width={34}
        height={40}
        viewBox="0 0 34 40"
        style={{
          position: "absolute",
          left: x - 3,
          top: y - 2,
          opacity: appear,
          scale: String(press),
          transformOrigin: "3px 2px",
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.35))",
        }}
      >
        <path
          d="M3 2 L3 31 L10.5 24 L16 36 L22 33.5 L16.5 22 L26 22 Z"
          fill={COLORS.ink}
          stroke={COLORS.white}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};
