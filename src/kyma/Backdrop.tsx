import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "./theme";

/** Navy backdrop with a soft warm glow, shared by every scene. */
export const Backdrop: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.navy, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: -300,
          top: -400,
          width: 1400,
          height: 1400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(242,239,230,0.14) 0%, rgba(242,239,230,0) 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -400,
          bottom: -500,
          width: 1500,
          height: 1500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,79,228,0.20) 0%, rgba(59,79,228,0) 65%)",
        }}
      />
      {children}
    </AbsoluteFill>
  );
};
