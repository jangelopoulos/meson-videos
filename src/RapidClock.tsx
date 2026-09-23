import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { fontFamily } from "./brand";
import { MesonRapidLogo } from "./MesonRapidLogo";

const C = {
  card: "#0A4F48",
  ink: "#F6F6F4",
  mint: "#A9EFE5",
  mintSoft: "#D6F1ED",
  teal: "#14B8A6",
  coralIcon: "#FFB4A8",
};

// Seconds the dial takes to sweep 0 -> 60 minutes (matches the HTML default).
const SWEEP_SECONDS = 6;
const SWEEP_START = 30;

// Content is laid out at the HTML's native 1040px width, then scaled for 1080p.
// Kept below full width to leave generous side margins for mobile crops.
const CONTENT_SCALE = 1.45;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

const Arrow: React.FC<{ size: number; color: string; rotate?: number }> = ({
  size,
  color,
  rotate = 0,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ rotate: `${rotate}deg` }}
  >
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </svg>
);

const DIAL = 380;
const CENTER = DIAL / 2;
const RING_WIDTH = 36;
const RING_R = CENTER - RING_WIDTH / 2 - 2;
const CIRCUMFERENCE = 2 * Math.PI * RING_R;

// Arc along the ring from `from` to `to` degrees (0 = 12 o'clock), with rounded ends.
const Arc: React.FC<{ from: number; to: number; color: string }> = ({
  from,
  to,
  color,
}) => {
  if (to <= from) return null;
  return (
    <circle
      cx={CENTER}
      cy={CENTER}
      r={RING_R}
      fill="none"
      stroke={color}
      strokeWidth={RING_WIDTH}
      strokeLinecap="round"
      strokeDasharray={`${((to - from) / 360) * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
      strokeDashoffset={(-from / 360) * CIRCUMFERENCE}
      transform={`rotate(-90 ${CENTER} ${CENTER})`}
    />
  );
};

const Dial: React.FC<{ minutes: number }> = ({ minutes }) => {
  const sweep = minutes * 6;
  const green = Math.min(sweep, 60);
  const red = minutes <= 10 ? 0 : Math.min(1, (minutes - 10) / 50);
  const redc = `rgb(${Math.round(20 + (232 - 20) * red)},${Math.round(
    184 + (112 - 184) * red,
  )},${Math.round(166 + (95 - 166) * red)})`;

  const status =
    minutes <= 10
      ? { word: "Great", color: C.mint, bg: "rgba(20,184,166,.25)", rot: 180 }
      : minutes < 35
        ? { word: "Poor", color: "#FFD9A8", bg: "rgba(255,180,100,.18)", rot: 90 }
        : { word: "Odds falling", color: C.coralIcon, bg: "rgba(232,112,95,.22)", rot: 0 };

  const outer = CENTER - 2;
  const handAngle = ((sweep - 90) * Math.PI) / 180;

  return (
    <div style={{ position: "relative", width: DIAL, height: DIAL }}>
      <svg
        width={DIAL}
        height={DIAL}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "visible",
          filter: "drop-shadow(0 14px 30px rgba(3,30,27,.45))",
        }}
      >
        {/* Track */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RING_R}
          fill="none"
          stroke="rgba(255,255,255,.12)"
          strokeWidth={RING_WIDTH}
        />
        {/* Red drawn first so the teal window's rounded ends sit on top of it */}
        <Arc from={60} to={sweep} color={redc} />
        <Arc from={0} to={green} color={C.teal} />
        {Array.from({ length: 60 }, (_, i) => {
          const major = i % 5 === 0;
          const a = ((i * 6 - 90) * Math.PI) / 180;
          const r1 = outer - 8;
          const r2 = r1 - (major ? 12 : 6);
          return (
            <line
              key={i}
              x1={CENTER + r1 * Math.cos(a)}
              y1={CENTER + r1 * Math.sin(a)}
              x2={CENTER + r2 * Math.cos(a)}
              y2={CENTER + r2 * Math.sin(a)}
              stroke={i < 10 ? C.mint : "rgba(255,255,255,.4)"}
              strokeWidth={major ? 2 : 1}
              strokeLinecap="round"
            />
          );
        })}
        {/* Hand, visible across the ring */}
        <line
          x1={CENTER + (RING_R - RING_WIDTH / 2 - 4) * Math.cos(handAngle)}
          y1={CENTER + (RING_R - RING_WIDTH / 2 - 4) * Math.sin(handAngle)}
          x2={CENTER + (outer + 2) * Math.cos(handAngle)}
          y2={CENTER + (outer + 2) * Math.sin(handAngle)}
          stroke={C.mint}
          strokeWidth={3}
          strokeLinecap="round"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: RING_WIDTH + 12,
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 28%, #0E5D55 0%, #083F3A 100%)",
          boxShadow:
            "inset 0 2px 0 rgba(255,255,255,.06), inset 0 -10px 24px rgba(0,0,0,.18)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 28px",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: C.mint,
            lineHeight: 1.2,
            maxWidth: "16ch",
          }}
        >
          {minutes <= 10 ? "Inside the 10-minute window" : "Time since enquiry"}
        </span>
        <span
          style={{
            fontSize: 58,
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginTop: 8,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {minutes >= 60 ? "1 hour" : `${Math.floor(minutes)} min`}
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            fontWeight: 600,
            marginTop: 10,
            borderRadius: 999,
            padding: "5px 12px",
            color: status.color,
            background: status.bg,
          }}
        >
          <Arrow size={16} color="currentColor" rotate={status.rot} />
          {status.word}
        </span>
        <span
          style={{
            fontSize: 13,
            color: C.mintSoft,
            marginTop: 8,
            maxWidth: "20ch",
            lineHeight: 1.3,
          }}
        >
          odds of reaching them fall 10× across the first hour
        </span>
      </div>
    </div>
  );
};

const STATS = [
  { value: "7×", text: "harder to qualify if you wait until the second hour", warn: true },
  { value: "60×", text: "harder to qualify if you wait a day", warn: true },
  { value: "10×", text: "harder to even reach them by the end of the first hour", warn: true },
  { value: "23%", text: "of companies never called back at all", warn: false },
];

const Stat: React.FC<{ stat: (typeof STATS)[number]; delay: number }> = ({
  stat,
  delay,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        opacity: interpolate(frame, [delay, delay + 14], [0, 1], clamp),
        translate: `0 ${interpolate(frame, [delay, delay + 20], [16, 0], {
          ...clamp,
          easing: easeOut,
        })}px`,
      }}
    >
      <span
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: stat.warn ? "rgba(232,112,95,.22)" : "rgba(255,255,255,.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
          marginTop: 6,
        }}
      >
        <Arrow size={28} color={stat.warn ? C.coralIcon : C.mintSoft} />
      </span>
      <div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: C.ink,
          }}
        >
          {stat.value}
        </div>
        <div style={{ fontSize: 14, color: C.mintSoft, marginTop: 8, maxWidth: "22ch" }}>
          {stat.text}
        </div>
      </div>
    </div>
  );
};


// easeInOutQuad, same curve as the HTML's requestAnimationFrame loop.
const useMinutes = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return interpolate(
    frame,
    [SWEEP_START, SWEEP_START + SWEEP_SECONDS * fps],
    [0, 60],
    { ...clamp, easing: Easing.inOut(Easing.quad) },
  );
};

// Layered teal gradient with a glow that drifts slowly across the whole video.
const Backdrop: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const glowX = interpolate(frame, [0, durationInFrames], [18, 30]);
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 70% 80% at ${glowX}% 30%, rgba(20,184,166,.28) 0%, rgba(20,184,166,0) 60%), radial-gradient(ellipse 60% 70% at 90% 100%, rgba(3,30,27,.55) 0%, rgba(3,30,27,0) 70%), linear-gradient(150deg, #0D5C54 0%, ${C.card} 45%, #06332E 100%)`,
        fontFamily,
        color: C.ink,
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Fade, lift and settle the main content block, applied on top of its layout scale.
const useEntrance = (scale: number): React.CSSProperties => {
  const frame = useCurrentFrame();
  return {
    opacity: interpolate(frame, [0, 15], [0, 1], clamp),
    scale: String(
      scale * interpolate(frame, [0, 24], [0.96, 1], { ...clamp, easing: easeOut }),
    ),
    translate: `0 ${interpolate(frame, [0, 24], [40, 0], {
      ...clamp,
      easing: easeOut,
    })}px`,
  };
};

const Heading: React.FC<{ align?: "left" | "center" }> = ({ align = "left" }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ textAlign: align }}>
      <h2
        style={{
          fontWeight: 600,
          fontSize: 44,
          letterSpacing: "-0.025em",
          lineHeight: 1.05,
          margin: 0,
          opacity: interpolate(frame, [8, 24], [0, 1], clamp),
        }}
      >
        Speed to Lead
      </h2>
      <p
        style={{
          margin: "10px 0 0",
          fontSize: 15,
          color: C.mintSoft,
          opacity: interpolate(frame, [14, 30], [0, 1], clamp),
        }}
      >
        Your odds of losing them, the longer nobody calls.
      </p>
    </div>
  );
};

