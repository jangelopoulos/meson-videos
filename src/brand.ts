/**
 * Pinax brand + video configuration.
 *
 * Everything you are likely to tweak lives here: colours, fonts, type sizes,
 * timings and on-screen copy. Scene code reads from this file only.
 */
import { loadFont as loadSchibsted } from "@remotion/google-fonts/SchibstedGrotesk";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

// ---------------------------------------------------------------------------
// Colours: pure monochrome plus one hot orange (Signal).
// Signal is used at most once per scene, and only on small elements.
// ---------------------------------------------------------------------------
export const colors = {
  black: "#0A0A0A", // dark backgrounds, text on light
  white: "#FFFFFF", // light backgrounds, text on dark
  signal: "#E4571E", // the single accent
  grey: "#85837E", // secondary text, inactive elements
  rule: "#E6E4DF", // lines, borders, dividers
} as const;

// ---------------------------------------------------------------------------
// Fonts (loaded via @remotion/google-fonts so renders wait for them).
// Inter is the closest Google Font to Apple's SF Pro. The wordmark keeps
// Schibsted Grotesk, since it is the logo.
// ---------------------------------------------------------------------------
const schibsted = loadSchibsted("normal", {
  weights: ["600"],
  subsets: ["latin"],
});
const inter = loadInter("normal", {
  weights: ["500", "600", "700"],
  subsets: ["latin"],
});

export const fonts = {
  headline: inter.fontFamily, // big statements
  body: inter.fontFamily, // callouts, tagline
  label: inter.fontFamily, // small caps-style labels, prices, counters
  wordmark: schibsted.fontFamily, // the Pinax logo only
} as const;

export const typography = {
  headlineWeight: 700,
  headlineTracking: "-0.045em",
  headlineLineHeight: 1.04,
  bodyWeight: 600,
  bodyTracking: "-0.025em",
  labelWeight: 600,
  labelTracking: "0.02em",
  counterWeight: 700,
  counterTracking: "-0.05em",
  wordmarkTracking: "-0.06em",
} as const;

// Type sizes in px, per orientation. Keep >= 48 (landscape) and >= 64 (vertical).
export const typeScale = {
  landscape: {
    hook: 150,
    headline: 96,
    callout: 54,
    label: 48,
    counter: 250,
    tagline: 64,
    wordmark: 300,
  },
  vertical: {
    hook: 140,
    headline: 104,
    callout: 64,
    label: 64,
    counter: 230,
    tagline: 76,
    wordmark: 300,
  },
} as const;

// ---------------------------------------------------------------------------
// Line weights for the thin-line "mechanism" motif.
// ---------------------------------------------------------------------------
export const strokes = {
  gear: 1.75, // gears, rings (Grey / Rule)
  line: 1.5, // connecting lines
  icon: 2.5, // line icons inside app tiles and callouts
} as const;

// ---------------------------------------------------------------------------
// Timing. All values in seconds unless noted; converted with `sec()`.
// ---------------------------------------------------------------------------
export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

/** Scene lengths, in seconds. Transitions overlap neighbouring scenes. */
export const sceneSeconds = {
  hook: 4.2,
  problem: 8,
  cost: 5.4,
  connect: 7.3,
  ai: 8.2,
  stick: 6.2,
  outro: 7.5,
} as const;

/** Transition lengths, in seconds. */
export const transitionSeconds = {
  fade: 0.4, // hook -> problem
  wipe: 0.66, // cost -> connect, stick -> outro
} as const;

export const motion = {
  /** High damping: crisp, no visible overshoot. */
  spring: { damping: 200, stiffness: 100, mass: 0.7 },
  /** Frames between words in a word-by-word reveal. */
  wordStagger: 4,
  /** Frames between lines in a line-by-line reveal. */
  lineStagger: 16,
  /** Length of a single word's entrance, in frames. */
  wordDuration: 24,
  /** Blur (px) words resolve from as they appear. */
  wordBlur: 18,
  /** Frames a scene's text takes to fade out before the scene ends. */
  textExit: 12,
  /** Centre-gear speed in degrees per frame (others derive from tooth counts). */
  gearSpeed: 0.55,
} as const;

/** Beats inside scenes, in seconds from the start of that scene. */
export const beats = {
  hook: { text: 0.4 },
  problem: {
    firstTile: 0.2,
    tileInterval: 0.22,
    line1: 0.8,
    drift: 3.2,
    line2: 3.8,
  },
  cost: { jam: 0.1, counter: 0.5, counterDuration: 2.6, text: 0.9 },
  connect: { draw: 0.3, pull: 1.4, lines: 2.9, hub: 4.1, text: 1.2, spin: 1.8 },
  ai: { move: 0, dot: 1.0, dotEnd: 7.5, callouts: [1.8, 3.4, 5.0], text: 0.4 },
  stick: { move: 0, people: 0.5, peopleInterval: 0.18, text: 0.6 },
  outro: {
    collapse: 0.7,
    collapseDuration: 1.1,
    wordmark: 1.8,
    tagline: 2.8,
    url: 4.2,
  },
} as const;

// ---------------------------------------------------------------------------
// On-screen copy. `highlight` is a phrase rendered in Signal (once per scene).
// Arrays are revealed line by line; strings wrap naturally.
// ---------------------------------------------------------------------------
export type IconName =
  | "envelope"
  | "calendar"
  | "grid"
  | "chat"
  | "phone"
  | "chart"
  | "summary"
  | "ask"
  | "followup";

export const copy = {
  hook: {
    text: "Your business runs on a dozen tools.",
    highlight: "dozen",
  },
  problem: {
    lines: ["None of them talk to each other.", "And you pay for every seat."],
    /** One tile per entry; the first number in each label ticks upward. */
    tiles: [
      { icon: "envelope", label: "$49/SEAT" },
      { icon: "calendar", label: "$29/SEAT" },
      { icon: "grid", label: "$0.10/CONTACT" },
      { icon: "chat", label: "+$12" },
      { icon: "phone", label: "$99/MO" },
      { icon: "chart", label: "$15/SEAT" },
    ] as { icon: IconName; label: string }[],
  },
  cost: {
    lines: ["More tools.", "More cost.", "Less clarity."],
    counterLabel: "MONTHLY SOFTWARE COST",
    counterPrefix: "$",
    counterValue: 4860,
    counterSuffix: "/MO",
  },
  connect: {
    text: "Pinax connects it all into one system you own.",
  },
  ai: {
    text: "Then we put AI to work, so everything talks to each other.",
    callouts: [
      { icon: "summary", text: "Every customer summarised instantly" },
      { icon: "ask", text: "Ask your system anything" },
      { icon: "followup", text: "Follow-ups that never slip" },
    ] as { icon: IconName; text: string }[],
  },
  stick: {
    text: "And we make sure your team actually uses it.",
  },
  outro: {
    tagline: "Your whole business, working as one system.",
    highlight: "one system.",
    url: "PINAX.AI",
  },
} as const;
