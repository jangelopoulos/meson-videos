import React from "react";
import { AbsoluteFill, Easing, interpolate } from "remotion";
import { EASE_POP, prog } from "../lib/anim";
import { DarkStage, Framed, Phone, PHONE_H, PHONE_W, phoneBox, useVertical } from "../lib/stage";
import { useT } from "../lib/time";
import { pillBars } from "./Logo";
import { HANDSET } from "../lib/Wordmark";
import { DialerScreen, D } from "../screens/dialer";
import { useVideoConfig } from "remotion";
import { C } from "../theme";

const DROP = 10; // pill drops to the bottom of the phone
const WIDE = 16; // stretches to the phone's width
const OPEN = D + 6; // grows up into the dialer

// 0:07–0:11 · Dialer. The logo pill drops and expands into the dialer: the
// same motion as the logo reveal, so it reads as one move.
export const DialerShot: React.FC = () => {
  const f = useT();
  const v = useVertical();
  const { width, height } = useVideoConfig();
  const box = phoneBox(v);
  const fit = Math.min(box.w / PHONE_W, box.h / PHONE_H);
  const pw = PHONE_W * fit;
  const ph = PHONE_H * fit;
  const px = box.x + box.w / 2 - pw / 2;
  const py = box.y + box.h / 2 - ph / 2;

  // Pill geometry in stage px.
  const pd = 140;
  const drop = prog(f, 0, DROP, Easing.inOut(Easing.cubic));
  const wide = prog(f, DROP - 2, WIDE - DROP + 4, EASE_POP);
  const tall = prog(f, WIDE, OPEN - WIDE, Easing.inOut(Easing.cubic));
  const cx = interpolate(drop, [0, 1], [width / 2, px + pw / 2]);
  const bottom = py + ph - 26 * fit;
  const cy = interpolate(drop, [0, 1], [height / 2, bottom - pd / 2]);
  const w0 = pd * 1.85;
  const pillW = interpolate(wide, [0, 1], [w0, pw]);
  const pillH = interpolate(tall, [0, 1], [pd, ph]);
  const top = interpolate(tall, [0, 1], [cy - pd / 2, py]);
  const reveal = prog(f, OPEN - 6, 8, Easing.linear);
  const marks = 1 - prog(f, DROP, 6, Easing.linear);

  return (
    <DarkStage>
      <Framed
        w={PHONE_W}
        h={PHONE_H}
        box={box}
        damp={v}
        cam={[
          { f: 0, x: PHONE_W / 2, y: PHONE_H / 2, z: 1 },
          { f: OPEN, x: PHONE_W / 2, y: PHONE_H / 2, z: 1 },
          { f: 131, x: PHONE_W / 2, y: 520, z: 1.05 },
        ]}
      >
        <div style={{ opacity: reveal }}>
          <Phone>
            <DialerScreen />
          </Phone>
        </div>
      </Framed>
      {reveal < 1 ? (
        <AbsoluteFill style={{ opacity: 1 - reveal }}>
          <div
            style={{
              position: "absolute",
              left: cx - pillW / 2,
              top,
              width: pillW,
              height: pillH,
              borderRadius: interpolate(tall, [0, 1], [pd / 2, 58 * fit]),
              background: C.mint,
              boxShadow: "0 0 80px rgba(125,240,182,.25)",
            }}
          >
            <div style={{ position: "absolute", left: 0, bottom: 0, width: pd, height: pd, opacity: marks }}>
              <svg width={pd} height={pd} viewBox="0 0 40 40">
                <path d={HANDSET} fill={C.callLayer} transform="translate(9.5 9.5) scale(.95)" />
              </svg>
            </div>
            {pillBars(f + 87).map((b, i) => {
              const bh = pd * (0.25 + 0.3 * b);
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: pd * (0.98 + i * 0.22),
                    bottom: pd / 2 - bh / 2,
                    width: pd * 0.125,
                    height: bh,
                    borderRadius: pd,
                    background: C.callLayer,
                    opacity: (i === 1 ? 1 : 0.6) * marks,
                  }}
                />
              );
            })}
          </div>
        </AbsoluteFill>
      ) : null}
    </DarkStage>
  );
};
