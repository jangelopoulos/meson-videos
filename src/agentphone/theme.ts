// Brand tokens and the 124 BPM timing grid for the AgentPhone intro.
export const FPS = 30;
export const DURATION = 900; // 30.0s

// 124 BPM → one beat ≈ 0.484s ≈ 14.52 frames. 62 beats = exactly 900 frames,
// so the loop seam also lands on a beat.
export const BEAT = DURATION / 62;
export const beat = (n: number) => Math.round(n * BEAT);

// Every cut sits on a beat (script times in comments).
export const CUTS = {
  logo: beat(0), // 0:00
  incoming: beat(6), // 0:03
  live: beat(10), // 0:05
  after: beat(14), // 0:07 · music drop
  desktop: beat(23), // 0:11
  routing: beat(35), // 0:17 · music lift
  score: beat(43), // 0:21
  insights: beat(47), // 0:23
  dashboard: beat(52), // 0:25
  close: beat(58), // 0:28 · final hit
  end: DURATION,
} as const;

export const C = {
  action: "#0c9a55",
  actionHi: "#10c46e",
  mint: "#7df0b6",
  callLayer: "#0c1410",
  paper: "#eef4f0",
  ink: "#16241d",
  inkSoft: "#3f5249",
  muted: "#5d7468",
  ringing: "#f59e0b",
  terminal: "#be123c",
  property: "#3b82f6",
  aurora1: "#b9f6d6",
  aurora2: "#cbe8ff",
  aurora3: "#ffe2c2",
  onDark: "#e8f5ee",
} as const;

export const FONT = "'Geist', sans-serif";
export const MONO = "'Geist Mono', monospace";
