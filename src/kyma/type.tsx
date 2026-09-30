import React from "react";
import { COLORS, EASE, SANS, SERIF, fadeOut, prog } from "./theme";

/** A line of text that slides up from behind a mask. */
export const MaskLine: React.FC<{
  frame: number;
  from: number;
  duration?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ frame, from, duration = 26, style, children }) => {
  const t = prog(frame, from, duration, EASE);
  return (
    <div style={{ overflow: "hidden", paddingBottom: "0.1em", marginBottom: "-0.1em" }}>
      <div style={{ translate: `0px ${(1 - t) * 115}%`, opacity: Math.min(1, t * 1.6), ...style }}>
        {children}
      </div>
    </div>
  );
};

/** Gold rule + letter-spaced uppercase label. */
export const Kicker: React.FC<{
  frame: number;
  from: number;
  align?: "left" | "center";
  children: React.ReactNode;
}> = ({ frame, from, align = "left", children }) => {
  const line = prog(frame, from, 22);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: align === "center" ? "center" : "flex-start",
        gap: 18,
        fontFamily: SANS,
        fontSize: 22,
        fontWeight: 600,
        letterSpacing: 6,
        textTransform: "uppercase",
        color: COLORS.gold,
      }}
    >
      <div style={{ width: 64 * line, height: 1.5, backgroundColor: COLORS.gold }} />
      <div style={{ opacity: prog(frame, from + 6, 16), whiteSpace: "nowrap" }}>{children}</div>
      {align === "center" ? (
        <div style={{ width: 64 * line, height: 1.5, backgroundColor: COLORS.gold }} />
      ) : null}
    </div>
  );
};

/**
 * Editorial chapter title: "01 — LABEL" kicker and serif lines.
 * The last line is set in gold italic.
 */
export const Chapter: React.FC<{
  frame: number;
  from: number;
  until?: number;
  num: string;
  label: string;
  lines: string[];
  left: number;
  top: number;
  width: number;
  size?: number;
  align?: "left" | "center";
}> = ({ frame, from, until = 99999, num, label, lines, left, top, width, size = 72, align = "left" }) => {
  if (frame < from - 2 || frame > until + 16) {
    return null;
  }
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        opacity: fadeOut(frame, until, 14),
        textAlign: align,
      }}
    >
      <Kicker frame={frame} from={from} align={align}>
        {`${num} — ${label}`}
      </Kicker>
      <div
        style={{
          marginTop: 22,
          fontFamily: SERIF,
          fontSize: size,
          fontWeight: 500,
          lineHeight: 1.02,
          color: COLORS.ivory,
          letterSpacing: -0.5,
        }}
      >
        {lines.map((l, i) => (
          <MaskLine
            key={l}
            frame={frame}
            from={from + 6 + i * 6}
            style={
              i === lines.length - 1 && lines.length > 1
                ? { fontStyle: "italic", color: COLORS.goldLight }
                : undefined
            }
          >
            {l}
          </MaskLine>
        ))}
      </div>
    </div>
  );
};
