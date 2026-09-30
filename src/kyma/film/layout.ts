import { Easing } from "remotion";
import { phoneDims } from "../devices";
import { EASE, EASE_INOUT } from "../theme";

export const FILM_FRAMES = 600;

/** Every beat of the 20-second film, in frames at 30 fps. */
export const T = {
  cursorIn: 6,
  chipClick: 26,
  searchClick: 40,
  scrollStart: 44,
  scrollEnd: 72,
  cardHover: 80,
  cardClick: 90,
  navStart: 94,
  navEnd: 114,
  morphStart: 144,
  morphEnd: 182,
  legal: 190,
  tapYield: 240,
  sheetUp: 245,
  tapCosts: 292,
  tapVisa: 340,
  sheetDown: 386,
  barUp: 394,
  tapEnquire: 416,
  notif: 426,
  endStart: 476,
}

/** Punchy camera move: quick start, long soft landing. */
export const SNAP = Easing.bezier(0.7, 0, 0.15, 1);
export const ACCEL = Easing.bezier(0.55, 0, 1, 0.45);

type Key = { at: number; value: number; ease?: (t: number) => number };

/** Keyframes where each segment can have its own easing (applied on the way into a key). */
export const kfe = (frame: number, keys: Key[]) => {
  if (frame <= keys[0].at) {
    return keys[0].value;
  }
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i];
    const b = keys[i + 1];
    if (frame <= b.at) {
      const t = (frame - a.at) / Math.max(1, b.at - a.at);
      return a.value + (b.value - a.value) * (b.ease ?? EASE_INOUT)(t);
    }
  }
  return keys[keys.length - 1].value;
};

// ---------------------------------------------------------------- Laptop / desktop page

export const LW = 1320;
export const BEZEL = 24;
export const SCREEN_W = LW - BEZEL * 2;
export const SCREEN_H = Math.round(SCREEN_W / 1.6);
export const LX = 960 - LW / 2;
export const LY = 70;
/** Screen origin in frame coordinates (before the camera). */
export const SX = LX + BEZEL;
export const SY = LY + BEZEL;
/** Desktop screenshot pixels → screen pixels. */
export const K = SCREEN_W / 2560;

export const SCROLL_TOP = 40;
export const SCROLL_LISTINGS = 1850;

/** Scroll of the desktop listing page after it opens (screenshot pixels). */
export const listingScroll = (frame: number) =>
  kfe(frame, [
    { at: T.navEnd + 2, value: 0 },
    { at: T.morphStart + 6, value: 150, ease: EASE_INOUT },
  ]);

export const pageScroll = (frame: number) =>
  kfe(frame, [
    { at: T.scrollStart, value: SCROLL_TOP },
    { at: T.scrollEnd, value: SCROLL_LISTINGS, ease: EASE_INOUT },
  ]);

/** A point on the desktop page (screenshot pixels) → frame coordinates before the camera. */
export const pageToFrame = (ox: number, oy: number, scroll: number) => ({
  x: SX + ox * K,
  y: SY + (oy - scroll) * K,
});

const CAM: { at: number; s: number; fx: number; fy: number; ease?: (t: number) => number }[] = [
  { at: 0, s: 1.04, fx: 960, fy: 511 },
  { at: T.cursorIn + 8, s: 1, fx: 960, fy: 511, ease: EASE },
  { at: T.chipClick - 4, s: 1.4, fx: 1030, fy: 470, ease: SNAP },
  { at: T.scrollStart, s: 1.4, fx: 1030, fy: 470 },
  { at: T.scrollEnd, s: 1.12, fx: 960, fy: 470 },
  { at: T.cardHover - 6, s: 1.12, fx: 960, fy: 470 },
  { at: T.cardHover + 6, s: 1.28, fx: 640, fy: 400, ease: EASE },
  { at: T.navStart + 2, s: 1.28, fx: 640, fy: 400 },
  { at: T.navEnd, s: 1, fx: 960, fy: 511, ease: SNAP },
];

export const camera = (frame: number) => ({
  s: kfe(frame, CAM.map((c) => ({ at: c.at, value: c.s, ease: c.ease }))),
  fx: kfe(frame, CAM.map((c) => ({ at: c.at, value: c.fx, ease: c.ease }))),
  fy: kfe(frame, CAM.map((c) => ({ at: c.at, value: c.fy, ease: c.ease }))),
});

export const camPoint = (p: { x: number; y: number }, cam: { s: number; fx: number; fy: number }) => ({
  x: 960 + (p.x - cam.fx) * cam.s,
  y: 540 + (p.y - cam.fy) * cam.s,
});

// Listing card 1 on the home page (screenshot pixels).
export const CARD1 = { x: 64, y: 2055, w: 582, h: 625 };
export const CARD_LIFT = 8;

// ---------------------------------------------------------------- Phone

export const PW = 430;
export const PD = phoneDims(PW);
export const PHONE_CX = 640;
export const PHONE_LEFT = PHONE_CX - PD.outerW / 2;
export const PHONE_TOP = 540 - PD.outerH / 2;
/** Phone screen origin in frame coordinates. */
export const PSX = PHONE_LEFT + PD.bezel;
export const PSY = PHONE_TOP + PD.bezel;
/** Mobile screenshot pixels → phone screen pixels. */
export const MS = PD.imgScale;

export const SHEET_TOP = 350;
export const BAR_H = 112;
