import React from "react";
import { Sequence, useCurrentFrame } from "remotion";
import { slide } from "../lib/anim";
import { DarkStage, Framed, Phone, PHONE_H, PHONE_W, phoneBox, useVertical } from "../lib/stage";
import { LiveScreen } from "../screens/live";
import { ContextScreen } from "../screens/context";

export const CONTEXT_IN = 18;

// 0:05–0:07 · Live call. Camera pushes into the transcript; the context
// gauge slides in from the right as an inset.
export const LiveShot: React.FC = () => {
  const f = useCurrentFrame();
  const v = useVertical();
  return (
    <DarkStage>
      <Framed
        w={PHONE_W}
        h={PHONE_H}
        box={phoneBox(v)}
        damp={v}
        cam={[
          { f: 0, x: PHONE_W / 2, y: PHONE_H / 2, z: 1.03 },
          { f: 8, x: PHONE_W / 2, y: PHONE_H / 2, z: 1.03 },
          { f: 44, x: PHONE_W / 2, y: 560, z: 1.16 },
        ]}
      >
        <Phone>
          <LiveScreen />
        </Phone>
      </Framed>
      <div
        style={{
          position: "absolute",
          ...(v ? { left: 540 - 230 * 1.7, top: 1290 } : { left: 1440, top: 620 }),
          width: 460,
          height: 340,
          transformOrigin: "0 0",
          scale: v ? "1.7" : "1.05",
          ...slide(f, CONTEXT_IN, 160, 12),
          filter: "drop-shadow(0 40px 60px rgba(0,0,0,.45))",
        }}
      >
        <Sequence from={CONTEXT_IN} layout="none">
          <ContextScreen />
        </Sequence>
      </div>
    </DarkStage>
  );
};
