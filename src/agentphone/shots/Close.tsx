import {useT} from "../lib/time";
import React from "react";
import {AbsoluteFill, Easing, interpolate, useVideoConfig} from "remotion";
import { enter, prog } from "../lib/anim";
import { Wordmark } from "../lib/Wordmark";
import { C, FONT, MONO } from "../theme";

export const CLOSE_LEN = 58;

// 0:28–0:30 · Wordmark builds, tagline, then the waitlist URL. Everything
// folds back into the handset circle so the last frame equals the first.
export const CloseShot: React.FC<{ url: string; len?: number; meson?: boolean }> = ({ url, len = CLOSE_LEN, meson = false }) => {
  const f = useT();
  const { width, height } = useVideoConfig();
  const v = height > width;
  const fs = v ? 150 : 200;
  const end = len - 1;
  const open =
    prog(f, 1, 13, Easing.out(Easing.cubic)) * (1 - prog(f, end - 11, 11, Easing.inOut(Easing.cubic)));
  const out = 1 - prog(f, end - 14, 6, Easing.linear);
  const hit = interpolate(f, [0, 4, 12], [0.6, 1.06, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
  const tag = enter(f, 6, 24);
  const by = enter(f, 10, 30);
  const cta = enter(f, meson ? 12 : 10, 30);
  const ctaTop = height / 2 + fs * 0.75 + (v ? 120 : 110) + (meson ? (v ? 70 : 64) : 0);
  return (
    <AbsoluteFill style={{ background: C.callLayer }}>
      <Wordmark fs={fs} cx={width / 2} cy={height / 2} open={open} circleScale={hit} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: height / 2 + fs * 0.75,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: v ? 58 : 60,
          letterSpacing: "-0.03em",
          color: C.onDark,
          ...tag,
          opacity: tag.opacity * out,
        }}
      >
        Every call, in your CRM.
      </div>
      {meson ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: height / 2 + fs * 0.75 + (v ? 100 : 92),
            textAlign: "center",
            fontFamily: FONT,
            fontWeight: 500,
            fontSize: v ? 34 : 32,
            color: "rgba(232,245,238,.62)",
            ...by,
            opacity: by.opacity * out,
          }}
        >
          Built in Australia by Meson
        </div>
      ) : null}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: ctaTop,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 22,
          flexDirection: v ? "column" : "row",
          ...cta,
          opacity: cta.opacity * out,
        }}
      >
        <span
          style={{
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: 34,
            color: C.callLayer,
            background: `linear-gradient(180deg, ${C.actionHi}, ${C.action})`,
            borderRadius: 999,
            padding: "16px 34px",
            boxShadow: "0 16px 40px -12px rgba(16,196,110,.55)",
          }}
        >
          Join the waitlist
        </span>
        <span style={{ fontFamily: MONO, fontWeight: 500, fontSize: 32, color: C.mint, letterSpacing: "0.02em" }}>{url}</span>
      </div>
    </AbsoluteFill>
  );
};
