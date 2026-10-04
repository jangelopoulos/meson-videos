import {useT} from "../lib/time";
import React from "react";
import {AbsoluteFill, Easing, interpolate, useVideoConfig} from "remotion";
import { EASE_POP, prog } from "../lib/anim";
import { Wordmark } from "../lib/Wordmark";
import { C } from "../theme";

export const RING_1 = 14;
export const RING_2 = 30;
export const OPEN = 48;

/** Live waveform inside the pill: never stops. */
export const pillBars = (f: number) =>
  [0, 1, 2].map((i) => 0.5 + 0.5 * Math.sin((f / 30) * 9 + i * 2.1));

const ringHalo = (f: number, at: number) => {
  const t = interpolate(f, [at, at + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
  return { scale: 1 + 0.55 * t, opacity: t > 0 && t < 1 ? 0.9 * (1 - t) : 0 };
};

// 0:00–0:03 · The handset circle stretches into the pill, rings twice
// (amber halo), then opens into the wordmark.
export const LogoShot: React.FC<{ endPill?: boolean }> = ({ endPill = false }) => {
  const f = useT();
  const { width, height } = useVideoConfig();
  const v = height > width;
  const fs = v ? 150 : 200;
  const stretch = prog(f, 2, 11, EASE_POP);
  const open0 = prog(f, OPEN, 16, Easing.inOut(Easing.cubic));
  // 60s cut: letters retract and the circle stretches back into the pill,
  // which drops into the dialer in the next shot.
  const back = endPill ? prog(f, 72, 14, Easing.inOut(Easing.cubic)) : 0;
  const pill = Math.max(stretch * (1 - prog(f, OPEN - 2, 14, Easing.inOut(Easing.cubic))), back);
  const shake = (at: number) => {
    const t = f - at;
    return t >= 0 && t < 12 ? 4 * Math.sin(t * 2.4) * (1 - t / 12) : 0;
  };
  const open = open0 * (1 - back);
  const push = 1 + (interpolate(f, [OPEN + 10, 87], [1, 1.035], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) - 1) * (1 - back);
  return (
    <AbsoluteFill style={{ background: C.callLayer }}>
      <AbsoluteFill style={{ scale: `${push}` }}>
        <Wordmark
          fs={fs}
          cx={width / 2}
          cy={height / 2}
          pill={pill}
          open={open}
          rotate={shake(RING_1) + shake(RING_2)}
          bars={pillBars(f)}
          halo={[ringHalo(f, RING_1), ringHalo(f, RING_1 + 4), ringHalo(f, RING_2), ringHalo(f, RING_2 + 4)]}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
