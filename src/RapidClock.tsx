import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/fonts";

// Self-hosted variable font (weights 400–600) so renders don't depend on Google Fonts.
const fontFamily = "Instrument Sans";
loadFont({
  family: fontFamily,
  url: staticFile("fonts/InstrumentSans-latin.woff2"),
  weight: "400 600",
  format: "woff2",
});

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

  return (
    <div
      style={{
        position: "relative",
        width: 320,
        height: 320,
        borderRadius: "50%",
        background: `conic-gradient(${C.teal} 0 ${green}deg, ${redc} ${green}deg ${sweep}deg, rgba(255,255,255,.14) ${sweep}deg 360deg)`,
      }}
    >
      {Array.from({ length: 60 }, (_, i) => {
        const major = i % 5 === 0;
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: major ? 2 : 1,
              height: major ? 14 : 7,
              background: i < 10 ? C.mint : "rgba(255,255,255,.4)",
              transform: `translate(-50%,-152px) rotate(${i * 6}deg)`,
              transformOrigin: "50% 152px",
            }}
          />
        );
      })}
      {/* Hand */}
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 2,
          height: 140,
          background: `linear-gradient(to top, transparent 0 40%, ${C.mint} 40%)`,
          transform: `translate(-50%,-100%) rotate(${sweep}deg)`,
          transformOrigin: "50% 100%",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 44,
          borderRadius: "50%",
          background: C.card,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: C.mint }}>
          {minutes <= 10 ? "Inside the 10-minute window" : "Time since enquiry"}
        </span>
        <span
          style={{
            fontSize: 64,
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginTop: 6,
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
            fontSize: 14,
            color: C.mintSoft,
            marginTop: 6,
            maxWidth: "18ch",
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

export const RapidClock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // easeInOutQuad, same curve as the HTML's requestAnimationFrame loop.
  const minutes = interpolate(
    frame,
    [SWEEP_START, SWEEP_START + SWEEP_SECONDS * fps],
    [0, 60],
    { ...clamp, easing: Easing.inOut(Easing.quad) },
  );

  return (
    <AbsoluteFill
      style={{
        background: C.card,
        fontFamily,
        color: C.ink,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Content is laid out at the HTML's native 1040px width, then scaled up for 1080p. */}
      <div
        style={{
          width: 1040,
          padding: 36,
          boxSizing: "border-box",
          opacity: interpolate(frame, [0, 15], [0, 1], clamp),
          scale: String(
            1.6 * interpolate(frame, [0, 24], [0.96, 1], { ...clamp, easing: easeOut }),
          ),
          translate: `0 ${interpolate(frame, [0, 24], [40, 0], {
            ...clamp,
            easing: easeOut,
          })}px`,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Dial minutes={minutes} />
          </div>
          <div>
            <h2
              style={{
                fontWeight: 600,
                fontSize: 36,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                margin: 0,
                opacity: interpolate(frame, [8, 24], [0, 1], clamp),
              }}
            >
              What happens when nobody calls back?
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
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "22px 24px",
                marginTop: 22,
              }}
            >
              {STATS.map((s, i) => (
                <Stat key={s.value} stat={s} delay={30 + i * 8} />
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 22,
            paddingTop: 18,
            borderTop: "1px solid rgba(255,255,255,.2)",
            opacity: interpolate(frame, [60, 80], [0, 1], clamp),
          }}
        >
          <p style={{ margin: 0, fontSize: 13, color: C.mint, maxWidth: "60ch" }}>
            Teal wedge marks Meson Rapid's 10-minute window, our commitment, not a
            study result. Red is the hour running out.
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
