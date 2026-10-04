import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { PhoneStory } from "./lib/PhoneStory";
import { PHONE_H, PHONE_W } from "./lib/stage";
import { Supers, SuperCue } from "./lib/Supers";
import { LeadCtx, StageClock } from "./lib/time";
import { Cam } from "./lib/transition";
import { AfterScreen } from "./screens/after";
import { DashboardScreen } from "./screens/dashboard";
import { IncomingScreen } from "./screens/incoming";
import { LiveScreen } from "./screens/live";
import { MappingScreen } from "./screens/mapping";
import { MessagesScreen } from "./screens/messages";
import { ScoreScreen } from "./screens/score";
import { CloseShot } from "./shots/Close";
import { ColdOpenShot } from "./shots/ColdOpen";
import { EXPAND_LEN, ExpandShot, INSIGHTS_LEAD } from "./shots/Expand";
import { InsightsShot } from "./shots/Insights";
import { LogoShot } from "./shots/Logo";
import { ViewBothShot } from "./shots/ViewBoth";
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

// Screens inside the first phone story (frames from K.call).
const S1 = { incoming: 0, live: beat(23) - beat(14), after: beat(39) - beat(14), score: beat(56) - beat(14) };
const STORY1_LEN = beat(65) - beat(14);
// Second phone story (frames from K.mobile).
const S2 = { messages: 8, mapping: beat(101) - beat(87) };
const STORY2_LEN = beat(114) - beat(87);

const C = (x: number, y: number, z: number): Cam => ({ x, y, z });
const MID = PHONE_H / 2;
const X = PHONE_W / 2;
const SCORE_END = C(X, 520, 1.1);

export type Intro60Props = {
  /** "vo": short supers under voiceover; "muted": longer supers; "none": clean, for re-voicing. */
  supers: "vo" | "muted" | "none";
  url: string;
  voiceover: string | null;
  music: string | null;
};

const K = CUTS_60;
const at = (s: number) => K.call + s;
const atM = (s: number) => K.mobile + s;

const VO: SuperCue[] = [
  { from: at(S1.incoming), to: at(S1.live), text: "Context before you answer", style: "side" },
  { from: at(S1.live), to: at(S1.after), text: "Live transcript", style: "side" },
  { from: at(S1.after), to: at(S1.score), text: "Notes that write themselves", style: "side" },
  { from: at(S1.score), to: K.expand, text: "Coach from real calls", style: "side" },
  { from: K.insights, to: K.both, text: "Coach from real calls", style: "chip" },
  { from: atM(S2.messages), to: atM(S2.mapping), text: "Calls and texts, one thread", style: "side" },
  { from: atM(S2.mapping), to: K.close - 10, text: "Set up in minutes", style: "side" },
];

const MUTED: SuperCue[] = [
  { from: K.logo + 6, to: K.call, text: "Meet AgentPhone.", style: "below" },
  { from: at(S1.incoming), to: at(S1.live), text: "Know who's calling before you answer.", style: "side" },
  { from: at(S1.live), to: at(S1.after), text: "Every call transcribed live.", style: "side" },
  { from: at(S1.after), to: at(S1.score), text: "Hang up. Notes, tasks and CRM: done.", style: "side" },
  { from: at(S1.score), to: K.expand, text: "Every call scored. Coach what matters.", style: "side" },
  { from: K.insights, to: K.both, text: "Every call scored. Coach what matters.", style: "chip" },
  { from: atM(S2.messages), to: atM(S2.mapping), text: "Calls and texts in one thread.", style: "side" },
  { from: atM(S2.mapping), to: K.close - 10, text: "Plugs into your CRM in minutes.", style: "side" },
];

const SCORE_PACE = 1.6;
const SCORE_LEAD = 4;

