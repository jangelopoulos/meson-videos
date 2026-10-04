import { Cam } from "../lib/transition";
import React from "react";
import { DarkStage, Framed, Phone, PHONE_H, PHONE_W, phoneBox, useVertical } from "../lib/stage";
import { LiveScreen } from "../screens/live";
import { ContextInset } from "./ContextInset";

export const CONTEXT_IN = 18;

// 0:05–0:07 · Live call. Camera pushes into the transcript; the context
// gauge slides in from the right as an inset.
export const LiveShot: React.FC<{ inset?: boolean; easeOut?: number; endAt?: number; camFrom?: Cam }> = ({ inset = true, easeOut, endAt, camFrom }) => {
  const v = useVertical();
  return (
    <DarkStage>
      <Framed
        w={PHONE_W}
        h={PHONE_H}
        box={phoneBox(v)}
        damp={v}
        cam={[
          camFrom ? { f: 0, ...camFrom } : { f: 0, x: PHONE_W / 2, y: PHONE_H / 2, z: 1.03 },
          { f: 8, x: PHONE_W / 2, y: PHONE_H / 2, z: 1.03 },
          { f: 44, x: PHONE_W / 2, y: 560, z: 1.16 },
          ...(easeOut ? [{ f: easeOut - 20, x: PHONE_W / 2, y: 560, z: 1.16 }, { f: easeOut, x: PHONE_W / 2, y: PHONE_H / 2, z: 1.03 }] : []),
        ]}
      >
        <Phone>
          <LiveScreen endAt={endAt} />
        </Phone>
      </Framed>
      {inset ? <ContextInset at={CONTEXT_IN} /> : null}
    </DarkStage>
  );
};
