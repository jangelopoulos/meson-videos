import React from "react";
import { pop } from "../lib/anim";
import { DarkStage, Framed, Phone, PHONE_H, PHONE_W, phoneBox, useVertical } from "../lib/stage";
import { useT } from "../lib/time";
import { MappingScreen, ROW0, STEP } from "../screens/mapping";

// 0:47–0:51 · Connect a CRM. Played at 1.0 speed, as the brief asks: each
// row resolves before the next. Gentle push into the field mapping.
export const MappingShot: React.FC<{ pressAt?: number }> = ({ pressAt }) => {
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
          { f: 0, x: PHONE_W / 2, y: PHONE_H / 2, z: 1 },
          { f: ROW0, x: PHONE_W / 2, y: PHONE_H / 2, z: 1 },
          { f: ROW0 + 5 * STEP, x: PHONE_W / 2, y: 560, z: 1.1 },
        ]}
      >
        <div style={pop(f, 0, 0.94)}>
          <Phone>
            <MappingScreen pressAt={pressAt} />
          </Phone>
        </div>
      </Framed>
    </DarkStage>
  );
};
