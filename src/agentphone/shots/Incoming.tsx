import {useT} from "../lib/time";
import { Cam } from "../lib/transition";
import React from "react";
import { pop } from "../lib/anim";
import { DarkStage, Framed, Phone, PHONE_H, PHONE_W, phoneBox, useVertical } from "../lib/stage";
import { IncomingScreen } from "../screens/incoming";
import { ContextInset } from "./ContextInset";

// 0:03–0:05 · Incoming call. Camera pushes 6% toward the context card.
export const IncomingShot: React.FC<{ tap?: number; inset?: { at: number; value: number; markAt: number }; camFrom?: Cam }> = ({ tap, inset, camFrom }) => {
  const f = useT();
  const v = useVertical();
  return (
    <DarkStage>
      <Framed
        w={PHONE_W}
        h={PHONE_H}
        box={phoneBox(v)}
        damp={v}
        cam={[
          camFrom ? { f: 0, ...camFrom } : { f: 0, x: PHONE_W / 2, y: PHONE_H / 2, z: 1 },
          { f: 10, x: PHONE_W / 2, y: PHONE_H / 2, z: 1 },
          { f: 40, x: PHONE_W / 2, y: 470, z: 1.06 },
        ]}
      >
        <div style={camFrom ? undefined : pop(f, 0, 0.9)}>
          <Phone>
            <IncomingScreen tap={tap} />
          </Phone>
        </div>
      </Framed>
      {inset ? <ContextInset {...inset} /> : null}
    </DarkStage>
  );
};
