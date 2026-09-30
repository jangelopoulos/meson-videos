import React from "react";
import { Img, staticFile } from "remotion";

// ---------------------------------------------------------------- Phone

/** Mobile screenshots are 804 × 1748. */
export const PHONE_RATIO = 1748 / 804;

export const phoneDims = (width: number) => {
  const bezel = Math.round(width * 0.035);
  const height = Math.round(width * PHONE_RATIO);
  return {
    bezel,
    height,
    outerW: width + bezel * 2,
    outerH: height + bezel * 2,
    radius: width * 0.13,
    /** Multiply screenshot pixels by this to get screen pixels. */
    imgScale: width / 788,
  };
};

/**
 * Titanium phone. `width` is the screen width. The screenshot is scaled slightly
 * past the right edge to hide its scrollbar. Children draw on the screen, in screen pixels.
 */
export const Phone: React.FC<{
  width: number;
  src?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ width, src, children, style }) => {
  const d = phoneDims(width);
  const R = d.radius + d.bezel;
  return (
    <div style={{ position: "absolute", width: d.outerW, height: d.outerH, ...style }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: R,
          background: "linear-gradient(135deg, #7a808b 0%, #2a2f37 22%, #15181d 60%, #5d636e 100%)",
          boxShadow:
            "inset 0 0 0 1.5px rgba(255,255,255,0.25), inset 0 0 0 4px rgba(0,0,0,0.55), 0 50px 90px rgba(0,0,0,0.55)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: d.bezel,
          top: d.bezel,
          width,
          height: d.height,
          borderRadius: d.radius,
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        {src ? (
          <Img
            src={staticFile(src)}
            style={{ position: "absolute", left: 0, top: 0, width: (width * 804) / 788, maxWidth: "none" }}
          />
        ) : null}
        {children}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "linear-gradient(118deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 28%)",
          }}
        />
      </div>
      <div style={{ position: "absolute", left: -3, top: d.outerH * 0.2, width: 4, height: d.outerH * 0.07, borderRadius: 2, backgroundColor: "#4a505a" }} />
      <div style={{ position: "absolute", left: -3, top: d.outerH * 0.3, width: 4, height: d.outerH * 0.07, borderRadius: 2, backgroundColor: "#4a505a" }} />
      <div style={{ position: "absolute", right: -3, top: d.outerH * 0.25, width: 4, height: d.outerH * 0.11, borderRadius: 2, backgroundColor: "#4a505a" }} />
    </div>
  );
};

// ---------------------------------------------------------------- Laptop

/** Front-on laptop: black-bezel lid on an aluminium base. `screen` is clipped to the display. */
export const LaptopFlat: React.FC<{
  left: number;
  top: number;
  width: number;
  bezel: number;
  screenW: number;
  screenH: number;
  screen: React.ReactNode;
}> = ({ left, top, width, bezel, screenW, screenH, screen }) => {
  const lidH = screenH + bezel * 2 + 10;
  return (
    <div style={{ position: "absolute", left, top, width, height: lidH + 30 }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width,
          height: lidH,
          borderRadius: "26px 26px 10px 10px",
          backgroundColor: "#0b0d11",
          boxShadow: "inset 0 0 0 2px #2c3036, 0 40px 90px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: bezel * 0.35,
            width: 8,
            height: 8,
            marginLeft: -4,
            borderRadius: "50%",
            backgroundColor: "#1f2a38",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: bezel,
            top: bezel,
            width: screenW,
            height: screenH,
            overflow: "hidden",
            borderRadius: 6,
            backgroundColor: "#fff",
          }}
        >
          {screen}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: "linear-gradient(125deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 35%)",
            }}
          />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: -width * 0.06,
          top: lidH,
          width: width * 1.12,
          height: 26,
          borderRadius: "0 0 40px 40px / 0 0 18px 18px",
          background: "linear-gradient(180deg, #f1f2f4 0%, #cdd0d6 45%, #9da2aa 100%)",
          boxShadow: "0 34px 60px rgba(0,0,0,0.55)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: width * 0.14,
            marginLeft: -width * 0.07,
            height: 9,
            borderRadius: "0 0 10px 10px",
            background: "linear-gradient(180deg, #b3b8bf, #d3d6db)",
          }}
        />
      </div>
    </div>
  );
};
