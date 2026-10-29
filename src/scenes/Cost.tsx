import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { beats, colors, copy, fonts, sec, typography } from "../brand";
import { AppTile } from "../components/AppTile";
import { Headline } from "../components/Headline";
import { PriceTag } from "../components/PriceTag";
import { ease, exitFade, mix, ramp } from "../lib/anim";
import { useLayout } from "../lib/layout";
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

  const jam = ease(frame, fps, sec(b.jam), sec(1.2));
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
    color: colors.grey,
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
              height: 4,
              borderRadius: 2,
              width: `${underline * 100}%`,
              backgroundColor: colors.signal,
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
      {tiles.map((t, i) => {
        const shake = jamShake(frame, i, 2.5 * jam);
        return (
          <AppTile
            key={i}
            icon={t.icon}
            x={mix(t.mess.x, t.cluster.x, jam) + shake.x}
            y={mix(t.mess.y, t.cluster.y, jam) + shake.y}
            size={t.size}
            rotate={mix(t.mess.rot, t.cluster.rot, jam)}
            scale={mix(1, CLUSTER_SCALE, jam)}
            fill={t.primary ? colors.white : colors.grey}
            color={colors.black}
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
              : { position: "absolute", top: 290, left: 860 }
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
