/**
 * Pinax ad: brand, tempo, beat sheet and copy.
 *
 * Everything you are likely to tweak lives here. Change BPM to retime the
 * whole edit; change a shot's `beats` to lengthen or shorten it.
 */
import { loadFont as loadSchibsted } from "@remotion/google-fonts/SchibstedGrotesk";
import { loadFont as loadHanken } from "@remotion/google-fonts/HankenGrotesk";
import { loadFont as loadPlexMono } from "@remotion/google-fonts/IBMPlexMono";

// ---------------------------------------------------------------------------
// Tempo. Every cut, reveal and major move lands on this grid.
// ---------------------------------------------------------------------------
export const FPS = 30;
export const BPM = 120;
/** Frames per beat (15 at 120 BPM / 30fps). */
export const FRAMES_PER_BEAT = (FPS * 60) / BPM;
/** Beats to frames. Fractions allowed (0.5 = half-beat). */
export const beats = (n: number) => Math.round(n * FRAMES_PER_BEAT);

/** Reading time rule: 0.25s per word + 0.4s, rounded to whole beats. */
export const readBeats = (text: string) => {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(((0.25 * words + 0.4) * BPM) / 60));
};

// ---------------------------------------------------------------------------
// Colours
// ---------------------------------------------------------------------------
export const colors = {
  black: "#0A0A0A",
  white: "#FFFFFF",
  signal: "#E4571E", // the only accent: one word, a progress line, a glow edge, a cursor
  grey: "#85837E",
  rule: "#E6E4DF",
} as const;

export const glass = {
  fill: "rgba(255,255,255,0.08)",
  /** Used instead of backdrop blur when many tiles are on screen. */
  solidFill: "rgba(38,38,38,0.92)",
  border: "rgba(255,255,255,0.15)",
  blur: 24,
  radius: 32,
  shadow: "0 40px 90px rgba(0,0,0,0.55), 0 10px 30px rgba(0,0,0,0.35)",
  /** Light-section variants. */
  lightFill: "rgba(255,255,255,0.72)",
  lightBorder: "rgba(10,10,10,0.08)",
  lightShadow:
    "0 40px 90px rgba(10,10,10,0.14), 0 8px 24px rgba(10,10,10,0.06)",
  /** Backdrop blur switches off above this many tiles on screen. */
  maxBlurredTiles: 15,
} as const;

