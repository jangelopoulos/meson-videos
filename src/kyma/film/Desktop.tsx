import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { Cursor } from "../Cursor";
import { LaptopFlat } from "../devices";
import { Letterbox } from "../fx";
import { Kicker, MaskLine } from "../type";
import { COLORS, EASE, EASE_POP, SANS, SERIF, lerp, prog } from "../theme";
import {
  ACCEL,
  BEZEL,
  CARD1,
  CARD_LIFT,
  K,
  LW,
  LX,
  LY,
  SCREEN_H,
  SCREEN_W,
  SCROLL_LISTINGS,
  SCROLL_TOP,
  SNAP,
  T,
  camera,
  pageScroll,
  pageToFrame,
} from "./layout";

/** A short press: 1 → 0.93 → 1 around `at`. */
const press = (frame: number, at: number) => {
  if (frame < at - 3 || frame > at + 7) {
    return 1;
  }
  return frame < at ? lerp(1, 0.93, (frame - (at - 3)) / 3) : lerp(0.93, 1, EASE((frame - at) / 7));
};

/** Ripple from a click point, in page pixels. */
const Ripple: React.FC<{ frame: number; at: number; x: number; y: number; size: number; color: string }> = ({
  frame,
  at,
  x,
  y,
  size,
  color,
}) => {
  const t = (frame - at) / 16;
  if (t < 0 || t > 1) {
    return null;
  }
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        scale: String(0.2 + t * 1.2),
        opacity: 1 - t,
      }}
    />
  );
};

/**
 * Opens tight on the home page's aerial photo, pulls back to reveal the site on a laptop,
 * then clicks through a real search: toggle a filter, press Search, scroll, pick a listing.
 */
