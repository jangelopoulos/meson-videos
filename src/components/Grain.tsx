import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

/**
 * Film grain (seeded turbulence that changes every frame) and an optional
 * soft vignette.
 */
export const Grain: React.FC<{ opacity?: number; vignette?: boolean }> = ({
  opacity = 0.07,
  vignette = true,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {vignette ? (
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      ) : null}
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          inset: 0,
          opacity,
          mixBlendMode: "overlay",
        }}
      >
        <filter id="pinax-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={2}
            seed={frame % 97}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#pinax-grain)" />
      </svg>
    </AbsoluteFill>
  );
};
