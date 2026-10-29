import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { beats, colors, copy, fonts, sec } from "../brand";
import { Headline } from "../components/Headline";
import { Mechanism } from "../components/Mechanism";
import { Person } from "../components/Person";
import { PinaxWordmark } from "../components/PinaxWordmark";
import { ease, mix, ramp } from "../lib/anim";
import { useLayout } from "../lib/layout";
import { mechanismAngle } from "../lib/spin";
import { sceneStart } from "../timeline";
import { HubTiles } from "./HubTiles";
import { mechPose, peopleOffsets, PERSON_SIZE } from "./mech";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const layout = useLayout();
  const { width, height, vertical, type } = layout;
  const b = beats.outro;

  // The mechanism collapses to a single point at the centre of the frame.
  const collapse = interpolate(
    frame,
    [sec(b.collapse), sec(b.collapse + b.collapseDuration)],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    },
  );
  const start = mechPose(layout, "stick");
  const pose = {
    cx: mix(start.cx, width / 2, collapse),
    cy: mix(start.cy, height / 2, collapse),
    scale: start.scale * (1 - collapse),
  };
  const angle = mechanismAngle(sceneStart.outro + frame) + collapse * 120;
  const peopleOut = 1 - ramp(frame, sec(b.collapse) - 6, sec(b.collapse) + 10);
  const point = 1 - ramp(frame, sec(b.wordmark), sec(b.wordmark + 0.5));

  const mark = ease(frame, fps, sec(b.wordmark), sec(1));
  const url = ease(frame, fps, sec(b.url), sec(0.8));

  return (
    <AbsoluteFill style={{ backgroundColor: colors.black }}>
      {collapse < 1 ? (
        <>
          <Mechanism
            cx={pose.cx}
            cy={pose.cy}
            scale={pose.scale}
            angle={angle}
            gearColor={colors.grey}
            lineColor={colors.white}
            ringColor={colors.grey}
            opacity={
              1 -
              ramp(
                frame,
                sec(b.collapse + b.collapseDuration) - 8,
                sec(b.collapse + b.collapseDuration),
              )
            }
          />
          <HubTiles pose={pose} color={colors.black} fill={colors.white} />
        </>
      ) : null}
      {peopleOut > 0
        ? peopleOffsets(layout).map((o, i) => (
            <Person
              key={i}
              x={start.cx + o.x}
              y={start.cy + o.y}
              size={vertical ? PERSON_SIZE.vertical : PERSON_SIZE.landscape}
              color={colors.white}
              opacity={peopleOut}
            />
          ))
        : null}
      {/* The collapse point (white: Signal is reserved for the tagline here). */}
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", inset: 0 }}
      >
        <circle cx={pose.cx} cy={pose.cy} r={9 * point} fill={colors.white} />
      </svg>

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: `0 ${layout.marginX}px`,
        }}
      >
        <div
          style={{
            opacity: mark,
            scale: String(1.08 - 0.08 * mark),
            filter: mark < 1 ? `blur(${(1 - mark) * 24}px)` : undefined,
          }}
        >
          <PinaxWordmark size={type.wordmark} color={colors.white} />
        </div>
        <Headline
          text={copy.outro.tagline}
          highlight={copy.outro.highlight}
          font="body"
          fontSize={type.tagline}
          color={colors.white}
          align="center"
          delay={sec(b.tagline)}
          maxWidth={vertical ? 860 : 1600}
          style={{ marginTop: type.wordmark * 0.12 }}
        />
        <div
          style={{
            marginTop: type.tagline * 1.1,
            fontFamily: fonts.label,
            fontWeight: 600,
            fontSize: type.label,
            letterSpacing: "0.2em",
            color: colors.grey,
            opacity: url,
            translate: `0 ${(1 - url) * 12}px`,
            filter: url < 1 ? `blur(${(1 - url) * 10}px)` : undefined,
          }}
        >
          {copy.outro.url}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
