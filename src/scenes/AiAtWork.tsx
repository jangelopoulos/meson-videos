import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { beats, colors, copy, sec } from "../brand";
import { Callout } from "../components/Callout";
import { Headline } from "../components/Headline";
import {
  DOT_ROUTE,
  HUB_R,
  Mechanism,
  SATELLITES,
} from "../components/Mechanism";
import { ease, exitFade } from "../lib/anim";
import { pointOnPolyline, polylineLength } from "../lib/gears";
import { useLayout } from "../lib/layout";
import { mechanismAngle } from "../lib/spin";
import { sceneStart } from "../timeline";
import { HubTiles } from "./HubTiles";
import { mechPose, mixPose } from "./mech";

const ROUTE_LENGTH = polylineLength(DOT_ROUTE);

export const AiAtWork: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const layout = useLayout();
  const { vertical, type } = layout;
  const b = beats.ai;

  const move = ease(frame, fps, sec(b.move), sec(1.3));
  const pose = mixPose(
    mechPose(layout, "connect"),
    mechPose(layout, "ai"),
    move,
  );
  const angle = mechanismAngle(sceneStart.ai + frame);

  // The Signal dot travels the route at constant speed, starting and ending
  // at the core so it hands over cleanly to the neighbouring scenes.
  const dist = interpolate(
    frame,
    [sec(b.dot), sec(b.dotEnd)],
    [0, ROUTE_LENGTH],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const dot = pointOnPolyline(DOT_ROUTE, dist);
  const pulse = (i: number) => {
    const s = SATELLITES[i];
    const d = Math.hypot(dot.x - s.x, dot.y - s.y);
    return 1 + 0.14 * Math.max(0, 1 - d / HUB_R);
  };

  const textOut = exitFade(frame, duration);
  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <Mechanism
        cx={pose.cx}
        cy={pose.cy}
        scale={pose.scale}
        angle={angle}
        dot={dot}
      />
      <HubTiles pose={pose} pulse={pulse} />

      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          opacity: textOut,
          ...(vertical
            ? {
                left: layout.marginX,
                right: layout.marginX,
                top: 1210,
                gap: 34,
              }
            : { left: 1010, width: 780, top: 230, gap: 52 }),
        }}
      >
        {copy.ai.callouts.map((c, i) => (
          <Callout
            key={i}
            icon={c.icon}
            text={c.text}
            fontSize={type.callout}
            progress={ease(frame, fps, sec(b.callouts[i]), sec(0.7))}
          />
        ))}
      </div>

      <AbsoluteFill
        style={{
          opacity: textOut,
          padding: `${layout.marginTop}px ${layout.marginX}px ${layout.marginBottom}px`,
          justifyContent: vertical ? "flex-start" : "flex-end",
          alignItems: "center",
        }}
      >
        <Headline
          text={copy.ai.text}
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
