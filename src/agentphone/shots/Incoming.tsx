import React from "react";
import { useCurrentFrame } from "remotion";
import { pop } from "../lib/anim";
import { DarkStage, Framed, Phone, PHONE_H, PHONE_W, phoneBox, useVertical } from "../lib/stage";
import { IncomingScreen } from "../screens/incoming";

// 0:03–0:05 · Incoming call. Camera pushes 6% toward the context card.
export const IncomingShot: React.FC = () => {
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
          { f: 0, x: PHONE_W / 2, y: PHONE_H / 2, z: 1 },
          { f: 10, x: PHONE_W / 2, y: PHONE_H / 2, z: 1 },
          { f: 40, x: PHONE_W / 2, y: 470, z: 1.06 },
        ]}
      >
        <div style={pop(f, 0, 0.9)}>
          <Phone>
            <IncomingScreen />
          </Phone>
        </div>
      </Framed>
    </DarkStage>
  );
};
