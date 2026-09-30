import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

/** 3D space. Children are absolutely positioned and share one perspective. */
export const Stage: React.FC<{ children: React.ReactNode; perspective?: number; origin?: string }> = ({
  children,
  perspective = 2200,
  origin = "50% 45%",
}) => (
  <AbsoluteFill style={{ perspective, perspectiveOrigin: origin, transformStyle: "preserve-3d" }}>
    {children}
  </AbsoluteFill>
);

/**
 * Project a point in a Stage's 3D space to the 2D frame, for overlays that must
 * always draw in front (Chrome's 3D depth sorting can clip floating labels).
 */
export const projectPoint = (
  x: number,
  y: number,
  z: number,
  perspective: number,
  originX: number,
  originY: number,
) => {
  const k = perspective / (perspective - z);
  return { x: originX + (x - originX) * k, y: originY + (y - originY) * k, k };
};

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
 * Titanium phone with real thickness. `width` is the screen width.
 * The screenshot is scaled slightly past the right edge to hide the scrollbar.
 * Children are drawn on top of the screen, in screen pixels.
 */
export const Phone: React.FC<{
  width: number;
  src?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  reflect?: boolean;
  screenOpacity?: number;
}> = ({ width, src, children, style, reflect = false, screenOpacity = 1 }) => {
  const d = phoneDims(width);
  const R = d.radius + d.bezel;
  const imgW = (width * 804) / 788;
  return (
    <div
      style={{
        position: "absolute",
        width: d.outerW,
        height: d.outerH,
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      {[2, 4, 6, 8, 10].map((z) => (
        <div
          key={z}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: R,
            backgroundColor: "#2b3039",
            transform: `translateZ(${-z}px)`,
          }}
        />
      ))}
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
          transform: "translateZ(0.5px)",
        }}
      >
        {src ? (
          <Img
            src={staticFile(src)}
            style={{ position: "absolute", left: 0, top: 0, width: imgW, opacity: screenOpacity }}
          />
        ) : null}
        {children}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "linear-gradient(118deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 30%)",
          }}
        />
      </div>
      {/* Side buttons */}
      <div style={{ position: "absolute", left: -3, top: d.outerH * 0.2, width: 4, height: d.outerH * 0.07, borderRadius: 2, backgroundColor: "#4a505a" }} />
      <div style={{ position: "absolute", left: -3, top: d.outerH * 0.3, width: 4, height: d.outerH * 0.07, borderRadius: 2, backgroundColor: "#4a505a" }} />
      <div style={{ position: "absolute", right: -3, top: d.outerH * 0.25, width: 4, height: d.outerH * 0.11, borderRadius: 2, backgroundColor: "#4a505a" }} />
      {reflect && src ? (
        <div
          style={{
            position: "absolute",
            left: d.bezel,
            top: d.outerH + 12,
            width,
            height: d.height,
            borderRadius: d.radius,
            overflow: "hidden",
            transform: "scaleY(-1)",
            opacity: 0.22,
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 38%)",
          }}
        >
          <Img src={staticFile(src)} style={{ position: "absolute", left: 0, top: 0, width: imgW }} />
        </div>
      ) : null}
    </div>
  );
};

// ---------------------------------------------------------------- Laptop

export const laptopDims = (width: number) => {
  const bezel = Math.round(width * 0.02);
  const screenW = width - bezel * 2;
  const screenH = Math.round(screenW / 1.6);
  const chin = Math.round(width * 0.012);
  return {
    bezel,
    screenW,
    screenH,
    lidH: screenH + bezel * 2 + chin,
    deckD: Math.round(width * 0.62),
  };
};

/**
 * Aluminium laptop built from real 3D planes: a hinged lid (rotate with `lidAngle`,
 * -88 is closed, ~10 is open) and a keyboard deck lying flat towards the viewer.
 * `screen` is clipped to the display. `popout` shares the display's coordinates
 * but is not clipped, so children can lift off the glass with translateZ.
 */
export const Laptop: React.FC<{
  width: number;
  lidAngle?: number;
  screenOn?: number;
  screen: React.ReactNode;
  popout?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ width, lidAngle = 10, screenOn = 1, screen, popout, style }) => {
  const d = laptopDims(width);
  const keyW = (width * 1.14 * 0.78) / 14;
  const keyH = (d.deckD * 0.42) / 6;
  return (
    <div
      style={{
        position: "absolute",
        width,
        height: d.lidH,
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      {/* Keyboard deck */}
      <div
        style={{
          position: "absolute",
          left: -width * 0.07,
          top: d.lidH,
          width: width * 1.14,
          height: d.deckD,
          transformOrigin: "top center",
          transform: "rotateX(90deg)",
          borderRadius: "8px 8px 30px 30px",
          background: "linear-gradient(180deg, #c3c7ce 0%, #e4e6ea 35%, #b9bdc4 100%)",
          boxShadow: "inset 0 2px 0 rgba(255,255,255,0.7), 0 0 90px rgba(0,0,0,0.55)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "11%",
            right: "11%",
            top: d.deckD * 0.07,
            height: d.deckD * 0.42,
            borderRadius: 10,
            backgroundColor: "#1d2026",
            backgroundImage:
              "linear-gradient(90deg, rgba(196,200,207,0.95) 2px, transparent 2px), linear-gradient(0deg, rgba(196,200,207,0.95) 2px, transparent 2px)",
            backgroundSize: `${keyW}px ${keyH}px`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "34%",
            right: "34%",
            top: d.deckD * 0.56,
            height: d.deckD * 0.34,
            borderRadius: 14,
            background: "linear-gradient(180deg, #d6d9de, #c4c7cd)",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08)",
          }}
        />
      </div>

      {/* Lid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transformOrigin: "bottom center",
          transform: `rotateX(${lidAngle}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {[1, 3, 5].map((z) => (
          <div
            key={z}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "22px 22px 12px 12px",
              background: "linear-gradient(160deg, #d9dce1, #a9aeb6)",
              transform: `translateZ(${-z}px)`,
            }}
          >
            {z === 5 ? (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: width * 0.06,
                  height: width * 0.06,
                  marginLeft: -width * 0.03,
                  marginTop: -width * 0.03,
                  borderRadius: width * 0.016,
                  backgroundColor: "rgba(255,255,255,0.55)",
                }}
              />
            ) : null}
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "22px 22px 12px 12px",
            backgroundColor: "#0b0d11",
            boxShadow: "inset 0 0 0 2px #2c3036",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: d.bezel * 0.35,
            width: 7,
            height: 7,
            marginLeft: -3.5,
            borderRadius: "50%",
            backgroundColor: "#1f2a38",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: d.bezel,
            top: d.bezel,
            width: d.screenW,
            height: d.screenH,
            overflow: "hidden",
            borderRadius: 6,
            backgroundColor: "#000",
            transform: "translateZ(0.5px)",
          }}
        >
          {screen}
          <AbsoluteFill style={{ backgroundColor: "#000", opacity: 1 - screenOn, pointerEvents: "none" }} />
          <AbsoluteFill
            style={{
              pointerEvents: "none",
              background: "linear-gradient(125deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 35%)",
            }}
          />
        </div>
        {popout ? (
          <div
            style={{
              position: "absolute",
              left: d.bezel,
              top: d.bezel,
              width: d.screenW,
              height: d.screenH,
              transformStyle: "preserve-3d",
              transform: "translateZ(1px)",
            }}
          >
            {popout}
          </div>
        ) : null}
      </div>
    </div>
  );
};
