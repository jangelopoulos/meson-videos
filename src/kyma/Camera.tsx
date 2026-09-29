import React from "react";
import { AbsoluteFill } from "remotion";

/**
 * Zooms the whole scene so that the point (x, y) in scene coordinates
 * sits at the centre of the frame at the given scale.
 */
export const Camera: React.FC<{
  scale: number;
  x: number;
  y: number;
  children: React.ReactNode;
}> = ({ scale, x, y, children }) => {
  const tx = 960 - x * scale;
  const ty = 540 - y * scale;
  return (
    <AbsoluteFill
      style={{
        transformOrigin: "0 0",
        transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
