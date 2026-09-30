import React from "react";
import { useCurrentFrame } from "remotion";
import { Kicker, MaskLine } from "../type";
import { COLORS, EASE, SERIF, prog } from "../theme";
import { T } from "./layout";

const CAPTIONS = [
  { from: T.legal - 4, until: T.tapYield - 6, kicker: "Legal", l1: "Legally checked,", l2: "line by line." },
  { from: T.tapYield + 2, until: T.tapCosts - 4, kicker: "Investment", l1: "Real yields,", l2: "not brochure numbers." },
  { from: T.tapCosts + 2, until: T.tapVisa - 4, kicker: "Costs", l1: "The true cost,", l2: "before you offer." },
  { from: T.tapVisa + 2, until: T.sheetDown, kicker: "Golden Visa", l1: "Golden Visa?", l2: "Answered upfront." },
  { from: T.tapEnquire - 2, until: T.endStart - 4, kicker: "Call-back · your time zone", l1: "Enquire once.", l2: "We call you back." },
];

/** Big editorial lines beside the phone, one per beat. */
export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      {CAPTIONS.map((c) => {
        if (frame < c.from - 1 || frame > c.until + 10) {
          return null;
        }
        const out = prog(frame, c.until, 8, EASE);
        return (
          <div
            key={c.kicker}
            style={{
              position: "absolute",
              left: 1010,
              top: 380,
              width: 860,
              opacity: 1 - out,
              translate: `0px ${-24 * out}px`,
            }}
          >
            <Kicker frame={frame} from={c.from}>
              {c.kicker}
            </Kicker>
            <div style={{ marginTop: 18, fontFamily: SERIF, fontSize: 86, fontWeight: 500, lineHeight: 1.02, color: COLORS.ivory }}>
              <MaskLine frame={frame} from={c.from + 2} duration={16}>
                {c.l1}
              </MaskLine>
              <MaskLine frame={frame} from={c.from + 6} duration={16} style={{ fontStyle: "italic", color: COLORS.goldLight }}>
                {c.l2}
              </MaskLine>
            </div>
          </div>
        );
      })}
    </>
  );
};
