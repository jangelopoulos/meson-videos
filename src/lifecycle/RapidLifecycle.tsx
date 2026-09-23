import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BRAND, fontFamily } from "../brand";
import { LOGO_SLASH_CENTER_X, MesonRapidLogo } from "../MesonRapidLogo";
import {
  APPT_H,
  ApptStage,
  CALL_H,
  COL_W,
  CRM_H,
  CallStage,
  CrmStage,
  FOLLOW_H,
  FollowStage,
  LEAD_H,
  LeadStage,
  QUAL_H,
  QualStage,
} from "./stages";
import { clamp, easeInOut } from "./ui";

// The chain runs downward: each stage plays, then a line draws down to the
// next one while the camera follows. It ends by running into the logo.

type Stage = { C: React.FC<{ t: number }>; h: number; hold: number };

// `hold`: frames after a stage's line arrives before the next line starts,
// long enough for that stage's own animation to play out and settle.
const STAGES: Stage[] = [
  { C: LeadStage, h: LEAD_H, hold: 96 },
  { C: CallStage, h: CALL_H, hold: 96 },
  { C: QualStage, h: QUAL_H, hold: 136 },
  { C: ApptStage, h: APPT_H, hold: 122 },
  { C: CrmStage, h: CRM_H, hold: 104 },
  { C: FollowStage, h: FOLLOW_H, hold: 88 },
];

const GAP = 130; // connector length between stages (layout px)
const LOGO_SCALE = 1.25;
const LOGO_H = 52 * LOGO_SCALE;
// The slash is skewed -18deg, so its top sits right of its centre.
const SLASH_TOP_X = LOGO_SLASH_CENTER_X + 26 * Math.tan((18 * Math.PI) / 180);

// Vertical layout: top of each block, logo block last.
const TOPS: number[] = [];
{
  let y = 0;
  for (const s of STAGES) {
    TOPS.push(y);
    y += s.h + GAP;
  }
  TOPS.push(y);
}
const blockH = (i: number) => (i < STAGES.length ? STAGES[i].h : LOGO_H);
// Approximate full logo width (wordmark + gap + slash + gap + RAPID), used to
// centre the finished logo rather than its slash.
const LOGO_W = 157 + 16 + 3 + 16 + 80;
const LOGO_CENTER_SHIFT = (LOGO_W / 2 - SLASH_TOP_X) * LOGO_SCALE;
const centerY = (i: number) => TOPS[i] + blockH(i) / 2;

// Timeline.
const FIRST_ARRIVE = 8;
const LINE = 24; // line draw
const CAM = 38; // camera move (starts with the line)
const ARRIVE: number[] = [FIRST_ARRIVE];
const LINE_START: number[] = [];
STAGES.forEach((s, i) => {
  LINE_START.push(ARRIVE[i] + s.hold);
  ARRIVE.push(LINE_START[i] + LINE);
});
const LOGO_ARRIVE = ARRIVE[STAGES.length];
export const LIFECYCLE_DURATION = LOGO_ARRIVE + 96;

const Connector: React.FC<{ i: number; frame: number; clear: number }> = ({ i, frame, clear }) => {
  const start = LINE_START[i];
  const p = interpolate(frame, [start, start + LINE], [0, 1], { ...clamp, easing: easeInOut });
  if (p <= 0) return null;
  const x = COL_W / 2;
  const toLogo = i === STAGES.length - 1;
  const y1 = TOPS[i] + STAGES[i].h + 12;
  // The last line runs straight into the top of the logo's slash.
  const y2 = toLogo ? TOPS[i + 1] + 2 : TOPS[i + 1] - 12;
  const head = y1 + (y2 - y1) * p;
  const arrived = interpolate(frame, [start + LINE, start + LINE + 12], [0, 1], clamp);
  // Once the last line has joined the slash, it drains down into it so only
  // the logo is left.
  const drain = toLogo
    ? interpolate(frame, [LOGO_ARRIVE + 14, LOGO_ARRIVE + 32], [0, 1], { ...clamp, easing: easeInOut })
    : 0;
  if (drain >= 1) return null;
  const tail = y1 + (y2 - y1) * drain;
  return (
    <g opacity={toLogo ? 1 : clear}>
      <line x1={x} y1={tail} x2={x} y2={head} stroke={BRAND.teal} strokeWidth={3} strokeLinecap="round" opacity={toLogo ? 1 : 1 - 0.35 * arrived} />
      <circle cx={x} cy={y1} r={5} fill={BRAND.teal} opacity={toLogo ? clear : 1} />
      {toLogo ? null : (
        <>
          <circle cx={x} cy={head} r={14} fill={BRAND.teal} opacity={0.25 * (1 - arrived)} />
          <circle cx={x} cy={head} r={6} fill={BRAND.teal} />
        </>
      )}
    </g>
  );
};

