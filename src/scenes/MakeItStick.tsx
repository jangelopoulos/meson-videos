import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { beats, colors, copy, sec } from "../brand";
import { Headline } from "../components/Headline";
import { Mechanism } from "../components/Mechanism";
import { Person } from "../components/Person";
import { ease, exitFade } from "../lib/anim";
import { useLayout } from "../lib/layout";
import { mechanismAngle } from "../lib/spin";
import { sceneStart } from "../timeline";
import { HubTiles } from "./HubTiles";
import { mechPose, mixPose, peopleOffsets, PERSON_SIZE } from "./mech";

export const MakeItStick: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const layout = useLayout();
  const { vertical, type } = layout;
  const b = beats.stick;

  const move = ease(frame, fps, sec(b.move), sec(1.3));
  const target = mechPose(layout, "stick");
  const pose = mixPose(mechPose(layout, "ai"), target, move);
  const angle = mechanismAngle(sceneStart.stick + frame);
  const size = vertical ? PERSON_SIZE.vertical : PERSON_SIZE.landscape;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <Mechanism
        cx={pose.cx}
        cy={pose.cy}
        scale={pose.scale}
        angle={angle}
        dot={{ x: 0, y: 0 }}
      />
      <HubTiles pose={pose} />
      {peopleOffsets(layout).map((o, i) => {
        const p = ease(
          frame,
          fps,
          sec(b.people + i * b.peopleInterval),
          sec(0.9),
        );
        const away = (1 - p) * 90;
        return (
          <Person
            key={i}
            x={pose.cx + o.x + o.ux * away}
            y={pose.cy + o.y + o.uy * away}
            size={size}
            color={colors.black}
            opacity={p}
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
          fontSize={type.headline}
          color={colors.black}
          align="center"
          delay={sec(b.text)}
          maxWidth={vertical ? 900 : 1500}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
