import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { pop } from "../lib/anim";
import { DarkStage, Framed, Phone, PHONE_H, PHONE_W, phoneBox, useVertical } from "../lib/stage";
import { DashboardScreen } from "../screens/dashboard";

export const DASHBOARD_LEN = 87;

// 0:25–0:28 · Next morning. Slow 1.0→1.05 push; the phone folds away into
// the dark before the close.
export const DashboardShot: React.FC = () => {
  const f = useCurrentFrame();
  const v = useVertical();
  const away = interpolate(f, [DASHBOARD_LEN - 9, DASHBOARD_LEN], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  return (
    <DarkStage>
      <Framed
        w={PHONE_W}
        h={PHONE_H}
        box={phoneBox(v)}
        damp={v}
        cam={[
          { f: 0, x: PHONE_W / 2, y: PHONE_H / 2, z: 1 },
          { f: DASHBOARD_LEN, x: PHONE_W / 2, y: 400, z: 1.05 },
        ]}
      >
        <div style={{ ...pop(f, 0, 0.94), scale: `${(1 - 0.75 * away) * Number(pop(f, 0, 0.94).scale)}`, opacity: pop(f, 0, 0.94).opacity * (1 - away) }}>
          <Phone>
            <DashboardScreen />
          </Phone>
        </div>
      </Framed>
    </DarkStage>
  );
};
