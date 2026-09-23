import React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { BRAND, logoFont } from "./brand";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

// Logo builds in: wordmark fades up, slash draws upward, then RAPID rises along the slash.
const SLASH_TAN = Math.tan((18 * Math.PI) / 180);

export const MesonRapidLogo: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const f = frame - start;
  const rise = interpolate(f, [22, 52], [1, 0], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Img
        src={staticFile("logo/meson-wordmark-white.png")}
        alt="Meson"
        style={{
          height: 40,
          width: "auto",
          display: "block",
          opacity: interpolate(f, [0, 14], [0, 1], clamp),
          translate: `0 ${interpolate(f, [0, 20], [10, 0], { ...clamp, easing: easeOut })}px`,
        }}
      />
      <span
        style={{
          width: 3,
          height: 52,
          background: BRAND.teal,
          transform: "skewX(-18deg)",
          borderRadius: 2,
          flex: "none",
          // Draw the slash upward from its base.
          clipPath: `inset(${interpolate(f, [10, 26], [100, 0], {
            ...clamp,
            easing: easeOut,
          })}% 0 0 0)`,
        }}
      />
      {/* Clip box so RAPID emerges from the slash rather than floating in */}
      <span
        style={{
          display: "block",
          overflow: "hidden",
          height: 52,
          alignContent: "center",
        }}
      >
        <span
          style={{
            display: "block",
            fontFamily: logoFont,
            fontStretch: "112.5%",
            fontWeight: 600,
            fontSize: 22,
            lineHeight: 1.05,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            color: BRAND.ink,
            // Travel along the slash angle: up and slightly right.
            translate: `${-40 * SLASH_TAN * rise}px ${40 * rise}px`,
          }}
        >
          Rapid
        </span>
      </span>
    </div>
  );
};
