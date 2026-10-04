import {useT} from "../lib/time";
import React from "react";
import { enter, pop } from "../lib/anim";
import { deskBox, Framed, Key, PaperStage, useVertical } from "../lib/stage";
import { CALLBACK, DesktopScreen, QUERY } from "../screens/desktop";

export const DESKTOP_LEN = 174;

// Look-at points on the 1280×800 board.
const H: Key[] = [
  { f: 0, x: 640, y: 380, z: 1.04 },
  { f: 26, x: 640, y: 370, z: 1.08 },
  { f: 50, x: 200, y: 400, z: 1.45 }, // calendar
  { f: 68, x: 200, y: 410, z: 1.45 },
  { f: CALLBACK - 6, x: 640, y: 300, z: 1.42 }, // unanswered · Sophie
  { f: CALLBACK + 16, x: 640, y: 310, z: 1.42 },
  { f: QUERY + 2, x: 1100, y: 290, z: 1.5 }, // list builder
  { f: 152, x: 1100, y: 300, z: 1.5 },
  { f: DESKTOP_LEN, x: 640, y: 400, z: 1.0 }, // pull out
];
const V: Key[] = [
  { f: 0, x: 640, y: 400, z: 1.0 },
  { f: 26, x: 600, y: 330, z: 1.9 },
  { f: 50, x: 180, y: 360, z: 3.6 },
  { f: 68, x: 180, y: 380, z: 3.6 },
  { f: CALLBACK - 6, x: 640, y: 330, z: 1.95 },
  { f: CALLBACK + 16, x: 640, y: 340, z: 1.95 },
  { f: QUERY + 2, x: 1110, y: 300, z: 3.6 },
  { f: 152, x: 1110, y: 320, z: 3.6 },
  { f: DESKTOP_LEN, x: 640, y: 400, z: 1.15 },
];

// 0:11–0:17 · Desktop · Today. The after-call row lands, then the camera
// tours calendar → unanswered → list builder and pulls out.
/** Sophie's "Call back" on the board: where the call token emerges. */
export const CALLBACK_PT: [number, number] = [882, 158];

export const DesktopShot: React.FC<{ tokenAt?: number }> = ({ tokenAt }) => {
  const f = useT();
  const v = useVertical();
  return (
    <PaperStage>
      <Framed w={1280} h={800} box={deskBox(v)} cam={v ? V : H}>
        <div
          style={{
            ...enter(f, 0, 12),
            borderRadius: 24,
            boxShadow: "0 0 0 1px rgba(22,36,29,.06), 0 50px 100px -40px rgba(16,74,52,.45)",
          }}
        >
          <DesktopScreen />
        </div>
        {tokenAt !== undefined && f >= tokenAt ? <Token at={tokenAt} /> : null}
      </Framed>
    </PaperStage>
  );
};

/** A green call token pops out of "Call back": it leads into routing. */
const Token: React.FC<{ at: number }> = ({ at }) => {
  const f = useT();
  const p = pop(f, at, 0.3);
  const glow = 0.5 + 0.5 * Math.sin((f - at) * 0.5);
  return (
    <div
      style={{
        position: "absolute",
        left: CALLBACK_PT[0] - 11,
        top: CALLBACK_PT[1] - 11,
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: "radial-gradient(circle at 35% 35%,#7df0b6,#0c9a55)",
        boxShadow: `0 0 0 ${5 + 3 * glow}px rgba(16,196,110,.25), 0 0 26px 8px rgba(16,196,110,.55)`,
        ...p,
      }}
    />
  );
};
