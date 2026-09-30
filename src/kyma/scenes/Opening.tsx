import React from "react";
import { AbsoluteFill, Easing, Img, staticFile, useCurrentFrame } from "remotion";
import { GoldDust, Letterbox } from "../fx";
import { Kicker, MaskLine } from "../type";
import { COLORS, EASE, EASE_INOUT, SANS, SERIF, lerp, prog } from "../theme";

/** Letterboxed aerial of the coast, with the editorial title. */
export const Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const bar = lerp(540, 110, prog(frame, 0, 48, EASE_INOUT));
  const zoom = lerp(1.16, 1.0, prog(frame, 0, 170, Easing.out(Easing.cubic)));
  const pan = lerp(-180, -820, frame / 170);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <Img
        src={staticFile("kyma/photos/aerial.jpg")}
        style={{
          position: "absolute",
          top: 100,
          left: pan,
          height: 880,
          width: 3491,
          maxWidth: "none",
          scale: String(zoom),
          filter: "saturate(1.1) contrast(1.06)",
        }}
      />
      <AbsoluteFill
        style={{
          background: "linear-gradient(180deg, rgba(240,196,120,0.24) 0%, rgba(10,26,46,0.30) 100%)",
          mixBlendMode: "soft-light",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(5,11,21,0.9) 0%, rgba(5,11,21,0.6) 38%, rgba(5,11,21,0) 74%)",
        }}
      />
      <GoldDust count={20} seed="open" opacity={0.7} />

      <div style={{ position: "absolute", left: 150, top: 290 }}>
        <Kicker frame={frame} from={34}>
          Kyma · Greek property, verified
        </Kicker>
        <div
          style={{
            marginTop: 22,
            fontFamily: SERIF,
            fontSize: 150,
            lineHeight: 1.0,
            fontWeight: 500,
            color: COLORS.ivory,
            letterSpacing: -1,
          }}
        >
          <MaskLine frame={frame} from={42}>
            The Aegean,
          </MaskLine>
          <MaskLine frame={frame} from={54} style={{ fontStyle: "italic", color: COLORS.goldLight }}>
            without the guesswork.
          </MaskLine>
        </div>
        <div
          style={{
            marginTop: 30,
            height: 1.5,
            width: 440 * prog(frame, 74, 34, EASE),
            background: `linear-gradient(90deg, ${COLORS.gold}, rgba(200,165,106,0))`,
          }}
        />
        <div
          style={{
            marginTop: 26,
            fontFamily: SANS,
            fontSize: 30,
            color: COLORS.ivoryMuted,
            opacity: prog(frame, 86, 20),
            translate: `0px ${(1 - prog(frame, 86, 24, EASE)) * 16}px`,
          }}
        >
          Verified listings, real investment numbers and trusted local experts.
        </div>
      </div>

      <Letterbox height={bar} />
    </AbsoluteFill>
  );
};
