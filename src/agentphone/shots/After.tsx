import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { prog } from "../lib/anim";
import { LoggedRow } from "../lib/LoggedRow";
import { DarkStage, Framed, Phone, PHONE_H, PHONE_W, phoneBox, useVertical } from "../lib/stage";
import { AfterScreen } from "../screens/after";

export const AFTER_LEN = 131;
export const FLY = 104; // the summary row lifts, then flies out to the right

// 0:07–0:11 · After the call. Music drop. Hold "logged" 1.5s, then the row
// flies out toward the desktop.
export const AfterShot: React.FC = () => {
  const f = useCurrentFrame();
  const v = useVertical();
  const lift = prog(f, FLY, 8);
  const fly = interpolate(f, [FLY + 6, AFTER_LEN], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  return (
    <DarkStage>
      <Framed
        w={PHONE_W}
        h={PHONE_H}
        box={phoneBox(v)}
        damp={v}
        cam={[
          { f: 0, x: PHONE_W / 2, y: PHONE_H / 2, z: 1 },
          { f: 90, x: PHONE_W / 2, y: 380, z: 1.07 },
        ]}
      >
        <Phone>
          <AfterScreen />
          <CollapsingWave />
        </Phone>
        {f >= FLY ? (
          <LoggedRow
            style={{
              position: "absolute",
              left: 34,
              top: 150,
              opacity: lift,
              scale: `${1 + 0.05 * lift}`,
              translate: `${fly * (v ? 900 : 1700)}px ${-14 * lift - fly * 60}px`,
              rotate: `${fly * 4}deg`,
            }}
          />
        ) : null}
      </Framed>
    </DarkStage>
  );
};

/** The live waveform collapses into a flat line as the call ends. */
const CollapsingWave: React.FC = () => {
  const f = useCurrentFrame();
  const amp = interpolate(f, [0, 9], [1, 0], {
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.quad),
  });
  const o = interpolate(f, [9, 14], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (o <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 62,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        opacity: o,
      }}
    >
      {new Array(15).fill(0).map((_, i) => {
        const h = 3 + amp * 30 * (0.35 + 0.65 * Math.abs(Math.sin(f * 0.3 * 9 / 3 + i * 1.7)));
        return <span key={i} style={{ width: 4, height: h, borderRadius: 2, background: "#10c46e" }} />;
      })}
    </div>
  );
};
