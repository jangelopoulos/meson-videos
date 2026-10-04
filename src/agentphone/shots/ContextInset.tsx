import React from "react";
import { slide } from "../lib/anim";
import { useVertical } from "../lib/stage";
import { Shift, useT } from "../lib/time";
import { ContextScreen } from "../screens/context";

/** The relationship gauge, sliding in from the right edge as an inset. */
export const ContextInset: React.FC<{ at: number; value?: number; markAt?: number }> = ({ at, value, markAt }) => {
  const f = useT();
  const v = useVertical();
  return (
    <div
      style={{
        position: "absolute",
        ...(v ? { left: 540 - 230 * 1.7, top: 1290 } : { left: 1395, top: 620 }),
        width: 460,
        height: 340,
        transformOrigin: "0 0",
        scale: v ? "1.7" : "1.05",
        ...slide(f, at, 160, 12),
        filter: "drop-shadow(0 40px 60px rgba(0,0,0,.45))",
      }}
    >
      {f >= at ? (
        <Shift by={at}>
          <ContextScreen value={value} markAt={markAt === undefined ? undefined : markAt - at} />
        </Shift>
      ) : null}
    </div>
  );
};
