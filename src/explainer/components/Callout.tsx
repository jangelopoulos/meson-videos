import React from "react";
import type { IconName } from "../brand";
import { colors, fonts, gradients, typography } from "../brand";
import { Icon } from "./Icon";

/** A frosted glass card: orange icon chip, title and a muted line. */
export const Callout: React.FC<{
  icon: IconName;
  title: string;
  text: string;
  fontSize: number;
  /** 0..1 entrance progress. */
  progress: number;
  width?: number;
}> = ({ icon, title, text, fontSize, progress, width }) => {
  const chip = fontSize * 1.9;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: fontSize * 0.6,
        width,
        boxSizing: "border-box",
        padding: `${fontSize * 0.55}px ${fontSize * 0.7}px`,
        borderRadius: fontSize * 0.75,
        backgroundImage: gradients.glass,
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.10), 0 30px 60px rgba(0,0,0,0.5)",
        opacity: progress,
        translate: `${(1 - progress) * 60}px 0`,
        scale: String(0.96 + 0.04 * progress),
        filter: progress < 1 ? `blur(${(1 - progress) * 14}px)` : undefined,
      }}
    >
      <div
        style={{
          width: chip,
          height: chip,
          flexShrink: 0,
          borderRadius: chip * 0.27,
          backgroundImage: `linear-gradient(160deg, ${colors.signalHot}, ${colors.signal})`,
          boxShadow: `0 0 ${chip * 0.6}px rgba(228,87,30,0.45)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name={icon} size={chip * 0.5} color={colors.white} />
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          letterSpacing: typography.bodyTracking,
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize,
            lineHeight: 1.1,
            color: colors.white,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontWeight: 500,
            fontSize: fontSize * 0.78,
            lineHeight: 1.2,
            marginTop: fontSize * 0.15,
            color: colors.muted,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};
