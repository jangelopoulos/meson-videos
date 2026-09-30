import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Phone } from "../devices";
import { COLORS, EASE, EASE_INOUT, EASE_POP, SANS, clamp01, kf, lerp, prog } from "../theme";
import { AppIcon, CheckIcon } from "../ui";
import {
  BAR_H,
  MS,
  PD,
  PHONE_CX,
  PHONE_LEFT,
  PHONE_TOP,
  PW,
  SHEET_TOP,
  T,
} from "./layout";
import { CostsPane, VisaPane, YieldPane } from "./Sheet";

/** Finger tap: a soft dot presses in, then a ring ripples out. Screen pixels. */
const Tap: React.FC<{ frame: number; at: number; x: number; y: number }> = ({ frame, at, x, y }) => {
  if (frame < at - 8 || frame > at + 20) {
    return null;
  }
  const approach = prog(frame, at - 8, 8, EASE);
  const t = clamp01((frame - at) / 18);
  const pressed = frame >= at && frame < at + 4 ? 0.82 : 1;
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: x - 40,
          top: y - 40,
          width: 80,
          height: 80,
          borderRadius: "50%",
          border: "3px solid rgba(59,79,228,0.8)",
          scale: String(0.4 + t * 1.2),
          opacity: frame >= at ? 1 - t : 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: x - 26,
          top: y - 26,
          width: 52,
          height: 52,
          borderRadius: "50%",
          backgroundColor: "rgba(17,24,39,0.28)",
          border: "2px solid rgba(255,255,255,0.95)",
          boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
          scale: String(lerp(1.4, 1, approach) * pressed),
          opacity: approach * (1 - prog(frame, at + 8, 10)),
        }}
      />
    </>
  );
};

// Legal rows on the mobile listing (screenshot pixels) and their status colours.
const LEGAL_ROWS = [
  { y: 1262, rgb: "21,128,61" },
  { y: 1386, rgb: "21,128,61" },
  { y: 1511, rgb: "194,65,12" },
  { y: 1634, rgb: "107,114,128" },
];

const SEGMENTS = ["Yield", "Costs", "Visa"];
const SEG_W = (PW - 44) / 3;
const segCenter = (i: number) => ({ x: 22 + SEG_W * (i + 0.5), y: SHEET_TOP + 28 + 22 });

const ENQUIRE = { x: PW - 20 - 88, y: PD.height - BAR_H + 14 + 27 };

