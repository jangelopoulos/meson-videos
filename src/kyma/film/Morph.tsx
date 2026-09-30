import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { LaptopFlat } from "../devices";
import { EASE_INOUT, clamp01, lerp, prog } from "../theme";
import {
  BEZEL,
  K,
  LW,
  LX,
  LY,
  PD,
  PSX,
  PSY,
  PW,
  SCREEN_H,
  SCREEN_W,
  SX,
  SY,
  T,
  camPoint,
  camera,
  listingScroll,
} from "./layout";

/**
 * The laptop screen detaches and becomes the phone: the display rectangle narrows and
 * rounds while the listing page reflows from its desktop layout to the mobile one,
 * the laptop falls away, and the phone's titanium frame forms around the glass.
 */
export const Morph: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < T.morphStart || frame > T.morphEnd) {
    return null;
  }
  const cam = camera(T.morphStart);
  const a = camPoint({ x: SX, y: SY }, cam);
  const t = prog(frame, T.morphStart, T.morphEnd - T.morphStart, EASE_INOUT);
  const raw = clamp01((frame - T.morphStart) / (T.morphEnd - T.morphStart));

  const x = lerp(a.x, PSX, t);
  const y = lerp(a.y, PSY, t);
  // The window narrows first, like a browser being resized, then settles into place.
  const wT = prog(frame, T.morphStart, 22, EASE_INOUT);
  const w = lerp(SCREEN_W * cam.s, PW, wT);
  const h = lerp(SCREEN_H * cam.s, PD.height, t);
  const r = lerp(6, PD.radius, t);

  // Responsive resize: the desktop page keeps its size and is cropped as the glass narrows,
  // then the mobile layout takes over at true phone size, centred in the window.
  const desk = 1 - clamp01((raw - 0.36) / 0.12);
  const mob = clamp01((raw - 0.46) / 0.14);
  const mobileW = (PW * 804) / 788;

  // Laptop body drops and fades.
  const body = prog(frame, T.morphStart, 12, EASE_INOUT);
  // Phone frame grows around the glass.
  const bez = clamp01((raw - 0.55) / 0.45);
  const b = PD.bezel * bez;

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          opacity: 1 - body,
          translate: `0px ${body * 120}px`,
          transformOrigin: "0 0",
          transform: `translate(${960 - cam.fx * cam.s}px, ${540 - cam.fy * cam.s}px) scale(${cam.s})`,
        }}
      >
        <LaptopFlat left={LX} top={LY} width={LW} bezel={BEZEL} screenW={SCREEN_W} screenH={SCREEN_H} screen={null} />
      </AbsoluteFill>

      {/* Titanium frame */}
      <div
        style={{
          position: "absolute",
          left: x - b,
          top: y - b,
          width: w + b * 2,
          height: h + b * 2,
          borderRadius: r + b,
          opacity: bez,
          background: "linear-gradient(135deg, #7a808b 0%, #2a2f37 22%, #15181d 60%, #5d636e 100%)",
          boxShadow: `inset 0 0 0 1.5px rgba(255,255,255,0.25), 0 50px 90px rgba(0,0,0,${0.55 * bez})`,
        }}
      />

      {/* The glass, with the page reflowing inside it */}
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: w,
          height: h,
          borderRadius: r,
          overflow: "hidden",
          backgroundColor: "#fff",
          boxShadow: `0 40px 90px rgba(0,0,0,${0.45 * (1 - bez)})`,
        }}
      >
        <Img
          src={staticFile("screens/listing-desktop.png")}
          style={{
            position: "absolute",
            left: (w - SCREEN_W * cam.s) / 2,
            top: -listingScroll(frame) * K * cam.s,
            width: SCREEN_W * cam.s,
            maxWidth: "none",
            opacity: desk,
            filter: `blur(${(1 - desk) * 4}px)`,
          }}
        />
        <Img
          src={staticFile("screens/listing-mobile.png")}
          style={{
            position: "absolute",
            left: (w - PW) / 2,
            top: 0,
            width: mobileW,
            maxWidth: "none",
            opacity: mob,
            filter: `blur(${(1 - mob) * 3}px)`,
            translate: `0px ${(1 - mob) * 24}px`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
