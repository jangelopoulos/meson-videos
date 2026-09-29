import React from "react";
import { COLORS, FONT } from "./theme";

/**
 * Kyma logo: rounded square with a dot, plus the wordmark.
 * `onDark` flips colours for navy backgrounds.
 */
export const Logo: React.FC<{
  size?: number;
  onDark?: boolean;
  wordmark?: boolean;
}> = ({ size = 64, onDark = true, wordmark = true }) => {
  const box = onDark ? COLORS.white : COLORS.navy;
  const dot = onDark ? COLORS.navy : COLORS.white;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: size * 0.32,
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.28,
          backgroundColor: box,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: size * 0.42,
            height: size * 0.42,
            borderRadius: "50%",
            backgroundColor: dot,
          }}
        />
      </div>
      {wordmark ? (
        <div
          style={{
            fontSize: size * 0.9,
            fontWeight: 700,
            color: box,
            letterSpacing: -size * 0.02,
            lineHeight: 1,
          }}
        >
          Kyma
        </div>
      ) : null}
    </div>
  );
};
