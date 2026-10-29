import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { beats, colors, copy, sec } from "../brand";
import { Gear } from "../components/Gear";
import { Headline } from "../components/Headline";
import { exitFade, ramp } from "../lib/anim";
import { useLayout } from "../lib/layout";

export const Hook: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const layout = useLayout();
  const { width, height, vertical, type } = layout;

  // A single large gear, mostly off-canvas: a quiet nod to the mechanism.
  const gearScale = vertical ? 2.2 : 2.0;
  return (
    <AbsoluteFill style={{ backgroundColor: colors.black }}>
      <AbsoluteFill style={{ opacity: exitFade(frame, duration) }}>
        <svg width={width} height={height}>
          <Gear
            x={vertical ? width * 0.95 : width * 0.9}
            y={vertical ? height * 0.92 : height * 1.02}
            teeth={48}
            module={8}
            scale={gearScale}
            rotation={frame * 0.12}
            color={colors.grey}
            draw={ramp(frame, 0, sec(1.6))}
            hubRadius={60 * gearScale}
            spokes={8}
          />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: `0 ${layout.marginX}px`,
          opacity: exitFade(frame, duration),
          // Slow camera push-in.
          scale: String(interpolate(frame, [0, duration], [1, 1.06])),
        }}
      >
        <Headline
          text={copy.hook.text}
          highlight={copy.hook.highlight}
          fontSize={type.hook}
          color={colors.white}
          align="center"
          delay={sec(beats.hook.text)}
          maxWidth={vertical ? 900 : 1500}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
