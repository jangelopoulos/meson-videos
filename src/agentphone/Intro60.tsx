import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Supers, SuperCue } from "./lib/Supers";
import { PHONE_H, PHONE_W } from "./lib/stage";
import { LeadCtx, Pace, StageClock } from "./lib/time";
import { Cam, Iris, stagePoint } from "./lib/transition";
import { AfterShot } from "./shots/After";
import { CloseShot } from "./shots/Close";
import { ColdOpenShot } from "./shots/ColdOpen";
import { DashboardShot } from "./shots/Dashboard";
import { CALLBACK_PT, DesktopShot } from "./shots/Desktop";
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

// Cameras at the end of each outgoing shot (content px), so a transition can
// start from the exact on-screen spot of the element it grows out of.
const PH = (x: number, y: number, z: number): Cam => ({ x, y, z });
const DIALER_END = PH(PHONE_W / 2, 520, 1.05);
const INCOMING_END = PH(PHONE_W / 2, 470, 1.06);
const LIVE_END = PH(PHONE_W / 2, PHONE_H / 2, 1.03);
const AFTER_END = PH(PHONE_W / 2, 380, 1.07);
const SCORE_END = PH(PHONE_W / 2, 520, 1.12);
const MAPPING_END = PH(PHONE_W / 2, 560, 1.1);

/** A point on a phone screen (390×844, inside the 12px bezel). */
const onPhone = (cam: Cam, x: number, y: number) => (v: boolean) =>
  stagePoint(v, "phone", [PHONE_W, PHONE_H], cam, [x + 12, y + 12]);
/** A point on a desktop board; the camera differs by orientation. */
const onDesk = (size: [number, number], h: Cam, vert: Cam, x: number, y: number) => (v: boolean) =>
  stagePoint(v, "desk", size, v ? vert : h, [x, y]);

const OVER = 15; // frames the outgoing shot keeps playing under the transition
const LEAD = 9; // head start for the incoming screen, so it opens onto content

type Seam = { origin: (v: boolean) => [number, number]; ring: string } | null;
const MINT = "#7df0b6";
const GREEN = "#10c46e";

export const AgentPhoneIntro60: React.FC<Intro60Props> = ({ supers, url, voiceover, music }) => {
  // [name, from, to, pace, element, how this shot arrives]. Pace re-times a
  // shot built for the 30s cut (2 = half speed). A null seam is a match cut
  // carried by an object: the merging calls, the pill, the flying summary
  // row, the phone folding into the handset circle.
  const shots: [string, number, number, number, React.ReactNode, Seam][] = [
    ["Cold open", K.cold, K.logo, 1, <ColdOpenShot muted={supers === "muted"} />, null],
    ["Logo reveal", K.logo, K.dialer, 1, <LogoShot endPill />, null],
    ["Dialer", K.dialer, K.incoming, 1, <DialerShot />, null],
    [
      "Incoming + context", K.incoming, K.live, 1.5,
      <IncomingShot tap={90} inset={{ at: 26, value: 70, markAt: 46 }} camFrom={DIALER_END} />,
      { origin: onPhone(DIALER_END, 196, 781), ring: MINT }, // out of the Call button
    ],
    [
      "Live call", K.live, K.after, 1.6,
      <LiveShot inset={false} easeOut={80} endAt={84} camFrom={INCOMING_END} />,
      { origin: onPhone(INCOMING_END, 299, 748), ring: MINT }, // out of Accept
    ],
    [
      "After the call", K.after, K.messages, 1.4,
      <AfterShot flyOut={false} sendAt={126} camFrom={LIVE_END} />,
      { origin: onPhone(LIVE_END, 196, 786), ring: "#fb5e7e" }, // out of End call
    ],
    [
      "Messages", K.messages, K.desktop, 1,
      <MessagesShot camFrom={AFTER_END} />,
      { origin: onPhone(AFTER_END, 321, 528), ring: MINT }, // out of "Send the brochure"
    ],
    ["Desktop · Today", K.desktop, K.routing, (K.routing - K.desktop) / 174, <DesktopShot tokenAt={162} />, null],
    [
      "Routing", K.routing, K.score, 0.9, <RoutingShot />,
      { origin: onDesk([1280, 800], PH(640, 400, 1), PH(640, 400, 1.15), ...CALLBACK_PT), ring: GREEN }, // out of the call token
    ],
    [
      "Call score", K.score, K.insights, (K.insights - K.score) / 58, <ScoreShot />,
      { origin: onDesk([1280, 940], PH(430, 575, 1.45), PH(340, 600, 2.15), 472, 709), ring: MINT }, // token on Send SMS
    ],
    [
      "Insights", K.insights, K.mapping, 1, <InsightsShot />,
      { origin: onPhone(SCORE_END, 83, 220), ring: GREEN }, // out of the 72 score tile
    ],
    [
      "Connect a CRM", K.mapping, K.dashboard, 1, <MappingShot pressAt={104} />,
      { origin: onDesk([1280, 1010], PH(640, 505, 0.99), PH(450, 520, 1.24), 1186, 955), ring: MINT }, // out of "Contact →"
    ],
    [
      "Morning dashboard", K.dashboard, K.close, 1.25,
      <DashboardShot len={(K.close - K.dashboard) / 1.25} camFrom={MAPPING_END} toCircle />,
      { origin: onPhone(MAPPING_END, 197, 799), ring: MINT }, // out of "Continue"
    ],
  ];
  return (
    <AbsoluteFill style={{ background: "#0c1410" }}>
      {shots.map(([name, from, to, pace, el, seam], i) => {
        const next = shots[i + 1];
        const tail = next && next[5] ? OVER : 0;
        const body = (
          <StageClock.Provider value={from}>
            <Pace scale={pace}>
              <LeadCtx.Provider value={seam ? LEAD : 0}>{el}</LeadCtx.Provider>
            </Pace>
          </StageClock.Provider>
        );
        return (
          <Sequence key={name} name={name} from={from} durationInFrames={to - from + tail}>
            {seam ? (
              <Iris origin={seam.origin} dur={OVER} ring={seam.ring}>
                {body}
              </Iris>
            ) : (
              body
            )}
          </Sequence>
        );
      })}
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
