import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  beats,
  colors,
  copy,
  fonts,
  gradients,
  sec,
  typography,
} from "../brand";
import { AppTile } from "../components/AppTile";
import { Glow } from "../components/Glow";
import { Headline } from "../components/Headline";
import { PriceTag } from "../components/PriceTag";
import { ease, exitFade, mix, ramp } from "../lib/anim";
import { useLayout } from "../lib/layout";
import { sceneFrames } from "../timeline";
import { bob } from "./Problem";
import { CLUSTER_SCALE, jamShake, tilePlan } from "./tiles";

const withCommas = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const Cost: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const layout = useLayout();
  const { vertical, type } = layout;
  const b = beats.cost;
  const c = copy.cost;
  const tiles = tilePlan(layout);

  const jam = ease(frame, fps, 0, sec(1.2));
  const tagsOut = 1 - ramp(frame, 0, 10);

  const value = interpolate(
    frame,
    [sec(b.counter), sec(b.counter + b.counterDuration)],
    [0, c.counterValue],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );
  const finalText = `${c.counterPrefix}${withCommas(c.counterValue)}`;
  const counterIn = ease(frame, fps, sec(b.counter) - 6, 16);
  const underline = ease(
    frame,
    fps,
    sec(b.counter + b.counterDuration * 0.55),
    sec(0.8),
  );

  const label = {
    fontFamily: fonts.label,
    fontWeight: typography.labelWeight,
    fontSize: type.label,
    letterSpacing: typography.labelTracking,
    color: colors.muted,
  } as const;

  const counterBlock = (
    <div
      style={{
        opacity: counterIn,
        display: "inline-flex",
        flexDirection: "column",
      }}
    >
      <div style={{ ...label, marginBottom: type.label * 0.2 }}>
        {c.counterLabel}
      </div>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <div>
          {/* The final value reserves the width so the layout never shifts. */}
          <div
            style={{
              display: "grid",
              fontFamily: fonts.label,
              fontWeight: typography.counterWeight,
              fontVariantNumeric: "tabular-nums",
              letterSpacing: typography.counterTracking,
              fontSize: type.counter,
              lineHeight: 1,
              color: colors.white,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ gridArea: "1 / 1", visibility: "hidden" }}>
              {finalText}
            </span>
            <span style={{ gridArea: "1 / 1" }}>
              {c.counterPrefix}
              {withCommas(value)}
            </span>
          </div>
          {/* The single Signal element in this scene. */}
          <div
            style={{
              marginTop: type.counter * 0.1,
              height: 6,
              borderRadius: 3,
              width: `${underline * 100}%`,
              backgroundImage: gradients.signalText,
              boxShadow: "0 0 24px rgba(228,87,30,0.7)",
            }}
          />
        </div>
        <div style={{ ...label, marginLeft: type.label * 0.4 }}>
          {c.counterSuffix}
        </div>
      </div>
    </div>
  );

  return (
    <AbsoluteFill style={{ backgroundColor: colors.black }}>
      <Glow
        x={vertical ? layout.width / 2 : 1240}
        y={vertical ? 1330 : 470}
        size={vertical ? 1300 : 1500}
        opacity={underline * 0.45 * exitFade(frame, duration)}
      />
      <AbsoluteFill
        style={{
          scale: String(interpolate(frame, [0, duration], [1.04, 1.08])),
        }}
      >
        {tiles.map((t, i) => {
          const shake = jamShake(frame, i, 2.5 * jam);
          const f = bob(frame + sceneFrames.problem, i);
          return (
            <AppTile
              key={i}
              icon={t.icon}
              x={mix(t.mess.x + f.x, t.cluster.x, jam) + shake.x}
              y={mix(t.mess.y + f.y, t.cluster.y, jam) + shake.y}
              size={t.size}
              tone={i}
              rotate={mix(t.mess.rot, t.cluster.rot, jam)}
              scale={mix(1, CLUSTER_SCALE, jam)}
              opacity={t.primary ? 1 : 0.7}
              blur={t.primary ? 0 : 2.5}
            />
          );
        })}
        {tagsOut > 0
          ? tiles.map((t, i) =>
              t.label ? (
                <PriceTag
                  key={`tag-${i}`}
                  text={t.label}
                  x={t.mess.x}
                  y={t.mess.y - t.size / 2 - 14}
                  fontSize={type.label}
                  opacity={tagsOut}
                />
              ) : null,
            )
          : null}
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: exitFade(frame, duration) }}>
        <div
          style={
            vertical
              ? {
                  position: "absolute",
                  top: 1180,
                  left: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "center",
                }
              : { position: "absolute", top: 270, left: 800 }
          }
        >
          {counterBlock}
        </div>
        <div
          style={
            vertical
              ? {
                  position: "absolute",
                  top: layout.marginTop,
                  left: layout.marginX,
                }
              : {
                  position: "absolute",
                  bottom: layout.marginBottom,
                  left: layout.marginX,
                }
          }
        >
          <Headline
            text={c.lines}
            fontSize={type.headline}
            color={colors.white}
            delay={sec(b.text)}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
