import { beat } from "./theme";

export const DURATION_60 = beat(124); // 1800 frames = 60.0s

// Every cut on the 124 BPM grid.
export const CUTS_60 = {
  cold: beat(0), // 0:00 · tense, sparse intro
  logo: beat(8), // 0:04
  call: beat(14), // 0:07 · phone rings → answer → live → summary → coach
  expand: beat(65), // 0:31 · the phone grows into the desktop calls view
  insights: beat(67),
  both: beat(78), // 0:38 · on desktop or mobile
  mobile: beat(87), // 0:42 · back to the phone: messages → set up
  close: beat(114), // 0:55 · final hit
  end: beat(124), // 1:00
} as const;
