import React from "react";
import { AbsoluteFill, Easing, interpolate } from "remotion";
import { prog } from "../lib/anim";
import { DarkStage, deskBox, PaperStage, PHONE_H, PHONE_W, useVertical } from "../lib/stage";
import { Pace, Shift, useT } from "../lib/time";
import { Cam, stagePoint } from "../lib/transition";
import { InsightsScreen } from "../screens/insights";
import { ScoreScreen } from "../screens/score";

export const EXPAND_LEN = 29;
export const INSIGHTS_LEAD = 8; // insights content is already loading as the frame grows

/** Stage rect of the desktop board at a full-board camera. */
export const deskRect = (v: boolean, w = 1280, h = 1010) => {
  const box = deskBox(v);
  const fit = Math.min(box.w / w, box.h / h);
  return { x: box.x + box.w / 2 - (w * fit) / 2, y: box.y + box.h / 2 - (h * fit) / 2, w: w * fit, h: h * fit };
};

// Coach from calls → the phone grows into the desktop calls view.
export const ExpandShot: React.FC<{ from: Cam; scoreEnd: number }> = ({ from, scoreEnd }) => {
  const f = useT();
  const v = useVertical();
  const m = prog(f, 0, EXPAND_LEN, Easing.inOut(Easing.cubic));
  const [ax, ay] = stagePoint(v, "phone", [PHONE_W, PHONE_H], from, [12, 12]);
  const [bx, by] = stagePoint(v, "phone", [PHONE_W, PHONE_H], from, [PHONE_W - 12, PHONE_H - 12]);
  const d = deskRect(v);
  const lerp = (a: number, b: number) => a + (b - a) * m;
  const x = lerp(ax, d.x);
  const y = lerp(ay, d.y);
  const w = lerp(bx - ax, d.w);
  const h = lerp(by - ay, d.h);
  const bezel = lerp(12 * ((bx - ax) / 390), 0);
  const phoneOut = 1 - interpolate(m, [0.15, 0.55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const deskIn = interpolate(m, [0.3, 0.75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sPhone = Math.max(w / 390, h / 844);
  const sDesk = Math.max(w / 1280, h / 1010);
  return (
    <AbsoluteFill>
      <DarkStage />
      <AbsoluteFill style={{ opacity: m }}>
        <PaperStage />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: x - bezel,
          top: y - bezel,
          width: w + bezel * 2,
          height: h + bezel * 2,
          padding: bezel,
          borderRadius: lerp(58 * ((bx - ax) / 390), 24 * (d.w / 1280)),
          background: `rgba(30,42,36,${1 - m})`,
          boxShadow: `0 50px 100px -40px rgba(16,74,52,${0.25 + 0.2 * m})`,
        }}
      >
        <div style={{ width: w, height: h, borderRadius: lerp(46 * ((bx - ax) / 390), 24 * (d.w / 1280)), overflow: "hidden", position: "relative", background: "#eef4f0" }}>
          <div style={{ position: "absolute", left: (w - 1280 * sDesk) / 2, top: 0, width: 1280, height: 1010, transformOrigin: "0 0", scale: `${sDesk}`, opacity: deskIn }}>
            <Shift by={-INSIGHTS_LEAD}>
              <InsightsScreen />
            </Shift>
          </div>
          <div style={{ position: "absolute", left: (w - 390 * sPhone) / 2, top: 0, width: 390, height: 844, transformOrigin: "0 0", scale: `${sPhone}`, opacity: phoneOut }}>
            <Pace scale={1.6}>
              <Shift by={-scoreEnd}>
                <ScoreScreen />
              </Shift>
            </Pace>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
