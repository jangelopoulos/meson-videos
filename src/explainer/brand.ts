/**
 * Pinax brand + video configuration.
 *
 * Everything you are likely to tweak lives here: colours, fonts, type sizes,
 * timings and on-screen copy. Scene code reads from this file only.
 */
import { loadFont as loadSchibsted } from "@remotion/google-fonts/SchibstedGrotesk";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

// ---------------------------------------------------------------------------
// Colours
// ---------------------------------------------------------------------------
export const colors = {
  black: "#000000", // canvas
  ink: "#0A0A0A", // brand black
  white: "#FFFFFF",
  signal: "#E4571E", // brand orange
  signalHot: "#FF8A3D", // lighter end of the orange gradient
  signalPale: "#FFC48A", // highlight end of the orange gradient
  grey: "#85837E", // secondary text
  rule: "#E6E4DF",
  /** Secondary text on black. */
  muted: "rgba(255,255,255,0.55)",
  /** Thin lines on black. */
  line: "rgba(255,255,255,0.22)",
  lineStrong: "rgba(255,255,255,0.6)",
} as const;

export const gradients = {
  /** Hero words. */
  signalText: `linear-gradient(100deg, ${colors.signalPale} 0%, ${colors.signalHot} 38%, ${colors.signal} 100%)`,
  /** App icon bodies: graphite with a soft top light. */
  icon: [
    "linear-gradient(160deg, #3A3A3C 0%, #1C1C1E 100%)",
    "linear-gradient(160deg, #4A4A4D 0%, #232325 100%)",
    "linear-gradient(160deg, #2E2E30 0%, #141415 100%)",
  ],
  /** Frosted card. */
  glass:
    "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)",
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
  headline: inter.fontFamily,
  body: inter.fontFamily,
  label: inter.fontFamily,
  wordmark: schibsted.fontFamily,
} as const;

export const typography = {
  headlineWeight: 700,
  headlineTracking: "-0.05em",
  headlineLineHeight: 1.02,
  bodyWeight: 600,
  bodyTracking: "-0.025em",
  labelWeight: 600,
  labelTracking: "0.01em",
  counterWeight: 700,
  counterTracking: "-0.055em",
  wordmarkTracking: "-0.06em",
} as const;

/** Type sizes in px, per orientation. */
export const typeScale = {
  landscape: {
    hero: 170,
    headline: 104,
    callout: 46,
    label: 40,
    counter: 280,
    tagline: 64,
    wordmark: 320,
  },
  vertical: {
    hero: 150,
    headline: 112,
    callout: 54,
    label: 48,
    counter: 250,
    tagline: 72,
    wordmark: 300,
  },
} as const;

export const strokes = {
  gear: 1.5,
  line: 1.5,
  icon: 2.5,
} as const;

// ---------------------------------------------------------------------------
// Timing. All values in seconds unless noted; converted with `sec()`.
// ---------------------------------------------------------------------------
export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

/** Scene lengths, in seconds. Crossfades overlap neighbouring scenes. */
export const sceneSeconds = {
  hook: 4.6,
  problem: 7.4,
  cost: 5.6,
  connect: 7.2,
  ai: 7.8,
  stick: 5.6,
  outro: 9.4,
} as const;

/** Crossfade length, in seconds (hook -> problem, cost -> connect). */
export const transitionSeconds = {
  fade: 0.5,
} as const;

export const motion = {
  /** High damping: smooth, no visible overshoot. */
  spring: { damping: 200, stiffness: 90, mass: 0.8 },
  wordStagger: 4,
  lineStagger: 16,
  wordDuration: 26,
  /** Blur (px) words resolve from. */
  wordBlur: 22,
  textExit: 12,
  /** Centre-gear speed in degrees per frame. */
  gearSpeed: 0.5,
} as const;

/** Beats inside scenes, in seconds from the start of that scene. */
export const beats = {
  hook: { text: 0.3 },
  problem: { firstTile: 0.1, tileInterval: 0.14, line1: 0.6, line2: 3.7 },
  cost: { counter: 0.3, counterDuration: 2.4, text: 1.4 },
  connect: {
    ignite: 0.2,
    draw: 0.6,
    pull: 1.3,
    lines: 2.6,
    text: 1.4,
    spin: 1.0,
  },
  ai: { pulses: 0.6, callouts: [1.6, 2.9, 4.2], text: 0.3 },
  stick: { people: 0.5, peopleInterval: 0.12, text: 0.5 },
  outro: {
    collapse: 0.3,
    collapseDuration: 1.0,
    promises: 1.3,
    promiseEvery: 1.25,
    wordmark: 5.3,
    tagline: 6.1,
    url: 7.1,
  },
} as const;

// ---------------------------------------------------------------------------
// On-screen copy. `highlight` is a phrase rendered in the orange gradient.
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
    highlight: "dozen tools.",
  },
  problem: {
    lines: ["None of them talk to each other.", "And you pay for every seat."],
    /** One tile per entry; the first number in each label ticks upward. */
    tiles: [
      { icon: "envelope", label: "$49/seat" },
      { icon: "calendar", label: "$29/seat" },
      { icon: "grid", label: "$0.10/contact" },
      { icon: "chat", label: "+$12" },
      { icon: "phone", label: "$99/mo" },
      { icon: "chart", label: "$15/seat" },
    ] as { icon: IconName; label: string }[],
  },
  cost: {
    lines: ["More tools.", "More cost.", "Less clarity."],
    counterLabel: "Monthly software spend",
    counterPrefix: "$",
    counterValue: 4860,
    counterSuffix: "/mo",
  },
  connect: {
    text: "Pinax connects it all into one system you own.",
    highlight: "one system",
  },
  ai: {
    text: "Then we put AI to work.",
    highlight: "AI",
    callouts: [
      {
        icon: "summary",
        title: "Every customer, summarised",
        text: "Instantly.",
      },
      {
        icon: "ask",
        title: "Ask your system anything",
        text: "Get a straight answer.",
      },
      {
        icon: "followup",
        title: "Follow-ups that never slip",
        text: "Handled for you.",
      },
    ] as { icon: IconName; title: string; text: string }[],
  },
  stick: {
    text: "And we make sure your team actually uses it.",
    highlight: "actually",
  },
  outro: {
    promises: [
      "Built in your accounts.",
      "No lock-in.",
      "No per-seat pricing.",
    ],
    tagline: "Your whole business, working as one system.",
    highlight: "one system.",
    url: "pinax.ai",
  },
} as const;
