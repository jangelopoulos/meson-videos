import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { beats, colors, copy, fonts, sec } from "../brand";
import { Glow } from "../components/Glow";
import { Headline } from "../components/Headline";
import { Person } from "../components/Person";
import { PinaxWordmark } from "../components/PinaxWordmark";
import { ease, mix, ramp } from "../lib/anim";
import { useLayout } from "../lib/layout";
import { hubLight, pulseTrails } from "../lib/pulses";
import { mechanismAngle } from "../lib/spin";
import { sceneStart } from "../timeline";
import { PULSE_START } from "./AiAtWork";
import { orbit } from "./MakeItStick";
import { mechPose, peopleRing } from "./mech";
import { MechStage } from "./MechStage";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const layout = useLayout();
  const { width, height, vertical, type } = layout;
  const b = beats.outro;
  const abs = sceneStart.outro + frame;

  // The whole system collapses into a single point of light.
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
    tilt: 0,
  };
  const trails = pulseTrails(abs, PULSE_START);
  const ring = peopleRing(layout);
  const collapsed = sec(b.collapse + b.collapseDuration);

  // A flash of light at the point, then it settles as the promises play.
  const flash = interpolate(
    frame,
    [collapsed - 4, collapsed + 2, collapsed + 30],
    [0, 1, 0.35],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const lightOut = 1 - ramp(frame, sec(b.wordmark) - 10, sec(b.wordmark) + 10);
  const mark = ease(frame, fps, sec(b.wordmark), sec(1.2));
  const url = ease(frame, fps, sec(b.url), sec(0.8));
  const promisesEnd = sec(
    b.promises + b.promiseEvery * copy.outro.promises.length,
  );
  const promisesOut = 1 - ramp(frame, promisesEnd - 8, promisesEnd + 6);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.black }}>
      {collapse < 1 ? (
        <MechStage
          pose={pose}
          angle={mechanismAngle(abs) + collapse * 160}
          glow={1}
          pulses={trails}
          lit={(i) => hubLight(trails, i)}
        />
      ) : null}
      {collapse < 1
        ? ring.angles.map((a0, i) => {
            const a = ((a0 + orbit(abs)) * Math.PI) / 180;
            const k = 1 - collapse;
            return (
              <Person
                key={i}
                x={pose.cx + Math.cos(a) * ring.rx * k}
                y={pose.cy + Math.sin(a) * ring.ry * k}
                size={ring.size}
                tone={i}
                scale={1 - collapse}
                opacity={1 - collapse}
              />
            );
          })
        : null}

      <Glow
        x={width / 2}
        y={height / 2}
        size={vertical ? 1500 : 1700}
        opacity={(flash * 0.9 + 0.25 * mark) * Math.max(lightOut, 0.4)}
      />
      {collapse >= 1 ? (
        <svg
          width={width}
          height={height}
          style={{ position: "absolute", inset: 0 }}
        >
          <circle
            cx={width / 2}
            cy={height / 2}
            r={10 + 6 * flash}
            fill={colors.signalPale}
            opacity={
              lightOut *
              (1 - ramp(frame, sec(b.promises) - 4, sec(b.promises) + 8) * 0.85)
            }
          />
        </svg>
      ) : null}

      {/* What owning your system means. */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: `0 ${layout.marginX}px`,
          opacity: promisesOut,
        }}
      >
        <Headline
          text={copy.outro.promises}
          fontSize={type.headline}
          color={colors.white}
          align="center"
          delay={sec(b.promises)}
          replaceEvery={sec(b.promiseEvery)}
          maxWidth={vertical ? 900 : 1700}
        />
      </AbsoluteFill>

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
            scale: String(1.1 - 0.1 * mark),
            filter: mark < 1 ? `blur(${(1 - mark) * 30}px)` : undefined,
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
          style={{ marginTop: type.wordmark * 0.1 }}
        />
        <div
          style={{
            marginTop: type.tagline * 1.0,
            fontFamily: fonts.label,
            fontWeight: 600,
            fontSize: type.label,
            letterSpacing: "0.02em",
            color: colors.muted,
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
