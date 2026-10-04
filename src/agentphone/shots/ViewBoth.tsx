import React from "react";
import { AbsoluteFill, Easing } from "remotion";
import { enter, prog } from "../lib/anim";
import { DarkStage, PaperStage, Phone, PHONE_H, PHONE_W, phoneBox, useVertical } from "../lib/stage";
import { Shift, useT } from "../lib/time";
import { DashboardScreen } from "../screens/dashboard";
import { InsightsScreen } from "../screens/insights";
import { C, FONT } from "../theme";
import { deskRect } from "./Expand";

const SPLIT = 22; // board shrinks aside, phone joins it

type R = { x: number; y: number; w: number; h: number };
const mix = (a: R, b: R, t: number): R => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
  w: a.w + (b.w - a.w) * t,
  h: a.h + (b.h - a.h) * t,
});

// "Every call, on desktop or mobile." The calls board shrinks aside, the
// phone joins it, then the phone takes the stage again.
export const ViewBothShot: React.FC<{ insightsAt: number; len: number }> = ({ insightsAt, len }) => {
  const VIEW_LEN = len;
  const BACK = len - 39; // then back to the phone
  const f = useT();
  const v = useVertical();
  const ease = Easing.inOut(Easing.cubic);
  const split = prog(f, 0, SPLIT, ease);
  const back = prog(f, BACK, VIEW_LEN - BACK, ease);
  const full = deskRect(v);
  const side: R = v ? { x: 40, y: 430, w: 1000, h: 789 } : { x: 150, y: 272, w: 960, h: 757 };
  const ph = v ? 640 : 760;
  const phoneSide: R = v
    ? { x: 735, y: 1150, w: (ph * PHONE_W) / PHONE_H, h: ph }
    : { x: 1360, y: 262, w: (ph * PHONE_W) / PHONE_H, h: ph };
  const pb = phoneBox(v);
  const fit = Math.min(pb.w / PHONE_W, pb.h / PHONE_H);
  const phoneCentre: R = { x: pb.x + pb.w / 2 - (PHONE_W * fit) / 2, y: pb.y + pb.h / 2 - (PHONE_H * fit) / 2, w: PHONE_W * fit, h: PHONE_H * fit };

  const board = mix(full, side, split);
  const boardX = board.x - back * (board.x + board.w + 200);
  const phoneIn = prog(f, 12, 18, Easing.out(Easing.cubic));
  const phone = mix(phoneSide, phoneCentre, back);
  const head = enter(f, 10, 24);
  const headOut = 1 - prog(f, BACK - 4, 12, Easing.linear);

  return (
    <AbsoluteFill>
      <DarkStage />
      <AbsoluteFill style={{ opacity: 1 - prog(f, BACK + 6, VIEW_LEN - BACK - 10, Easing.linear) }}>
        <PaperStage />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: boardX,
          top: board.y,
          width: 1280,
          height: 1010,
          transformOrigin: "0 0",
          scale: `${board.w / 1280}`,
          borderRadius: 24,
          boxShadow: "0 50px 100px -40px rgba(16,74,52,.45)",
          opacity: 1 - back * 0.6,
        }}
      >
        <Shift by={-insightsAt}>
          <InsightsScreen />
        </Shift>
      </div>
      <div
        style={{
          position: "absolute",
          left: phone.x + (1 - phoneIn) * 300,
          top: phone.y,
          width: PHONE_W,
          height: PHONE_H,
          transformOrigin: "0 0",
          scale: `${phone.h / PHONE_H}`,
          opacity: phoneIn,
        }}
      >
        <Phone>
          <Shift by={-110}>
            <DashboardScreen />
          </Shift>
        </Phone>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: v ? 190 : 96,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: v ? 84 : 78,
          letterSpacing: "-0.035em",
          lineHeight: 1.05,
          color: C.ink,
          padding: v ? "0 80px" : 0,
          ...head,
          opacity: head.opacity * headOut,
        }}
      >
        Every call, on desktop or mobile.
      </div>
    </AbsoluteFill>
  );
};
