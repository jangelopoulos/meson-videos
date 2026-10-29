import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { beats, colors, copy, sec } from "../brand";
import { AppTile } from "../components/AppTile";
import { Headline } from "../components/Headline";
import { PriceTag } from "../components/PriceTag";
import { ease, exitFade, mix, ramp } from "../lib/anim";
import { useLayout } from "../lib/layout";
import { tickLabel, tilePlan } from "./tiles";

/** Gentle float so the icons feel suspended in space. */
export const bob = (frame: number, i: number) => ({
  x: Math.sin(frame / 41 + i * 1.7) * 7,
  y: Math.cos(frame / 33 + i * 2.3) * 9,
});

export const Problem: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const layout = useLayout();
  const { vertical, type } = layout;
  const b = beats.problem;
  const tiles = tilePlan(layout);

  // Icons drift from a neat grid into an overlapping mess as more arrive.
  const drift = ease(frame, fps, sec(b.line2 - 0.6), sec(2));

  let primaryIndex = 0;
  let extraIndex = 0;
  const rendered = tiles.map((t, i) => {
    const appearAt = t.primary
      ? sec(b.firstTile + b.tileInterval * primaryIndex++)
      : sec(b.line2 - 0.5 + 0.12 * extraIndex++);
    const pop = ease(frame, fps, appearAt, 18);
    const f = bob(frame, i);
    return {
      t,
      i,
      appearAt,
      pop,
      x: mix(t.spread.x, t.mess.x, drift) + f.x,
      y: mix(t.spread.y, t.mess.y, drift) + f.y,
      rot: mix(t.spread.rot, t.mess.rot, drift),
    };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.black }}>
      {/* Continuous slow push-in on the icons; Cost continues from 1.04. */}
      <AbsoluteFill
        style={{ scale: String(interpolate(frame, [0, duration], [1, 1.04])) }}
      >
        {rendered.map(({ t, i, pop, x, y, rot }) => (
          <AppTile
            key={i}
            icon={t.icon}
            x={x}
            y={y}
            size={t.size}
            tone={i}
            rotate={rot}
            scale={0.5 + 0.5 * pop}
            opacity={pop * (t.primary ? 1 : 0.7)}
            blur={(1 - pop) * 16 + (t.primary ? 0 : 2.5)}
          />
        ))}
        {rendered.map(({ t, i, appearAt, x, y }) => {
          if (!t.label) return null;
          const tagIn = ramp(frame, appearAt + 6, appearAt + 6 + sec(0.8));
          return (
            <PriceTag
              key={`tag-${i}`}
              text={tickLabel(t.label, tagIn)}
              x={x}
              y={y - t.size / 2 - 16}
              fontSize={type.label}
              opacity={Math.min(1, tagIn * 3)}
              rise={(1 - tagIn) * 24}
            />
          );
        })}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          opacity: exitFade(frame, duration),
          padding: `${layout.marginTop}px ${layout.marginX}px ${layout.marginBottom}px`,
          justifyContent: vertical ? "flex-start" : "flex-end",
          alignItems: "center",
        }}
      >
        <Headline
          text={copy.problem.lines}
          fontSize={type.headline}
          color={colors.white}
          align="center"
          delay={sec(b.line1)}
          replaceEvery={sec(b.line2 - b.line1)}
          maxWidth={vertical ? 900 : 1760}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
