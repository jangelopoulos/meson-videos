import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { beats, colors, copy, sec } from "../brand";
import { AppTile } from "../components/AppTile";
import { Headline } from "../components/Headline";
import { PriceTag } from "../components/PriceTag";
import { ease, exitFade, mix, ramp } from "../lib/anim";
import { useLayout } from "../lib/layout";
import { tickLabel, tilePlan } from "./tiles";

export const Problem: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const layout = useLayout();
  const { vertical, type } = layout;
  const b = beats.problem;
  const tiles = tilePlan(layout);

  const drift = ease(frame, fps, sec(b.drift), sec(1.8));

  let primaryIndex = 0;
  let extraIndex = 0;
  const rendered = tiles.map((t, i) => {
    const appearAt = t.primary
      ? sec(b.firstTile + b.tileInterval * primaryIndex++)
      : sec(b.drift + 0.15 + 0.16 * extraIndex++);
    const pop = ease(frame, fps, appearAt, 14);
    const x = mix(t.spread.x, t.mess.x, drift);
    const y = mix(t.spread.y, t.mess.y, drift);
    const rot = mix(t.spread.rot, t.mess.rot, drift);
    return { t, i, appearAt, pop, x, y, rot };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.black }}>
      {rendered.map(({ t, i, pop, x, y, rot }) => (
        <AppTile
          key={i}
          icon={t.icon}
          x={x}
          y={y}
          size={t.size}
          rotate={rot}
          fill={t.primary ? colors.white : colors.grey}
          color={colors.black}
          scale={0.6 + 0.4 * pop}
          opacity={pop}
        />
      ))}
      {rendered.map(({ t, i, appearAt, x, y }) => {
        if (!t.label) return null;
        const tagIn = ramp(frame, appearAt + 4, appearAt + 4 + sec(0.7));
        return (
          <PriceTag
            key={`tag-${i}`}
            text={tickLabel(t.label, tagIn)}
            x={x}
            y={y - t.size / 2 - 14}
            fontSize={type.label}
            opacity={Math.min(1, tagIn * 3)}
            rise={(1 - tagIn) * 24}
          />
        );
      })}
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
          maxWidth={vertical ? 900 : 1700}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
