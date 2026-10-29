import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { fonts, gradients, motion, typography } from "../brand";
import { ease } from "../lib/anim";

type Props = {
  /** A string wraps naturally; an array is revealed line by line. */
  text: string | readonly string[];
  /** Phrase to render in Signal. */
  highlight?: string;
  fontSize: number;
  color: string;
  /** Frame (scene-local) at which the first word starts. */
  delay?: number;
  align?: "left" | "center";
  font?: "headline" | "body";
  maxWidth?: number;
  /**
   * When set, lines replace each other instead of stacking: line i appears at
   * `delay + i * replaceEvery` and the previous one blurs out.
   */
  replaceEvery?: number;
  style?: React.CSSProperties;
};

/**
 * Word-by-word reveal: each word resolves from a soft blur, rising slightly,
 * on a critically damped spring.
 */
export const Headline: React.FC<Props> = ({
  text,
  highlight,
  fontSize,
  color,
  delay = 0,
  align = "left",
  font = "headline",
  maxWidth,
  replaceEvery,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lines = typeof text === "string" ? [text] : text;
  const isHeadline = font === "headline";

  let wordIndex = 0;
  const renderLine = (line: string, li: number, lineDelay: number) => {
    const words = line.split(" ");
    const hl = highlightRange(words, highlight);
    let w0 = 0;
    return words.map((w, wi) => {
      const start =
        lineDelay + (replaceEvery ? w0++ : wordIndex++) * motion.wordStagger;
      const p = ease(frame, fps, start, motion.wordDuration);
      return (
        <React.Fragment key={`${li}-${wi}`}>
          {wi > 0 ? " " : null}
          <span
            style={{
              display: "inline-block",
              opacity: p,
              translate: `0 ${(1 - p) * 0.28}em`,
              filter:
                p < 1 ? `blur(${(1 - p) * motion.wordBlur}px)` : undefined,
              ...(wi >= hl[0] && wi < hl[1] ? gradientText : {}),
            }}
          >
            {w}
          </span>
        </React.Fragment>
      );
    });
  };

  return (
    <div
      style={{
        fontFamily: isHeadline ? fonts.headline : fonts.body,
        fontWeight: isHeadline
          ? typography.headlineWeight
          : typography.bodyWeight,
        letterSpacing: isHeadline
          ? typography.headlineTracking
          : typography.bodyTracking,
        lineHeight: typography.headlineLineHeight,
        fontSize,
        color,
        textAlign: align,
        maxWidth,
        ...(replaceEvery ? { display: "grid" } : {}),
        ...style,
      }}
    >
      {lines.map((line, li) => {
        if (!replaceEvery) {
          return (
            <div key={li} style={{ textWrap: "balance" }}>
              {renderLine(line, li, delay + li * motion.lineStagger)}
            </div>
          );
        }
        // Lines share one grid cell; each blurs out as the next arrives.
        const lineStart = delay + li * replaceEvery;
        const isLast = li === lines.length - 1;
        const out = isLast
          ? 0
          : interpolate(
              frame,
              [lineStart + replaceEvery - 4, lineStart + replaceEvery + 10],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.inOut(Easing.cubic),
              },
            );
        return (
          <div
            key={li}
            style={{
              gridArea: "1 / 1",
              textWrap: "balance",
              opacity: 1 - out,
              translate: `0 ${-out * 0.2}em`,
              filter: out > 0 ? `blur(${out * motion.wordBlur}px)` : undefined,
            }}
          >
            {renderLine(line, li, lineStart)}
          </div>
        );
      })}
    </div>
  );
};

/** Orange gradient fill; padding keeps descenders inside the painted box. */
const gradientText: React.CSSProperties = {
  backgroundImage: gradients.signalText,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  padding: "0 0.04em 0.14em",
  margin: "0 -0.04em -0.14em",
};

/** Word index range [start, end) matching the highlight phrase, if any. */
const highlightRange = (
  words: string[],
  highlight?: string,
): [number, number] => {
  if (!highlight) return [-1, -1];
  const target = highlight.split(" ");
  for (let i = 0; i <= words.length - target.length; i++) {
    if (target.every((t, j) => words[i + j] === t))
      return [i, i + target.length];
  }
  return [-1, -1];
};
