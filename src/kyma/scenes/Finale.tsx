import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { GoldDust, Letterbox } from "../fx";
import { Logo } from "../Logo";
import { MaskLine } from "../type";
import { COLORS, EASE, EASE_INOUT, SANS, SERIF, lerp, prog } from "../theme";

/** Sunset, logo, positioning line; the letterbox closes to end the film. */
export const Finale: React.FC = () => {
  const frame = useCurrentFrame();
  const bars = lerp(110, 540, prog(frame, 138, 32, EASE_INOUT));
  const logoIn = prog(frame, 6, 30, EASE);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <Img
        src={staticFile("kyma/photos/sunset.jpg")}
        style={{
          position: "absolute",
          left: -80,
          top: -120,
          width: 2080,
          maxWidth: "none",
          height: 1545,
          objectFit: "cover",
          filter: "blur(5px) brightness(0.62) saturate(1.1)",
          scale: String(lerp(1.08, 1.0, prog(frame, 0, 170))),
        }}
      />
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 48%, rgba(5,11,21,0.45) 0%, rgba(5,11,21,0.85) 100%)",
        }}
      />
      <GoldDust count={30} seed="finale" opacity={0.8} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div style={{ opacity: logoIn, scale: String(lerp(0.9, 1, logoIn)) }}>
          <Logo size={104} />
        </div>
        <div
          style={{
            marginTop: 34,
            height: 1.5,
            width: 520 * prog(frame, 22, 30, EASE),
            background: `linear-gradient(90deg, rgba(200,165,106,0), ${COLORS.gold}, rgba(200,165,106,0))`,
          }}
        />
        <div style={{ marginTop: 30, fontFamily: SERIF, fontSize: 68, fontWeight: 500, color: COLORS.ivory, lineHeight: 1.08 }}>
          <MaskLine frame={frame} from={26}>
            The trusted way to invest
          </MaskLine>
          <MaskLine frame={frame} from={34} style={{ fontStyle: "italic", color: COLORS.goldLight }}>
            in Greek property.
          </MaskLine>
        </div>
        <div
          style={{
            marginTop: 34,
            fontFamily: SANS,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: COLORS.gold,
            opacity: prog(frame, 52, 18),
          }}
        >
          Verified listings · Real investment numbers · Local experts
        </div>
        <div
          style={{
            marginTop: 30,
            padding: "12px 28px",
            borderRadius: 999,
            border: "1px solid rgba(232,211,166,0.45)",
            fontFamily: SANS,
            fontSize: 24,
            fontWeight: 600,
            color: COLORS.ivory,
            opacity: prog(frame, 66, 18),
          }}
        >
          Greece first. More countries to follow.
        </div>
      </div>
      <Letterbox height={bars} />
    </AbsoluteFill>
  );
};