export const AgentPhoneIntro60: React.FC<Intro60Props> = ({ supers, url, voiceover, music }) => {
  const insightsLen = K.both - K.insights;
  const shots: [string, number, number, React.ReactNode][] = [
    ["Cold open", K.cold, K.logo, <ColdOpenShot muted={supers === "muted"} />],
    ["Logo reveal", K.logo, K.call, <LogoShot />],
    [
      // Ringing → Accept → live transcript → End call → summary → coaching.
      "The call", K.call, K.expand,
      <PhoneStory
        rise
        len={STORY1_LEN}
        screens={[
          { name: "Incoming", from: S1.incoming, el: <IncomingScreen tap={112} ripple={false} /> },
          { name: "Live", from: S1.live, lead: 2, el: <LiveScreen typing endAt={214} /> },
          { name: "After the call", from: S1.after, lead: 4, el: <AfterScreen think /> },
          { name: "Call score", from: S1.score, lead: SCORE_LEAD, pace: SCORE_PACE, el: <ScoreScreen /> },
        ]}
        cam={[
          { f: 0, ...C(X, MID, 1) },
          { f: 16, ...C(X, MID, 1) },
          { f: 60, ...C(X, 470, 1.06) },
          { f: S1.live - 6, ...C(X, 470, 1.06) },
          { f: S1.live + 20, ...C(X, MID, 1.02) },
          { f: S1.live + 70, ...C(X, 560, 1.12) },
          { f: S1.after - 30, ...C(X, 560, 1.12) },
          { f: S1.after + 6, ...C(X, MID, 1.03) },
          { f: S1.after + 50, ...C(X, 330, 1.08) },
          { f: S1.score - 30, ...C(X, 360, 1.08) },
          { f: S1.score + 6, ...C(X, MID, 1) },
          { f: S1.score + 50, ...SCORE_END },
          { f: STORY1_LEN, ...SCORE_END },
        ]}
      />,
    ],
    ["Into desktop", K.expand, K.insights, <ExpandShot from={SCORE_END} scoreEnd={(STORY1_LEN - S1.score) / SCORE_PACE + SCORE_LEAD} />],
    [
      "Calls on desktop", K.insights, K.both,
      <LeadCtx.Provider value={INSIGHTS_LEAD + EXPAND_LEN}>
        <InsightsShot
          camH={[
            { f: 0, x: 640, y: 505, z: 1 },
            { f: 12, x: 640, y: 505, z: 1 },
            { f: 50, x: 470, y: 230, z: 1.38 },
            { f: 100, x: 480, y: 250, z: 1.38 },
            { f: 145, x: 640, y: 505, z: 1 },
          ]}
          camV={[
            { f: 0, x: 640, y: 505, z: 1 },
            { f: 12, x: 640, y: 505, z: 1 },
            { f: 50, x: 450, y: 230, z: 1.5 },
            { f: 100, x: 450, y: 260, z: 1.5 },
            { f: 145, x: 640, y: 505, z: 1 },
          ]}
        />
      </LeadCtx.Provider>,
    ],
    ["Desktop or mobile", K.both, K.mobile, <ViewBothShot insightsAt={INSIGHTS_LEAD + EXPAND_LEN + insightsLen} />],
    [
      // Back on the phone: messages, then set-up, then fold into the logo.
      "Messages + set up", K.mobile, K.close,
      <PhoneStory
        len={STORY2_LEN}
        foldAt={STORY2_LEN - 16}
        screens={[
          { name: "Dashboard", from: 0, lead: 110, el: <DashboardScreen /> },
          { name: "Messages", from: S2.messages, lead: 2, pace: 1.6, el: <MessagesScreen /> },
          { name: "Connect a CRM", from: S2.mapping, lead: 4, el: <MappingScreen /> },
        ]}
        cam={[
          { f: 0, ...C(X, MID, 1) },
          { f: 24, ...C(X, MID, 1) },
          { f: 150, ...C(X, 520, 1.07) },
          { f: S2.mapping + 6, ...C(X, MID, 1.02) },
          { f: S2.mapping + 90, ...C(X, 560, 1.08) },
          { f: STORY2_LEN - 16, ...C(X, 560, 1.08) },
        ]}
      />,
    ],
  ];
  return (
    <AbsoluteFill style={{ background: "#0c1410" }}>
      {shots.map(([name, from, to, el]) => (
        <Sequence key={name} name={name} from={from} durationInFrames={to - from}>
          <StageClock.Provider value={from}>{el}</StageClock.Provider>
        </Sequence>
      ))}
      <Sequence name="Close" from={K.close} durationInFrames={K.end - K.close}>
        <StageClock.Provider value={K.close}>
          <CloseShot url={url} len={K.end - K.close} meson chained />
        </StageClock.Provider>
      </Sequence>
      {supers === "none" ? null : <Supers cues={supers === "muted" ? MUTED : VO} />}
      {music ? <Audio src={staticFile(music)} /> : null}
      {voiceover && supers !== "muted" ? <Audio src={staticFile(voiceover)} /> : null}
    </AbsoluteFill>
  );
};
