import React from "react";
import { interpolateColors, useCurrentFrame } from "remotion";
import { MaskLine } from "../type";
import { COLORS, EASE, SANS, SERIF, lerp, prog } from "../theme";
import { SNAP, T } from "./layout";
import { NOTIF_ICON } from "./PhoneFlow";

const MARK = 120;
const MARK_X = 749;
const MARK_Y = 300;

/** The notification's app icon grows into the Kyma logo, then the line lands. */
export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < T.endStart) {
    return null;
  }
  const t = prog(frame, T.endStart, 30, SNAP);
  const size = lerp(NOTIF_ICON.size, MARK, t);
  const box = interpolateColors(t, [0, 1], [COLORS.navy, COLORS.ivory]);
  const dot = interpolateColors(t, [0, 1], [COLORS.white, COLORS.navy]);
  const word = prog(frame, T.endStart + 24, 16, EASE);
  const glow = prog(frame, T.endStart + 10, 30);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 960 - 700,
          top: MARK_Y + MARK / 2 - 700,
          width: 1400,
          height: 1400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,165,106,0.20) 0%, rgba(200,165,106,0) 55%)",
          opacity: glow,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: lerp(NOTIF_ICON.x, MARK_X, t),
          top: lerp(NOTIF_ICON.y, MARK_Y, t),
          width: size,
          height: size,
          borderRadius: size * 0.26,
          backgroundColor: box,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 20px 50px rgba(0,0,0,${0.4 * t})`,
        }}
      >
        <div style={{ width: size * 0.4, height: size * 0.4, borderRadius: "50%", backgroundColor: dot }} />
      </div>
      <div
        style={{
          position: "absolute",
          left: MARK_X + MARK + 34,
          top: MARK_Y,
          height: MARK,
          display: "flex",
          alignItems: "center",
          fontFamily: SANS,
          fontSize: 116,
          fontWeight: 700,
          letterSpacing: -2,
          color: COLORS.ivory,
          clipPath: `inset(0 ${100 - word * 100}% 0 0)`,
          translate: `${(1 - word) * -24}px 0px`,
        }}
      >
        Kyma
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 486,
          textAlign: "center",
          fontFamily: SERIF,
          fontSize: 76,
          fontWeight: 500,
          lineHeight: 1.05,
          color: COLORS.ivory,
        }}
      >
        <MaskLine frame={frame} from={T.endStart + 32} duration={18}>
          The trusted way to invest
        </MaskLine>
        <MaskLine frame={frame} from={T.endStart + 38} duration={18} style={{ fontStyle: "italic", color: COLORS.goldLight }}>
          in Greek property.
        </MaskLine>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 700,
          textAlign: "center",
          fontFamily: SANS,
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: 5,
          textTransform: "uppercase",
          color: COLORS.gold,
          opacity: prog(frame, T.endStart + 50, 14),
        }}
      >
        Verified listings · Real investment numbers · Local experts
      </div>
    </>
  );
};
