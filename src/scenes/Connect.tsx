import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { beats, colors, copy, sec } from "../brand";
import { AppTile } from "../components/AppTile";
import { Headline } from "../components/Headline";
import { hubPx, Mechanism, SATELLITES, TILE } from "../components/Mechanism";
import { ease, exitFade, mix, ramp } from "../lib/anim";
import { useLayout } from "../lib/layout";
import { mechanismAngle } from "../lib/spin";
import { sceneStart } from "../timeline";
import { mechPose } from "./mech";
import { CLUSTER_SCALE, tilePlan } from "./tiles";

export const Connect: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const layout = useLayout();
  const { vertical, type } = layout;
  const b = beats.connect;
  const pose = mechPose(layout, "connect");
  const tiles = tilePlan(layout);
  const angle = mechanismAngle(sceneStart.connect + frame);

  const draw = {
    rings: ramp(frame, sec(b.draw), sec(b.draw + 1.6)),
    core: ramp(frame, sec(b.draw + 0.2), sec(b.draw + 1.5)),
    satellites: SATELLITES.map((_, i) =>
      ramp(frame, sec(b.draw + 0.45 + i * 0.12), sec(b.draw + 1.6 + i * 0.12)),
    ),
    lines: ramp(frame, sec(b.lines), sec(b.lines + 1.1)),
  };
  const hubDot = ease(frame, fps, sec(b.hub), 14);

  let primary = 0;
  let extra = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <Mechanism
        cx={pose.cx}
        cy={pose.cy}
        scale={pose.scale}
        angle={angle}
        draw={draw}
        dot={hubDot > 0 ? { x: 0, y: 0 } : null}
        dotRadius={9 * hubDot}
      />
      {tiles.map((t, i) => {
        const startSize = t.size * CLUSTER_SCALE;
        if (t.primary) {
          const k = primary++;
          const p = ease(frame, fps, sec(b.pull + k * 0.1), sec(1.1));
          const hub = hubPx(k, pose.cx, pose.cy, pose.scale);
          return (
            <AppTile
              key={i}
              icon={t.icon}
              x={mix(t.cluster.x, hub.x, p)}
              y={mix(t.cluster.y, hub.y, p)}
              size={mix(startSize, TILE * pose.scale, p)}
              rotate={mix(t.cluster.rot, 0, p)}
              fill={colors.black}
              color={colors.white}
              zIndex={2}
            />
          );
        }
        // Redundant tools are absorbed into the core.
        const k = extra++;
        const p = ease(frame, fps, sec(b.pull + 0.25 + k * 0.08), sec(1.0));
        return (
          <AppTile
            key={i}
            icon={t.icon}
            x={mix(t.cluster.x, pose.cx, p)}
            y={mix(t.cluster.y, pose.cy, p)}
            size={startSize}
            rotate={mix(t.cluster.rot, 0, p)}
            scale={1 - p}
            opacity={
              1 -
              ramp(
                frame,
                sec(b.pull + 0.25 + k * 0.08) + 12,
                sec(b.pull + 1.1 + k * 0.08),
              )
            }
            fill={colors.grey}
            color={colors.white}
            zIndex={1}
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
          text={copy.connect.text}
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
