import React from "react";
import { useCurrentFrame } from "remotion";
import { Backdrop } from "../Backdrop";
import { Logo } from "../Logo";
import { COLORS, EASE_IN, FONT, fadeIn } from "../theme";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Backdrop>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          fontFamily: FONT,
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: fadeIn(frame, 0, 18),
            scale: String(0.9 + EASE_IN(Math.min(1, frame / 24)) * 0.1),
          }}
        >
          <Logo size={110} />
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.white,
            maxWidth: 1240,
            lineHeight: 1.2,
            letterSpacing: -1,
            opacity: fadeIn(frame, 16, 18),
            translate: `0px ${(1 - EASE_IN(Math.min(1, Math.max(0, (frame - 16) / 18)))) * 20}px`,
          }}
        >
          The trusted way for international buyers to invest in Greek property.
        </div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 400,
            color: "rgba(255,255,255,0.7)",
            opacity: fadeIn(frame, 34, 18),
          }}
        >
          Verified listings · Real investment numbers · Local experts, in one place
        </div>
        <div
          style={{
            marginTop: 8,
            padding: "12px 26px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.25)",
            fontSize: 24,
            fontWeight: 600,
            color: COLORS.white,
            opacity: fadeIn(frame, 50, 18),
          }}
        >
          Greece first. More countries to follow.
        </div>
      </div>
    </Backdrop>
  );
};
