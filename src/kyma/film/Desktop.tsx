import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { Cursor } from "../Cursor";
import { LaptopFlat } from "../devices";
import { COLORS, EASE, EASE_POP, SANS, lerp, prog } from "../theme";
import {
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
  listingScroll,
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

/** What the laptop screen shows at `frame`: home page with interactions, then the listing page sliding up. */
export const DesktopScreen: React.FC<{ frame: number }> = ({ frame }) => {
  const scroll = pageScroll(frame);
  const chipOn = prog(frame, T.chipClick + 1, 10, EASE_POP);
  const hover = prog(frame, T.cardHover, 8, EASE);
  const nav = prog(frame, T.navStart, T.navEnd - T.navStart, SNAP);

  return (
    <>
      {nav < 1 ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: -scroll * K,
            width: SCREEN_W,
            scale: String(1 - 0.05 * nav),
            transformOrigin: `50% ${scroll * K + SCREEN_H / 2}px`,
            filter: `brightness(${1 - 0.35 * nav})`,
          }}
        >
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
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Listing page slides up over the home page */}
      {frame >= T.navStart ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: SCREEN_W,
            height: SCREEN_H,
            overflow: "hidden",
            translate: `0px ${(1 - nav) * SCREEN_H}px`,
            boxShadow: "0 -20px 40px rgba(0,0,0,0.25)",
            backgroundColor: COLORS.white,
          }}
        >
          <Img
            src={staticFile("screens/listing-desktop.png")}
            style={{ position: "absolute", left: 0, top: -listingScroll(frame) * K, width: SCREEN_W, maxWidth: "none" }}
          />
        </div>
      ) : null}
    </>
  );
};

/**
 * Opens straight on the site in a laptop, then clicks through a real search:
 * toggle a filter, press Search, scroll, pick a listing, and the listing page opens.
 */
export const Desktop: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame >= T.morphStart) {
    return null;
  }
  const cam = camera(frame);
  const chip = pageToFrame(1765, 887, SCROLL_TOP);
  const search = pageToFrame(2047, 742, SCROLL_TOP);
  const card = pageToFrame(355, 2300, SCROLL_LISTINGS);

  return (
    <AbsoluteFill style={{ opacity: prog(frame, 0, 6) }}>
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
          screen={<DesktopScreen frame={frame} />}
        />
        <Cursor
          frame={frame}
          keys={[
            { at: T.cursorIn, x: 1180, y: 760 },
            { at: T.chipClick - 4, x: chip.x, y: chip.y },
            { at: T.searchClick - 3, x: search.x, y: search.y },
            { at: T.scrollStart + 14, x: 1150, y: 640 },
            { at: T.cardHover, x: card.x, y: card.y },
            { at: T.navEnd + 10, x: 1500, y: 700 },
          ]}
          clicks={[T.chipClick, T.searchClick, T.cardClick]}
          hideAfter={T.navEnd + 12}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
