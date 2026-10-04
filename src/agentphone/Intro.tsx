import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Supers, SuperCue } from "./lib/Supers";
import { AfterShot } from "./shots/After";
import { CloseShot } from "./shots/Close";
import { DashboardShot } from "./shots/Dashboard";
import { DesktopShot } from "./shots/Desktop";
import { IncomingShot } from "./shots/Incoming";
import { InsightsShot } from "./shots/Insights";
import { LiveShot } from "./shots/Live";
import { LogoShot } from "./shots/Logo";
import { RoutingShot } from "./shots/Routing";
import { ScoreShot } from "./shots/Score";
import { CUTS as K } from "./theme";

export type IntroProps = {
  /** Muted-feed version: longer supers carry the story without voiceover. */
  muted: boolean;
  url: string;
  /** Optional files in public/, e.g. "audio/voiceover.wav". */
  voiceover: string | null;
  music: string | null;
};

// Voiceover version: short supers (≤5 words), timed to the script.
const VO_SUPERS: SuperCue[] = [
  { from: K.incoming, to: K.live, text: "Context before you answer", style: "side" },
  { from: K.live, to: K.after, text: "Live transcript", style: "side" },
  { from: K.after, to: K.desktop, text: "Notes that write themselves", style: "side" },
  { from: K.desktop, to: K.routing, text: "Your day, sorted", style: "chip" },
  { from: K.routing, to: K.score, text: "Never miss a lead", style: "chip" },
  { from: K.score, to: K.insights, text: "Coach from real calls", style: "side", hold: true },
  { from: K.insights, to: K.dashboard, text: "Coach from real calls", style: "chip", cont: true },
  { from: K.dashboard, to: K.close, text: "5 follow-ups. Zero forgotten.", style: "side" },
];

// Muted-feed version: the supers carry the story.
const MUTED_SUPERS: SuperCue[] = [
  { from: K.logo + 6, to: K.incoming, text: "Real estate runs on the phone.", style: "below" },
  { from: K.incoming, to: K.after, text: "Know who's calling. Let AI listen.", style: "side" },
  { from: K.after, to: K.desktop, text: "Hang up. Notes, tasks and CRM: done.", style: "side" },
  { from: K.desktop, to: K.routing, text: "Your whole day, sorted.", style: "chip" },
  { from: K.routing, to: K.score, text: "Missed a call? It texts back in seconds.", style: "chip" },
  { from: K.score, to: K.insights, text: "Every call scored. Coach what matters.", style: "side", hold: true },
  { from: K.insights, to: K.dashboard, text: "Every call scored. Coach what matters.", style: "chip", cont: true },
  { from: K.dashboard, to: K.close, text: "Nothing slips through.", style: "side" },
];

const SHOTS: [string, number, number, React.FC][] = [
  ["Logo reveal", K.logo, K.incoming, LogoShot],
  ["Incoming call", K.incoming, K.live, IncomingShot],
  ["Live call", K.live, K.after, LiveShot],
  ["After the call", K.after, K.desktop, AfterShot],
  ["Desktop · Today", K.desktop, K.routing, DesktopShot],
  ["Routing", K.routing, K.score, RoutingShot],
  ["Call score", K.score, K.insights, ScoreShot],
  ["Insights", K.insights, K.dashboard, InsightsShot],
  ["Morning dashboard", K.dashboard, K.close, DashboardShot],
];

export const AgentPhoneIntro: React.FC<IntroProps> = ({ muted, url, voiceover, music }) => (
  <AbsoluteFill style={{ background: "#0c1410" }}>
    {SHOTS.map(([name, from, to, Shot]) => (
      <Sequence key={name} name={name} from={from} durationInFrames={to - from}>
        <Shot />
      </Sequence>
    ))}
    <Sequence name="Close" from={K.close} durationInFrames={K.end - K.close}>
      <CloseShot url={url} />
    </Sequence>
    <Supers cues={muted ? MUTED_SUPERS : VO_SUPERS} />
    {music ? <Audio src={staticFile(music)} /> : null}
    {voiceover && !muted ? <Audio src={staticFile(voiceover)} /> : null}
  </AbsoluteFill>
);
