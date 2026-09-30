import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { EASE_INOUT, lerp } from "./theme";

/** Animated film grain, rendered at half resolution for a softer, filmic texture. */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.07 }) => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 2) % 8;
  const id = `kyma-grain-${seed}`;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity, mixBlendMode: "overlay" }}>
      <svg width={960} height={540} viewBox="0 0 960 540" style={{ width: 1920, height: 1080 }}>
        <filter id={id} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={seed} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="960" height="540" filter={`url(#${id})`} />
      </svg>
    </AbsoluteFill>
  );
};

export const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.55 }) => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background: `radial-gradient(ellipse 75% 70% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,${strength}) 100%)`,
    }}
  />
);

/** Cinematic black bars, top and bottom. */
export const Letterbox: React.FC<{ height: number }> = ({ height }) => (
  <>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height, backgroundColor: "#000" }} />
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height, backgroundColor: "#000" }} />
  </>
);

/** Drifting specks of warm light, like dust in late Aegean sun. */
export const GoldDust: React.FC<{ count?: number; seed?: string; opacity?: number }> = ({
  count = 28,
  seed = "dust",
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity }}>
      {new Array(count).fill(0).map((_, i) => {
        const r = (k: string) => random(`${seed}-${k}-${i}`);
        const size = 3 + r("s") * 7;
        const speed = 0.25 + r("v") * 0.7;
        const x = r("x") * 1920 + Math.sin(frame / 45 + i) * 18;
        const y = ((((r("y") * 1200 - frame * speed) % 1200) + 1200) % 1200) - 60;
        const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(frame / 14 + i * 1.7));
        const alpha = 0.25 + r("a") * 0.75;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - size * 2,
              top: y - size * 2,
              width: size * 4,
              height: size * 4,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(232,211,166,${alpha}) 0%, rgba(232,211,166,0) 60%)`,
              opacity: twinkle,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/** A diagonal glass reflection that sweeps across its parent once. */
export const LightSweep: React.FC<{
  frame: number;
  from: number;
  duration?: number;
  opacity?: number;
}> = ({ frame, from, duration = 30, opacity = 1 }) => {
  if (frame < from || frame > from + duration) {
    return null;
  }
  const t = EASE_INOUT((frame - from) / duration);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: "-60%",
          bottom: "-60%",
          width: "30%",
          left: `${lerp(-60, 130, t)}%`,
          rotate: "18deg",
          opacity,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)",
        }}
      />
    </div>
  );
};

/** Deep Aegean night backdrop with slowly drifting pools of light and a faint horizon. */
export const LuxBackdrop: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse 85% 75% at 50% 42%, #133760 0%, #0A1A2E 48%, #050B15 100%)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 120 + Math.sin(frame / 90) * 140,
          top: -420 + Math.cos(frame / 110) * 90,
          width: 1300,
          height: 1300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,165,106,0.17) 0%, rgba(200,165,106,0) 62%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -300 + Math.cos(frame / 80) * 120,
          bottom: -560 + Math.sin(frame / 100) * 80,
          width: 1500,
          height: 1500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(46,130,180,0.20) 0%, rgba(46,130,180,0) 62%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 780,
          height: 1,
          background:
            "linear-gradient(90deg, rgba(232,211,166,0) 0%, rgba(232,211,166,0.22) 50%, rgba(232,211,166,0) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
