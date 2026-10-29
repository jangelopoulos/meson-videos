import React from "react";
import { colors } from "../brand";

/**
 * Minimal rounded avatar. `slump` (0..1) drops the head and tips the body.
 */
export const Avatar: React.FC<{
  size: number;
  slump?: number;
  style?: React.CSSProperties;
}> = ({ size, slump = 0, style }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      backgroundColor: colors.white,
      boxShadow: "0 18px 40px rgba(0,0,0,0.5)",
      overflow: "hidden",
      rotate: `${slump * -14}deg`,
      ...style,
    }}
  >
    <svg width={size} height={size} viewBox="0 0 40 40" fill={colors.black}>
      <circle cx={20 - slump * 3} cy={15 + slump * 7} r={6.2} />
      <path
        d={`M8 40 C8 ${31 + slump * 4} ${13 - slump * 2} ${26 + slump * 4} 20 ${26 + slump * 4} C${27 + slump * 2} ${
          26 + slump * 4
        } 32 ${31 + slump * 4} 32 40 Z`}
      />
    </svg>
  </div>
);
