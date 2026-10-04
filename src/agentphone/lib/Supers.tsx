import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { enter } from "./anim";
import { useVertical } from "./stage";
import { C, FONT } from "../theme";

export type SuperStyle = "side" | "chip" | "below";
export type SuperCue = {
  from: number;
  to: number;
  text: string;
  style: SuperStyle;
  /** continues a super across a cut: no re-entry */
  cont?: boolean;
  /** continues into the next cue: no exit */
  hold?: boolean;
};

/** On-screen supers: Geist 600, entered with the brief's `enter` helper. */
const Super: React.FC<{ cue: SuperCue }> = ({ cue }) => {
  const f = useCurrentFrame();
  const v = useVertical();
  const len = cue.to - cue.from;
  const out = cue.hold
    ? 1
    : interpolate(f, [len - 5, len], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
  const e = cue.cont ? { opacity: 1, translate: "0px 0px" } : enter(f, 3, 24);
  const long = cue.text.length > 26;

  if (cue.style === "below") {
    return (
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", padding: v ? "0 80px 560px" : "0 0 200px" }}>
        <div
          style={{
            ...e,
            opacity: e.opacity * out,
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: v ? 60 : 56,
            letterSpacing: "-0.03em",
            color: C.mint,
            textAlign: "center",
          }}
        >
          {cue.text}
        </div>
      </AbsoluteFill>
    );
  }
  if (cue.style === "side") {
    return (
      <AbsoluteFill
        style={
          v
            ? { justifyContent: "flex-start", alignItems: "center", padding: "170px 80px 0" }
            : { justifyContent: "center", alignItems: "flex-start", padding: "0 0 0 150px" }
        }
      >
        <div
          style={{
            ...e,
            opacity: e.opacity * out,
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: v ? (long ? 76 : 88) : long ? 76 : 92,
            lineHeight: 1.04,
            letterSpacing: "-0.035em",
            color: C.onDark,
            maxWidth: v ? 920 : 640,
            textAlign: v ? "center" : "left",
            textWrap: "balance",
          }}
        >
          {cue.text}
        </div>
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: v ? "center" : "flex-start",
        padding: v ? "0 60px 150px" : "0 0 90px 150px",
      }}
    >
      <div
        style={{
          ...e,
          opacity: e.opacity * out,
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: v ? 64 : 60,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          color: C.onDark,
          background: "rgba(12,20,16,.92)",
          borderRadius: 28,
          padding: v ? "26px 40px" : "24px 38px",
          boxShadow: "0 30px 60px -20px rgba(12,20,16,.5)",
          maxWidth: v ? 960 : 1100,
          textAlign: v ? "center" : "left",
          textWrap: "balance",
        }}
      >
        {cue.text}
      </div>
    </AbsoluteFill>
  );
};

export const Supers: React.FC<{ cues: SuperCue[] }> = ({ cues }) => (
  <>
    {cues.map((c) => (
      <Sequence key={c.from} from={c.from} durationInFrames={c.to - c.from} name={`Super · ${c.text}`}>
        <Super cue={c} />
      </Sequence>
    ))}
  </>
);