/** The phone (formed by the morph) and the app being used: legal checks, sheet tabs, enquiry. */
export const PhoneFlow: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < T.morphEnd || frame > T.endStart + 30) {
    return null;
  }
  const float = Math.sin((frame - T.morphEnd) / 30) * 5 * prog(frame, T.morphEnd + 6, 24);
  const exit = prog(frame, T.endStart, 24, EASE_INOUT);

  const sheetVis = prog(frame, T.sheetUp, 18, EASE_POP) - prog(frame, T.sheetDown, 14, EASE_INOUT);
  const sheetH = PD.height - SHEET_TOP;
  const seg = kf(
    frame,
    [
      { at: T.tapCosts, value: 0 },
      { at: T.tapCosts + 10, value: 1 },
      { at: T.tapVisa, value: 1 },
      { at: T.tapVisa + 10, value: 2 },
    ],
    EASE_INOUT,
  );
  const panes = [
    { from: T.sheetUp + 4, to: T.tapCosts + 2, el: (f: number) => <YieldPane f={f} /> },
    { from: T.tapCosts + 2, to: T.tapVisa + 2, el: (f: number) => <CostsPane f={f} /> },
    { from: T.tapVisa + 2, to: 9999, el: (f: number) => <VisaPane f={f} /> },
  ];
  const bar = prog(frame, T.barUp, 16, EASE);
  const requested = frame >= T.tapEnquire + 5;
  const btnPress = frame >= T.tapEnquire - 2 && frame <= T.tapEnquire + 4 ? 0.94 : 1;

  const notifT = prog(frame, T.notif, 18, EASE_POP);
  const notifFade = 1 - prog(frame, T.endStart, 12);

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          translate: `0px ${float + exit * 160}px`,
          scale: String(1 - 0.12 * exit),
          opacity: 1 - exit,
        }}
      >
        <Phone width={PW} src="screens/listing-mobile.png" style={{ left: PHONE_LEFT, top: PHONE_TOP }}>
          {/* Legal checks tick through, row by row */}
          {LEGAL_ROWS.map((row, i) => {
            const at = T.legal + i * 8;
            const t = clamp01((frame - at) / 16);
            if (frame < at || frame > at + 18) {
              return null;
            }
            return (
              <React.Fragment key={row.y}>
                <div
                  style={{
                    position: "absolute",
                    left: 36 * MS,
                    top: (row.y - 58) * MS,
                    width: 728 * MS,
                    height: 116 * MS,
                    borderRadius: 12,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      width: "45%",
                      left: `${lerp(-45, 100, t)}%`,
                      background: `linear-gradient(90deg, rgba(${row.rgb},0) 0%, rgba(${row.rgb},0.22) 50%, rgba(${row.rgb},0) 100%)`,
                    }}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: 100 * MS - 30,
                    top: row.y * MS - 30,
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    border: `3px solid rgb(${row.rgb})`,
                    scale: String(0.5 + t * 1.2),
                    opacity: 1 - t,
                  }}
                />
              </React.Fragment>
            );
          })}

          {/* Net yield box flashes when tapped */}
          {frame >= T.tapYield - 2 && frame <= T.tapYield + 12 ? (
            <div
              style={{
                position: "absolute",
                left: 287 * MS,
                top: 927 * MS,
                width: 230 * MS,
                height: 121 * MS,
                borderRadius: 14,
                backgroundColor: "rgba(17,24,39,0.10)",
                boxShadow: `0 0 0 3px ${COLORS.blue}`,
                opacity: 1 - prog(frame, T.tapYield + 4, 8),
              }}
            />
          ) : null}
          <Tap frame={frame} at={T.tapYield} x={402 * MS} y={987 * MS} />

          {/* Bottom sheet */}
          {sheetVis > 0.001 ? (
            <>
              <AbsoluteFill style={{ backgroundColor: `rgba(11,18,32,${0.42 * clamp01(sheetVis)})` }} />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: SHEET_TOP,
                  width: PW,
                  height: sheetH,
                  translate: `0px ${(1 - sheetVis) * sheetH}px`,
                  borderRadius: "26px 26px 0 0",
                  backgroundColor: COLORS.white,
                  boxShadow: "0 -10px 30px rgba(0,0,0,0.18)",
                  fontFamily: SANS,
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", left: PW / 2 - 22, top: 10, width: 44, height: 5, borderRadius: 3, backgroundColor: "#D1D5DB" }} />
                <div
                  style={{
                    position: "absolute",
                    left: 22,
                    top: 28,
                    width: PW - 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: "#F3F4F6",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 3 + seg * SEG_W,
                      top: 3,
                      width: SEG_W - 6,
                      height: 38,
                      borderRadius: 10,
                      backgroundColor: COLORS.white,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                    }}
                  />
                  {SEGMENTS.map((s, i) => (
                    <div
                      key={s}
                      style={{
                        position: "absolute",
                        left: i * SEG_W,
                        top: 0,
                        width: SEG_W,
                        height: 44,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 17,
                        fontWeight: 600,
                        color: Math.round(seg) === i ? COLORS.ink : "#6B7280",
                      }}
                    >
                      {s}
                    </div>
                  ))}
                </div>
                {panes.map((p, i) => {
                  if (frame < p.from - 1 || frame > p.to + 9) {
                    return null;
                  }
                  const inT = i === 0 ? 1 : prog(frame, p.from, 9, EASE);
                  const outT = prog(frame, p.to, 9, EASE);
                  return (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        left: 24,
                        top: 92,
                        width: PW - 48,
                        opacity: inT * (1 - outT),
                        translate: `${(1 - inT) * 60 - outT * 60}px 0px`,
                      }}
                    >
                      {p.el(frame - p.from)}
                    </div>
                  );
                })}
              </div>
            </>
          ) : null}
          <Tap frame={frame} at={T.tapCosts} x={segCenter(1).x} y={segCenter(1).y} />
          <Tap frame={frame} at={T.tapVisa} x={segCenter(2).x} y={segCenter(2).y} />

          {/* Sticky enquiry bar */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: PD.height - BAR_H,
              width: PW,
              height: BAR_H,
              translate: `0px ${(1 - bar) * BAR_H}px`,
              backgroundColor: COLORS.white,
              borderTop: "1px solid #E5E7EB",
              boxShadow: "0 -8px 24px rgba(0,0,0,0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "14px 20px 0",
              fontFamily: SANS,
              boxSizing: "border-box",
            }}
          >
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.ink }}>€485,000</div>
              <div style={{ fontSize: 14, color: "#6B7280" }}>All-in €525,110</div>
            </div>
            <div
              style={{
                width: 176,
                height: 54,
                borderRadius: 14,
                backgroundColor: requested ? "#15803D" : COLORS.ink,
                color: COLORS.white,
                fontSize: 19,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                scale: String(btnPress),
              }}
            >
              {requested ? (
                <>
                  <CheckIcon size={22} color={COLORS.white} progress={prog(frame, T.tapEnquire + 5, 10)} />
                  Requested
                </>
              ) : (
                "Enquire"
              )}
            </div>
          </div>
          <Tap frame={frame} at={T.tapEnquire} x={ENQUIRE.x} y={ENQUIRE.y} />
        </Phone>
      </AbsoluteFill>

      {/* Call-back notification drops over the phone */}
      {frame >= T.notif ? (
        <div
          style={{
            position: "absolute",
            left: PHONE_CX - 290,
            top: 92,
            width: 580,
            opacity: prog(frame, T.notif, 8),
            translate: `0px ${lerp(-150, 0, notifT)}px`,
            display: "flex",
            gap: 20,
            padding: 22,
            boxSizing: "border-box",
            borderRadius: 30,
            backgroundColor: `rgba(246,244,240,${0.95 * notifFade})`,
            boxShadow: `0 36px 70px rgba(0,0,0,${0.5 * notifFade})`,
            fontFamily: SANS,
          }}
        >
          <div style={{ opacity: frame >= T.endStart ? 0 : 1 }}>
            <AppIcon size={62} />
          </div>
          <div style={{ flex: 1, opacity: notifFade }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, fontWeight: 700, letterSpacing: 2, color: "#6B7280" }}>
              <span>KYMA</span>
              <span style={{ letterSpacing: 0, fontWeight: 400 }}>now</span>
            </div>
            <div style={{ marginTop: 2, fontSize: 27, fontWeight: 700, color: COLORS.ink }}>Call-back booked</div>
            <div style={{ marginTop: 2, fontSize: 20, lineHeight: 1.3, color: "#4B5563" }}>
              Tue 07:00 your time (Sydney) · Eleni Markaki, Chania Estates
            </div>
          </div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

export const NOTIF_ICON = { x: PHONE_CX - 290 + 22, y: 92 + 22, size: 62 };
