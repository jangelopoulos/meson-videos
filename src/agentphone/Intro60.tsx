import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Supers, SuperCue } from "./lib/Supers";
import { Pace } from "./lib/time";
import { AfterShot } from "./shots/After";
import { CloseShot } from "./shots/Close";
import { ColdOpenShot } from "./shots/ColdOpen";
import { DashboardShot } from "./shots/Dashboard";
import { DesktopShot } from "./shots/Desktop";
import { DialerShot } from "./shots/Dialer";
import { IncomingShot } from "./shots/Incoming";
import { InsightsShot } from "./shots/Insights";
import { LiveShot } from "./shots/Live";
import { LogoShot } from "./shots/Logo";
import { MappingShot } from "./shots/Mapping";
import { MessagesShot } from "./shots/Messages";
import { RoutingShot } from "./shots/Routing";
import { ScoreShot } from "./shots/Score";
import { beat } from "./theme";

export const DURATION_60 = beat(124); // 1800 frames = 60.0s

// Every cut on the 124 BPM grid (script times in comments).
export const CUTS_60 = {
  cold: beat(0), // 0:00 · tense, sparse intro
  logo: beat(8), // 0:04
  dialer: beat(14), // 0:07 · build
  incoming: beat(23), // 0:11
  live: beat(33), // 0:16
  after: beat(43), // 0:21 · the drop
  messages: beat(56), // 0:27
  desktop: beat(64), // 0:31
  routing: beat(77), // 0:37 · second lift
  score: beat(87), // 0:42
  insights: beat(92), // 0:44.5
  mapping: beat(97), // 0:47
  dashboard: beat(105), // 0:51
  close: beat(114), // 0:55 · final hit
  end: beat(124), // 1:00
} as const;

export type Intro60Props = {
  /** "vo": short supers under voiceover; "muted": longer supers; "none": clean, for re-voicing. */
  supers: "vo" | "muted" | "none";
  url: string;
  voiceover: string | null;
  music: string | null;
};

const K = CUTS_60;

const VO: SuperCue[] = [
  { from: K.dialer, to: K.incoming, text: "Your agency's number", style: "side" },
  { from: K.incoming, to: K.live, text: "Context before you answer", style: "side" },
  { from: K.live, to: K.after, text: "Live transcript", style: "side" },
  { from: K.after, to: K.messages, text: "Notes that write themselves", style: "side" },
  { from: K.messages, to: K.desktop, text: "Calls and texts, one thread", style: "side" },
  { from: K.desktop, to: K.routing, text: "Your day, sorted", style: "chip" },
  { from: K.routing, to: K.score, text: "Never miss a lead", style: "chip" },
  { from: K.score, to: K.insights, text: "Coach from real calls", style: "side", hold: true },
  { from: K.insights, to: K.mapping, text: "Coach from real calls", style: "chip", cont: true },
  { from: K.mapping, to: K.dashboard, text: "Set up in minutes", style: "side" },
  { from: K.dashboard, to: K.close, text: "5 follow-ups. Zero forgotten.", style: "side" },
];

const MUTED: SuperCue[] = [
  { from: K.logo + 6, to: K.dialer, text: "Meet AgentPhone.", style: "below" },
  { from: K.dialer, to: K.incoming, text: "Your agency's number, on every phone.", style: "side" },
  { from: K.incoming, to: K.live, text: "Know who's calling before you answer.", style: "side" },
  { from: K.live, to: K.after, text: "Every call transcribed live.", style: "side" },
  { from: K.after, to: K.messages, text: "Hang up. Notes, tasks and CRM: done.", style: "side" },
  { from: K.messages, to: K.desktop, text: "Calls and texts in one thread.", style: "side" },
  { from: K.desktop, to: K.routing, text: "Your whole day, sorted.", style: "chip" },
  { from: K.routing, to: K.score, text: "Missed a call? It texts back in seconds.", style: "chip" },
  { from: K.score, to: K.insights, text: "Every call scored. Coach what matters.", style: "side", hold: true },
  { from: K.insights, to: K.mapping, text: "Every call scored. Coach what matters.", style: "chip", cont: true },
  { from: K.mapping, to: K.dashboard, text: "Plugs into your CRM in minutes.", style: "side" },
  { from: K.dashboard, to: K.close, text: "Nothing slips through.", style: "side" },
];

export const AgentPhoneIntro60: React.FC<Intro60Props> = ({ supers, url, voiceover, music }) => {
  // [name, from, to, pace, element]. Pace re-times a shot built for the 30s
  // cut (2 = half speed); new shots run at 1.
  const shots: [string, number, number, number, React.ReactNode][] = [
    ["Cold open", K.cold, K.logo, 1, <ColdOpenShot muted={supers === "muted"} />],
    ["Logo reveal", K.logo, K.dialer, 1, <LogoShot />],
    ["Dialer", K.dialer, K.incoming, 1, <DialerShot />],
    ["Incoming + context", K.incoming, K.live, 1.5, <IncomingShot tap={84} inset={{ at: 26, value: 70, markAt: 46 }} />],
    ["Live call", K.live, K.after, 1.6, <LiveShot inset={false} easeOut={88} />],
    ["After the call", K.after, K.messages, 1.4, <AfterShot flyOut={false} />],
    ["Messages", K.messages, K.desktop, 1, <MessagesShot />],
    ["Desktop · Today", K.desktop, K.routing, (K.routing - K.desktop) / 174, <DesktopShot />],
    ["Routing", K.routing, K.score, 0.9, <RoutingShot />],
    ["Call score", K.score, K.insights, (K.insights - K.score) / 58, <ScoreShot />],
    ["Insights", K.insights, K.mapping, 1, <InsightsShot />],
    ["Connect a CRM", K.mapping, K.dashboard, 1, <MappingShot />],
    ["Morning dashboard", K.dashboard, K.close, 1.25, <DashboardShot len={(K.close - K.dashboard) / 1.25} />],
  ];
  return (
    <AbsoluteFill style={{ background: "#0c1410" }}>
      {shots.map(([name, from, to, pace, el]) => (
        <Sequence key={name} name={name} from={from} durationInFrames={to - from}>
          <Pace scale={pace}>{el}</Pace>
        </Sequence>
      ))}
      <Sequence name="Close" from={K.close} durationInFrames={K.end - K.close}>
        <CloseShot url={url} len={K.end - K.close} meson />
      </Sequence>
      {supers === "none" ? null : <Supers cues={supers === "muted" ? MUTED : VO} />}
      {music ? <Audio src={staticFile(music)} /> : null}
      {voiceover && supers !== "muted" ? <Audio src={staticFile(voiceover)} /> : null}
    </AbsoluteFill>
  );
};
