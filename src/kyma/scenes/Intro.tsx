import React from "react";
import { useCurrentFrame } from "remotion";
import { Backdrop } from "../Backdrop";
import { Logo } from "../Logo";
import { COLORS, EASE_IN, FONT, fadeIn } from "../theme";

const WORDS = ["Find", "a", "home", "in", "Greece", "you", "can", "actually", "trust."];

export const Intro: React.FC = () => {
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
          fontFamily: FONT,
          gap: 36,
        }}
      >
        <div
          style={{
            opacity: fadeIn(frame, 0, 20),
            translate: `0px ${(1 - EASE_IN(Math.min(1, frame / 20))) * 20}px`,
          }}
        >
          <Logo size={72} />
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: 1300,
            gap: "0 22px",
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.05,
            color: COLORS.white,
            letterSpacing: -2,
            textAlign: "center",
          }}
        >
          {WORDS.map((w, i) => {
            const start = 14 + i * 4;
            const t = EASE_IN(Math.min(1, Math.max(0, (frame - start) / 16)));
            return (
              <span
                key={w + i}
                style={{
                  display: "inline-block",
                  opacity: t,
                  translate: `0px ${(1 - t) * 30}px`,
                  color: i >= 5 ? COLORS.white : COLORS.white,
                }}
              >
                {w}
              </span>
            );
          })}
        </div>

        <div
          style={{
            fontSize: 34,
            fontWeight: 400,
            color: "rgba(255,255,255,0.72)",
            maxWidth: 1100,
            textAlign: "center",
            lineHeight: 1.4,
            opacity: fadeIn(frame, 56, 18),
            translate: `0px ${(1 - EASE_IN(Math.min(1, Math.max(0, (frame - 56) / 18)))) * 16}px`,
          }}
        >
          Verified titles, real yields, full costs and Golden Visa answers on every
          listing — wherever you&apos;re buying from.
        </div>
      </div>
    </Backdrop>
  );
};