// ---------------------------------------------------------------------------
// Fonts (@remotion/google-fonts blocks rendering until they load)
// ---------------------------------------------------------------------------
const schibsted = loadSchibsted("normal", {
  weights: ["600", "700"],
  subsets: ["latin"],
});
const hanken = loadHanken("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});
const plexMono = loadPlexMono("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

export const fonts = {
  headline: schibsted.fontFamily,
  body: hanken.fontFamily,
  mono: plexMono.fontFamily,
} as const;

export const type = {
  headlineWeight: 700,
  headlineTracking: "-0.045em",
  monoTracking: "0.06em",
  landscape: {
    hero: 240,
    headline: 150,
    statement: 120,
    overlay: 56,
    body: 48,
    mono: 48,
    benefit: 76,
  },
  vertical: {
    hero: 200,
    headline: 124,
    statement: 110,
    overlay: 64,
    body: 64,
    mono: 64,
    benefit: 76,
  },
} as const;

// ---------------------------------------------------------------------------
// Motion
// ---------------------------------------------------------------------------
export const motion = {
  /** High damping, no bounce. */
  spring: { damping: 200, stiffness: 260, mass: 0.6 },
  /** cubic-bezier(0.22, 1, 0.36, 1) */
  bezier: [0.22, 1, 0.36, 1] as const,
  /** Word reveal length and stagger, frames. */
  wordIn: 7,
  wordStagger: 2.5,
  /** Exit length, frames. */
  out: 7,
  /** Camera push per beat. */
  push: 0.08,
} as const;

// ---------------------------------------------------------------------------
// SaaS names (shown as text on neutral tiles only) and illustrative prices.
// ---------------------------------------------------------------------------
export const saas = [
  "HubSpot",
  "Salesforce",
  "Pipedrive",
  "Monday.com",
  "Asana",
  "ClickUp",
  "Trello",
  "Notion",
  "Airtable",
  "Slack",
  "Microsoft Teams",
  "Zoom",
  "Google Workspace",
  "Dropbox",
  "Xero",
  "MYOB",
  "QuickBooks",
  "Stripe",
  "Mailchimp",
  "Canva",
  "Calendly",
  "DocuSign",
  "Typeform",
  "Zapier",
  "Zendesk",
  "Intercom",
  "Aircall",
  "Deputy",
  "Employment Hero",
  "Hootsuite",
  "Shopify",
  "Gong",
];

export const prices = [
  "$49/SEAT/MO",
  "$0.10/CONTACT",
  "$29/USER",
  "$15/SEAT/MO",
  "$99/MO",
  "$12/USER",
  "$65/SEAT/MO",
  "$0.03/MSG",
  "$39/USER",
  "$25/SEAT/MO",
  "$8/USER",
  "$150/MO",
];

/** The six clusters in the "none of them talk" beat (indices into `saas`). */
export const clusters = [
  { label: "CRM", tools: [0, 1, 2] },
  { label: "PROJECTS", tools: [3, 4, 5, 6] },
  { label: "ACCOUNTS", tools: [14, 15, 16] },
  { label: "COMMS", tools: [9, 10, 11] },
  { label: "MARKETING", tools: [18, 19, 29] },
  { label: "DOCS", tools: [7, 13, 21] },
];

// ---------------------------------------------------------------------------
// Copy. `highlight` is a word rendered in Signal.
// ---------------------------------------------------------------------------
export const copy = {
  subscriptions: "Subscriptions.",
  tooMany: "You have too many.",
  counterLabel: "MONTHLY SOFTWARE $",
  noTalk: { text: "None of them talk to each other.", highlight: "talk" },
  badges: ["3", "12", "27", "41"],
  montage: ["Copy.", "Paste.", "Export.", "Import."],
  integration: { text: "You became the integration.", highlight: "You" },
  aiChips: ["Claude", "ChatGPT", "Gemini"],
  aiTalk: "Everyone's talking about AI.",
  question: "How did sales go this month?",
  noAccess: "I don't have access to your sales data.",
  aiData: {
    lines: ["AI is only as good", "as the data it can see."],
    highlight: "data",
  },
  sameProblem: "We had the same problem.",
  secureBase: "One secure base.",
  benefits: [
    "No per-seat pricing.",
    "Everything in one place.",
    "Your design. Your training.",
    "AI that knows your business.",
  ],
  answer: "Sales up 18% on last month. 6 deals closing this week.",
  command: "Draft follow-ups for every new lead",
  emails: [
    "Re: Your quote",
    "Following up",
    "Next steps",
    "Quick question",
    "Welcome aboard",
  ],
  customActions: "Custom AI actions. Built on your data.",
  cta: [
    { text: "One system." },
    { text: "Your data." },
    { text: "AI that works for you.", highlight: "works" },
  ],
  build: "We'll build it for you.",
  tagline: {
    text: "Your whole business, working as one system.",
    highlight: "one system.",
  },
  url: "PINAX.AI",
} as const;

// ---------------------------------------------------------------------------
// Beat sheet: shot order and length in beats. Text shots use readBeats().
// No shot is longer than 6 beats (3s) except the wordmark.
// ---------------------------------------------------------------------------
export const shots = [
  // Act 1: the problem
  { id: "subscriptions", beats: 2 },
  { id: "barrage", beats: 6 },
  { id: "freeze", beats: 1 },
  { id: "noTalk", beats: readBeats(copy.noTalk.text) },
  { id: "clusters", beats: 5 },
  { id: "montage", beats: copy.montage.length },
  { id: "integration", beats: readBeats(copy.integration.text) },
  // Act 2: the AI question
  { id: "chips", beats: 3 },
  { id: "chat", beats: 5 },
  { id: "aiData", beats: 6 },
  { id: "sameProblem", beats: readBeats(copy.sameProblem) + 1 }, // + a silence beat
  // Act 3: the fix
  { id: "vortex", beats: 6 },
  { id: "lock", beats: 2 },
  { id: "secureBase", beats: readBeats(copy.secureBase) },
  { id: "zoomWhite", beats: 1 },
  ...copy.benefits.map((b, i) => ({ id: `benefit${i}`, beats: readBeats(b) })),
  { id: "answer", beats: 5 },
  { id: "command", beats: 4 },
  // Act 4: call to action
  ...copy.cta.map((c, i) => ({ id: `cta${i}`, beats: readBeats(c.text) })),
  { id: "build", beats: readBeats(copy.build) },
  { id: "wordmark", beats: 6 },
] as const;

export type ShotId = (typeof shots)[number]["id"];

/** Start beat of each shot. */
export const shotStartBeat = (() => {
  const out: Record<string, number> = {};
  let b = 0;
  for (const s of shots) {
    out[s.id] = b;
    b += s.beats;
  }
  return out;
})();

export const TOTAL_BEATS = shots.reduce((a, s) => a + s.beats, 0);
export const TOTAL_FRAMES = beats(TOTAL_BEATS);

/** Hit points (in seconds) for syncing a 120 BPM track later. */
export const hitPoints = {
  freeze: (shotStartBeat.freeze * 60) / BPM,
  montage: copy.montage.map((_, i) => ((shotStartBeat.montage + i) * 60) / BPM),
  flash: (shotStartBeat.lock * 60) / BPM,
  padlock: ((shotStartBeat.lock + 1) * 60) / BPM,
  wordmark: (shotStartBeat.wordmark * 60) / BPM,
};
