import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, motion, type } from "../brand";
import { clamp, snap } from "../lib/anim";

type Props = {
  /** One string per line. */
  lines: readonly string[];
  /** Word or phrase to render in Signal. */
  highlight?: string;
  fontSize: number;
  color?: string;
  /** Frame the first word starts (shot-local). */
  delay?: number;
  /** Extra delay per line, frames (e.g. one beat). */
  lineDelay?: number;
  /** Frame at which words start to exit (fast, upward). Omit to hold. */
  exitFrame?: number;
  align?: "center" | "left";
  font?: "headline" | "body";
  weight?: number;
  lineHeight?: number;
  style?: React.CSSProperties;
};

/**
 * Words snap up from behind a mask, blur-to-sharp in ~7 frames, staggered a
 * few frames apart. They exit the same way, upward and fast.
 */
export const KineticHeadline: React.FC<Props> = ({
  lines,
  highlight,
  fontSize,
  color = colors.white,
  delay = 0,
  lineDelay = 0,
  exitFrame,
  align = "center",
  font = "headline",
  weight,
  lineHeight = 1.0,
  style,
}) => {
  const frame = useCurrentFrame();
  const hlWords = new Set(
    (highlight ?? "").split(" ").filter(Boolean).map(strip),
  );
  let w = 0;
  return (
    <div
      style={{
        fontFamily: font === "headline" ? fonts.headline : fonts.body,
        fontWeight: weight ?? (font === "headline" ? type.headlineWeight : 500),
        letterSpacing: font === "headline" ? type.headlineTracking : "-0.01em",
        fontSize,
        lineHeight,
        color,
        textAlign: align,
        ...style,
      }}
    >
      {lines.map((line, li) => (
        <div key={li} style={{ textWrap: "balance" }}>
          {line.split(" ").map((word, wi) => {
            const start = delay + li * lineDelay + w * motion.wordStagger;
            const exitStart =
              exitFrame !== undefined ? exitFrame + w * 1 : Infinity;
            w++;
            const pin = interpolate(
              frame,
              [start, start + motion.wordIn],
              [0, 1],
              { ...clamp, easing: snap },
            );
            const pout = Number.isFinite(exitStart)
              ? interpolate(frame, [exitStart, exitStart + motion.out - 1], [0, 1], {
                  ...clamp,
                  easing: snap,
                })
              : 0;
            const y = (1 - pin) * 105 - pout * 105;
            const blur = (1 - pin) * 10 + pout * 10;
            const isHl = hlWords.has(strip(word));
            return (
              <React.Fragment key={wi}>
                {wi > 0 ? " " : null}
                {/* Mask: words rise from below the line box. */}
                <span
                  style={{
                    display: "inline-block",
                    overflow: "hidden",
                    verticalAlign: "top",
                    padding: "0.04em 0.06em 0.16em",
                    margin: "-0.04em -0.06em -0.16em",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      translate: `0 ${y}%`,
                      filter: blur > 0.2 ? `blur(${blur}px)` : undefined,
                      color: isHl ? colors.signal : undefined,
                    }}
                  >
                    {word}
                  </span>
                </span>
              </React.Fragment>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const strip = (w: string) => w.replace(/[.,!?']/g, "").toLowerCase();

/** Font size that fits `text` on one line within `width` (Schibsted 700 estimate). */
export const fitSize = (text: string, width: number, max: number) =>
  Math.min(max, width / (text.length * 0.56));
