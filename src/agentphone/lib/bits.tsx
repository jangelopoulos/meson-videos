import {useT} from "./time";
import React from "react";
import {interpolate, useCurrentFrame} from "remotion";
import { count, draw, typed } from "./anim";
import { MONO } from "../theme";

/** Count-up number; keeps the final string's formatting (e.g. "1,180"). */
export const Count: React.FC<{
  to: number;
  at: number;
  dur?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  pad?: number;
}> = ({ to, at, dur, decimals = 0, prefix = "", suffix = "", pad = 0 }) => {
  const f = useT();
  const v = count(f, at, to, dur);
  const s = v.toFixed(decimals).padStart(pad, "0");
  return (
    <>
      {prefix}
      {s}
      {suffix}
    </>
  );
};

/** Highlighter sweep (left→right) behind inline text. */
export const Mark: React.FC<{
  at: number;
  color?: string;
  children: React.ReactNode;
}> = ({ at, color = "rgba(125,240,182,.55)", children }) => {
  const f = useT();
  const p = draw(f, at, 12);
  return (
    <span
      style={{
        backgroundImage: `linear-gradient(${color}, ${color})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${p * 100}% 100%`,
        borderRadius: 4,
        padding: "0 2px",
        margin: "0 -2px",
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
      }}
    >
      {children}
    </span>
  );
};

/** Typewriter text with an optional caret. */
export const Typed: React.FC<{
  text: string;
  at: number;
  cps?: number;
  caret?: boolean;
  caretColor?: string;
}> = ({ text, at, cps = 14, caret, caretColor = "#0c9a55" }) => {
  const f = useT();
  const shown = typed(text, f, at, cps);
  const blink = Math.floor(f / 8) % 2 === 0;
  return (
    <>
      {shown}
      {caret ? (
        <span
          style={{
            display: "inline-block",
            width: 2,
            height: "1em",
            marginLeft: 1,
            verticalAlign: "-0.12em",
            background: caretColor,
            opacity: blink || shown.length < text.length ? 1 : 0,
          }}
        />
      ) : null}
    </>
  );
};

/** A check mark that draws its stroke. */
export const CheckDraw: React.FC<{
  at: number;
  size?: number;
  color?: string;
  width?: number;
}> = ({ at, size = 14, color = "#0c6b43", width = 3 }) => {
  const f = useT();
  const p = draw(f, at, 10);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M20 6L9 17l-5-5"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - p}
      />
    </svg>
  );
};

/** Live timer mm:ss counting from `from` seconds. */
export const Timer: React.FC<{ from?: number }> = ({ from = 0 }) => {
  const f = useCurrentFrame();
  const s = Math.floor(from + f / 30);
  return (
    <span style={{ fontFamily: MONO }}>
      {String(Math.floor(s / 60)).padStart(2, "0")}:
      {String(s % 60).padStart(2, "0")}
    </span>
  );
};

/** Tap ripple (green), centred in its positioned parent. */
export const Ripple: React.FC<{ at: number; color?: string; size?: number }> = ({
  at,
  color = "rgba(16,196,110,.55)",
  size = 82,
}) => {
  const f = useCurrentFrame();
  const rings = [0, 5];
  return (
    <>
      {rings.map((d) => {
        const t = interpolate(f, [at + d, at + d + 16], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        if (t <= 0 || t >= 1) return null;
        return (
          <span
            key={d}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: size,
              height: size,
              marginLeft: -size / 2,
              marginTop: -size / 2,
              borderRadius: "50%",
              border: `3px solid ${color}`,
              scale: `${1 + t * 1.2}`,
              opacity: 1 - t,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
};
