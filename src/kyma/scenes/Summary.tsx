import React from "react";
import { useCurrentFrame } from "remotion";
import { Backdrop } from "../Backdrop";
import { COLORS, EASE_IN, FONT, fadeIn } from "../theme";

const ROWS = [
  {
    q: "Is it a good investment?",
    a: "Yield estimates, comparable sales and rents, price per m² against the area average.",
    color: COLORS.green,
  },
  {
    q: "Is it legally clean?",
    a: "Title, permit and planning status on every listing: verified, declared by the agent, or unknown.",
    color: COLORS.green,
  },
  {
    q: "What will it really cost?",
    a: "A full acquisition calculator covering taxes, notary, lawyer and fees, plus ongoing costs.",
    color: COLORS.amber,
  },
  {
    q: "Golden Visa? Short-term lets?",
    a: "Clear eligibility tags on every home, so you know before you enquire.",
    color: COLORS.blue,
  },
  {
    q: "Who can I trust to get it done?",
    a: "Licensed agents only, reviews, and vetted lawyers, mortgage brokers, currency providers and property managers.",
    color: COLORS.white,
  },
];

/** The five buyer questions the product is built around. */
export const Summary: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Backdrop>
      <div
        style={{
          position: "absolute",
          left: 180,
          top: 0,
          bottom: 0,
          right: 180,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontFamily: FONT,
          color: COLORS.white,
        }}
      >
        <div
          style={{
            fontSize: 58,
            fontWeight: 700,
            letterSpacing: -1,
            lineHeight: 1.1,
            opacity: fadeIn(frame, 0, 18),
            translate: `0px ${(1 - EASE_IN(Math.min(1, frame / 18))) * 20}px`,
          }}
        >
          Built around the questions international buyers actually ask.
        </div>

        <div style={{ marginTop: 52, display: "flex", flexDirection: "column", gap: 30 }}>
          {ROWS.map((row, i) => {
            const start = 18 + i * 14;
            const t = EASE_IN(Math.min(1, Math.max(0, (frame - start) / 18)));
            return (
              <div
                key={row.q}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 26,
                  opacity: t,
                  translate: `${(1 - t) * -30}px 0px`,
                }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 27,
                    flexShrink: 0,
                    marginTop: 2,
                    backgroundColor: "rgba(255,255,255,0.08)",
                    border: `2px solid ${row.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    fontWeight: 700,
                    color: row.color,
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <div style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.15 }}>{row.q}</div>
                  <div
                    style={{
                      fontSize: 30,
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.72)",
                      marginTop: 4,
                      lineHeight: 1.35,
                      maxWidth: 1400,
                    }}
                  >
                    {row.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 52,
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 32,
            fontWeight: 600,
            color: COLORS.white,
            opacity: fadeIn(frame, 110, 18),
            translate: `0px ${(1 - EASE_IN(Math.min(1, Math.max(0, (frame - 110) / 18)))) * 16}px`,
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: COLORS.green }} />
          Every enquiry gets a fast call-back to qualify the buyer before it reaches the agent.
        </div>
      </div>
    </Backdrop>
  );
};
