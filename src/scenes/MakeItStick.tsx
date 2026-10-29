import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { beats, colors, copy, sec } from "../brand";
import { Headline } from "../components/Headline";
import { Person } from "../components/Person";
import { ease, exitFade } from "../lib/anim";
import { useLayout } from "../lib/layout";
import { hubLight, pulseTrails } from "../lib/pulses";
import { mechanismAngle } from "../lib/spin";
import { sceneStart } from "../timeline";
import { PULSE_START } from "./AiAtWork";
import { mechPose, mixPose, peopleRing } from "./mech";
import { MechStage } from "./MechStage";

/** Slow orbit of the team around the system, in degrees (absolute frame). */
export const orbit = (abs: number) => (abs - sceneStart.stick) * 0.07;

export const MakeItStick: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const layout = useLayout();
  const { vertical, type } = layout;
  const b = beats.stick;
  const abs = sceneStart.stick + frame;

  const move = ease(frame, fps, 0, sec(1.4));
  const pose = mixPose(mechPose(layout, "ai"), mechPose(layout, "stick"), move);
  const trails = pulseTrails(abs, PULSE_START);
  const ring = peopleRing(layout);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.black }}>
      <MechStage
        pose={pose}
        angle={mechanismAngle(abs)}
        glow={1}
        pulses={trails}
        lit={(i) => hubLight(trails, i)}
      />
      {ring.angles.map((a0, i) => {
        const p = ease(
          frame,
          fps,
          sec(b.people + i * b.peopleInterval),
          sec(1),
        );
        const a = ((a0 + orbit(abs)) * Math.PI) / 180;
        const out = 1 + ((1 - p) * 140) / ring.rx;
        return (
          <Person
            key={i}
            x={pose.cx + Math.cos(a) * ring.rx * out}
            y={pose.cy + Math.sin(a) * ring.ry * out}
            size={ring.size}
            tone={i}
            opacity={p}
            scale={0.7 + 0.3 * p}
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
          text={copy.stick.text}
          highlight={copy.stick.highlight}
          fontSize={type.headline}
          color={colors.white}
          align="center"
          delay={sec(b.text)}
          maxWidth={vertical ? 900 : 1600}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
