import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { beats, colors, copy, sec } from "../brand";
import { Callout } from "../components/Callout";
import { Headline } from "../components/Headline";
import { ease, exitFade } from "../lib/anim";
import { useLayout } from "../lib/layout";
import { hubLight, pulseTrails } from "../lib/pulses";
import { mechanismAngle } from "../lib/spin";
import { sceneStart } from "../timeline";
import { mechPose, mixPose } from "./mech";
import { MechStage } from "./MechStage";

/** Absolute frame at which the light pulses start (shared with later scenes). */
export const PULSE_START = sceneStart.ai + sec(beats.ai.pulses);

export const AiAtWork: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const layout = useLayout();
  const { vertical, type } = layout;
  const b = beats.ai;
  const abs = sceneStart.ai + frame;

  // The system tilts back like a product shot while the AI lights it up.
  const move = ease(frame, fps, 0, sec(1.6));
  const pose = mixPose(
    mechPose(layout, "connect"),
    mechPose(layout, "ai"),
    move,
  );
  const trails = pulseTrails(abs, PULSE_START);
  const textOut = exitFade(frame, duration);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.black }}>
      <MechStage
        pose={pose}
        angle={mechanismAngle(abs)}
        glow={1}
        pulses={trails}
        lit={(i) => hubLight(trails, i)}
      />

      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          opacity: textOut,
          ...(vertical
            ? { left: 70, right: 70, top: 1120, gap: 24 }
            : { left: 1070, width: 760, top: 140, gap: 24 }),
        }}
      >
        {copy.ai.callouts.map((c, i) => (
          <Callout
            key={i}
            icon={c.icon}
            title={c.title}
            text={c.text}
            fontSize={type.callout}
            progress={ease(frame, fps, sec(b.callouts[i]), sec(0.8))}
          />
        ))}
      </div>

      <AbsoluteFill
        style={{
          opacity: textOut,
          padding: `${layout.marginTop}px ${layout.marginX}px ${layout.marginBottom}px`,
          justifyContent: vertical ? "flex-start" : "flex-end",
          alignItems: vertical ? "center" : "flex-start",
        }}
      >
        <Headline
          text={copy.ai.text}
          highlight={copy.ai.highlight}
          fontSize={type.headline}
          color={colors.white}
          align={vertical ? "center" : "left"}
          delay={sec(b.text)}
          maxWidth={vertical ? 900 : 1700}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
