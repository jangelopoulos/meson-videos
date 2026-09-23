import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, fontFamily } from "../brand";
import { MesonRapidLogo } from "../MesonRapidLogo";
import { CARDS } from "./cards";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

// Keyframes the extracted card markup references (from the source page).
const KEYFRAMES = `
@keyframes bubbleFloat { 0% { transform: translateY(-4px); } 100% { transform: translateY(5px); } }
@keyframes eq { 0% { transform: scaleY(0.35); } 100% { transform: scaleY(1); } }
@keyframes pulseDot {
  0%, 100% { box-shadow: rgba(14,138,125,.45) 0 0 0 0; }
  70% { box-shadow: rgba(14,138,125,0) 0 0 0 6px; }
}`;

// ---- Layout (world units = the source page's px) ----
const CARD_W = 464;
const GAP = 220; // connector length between cards
const STEP = CARD_W + GAP;
const cardX = (i: number) => i * STEP; // left edge of card i
const ROW_W = CARDS.length * CARD_W + (CARDS.length - 1) * GAP;

const FOCUS_SCALE = 1.6; // one card fills the frame
const OVERVIEW_SCALE = 1760 / ROW_W; // whole chain fits the frame

// ---- Timeline (frames @30fps) ----
const FIRST_IN = 12;
const HOLD = 66; // time on each card
const TRANS = 36; // line draw + camera move to the next card
const ENTER = 15; // "fade + 18px rise, 0.5s" from the source spec
const stageStart = (i: number) => FIRST_IN + i * (HOLD + TRANS);
const transStart = (i: number) => stageStart(i) + HOLD; // i -> i+1
const LAST = CARDS.length - 1;
const ZOOM_START = stageStart(LAST) + HOLD;
const ZOOM_LEN = 45;
const OUTRO_START = ZOOM_START + ZOOM_LEN - 6;
export const LIFECYCLE_DURATION = OUTRO_START + 110;

// When card i starts to appear: as the incoming line reaches it.
const cardEnter = (i: number) => (i === 0 ? FIRST_IN : transStart(i - 1) + 22);

const resolveAssets = (html: string) =>
  html.replace(/\{\{asset:([^}]+)\}\}/g, (_, f: string) => staticFile(`lifecycle/${f}`));

const Card: React.FC<{ index: number; focus: number; overview: number }> = ({
  index,
  focus,
  overview,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = CARDS[index];
  const html = useMemo(() => resolveAssets(card.html), [card.html]);
  const enter = cardEnter(index);
  // Cards we've moved past recede (darken, shrink slightly) once the camera is
  // well on its way; everything returns for the overview.
  const past = Math.max(0, Math.min(1, (focus - index - 0.3) / 0.7)) * (1 - overview);

  return (
    <div
      style={{
        position: "absolute",
        left: cardX(index),
        top: 0,
        width: CARD_W,
        translate: `0 calc(-50% + ${interpolate(frame, [enter, enter + ENTER], [18, 0], {
          ...clamp,
          easing: easeOut,
        })}px)`,
        opacity: interpolate(frame, [enter, enter + ENTER], [0, 1], clamp),
        filter: `brightness(${1 - 0.6 * past})`,
        scale: String(1 - 0.04 * past),
      }}
    >
      <div
        // Drives the card's own looping animations (orbit bubbles, waveform, pulse).
        style={{ "--t": `${frame / fps}s`, display: "flex", flexDirection: "column" } as React.CSSProperties}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

const Connector: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const start = transStart(index);
  const x1 = cardX(index) + CARD_W + 14;
  const x2 = cardX(index + 1) - 14;
  const p = interpolate(frame, [start, start + 28], [0, 1], { ...clamp, easing: easeInOut });
  if (p <= 0) return null;
  const head = x1 + (x2 - x1) * p;
  const arrived = interpolate(frame, [start + 28, start + 40], [0, 1], clamp);
  return (
    <g>
      <line
        x1={x1}
        y1={0}
        x2={head}
        y2={0}
        stroke={BRAND.teal}
        strokeWidth={3}
        strokeLinecap="round"
        opacity={1 - 0.35 * arrived}
      />
      <circle cx={x1} cy={0} r={5} fill={BRAND.teal} />
      {/* Travelling head with a soft glow */}
      <circle cx={head} cy={0} r={14} fill={BRAND.teal} opacity={0.25 * (1 - arrived)} />
      <circle cx={head} cy={0} r={6} fill={BRAND.teal} />
    </g>
  );
};

export const RapidLifecycle: React.FC = () => {
  const frame = useCurrentFrame();

  // Which card the camera is on (fractional while moving between cards).
  let focus = 0;
  for (let i = 0; i < LAST; i++) {
    focus += interpolate(frame, [transStart(i), transStart(i) + TRANS], [0, 1], {
      ...clamp,
      easing: easeInOut,
    });
  }
  const overview = interpolate(frame, [ZOOM_START, ZOOM_START + ZOOM_LEN], [0, 1], {
    ...clamp,
    easing: easeInOut,
  });

  // Camera: centre of the focused card, easing out to the middle of the row.
  const focusCamX = focus * STEP + CARD_W / 2;
  const camX = focusCamX + (ROW_W / 2 - focusCamX) * overview;
  const scale = FOCUS_SCALE + (OVERVIEW_SCALE - FOCUS_SCALE) * overview;
  // Lift the row in the overview to make room for the closing line and logo.
  const camYScreen = -120 * overview;

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 55% 60% at 50% 45%, rgba(20,184,166,.10) 0%, rgba(20,184,166,0) 70%), radial-gradient(ellipse 120% 90% at 50% 50%, #151515 0%, #0B0B0B 100%)",
        fontFamily,
        overflow: "hidden",
      }}
    >
      <style>{KEYFRAMES}</style>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: `calc(50% + ${camYScreen}px)`,
          width: 0,
          height: 0,
          transformOrigin: "0 0",
          transform: `scale(${scale}) translateX(${-camX}px)`,
        }}
      >
        <svg
          style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}
          width={1}
          height={1}
        >
          {CARDS.slice(0, LAST).map((_, i) => (
            <Connector key={i} index={i} />
          ))}
        </svg>
        {CARDS.map((c, i) => (
          <Card key={c.id} index={i} focus={focus} overview={overview} />
        ))}
      </div>

      {/* Closing line and logo */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 700,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 30,
            fontWeight: 600,
            background: BRAND.teal,
            color: "#0A2F2B",
            borderRadius: 999,
            padding: "14px 30px",
            opacity: interpolate(frame, [OUTRO_START, OUTRO_START + 15], [0, 1], clamp),
            translate: `0 ${interpolate(frame, [OUTRO_START, OUTRO_START + 22], [16, 0], {
              ...clamp,
              easing: easeOut,
            })}px`,
          }}
        >
          One enquiry, worked end to end.
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 110,
          display: "flex",
          justifyContent: "center",
          scale: "1.45",
        }}
      >
        <MesonRapidLogo start={OUTRO_START + 12} />
      </div>
    </AbsoluteFill>
  );
};
