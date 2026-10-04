import React from "react";
import { useCurrentFrame } from "remotion";
import { pop } from "../lib/anim";
import { DarkStage, Framed, Phone, PHONE_H, PHONE_W, phoneBox, useVertical } from "../lib/stage";
import { ScoreScreen } from "../screens/score";

// 0:21–0:23 · Call score. Push into the rubric during the fill.
export const ScoreShot: React.FC = () => {
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
          { f: 6, x: PHONE_W / 2, y: PHONE_H / 2, z: 1 },
          { f: 34, x: PHONE_W / 2, y: 520, z: 1.12 },
        ]}
      >
        <div style={pop(f, 0, 0.94)}>
          <Phone>
            <ScoreScreen />
          </Phone>
        </div>
      </Framed>
    </DarkStage>
  );
};
