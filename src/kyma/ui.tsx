import React from "react";
import { COLORS, SANS } from "./theme";

/** Dark frosted pill with a gold hairline border. Reads on light and dark backgrounds. */
export const GlassChip: React.FC<{
  children: React.ReactNode;
  dot?: string;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, dot, size = 26, style }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: size * 0.5,
      padding: `${size * 0.5}px ${size * 0.85}px`,
      borderRadius: 999,
      backgroundColor: "rgba(8,20,36,0.86)",
      border: "1px solid rgba(232,211,166,0.5)",
      color: COLORS.ivory,
      fontFamily: SANS,
      fontSize: size,
      fontWeight: 600,
      whiteSpace: "nowrap",
      boxShadow: "0 24px 50px rgba(0,0,0,0.45)",
      ...style,
    }}
  >
    {dot ? (
      <span
        style={{
          width: size * 0.42,
          height: size * 0.42,
          borderRadius: "50%",
          backgroundColor: dot,
          boxShadow: `0 0 12px ${dot}`,
          flexShrink: 0,
        }}
      />
    ) : null}
    {children}
  </div>
);

/** Stroke-drawn check mark. */
export const CheckIcon: React.FC<{ size: number; color: string; progress?: number; stroke?: number }> = ({
  size,
  color,
  progress = 1,
  stroke = 3,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block" }}>
    <path
      d="M5 12.5l4.2 4.2L19 7"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={22}
      strokeDashoffset={22 * (1 - progress)}
    />
  </svg>
);

/** The Kyma app icon: rounded square with a dot. */
export const AppIcon: React.FC<{ size: number; light?: boolean }> = ({ size, light = false }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.26,
      backgroundColor: light ? COLORS.ivory : COLORS.navy,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <div
      style={{
        width: size * 0.4,
        height: size * 0.4,
        borderRadius: "50%",
        backgroundColor: light ? COLORS.navy : COLORS.white,
      }}
    />
  </div>
);