export const Desktop: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame > T.flyEnd + 4) {
    return null;
  }
  const cam = camera(frame);
  const scroll = pageScroll(frame);
  const exit = prog(frame, T.flyStart - 2, 34, ACCEL);
  const bars = lerp(138, 0, prog(frame, T.zoomStart, 30, SNAP));
  const hook = 1 - prog(frame, T.hookOut, 10);

  const chipOn = prog(frame, T.chipClick + 1, 10, EASE_POP);
  const hover = prog(frame, T.cardHover, 8, EASE);
  const chip = pageToFrame(1765, 887, SCROLL_TOP);
  const search = pageToFrame(2047, 742, SCROLL_TOP);
  const card = pageToFrame(355, 2300, SCROLL_LISTINGS);

  return (
    <AbsoluteFill>
      {/* Laptop slides away left as the photo leaves for the phone */}
      <AbsoluteFill style={{ translate: `${-1700 * exit}px 0px`, scale: String(1 - 0.1 * exit) }}>
        <AbsoluteFill
          style={{
            transformOrigin: "0 0",
            transform: `translate(${960 - cam.fx * cam.s}px, ${540 - cam.fy * cam.s}px) scale(${cam.s})`,
          }}
        >
          <LaptopFlat
            left={LX}
            top={LY}
            width={LW}
            bezel={BEZEL}
            screenW={SCREEN_W}
            screenH={SCREEN_H}
            screen={
              <div style={{ position: "absolute", left: 0, top: -scroll * K, width: SCREEN_W }}>
                <Img src={staticFile("screens/4a-home-desktop.png")} style={{ width: SCREEN_W, display: "block" }} />

                {/* "Verified only" chip toggles on */}
                {frame >= T.chipClick + 1 ? (
                  <div
                    style={{
                      position: "absolute",
                      left: 1668 * K,
                      top: 852 * K,
                      width: 196 * K,
                      height: 70 * K,
                      borderRadius: 999,
                      backgroundColor: COLORS.ink,
                      color: COLORS.white,
                      fontFamily: SANS,
                      fontWeight: 600,
                      fontSize: 24 * K,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      scale: String(lerp(0.85, 1, chipOn)),
                    }}
                  >
                    Verified only
                  </div>
                ) : null}
                <Ripple frame={frame} at={T.chipClick} x={1765 * K} y={887 * K} size={120 * K} color="rgba(59,79,228,0.35)" />

                {/* Search button press */}
                <div
                  style={{
                    position: "absolute",
                    left: 1950 * K,
                    top: 680 * K,
                    width: 195 * K,
                    height: 124 * K,
                    borderRadius: 16 * K,
                    backgroundColor: frame >= T.searchClick - 3 && frame <= T.searchClick + 7 ? "#1F2A44" : COLORS.ink,
                    color: COLORS.white,
                    fontFamily: SANS,
                    fontWeight: 700,
                    fontSize: 28 * K,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    scale: String(press(frame, T.searchClick)),
                  }}
                >
                  Search
                  <Ripple frame={frame} at={T.searchClick} x={97 * K} y={62 * K} size={260 * K} color="rgba(255,255,255,0.35)" />
                </div>

                {/* Listing card lifts on hover and presses on click */}
                {frame >= T.cardHover - 2 ? (
                  <div
                    style={{
                      position: "absolute",
                      left: CARD1.x * K,
                      top: CARD1.y * K,
                      width: CARD1.w * K,
                      height: CARD1.h * K,
                      borderRadius: 12,
                      overflow: "hidden",
                      translate: `0px ${-CARD_LIFT * hover}px`,
                      scale: String(press(frame, T.cardClick) * (1 + 0.02 * hover)),
                      boxShadow: `0 ${18 * hover}px ${40 * hover}px rgba(17,24,39,${0.3 * hover}), 0 0 0 ${2 * hover}px ${COLORS.blue}`,
                    }}
                  >
                    <Img src={staticFile("kyma/ui/card1.png")} style={{ width: CARD1.w * K, height: CARD1.h * K, display: "block" }} />
                    {/* The photo has left for the phone */}
                    {frame >= T.flyStart ? (
                      <div style={{ position: "absolute", left: 0, top: 0, width: CARD1.w * K, height: CARD1.photoH * K, backgroundColor: "#E5E7EB" }} />
                    ) : null}
                  </div>
                ) : null}
              </div>
            }
          />
          <Cursor
            frame={frame}
            keys={[
              { at: T.cursorIn, x: 1180, y: 760 },
              { at: T.chipClick - 4, x: chip.x, y: chip.y },
              { at: T.searchClick - 3, x: search.x, y: search.y },
              { at: T.scrollStart + 14, x: 1150, y: 640 },
              { at: T.cardHover, x: card.x, y: card.y },
            ]}
            clicks={[T.chipClick, T.searchClick, T.cardClick]}
            hideAfter={T.flyStart + 2}
          />
        </AbsoluteFill>
      </AbsoluteFill>

      {/* Opening title over the photo */}
      {hook > 0 ? (
        <>
          <AbsoluteFill
            style={{
              opacity: hook,
              background: "linear-gradient(90deg, rgba(5,11,21,0.82) 0%, rgba(5,11,21,0.45) 45%, rgba(5,11,21,0) 75%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 140,
              top: 330,
              opacity: hook,
              translate: `0px ${(1 - hook) * -30}px`,
            }}
          >
            <Kicker frame={frame} from={0}>
              Kyma · Greek property
            </Kicker>
            <div style={{ marginTop: 18, fontFamily: SERIF, fontSize: 124, fontWeight: 500, lineHeight: 1.0, color: COLORS.ivory }}>
              <MaskLine frame={frame} from={2} duration={18}>
                The Aegean,
              </MaskLine>
              <MaskLine frame={frame} from={8} duration={18} style={{ fontStyle: "italic", color: COLORS.goldLight }}>
                without the guesswork.
              </MaskLine>
            </div>
          </div>
        </>
      ) : null}
      <Letterbox height={bars} />
    </AbsoluteFill>
  );
};
