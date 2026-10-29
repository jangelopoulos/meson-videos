import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { beats, colors, copy, sec } from "../brand";
import { AppTile } from "../components/AppTile";
import { Headline } from "../components/Headline";
import { hubPx, SATELLITES, TILE } from "../components/Mechanism";
import { ease, exitFade, mix, ramp } from "../lib/anim";
import { useLayout } from "../lib/layout";
import { mechanismAngle } from "../lib/spin";
import { sceneStart } from "../timeline";
import { mechPose } from "./mech";
import { MechStage } from "./MechStage";
import { CLUSTER_SCALE, tilePlan } from "./tiles";

/** Cost scene ends pushed in to this scale; tiles start from there. */
const COST_END_PUSH = 1.08;

export const Connect: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const layout = useLayout();
  const { width, height, vertical, type } = layout;
  const b = beats.connect;
  const pose = mechPose(layout, "connect");
  const tiles = tilePlan(layout);
  const angle = mechanismAngle(sceneStart.connect + frame);

  const draw = {
    rings: ramp(frame, sec(b.draw), sec(b.draw + 1.6)),
    core: ramp(frame, sec(b.draw + 0.1), sec(b.draw + 1.4)),
    satellites: SATELLITES.map((_, i) =>
      ramp(frame, sec(b.draw + 0.3 + i * 0.1), sec(b.draw + 1.4 + i * 0.1)),
    ),
    lines: ramp(frame, sec(b.lines), sec(b.lines + 1.1)),
  };
  const glow = ease(frame, fps, sec(b.ignite), sec(1.4));
  const fromPush = (p: { x: number; y: number }) => ({
    x: width / 2 + (p.x - width / 2) * COST_END_PUSH,
    y: height / 2 + (p.y - height / 2) * COST_END_PUSH,
  });

  let primary = 0;
  let extra = 0;
  const flying = tiles.map((t, i) => {
    const start = fromPush(t.cluster);
    const startSize = t.size * CLUSTER_SCALE * COST_END_PUSH;
    if (t.primary) {
      const k = primary++;
      const p = ease(frame, fps, sec(b.pull + k * 0.09), sec(1.2));
      const hub = hubPx(k, pose.cx, pose.cy, pose.scale);
      return (
        <AppTile
          key={i}
          icon={t.icon}
          x={mix(start.x, hub.x, p)}
          y={mix(start.y, hub.y, p)}
          size={mix(startSize, TILE * pose.scale, p)}
          tone={i}
          rotate={mix(t.cluster.rot, 0, p)}
          zIndex={2}
        />
      );
    }
    // Redundant tools are absorbed into the core.
    const k = extra++;
    const at = sec(b.pull + 0.2 + k * 0.07);
    const p = ease(frame, fps, at, sec(1.0));
    return (
      <AppTile
        key={i}
        icon={t.icon}
        x={mix(start.x, pose.cx, p)}
        y={mix(start.y, pose.cy, p)}
        size={startSize}
        tone={i}
        rotate={mix(t.cluster.rot, 0, p)}
        scale={1 - p}
        opacity={0.7 * (1 - ramp(frame, at + 10, at + sec(0.9)))}
        blur={2.5}
        zIndex={1}
      />
    );
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.black }}>
      <MechStage
        pose={pose}
        angle={angle}
        draw={draw}
        glow={glow}
        hubTiles={false}
      >
        {flying}
      </MechStage>
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
          highlight={copy.connect.highlight}
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
