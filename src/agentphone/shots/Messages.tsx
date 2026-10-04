import React from "react";
import { Easing, interpolate } from "remotion";
import { pop, prog } from "../lib/anim";
import { LoggedRow } from "../lib/LoggedRow";
import { DarkStage, Framed, Phone, PHONE_H, PHONE_W, phoneBox, useVertical } from "../lib/stage";
import { useT } from "../lib/time";
import { Cam } from "../lib/transition";
import { MessagesScreen, SENT } from "../screens/messages";

export const MESSAGES_LEN = 116;
const FLY = SENT + 14; // then the call's summary row flies out: the bridge to the desktop

// 0:27–0:31 · Messages. Bubbles slide in, the AI draft types and is sent,
// then the summary row flies out to the right toward the desktop.
export const MessagesShot: React.FC<{ camFrom?: Cam }> = ({ camFrom }) => {
  const f = useT();
  const v = useVertical();
  const lift = prog(f, FLY, 6);
  const fly = interpolate(f, [FLY + 4, MESSAGES_LEN], [0, 1], {
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
          camFrom ? { f: 0, ...camFrom } : { f: 0, x: PHONE_W / 2, y: PHONE_H / 2, z: 1 },
          { f: 20, x: PHONE_W / 2, y: PHONE_H / 2, z: 1 },
          { f: SENT, x: PHONE_W / 2, y: 520, z: 1.08 },
          { f: MESSAGES_LEN, x: PHONE_W / 2, y: 470, z: 1.04 },
        ]}
      >
        <div style={camFrom ? undefined : pop(f, 0, 0.94)}>
          <Phone>
            <MessagesScreen />
          </Phone>
        </div>
        {f >= FLY ? (
          <LoggedRow
            style={{
              position: "absolute",
              left: 34,
              top: 96,
              opacity: lift,
              scale: `${0.96 + 0.08 * lift}`,
              translate: `${fly * (v ? 900 : 1700)}px ${-14 * lift - fly * 60}px`,
              rotate: `${fly * 4}deg`,
            }}
          />
        ) : null}
      </Framed>
    </DarkStage>
  );
};
