import React from "react";
import type { IconName } from "../brand";
import { colors, fonts, typography } from "../brand";
import { Icon } from "./Icon";

/** Solid icon squircle plus a short line of supporting text. */
export const Callout: React.FC<{
  icon: IconName;
  text: string;
  fontSize: number;
  /** 0..1 entrance progress. */
  progress: number;
  color?: string;
  maxWidth?: number;
}> = ({ icon, text, fontSize, progress, color = colors.black, maxWidth }) => {
  const box = fontSize * 1.75;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: fontSize * 0.6,
        opacity: progress,
        translate: `0 ${(1 - progress) * 30}px`,
        filter: `blur(${(1 - progress) * 12}px)`,
        maxWidth,
      }}
    >
      <div
        style={{
          width: box,
          height: box,
          flexShrink: 0,
          borderRadius: box * 0.27,
          backgroundColor: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name={icon} size={box * 0.52} color={colors.white} />
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontWeight: typography.bodyWeight,
          fontSize,
          lineHeight: 1.12,
          letterSpacing: typography.bodyTracking,
          color,
          textWrap: "balance",
        }}
      >
        {text}
      </div>
    </div>
  );
};
