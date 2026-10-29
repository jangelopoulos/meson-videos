import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors, FRAMES_PER_BEAT, motion } from "../brand";
import { Grain } from "../components/Grain";
import { clamp, snap } from "../lib/anim";

/**
 * Every shot: a background, a camera that pushes in fast over the first beat
 * then keeps drifting (something is always moving), and grain + vignette.
 */
export const Shot: React.FC<{
  bg?: "black" | "white";
  /** Push amount over the first beat (default motion.push). 0 for a locked camera. */
  push?: number;
  children: React.ReactNode;
  /** Extra transform applied to the camera (e.g. zoom-through). */
  cameraStyle?: React.CSSProperties;
}> = ({ bg = "black", push = motion.push, children, cameraStyle }) => {
  const frame = useCurrentFrame();
  const scale =
    1 +
    interpolate(frame, [0, FRAMES_PER_BEAT], [0, push], {
      ...clamp,
      easing: snap,
    }) +
    Math.max(0, frame - FRAMES_PER_BEAT) * push * 0.01;
  return (
    <AbsoluteFill
      style={{
        backgroundColor: bg === "black" ? colors.black : colors.white,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill style={{ scale: String(scale), ...cameraStyle }}>
        {children}
      </AbsoluteFill>
      <Grain opacity={bg === "black" ? 0.08 : 0.05} vignette={bg === "black"} />
    </AbsoluteFill>
  );
};

/** Centred block helper. */
export const Center: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <AbsoluteFill
    style={{ justifyContent: "center", alignItems: "center", ...style }}
  >
    {children}
  </AbsoluteFill>
);
