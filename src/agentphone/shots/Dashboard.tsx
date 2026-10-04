import React from "react";
import { Easing, interpolate, useVideoConfig } from "remotion";
import { pop, prog } from "../lib/anim";
import { useT } from "../lib/time";
import { Cam, stagePoint } from "../lib/transition";
import { HANDSET } from "../lib/Wordmark";
import { C } from "../theme";
import { DarkStage, Framed, Phone, PHONE_H, PHONE_W, phoneBox, useVertical } from "../lib/stage";
import { DashboardScreen } from "../screens/dashboard";

export const DASHBOARD_LEN = 87;

// 0:25–0:28 · Next morning. Slow 1.0→1.05 push; the phone folds away into
// the dark before the close.
export const DashboardShot: React.FC<{ len?: number; camFrom?: Cam; toCircle?: boolean }> = ({ len = DASHBOARD_LEN, camFrom, toCircle = false }) => {
  const f = useT();
  const v = useVertical();
  const { width, height } = useVideoConfig();
  const away = toCircle
    ? 0
    : interpolate(f, [len - 9, len], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.in(Easing.cubic),
      });
  // Into the close: the phone collapses into the handset circle.
  const MORPH = 16;
  const end: Cam = { x: PHONE_W / 2, y: 400, z: 1.05 };
  const m = toCircle ? prog(f, len - MORPH, MORPH, Easing.inOut(Easing.cubic)) : 0;
  const [x0, y0] = stagePoint(v, "phone", [PHONE_W, PHONE_H], end, [12, 12]);
  const [x1, y1] = stagePoint(v, "phone", [PHONE_W, PHONE_H], end, [PHONE_W - 12, PHONE_H - 12]);
  const D = 140;
  const lerp = (a: number, b: number) => a + (b - a) * m;
  const p0 = pop(f, 0, 0.94);
  const intro = camFrom ? { opacity: 1, scale: "1" } : p0;
  return (
    <DarkStage>
      <Framed
        w={PHONE_W}
        h={PHONE_H}
        box={phoneBox(v)}
        damp={v}
        cam={[
          camFrom ? { f: 0, ...camFrom } : { f: 0, x: PHONE_W / 2, y: PHONE_H / 2, z: 1 },
          { f: toCircle ? len - MORPH : len, ...end },
        ]}
      >
        <div style={{ scale: `${(1 - 0.75 * away) * Number(intro.scale)}`, opacity: intro.opacity * (1 - away) * (1 - Math.min(1, m * 2.2)) }}>
          <Phone>
            <DashboardScreen />
          </Phone>
        </div>
      </Framed>
      {m > 0 ? (
        <div
          style={{
            position: "absolute",
            left: lerp(x0, width / 2 - D / 2),
            top: lerp(y0, height / 2 - D / 2),
            width: lerp(x1 - x0, D),
            height: lerp(y1 - y0, D),
            borderRadius: lerp(46 * ((x1 - x0) / 390), D / 2),
            background: `rgba(125,240,182,${Math.min(1, m * 2.2)})`,
            boxShadow: `0 0 ${D * 0.6}px rgba(125,240,182,.18)`,
          }}
        >
          <svg width={D} height={D} viewBox="0 0 40 40" style={{ position: "absolute", left: "50%", top: "50%", marginLeft: -D / 2, marginTop: -D / 2, opacity: prog(f, len - 6, 5) }}>
            <path d={HANDSET} fill={C.callLayer} transform="translate(9.5 9.5) scale(.95)" />
          </svg>
        </div>
      ) : null}
    </DarkStage>
  );
};
