import { beat } from "./theme";

export const DURATION_60 = beat(124); // 1800 frames = 60.0s

// Every cut on the 124 BPM grid (beats in comments).
const B = {
  cold: 0, // "On average, you make forty calls a day…"
  logo: 13, // "Meet AgentPhone."
  call: 19, // rings → Accept
  live: 28, // transcript writes itself
  after: 42, // summary
  score: 58, // AI coaching
  expand: 67, // phone grows into the desktop calls view
  insights: 69, // analytics
  both: 80, // desktop or mobile
  mobile: 88, // messages
  mapping: 101, // set up in minutes
  close: 114,
  end: 124,
};

export const CUTS_60 = {
  cold: beat(B.cold),
  logo: beat(B.logo),
  call: beat(B.call),
  expand: beat(B.expand),
  insights: beat(B.insights),
  both: beat(B.both),
  mobile: beat(B.mobile),
  close: beat(B.close),
  end: beat(B.end),
} as const;

/** Screens inside the first phone story, in frames from CUTS_60.call. */
export const S1 = {
  incoming: 0,
  live: beat(B.live) - beat(B.call),
  after: beat(B.after) - beat(B.call),
  score: beat(B.score) - beat(B.call),
};
export const STORY1_LEN = beat(B.expand) - beat(B.call);

/** Screens inside the second phone story, in frames from CUTS_60.mobile. */
export const S2 = { messages: 8, mapping: beat(B.mapping) - beat(B.mobile) };
export const STORY2_LEN = beat(B.close) - beat(B.mobile);
