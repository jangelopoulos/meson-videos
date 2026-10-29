import React from "react";
import { colors, fonts, type } from "../brand";

const CONTACTS = ["A. Chen", "M. Patel", "J. Okafor", "S. Rossi", "L. Nguyen"];
const STAGES = [
  { name: "LEAD", cards: 3 },
  { name: "QUALIFIED", cards: 2 },
  { name: "PROPOSAL", cards: 2 },
  { name: "WON", cards: 1 },
];
const BARS = [0.42, 0.55, 0.48, 0.66, 0.6, 0.78, 0.92];

/**
 * A generic, unbranded business dashboard: sidebar, AI search, contacts,
 * pipeline and a chart. Designed at 1200x760 and scaled with `width`.
 */
export const Dashboard: React.FC<{
  width: number;
  /** Accent used for active states (re-theme flicker). */
  accent?: string;
  /** Sidebar surface colour (re-theme flicker). */
  surface?: string;
  /** 0..1: sidebar app icons slot in. */
  slotted?: number;
  /** Show the AI search bar with a Signal cursor. */
  ai?: number;
  /** 0..1: the price tag drops off the corner. */
  tagDrop?: number;
}> = ({
  width,
  accent = colors.black,
  surface = "#F4F3F0",
  slotted = 1,
  ai = 0,
  tagDrop = -1,
}) => {
  const s = width / 1200;
  const px = (n: number) => n * s;
  const text = (
    size: number,
    weight = 500,
    color: string = colors.black,
  ): React.CSSProperties => ({
    fontFamily: fonts.body,
    fontSize: px(size),
    fontWeight: weight,
    color,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
  });
  const mono = (
    size: number,
    color: string = colors.grey,
  ): React.CSSProperties => ({
    fontFamily: fonts.mono,
    fontSize: px(size),
    letterSpacing: type.monoTracking,
    color,
    whiteSpace: "nowrap",
  });

  return (
    <div
      style={{
        position: "relative",
        width,
        height: px(760),
        borderRadius: px(36),
        backgroundColor: colors.white,
        border: `1px solid rgba(10,10,10,0.08)`,
        boxShadow:
          "0 60px 120px rgba(10,10,10,0.18), 0 12px 30px rgba(10,10,10,0.08)",
        display: "flex",
        overflow: "visible",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: px(96),
          backgroundColor: surface,
          borderRadius: `${px(36)}px 0 0 ${px(36)}px`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: px(30),
          gap: px(18),
        }}
      >
        <div
          style={{
            width: px(40),
            height: px(40),
            borderRadius: px(12),
            backgroundColor: accent,
          }}
        />
        {Array.from({ length: 6 }).map((_, i) => {
          const p = Math.min(1, Math.max(0, slotted * 7 - i));
          return (
            <div
              key={i}
              style={{
                width: px(40),
                height: px(40),
                borderRadius: px(12),
                border: `${px(2)}px solid ${i === 0 ? accent : "rgba(10,10,10,0.18)"}`,
                opacity: p,
                translate: `${(1 - p) * px(-120)}px 0`,
              }}
            />
          );
        })}
      </div>

      {/* Main */}
      <div
        style={{
          flex: 1,
          padding: px(34),
          display: "flex",
          flexDirection: "column",
          gap: px(26),
        }}
      >
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", gap: px(20) }}>
          <div style={text(30, 600)}>Overview</div>
          <div
            style={{
              marginLeft: "auto",
              width: px(420),
              height: px(52),
              borderRadius: px(26),
              border: `${px(1.5)}px solid ${ai > 0 ? colors.signal : "rgba(10,10,10,0.12)"}`,
              display: "flex",
              alignItems: "center",
              padding: `0 ${px(20)}px`,
              gap: px(8),
              ...text(18, 500, "rgba(10,10,10,0.45)"),
            }}
          >
            {ai > 0 ? "Ask your business anything" : "Search"}
            {ai > 0 ? (
              <span
                style={{
                  width: px(2.5),
                  height: px(24),
                  backgroundColor: colors.signal,
                  opacity: ai,
                }}
              />
            ) : null}
          </div>
        </div>

        <div style={{ display: "flex", gap: px(26), flex: 1 }}>
          {/* Contacts */}
          <div
            style={{
              width: px(330),
              display: "flex",
              flexDirection: "column",
              gap: px(12),
            }}
          >
            <div style={mono(14)}>CONTACTS</div>
            {CONTACTS.map((c, i) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: px(14),
                  padding: `${px(10)}px ${px(12)}px`,
                  borderRadius: px(14),
                  backgroundColor: i === 0 ? surface : "transparent",
                }}
              >
                <div
                  style={{
                    width: px(38),
                    height: px(38),
                    borderRadius: "50%",
                    backgroundColor: i === 0 ? accent : "#E6E4DF",
                    ...text(15, 600, i === 0 ? colors.white : colors.black),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {c[0]}
                </div>
                <div style={text(19, 500)}>{c}</div>
                <div style={{ marginLeft: "auto", ...mono(13) }}>
                  {["HOT", "NEW", "WARM", "NEW", "WON"][i]}
                </div>
              </div>
            ))}
          </div>

          {/* Pipeline + chart */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: px(24),
            }}
          >
            <div style={{ display: "flex", gap: px(14) }}>
              {STAGES.map((st) => (
                <div
                  key={st.name}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: px(10),
                  }}
                >
                  <div style={mono(13)}>{st.name}</div>
                  {Array.from({ length: st.cards }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        height: px(54),
                        borderRadius: px(12),
                        backgroundColor: surface,
                        padding: px(10),
                        boxSizing: "border-box",
                      }}
                    >
                      <div
                        style={{
                          width: "70%",
                          height: px(8),
                          borderRadius: px(4),
                          backgroundColor: "rgba(10,10,10,0.22)",
                        }}
                      />
                      <div
                        style={{
                          marginTop: px(8),
                          width: "40%",
                          height: px(8),
                          borderRadius: px(4),
                          backgroundColor: "rgba(10,10,10,0.1)",
                        }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div
              style={{
                flex: 1,
                borderRadius: px(18),
                backgroundColor: surface,
                padding: px(20),
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={mono(13)}>REVENUE</div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "flex-end",
                  gap: px(14),
                  marginTop: px(12),
                }}
              >
                {BARS.map((b, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${b * 100}%`,
                      borderRadius: px(8),
                      backgroundColor:
                        i === BARS.length - 1 ? accent : "rgba(10,10,10,0.14)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Per-seat price tag hanging off the corner. */}
      {tagDrop < 1 && tagDrop >= 0 ? (
        <div
          style={{
            position: "absolute",
            right: px(-30),
            top: px(-26),
            padding: `${px(12)}px ${px(22)}px`,
            borderRadius: px(14),
            backgroundColor: colors.black,
            ...mono(22, colors.white),
            translate: `${tagDrop * px(80)}px ${tagDrop * tagDrop * px(900)}px`,
            rotate: `${tagDrop * 70}deg`,
            opacity: 1 - Math.max(0, tagDrop - 0.7) / 0.3,
          }}
        >
          $49/SEAT/MO
        </div>
      ) : null}
    </div>
  );
};
