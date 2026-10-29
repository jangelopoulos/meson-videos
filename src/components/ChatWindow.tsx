import React from "react";
import { colors, fonts, type } from "../brand";
import { GlassCard } from "./GlassCard";

/**
 * A large glass chat window: user question (typed `typed` characters) and an
 * assistant reply streamed by word (`stream` 0..1).
 */
export const ChatWindow: React.FC<{
  width: number;
  fontSize: number;
  question: string;
  typed: number;
  reply?: string;
  stream?: number;
  light?: boolean;
  /** Show the blinking Signal cursor in the input bar. */
  cursor?: boolean;
  /** Command typed into the input bar. */
  input?: string;
  inputTyped?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({
  width,
  fontSize,
  question,
  typed,
  reply,
  stream = 1,
  light,
  cursor,
  input,
  inputTyped = 0,
  style,
  children,
}) => {
  const fg = light ? colors.black : colors.white;
  const sub = light ? "rgba(10,10,10,0.45)" : "rgba(255,255,255,0.5)";
  const pad = fontSize * 0.8;
  const words = reply ? reply.split(" ") : [];
  const shown = Math.ceil(words.length * stream);
  return (
    <GlassCard
      light={light}
      radius={40}
      style={{ width, padding: pad, ...style }}
    >
      {/* Window chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: pad * 0.8,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              backgroundColor: light
                ? "rgba(10,10,10,0.15)"
                : "rgba(255,255,255,0.22)",
            }}
          />
        ))}
        <div
          style={{
            marginLeft: 16,
            fontFamily: fonts.mono,
            fontSize: 24,
            letterSpacing: type.monoTracking,
            color: sub,
          }}
        >
          ASSISTANT
        </div>
      </div>
      {/* Question */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div
          style={{
            maxWidth: "82%",
            padding: `${fontSize * 0.45}px ${fontSize * 0.6}px`,
            borderRadius: fontSize * 0.7,
            backgroundColor: light ? colors.black : colors.white,
            color: light ? colors.white : colors.black,
            fontFamily: fonts.body,
            fontWeight: 500,
            fontSize,
            lineHeight: 1.2,
            minHeight: fontSize * 1.2,
          }}
        >
          {question.slice(0, Math.max(0, Math.floor(typed)))}
        </div>
      </div>
      {/* Reply */}
      <div
        style={{
          marginTop: pad * 0.7,
          minHeight: fontSize * 2.6,
          fontFamily: fonts.body,
          fontWeight: 500,
          fontSize,
          lineHeight: 1.25,
          color: fg,
          maxWidth: "88%",
        }}
      >
        {words.slice(0, shown).join(" ")}
      </div>
      {children}
      {/* Input bar */}
      <div
        style={{
          marginTop: pad * 0.6,
          height: fontSize * 1.7,
          borderRadius: fontSize * 0.85,
          border: `1px solid ${light ? "rgba(10,10,10,0.12)" : "rgba(255,255,255,0.18)"}`,
          display: "flex",
          alignItems: "center",
          padding: `0 ${fontSize * 0.6}px`,
          fontFamily: fonts.body,
          fontSize: fontSize * 0.8,
          color: input ? fg : sub,
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {input ? input.slice(0, Math.floor(inputTyped)) : "Ask anything"}
        {cursor ? (
          <span
            style={{
              display: "inline-block",
              width: 3,
              height: fontSize * 0.9,
              marginLeft: 4,
              backgroundColor: colors.signal,
            }}
          />
        ) : null}
      </div>
    </GlassCard>
  );
};
