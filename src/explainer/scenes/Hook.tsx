import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { beats, colors, copy, sec } from "../brand";
import { Glow } from "../components/Glow";
import { Headline } from "../components/Headline";
import { exitFade, ramp } from "../lib/anim";
import { useLayout } from "../lib/layout";

export const Hook: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const layout = useLayout();
  const { width, height, vertical, type } = layout;
  const out = exitFade(frame, duration);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.black }}>
      <Glow
        x={width / 2}
        y={height * (vertical ? 0.62 : 0.72)}
        size={vertical ? 1600 : 1900}
        opacity={ramp(frame, sec(1.2), sec(3)) * 0.5 * out}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: `0 ${layout.marginX}px`,
          opacity: out,
          // Slow camera push-in.
          scale: String(interpolate(frame, [0, duration], [1, 1.08])),
        }}
      >
        <Headline
          text={copy.hook.text}
          highlight={copy.hook.highlight}
          fontSize={type.hero}
          color={colors.white}
          align="center"
          delay={sec(beats.hook.text)}
          maxWidth={vertical ? 900 : 1560}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
