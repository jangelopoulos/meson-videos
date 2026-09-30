import { Easing } from "remotion";
import { phoneDims } from "../devices";
import { EASE, EASE_INOUT } from "../theme";

export const FILM_FRAMES = 600;

/** Every beat of the 20-second film, in frames at 30 fps. */
export const T = {
  hookOut: 36,
  zoomStart: 42,
  zoomEnd: 76,
  cursorIn: 78,
  chipClick: 98,
  searchClick: 112,
  scrollStart: 116,
  scrollEnd: 146,
  cardHover: 154,
  cardClick: 164,
  flyStart: 168,
  flyEnd: 204,
  legal: 212,
  tapYield: 258,
  sheetUp: 263,
  tapCosts: 304,
  tapVisa: 348,
  sheetDown: 390,
  barUp: 398,
  tapEnquire: 420,
  notif: 430,
  endStart: 476,
};

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

// The aerial hero photo on the home page, which the film opens on.
const HERO = pageToFrame(1262, 1325, SCROLL_TOP);
const linear = (t: number) => t;

const CAM: { at: number; s: number; fx: number; fy: number; ease?: (t: number) => number }[] = [
  { at: 0, s: 2.95, fx: HERO.x - 30, fy: HERO.y },
  { at: T.zoomStart, s: 2.75, fx: HERO.x + 12, fy: HERO.y, ease: linear },
  { at: T.zoomEnd, s: 1, fx: 960, fy: 511, ease: SNAP },
  { at: T.cursorIn + 2, s: 1, fx: 960, fy: 511 },
  { at: T.chipClick - 6, s: 1.45, fx: 1020, fy: 482, ease: SNAP },
  { at: T.scrollStart, s: 1.45, fx: 1020, fy: 482 },
  { at: T.scrollEnd, s: 1.12, fx: 960, fy: 470 },
  { at: T.cardHover - 8, s: 1.12, fx: 960, fy: 470 },
  { at: T.cardHover + 6, s: 1.3, fx: 620, fy: 400, ease: EASE },
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

// Listing card 1 on the home page (screenshot pixels) and its photo area.
export const CARD1 = { x: 64, y: 2055, w: 582, h: 625, photoH: 352 };
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
export const PHONE_HERO_H = 625 * MS;

export const SHEET_TOP = 350;
export const BAR_H = 112;