const StatsGrid: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: "26px 24px",
      ...style,
    }}
  >
    {STATS.map((s, i) => (
      <Stat key={s.value} stat={s} delay={30 + i * 8} />
    ))}
  </div>
);

const LOGO_START = 66;

const Logo: React.FC<{ bottom: number; scale: number }> = ({ bottom, scale }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      bottom,
      display: "flex",
      justifyContent: "center",
      scale: String(scale),
    }}
  >
    <MesonRapidLogo start={LOGO_START} />
  </div>
);

// 1920x1080: dial on the left, heading and stats on the right.
export const RapidClock: React.FC = () => {
  const minutes = useMinutes();
  const entrance = useEntrance(CONTENT_SCALE);
  return (
    // Lift the main content to leave room for the logo at the bottom.
    <Backdrop style={{ paddingBottom: 110 }}>
      <div
        style={{
          width: 1040,
          padding: 36,
          boxSizing: "border-box",
          ...entrance,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <Dial minutes={minutes} />
          <div>
            <Heading />
            <StatsGrid style={{ marginTop: 26 }} />
          </div>
        </div>
      </div>
      <Logo bottom={96} scale={CONTENT_SCALE} />
    </Backdrop>
  );
};

// Vertical layout is built at 480px wide and scaled to 840px, leaving 120px
// side margins clear of the app buttons TikTok/Reels overlay on the right.
const VERTICAL_SCALE = 1.75;

// 1080x1920: heading, dial, stats stacked; logo at the bottom. Content keeps
// clear of the top and bottom bands that social apps cover with their UI.
export const RapidClockVertical: React.FC = () => {
  const minutes = useMinutes();
  const entrance = useEntrance(VERTICAL_SCALE);
  return (
    <Backdrop style={{ paddingBottom: 164 }}>
      <div
        style={{
          width: 480,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          ...entrance,
        }}
      >
        <Heading align="center" />
        <div style={{ marginTop: 28 }}>
          <Dial minutes={minutes} />
        </div>
        <StatsGrid style={{ marginTop: 32, width: "100%" }} />
      </div>
      <Logo bottom={230} scale={1.6} />
    </Backdrop>
  );
};