const Chain: React.FC<{ scale: number; logoScreenScale: number }> = ({ scale, logoScreenScale }) => {
  const frame = useCurrentFrame();

  let focus = 0;
  LINE_START.forEach((s) => {
    focus += interpolate(frame, [s, s + CAM], [0, 1], { ...clamp, easing: easeInOut });
  });
  const i0 = Math.min(Math.floor(focus), STAGES.length);
  const frac = focus - i0;
  const camY = i0 >= STAGES.length ? centerY(i0) : centerY(i0) + (centerY(i0 + 1) - centerY(i0)) * frac;
  // Push in a little on the logo at the end.
  const endZoom = interpolate(focus, [STAGES.length - 1, STAGES.length], [1, logoScreenScale], clamp);
  const s = scale * endZoom;
  const clear = interpolate(focus, [STAGES.length - 0.8, STAGES.length - 0.1], [1, 0], clamp);
  // Once the logo has built, ease across so it sits centred in frame.
  const settle = interpolate(frame, [LOGO_ARRIVE + 30, LOGO_ARRIVE + 60], [0, 1], { ...clamp, easing: easeInOut });

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 0,
        height: 0,
        transformOrigin: "0 0",
        transform: `scale(${s}) translate(${-(COL_W / 2 + LOGO_CENTER_SHIFT * settle)}px, ${-camY}px)`,
      }}
    >
      <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={1} height={1}>
        {STAGES.map((_, i) => (
          <Connector key={i} i={i} frame={frame} clear={clear} />
        ))}
      </svg>
      {STAGES.map(({ C }, i) => {
        // Stages we've moved past dim; all of them clear away for the logo.
        const past = Math.max(0, Math.min(1, (focus - i - 0.3) / 0.7));
        const t = frame - ARRIVE[i];
        if (t < 0) return null;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              top: TOPS[i],
              width: COL_W,
              filter: `brightness(${1 - 0.6 * past})`,
              opacity: clear,
            }}
          >
            <C t={t} />
          </div>
        );
      })}
      {/* Logo: the top of its slash sits on the column centre so the last line flows into it */}
      <div
        style={{
          position: "absolute",
          left: COL_W / 2 - SLASH_TOP_X,
          top: TOPS[STAGES.length],
          // The chain container is 0px wide; stop the logo shrinking to fit it.
          width: "max-content",
          transformOrigin: `${SLASH_TOP_X}px 0px`,
          scale: String(LOGO_SCALE),
        }}
      >
        <MesonRapidLogo start={LOGO_ARRIVE} slashFrom="top" timing={{ slash: 0, wordmark: 8, rapid: 14 }} />
      </div>
    </div>
  );
};

const Backdrop: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse 55% 60% at 50% 45%, rgba(20,184,166,.10) 0%, rgba(20,184,166,0) 70%), radial-gradient(ellipse 120% 90% at 50% 50%, #151515 0%, #0B0B0B 100%)",
      fontFamily,
      overflow: "hidden",
    }}
  >
    {children}
  </AbsoluteFill>
);

// 1920x1080
export const RapidLifecycle: React.FC = () => (
  <Backdrop>
    <Chain scale={1.6} logoScreenScale={1.2} />
  </Backdrop>
);

// 1080x1920: column fills ~82% of the width.
export const RapidLifecycleVertical: React.FC = () => (
  <Backdrop>
    <Chain scale={1.9} logoScreenScale={1.1} />
  </Backdrop>
);
