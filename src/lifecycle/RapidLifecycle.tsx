import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { BRAND, fontFamily } from "../brand";
import { LOGO_SLASH_CENTER_X, MesonRapidLogo } from "../MesonRapidLogo";
import {
  APPT_H,
  ApptStage,
  CALL_H,
  COL_W,
  CRM_H,
  CallStage,
  CrmStage,
  FOLLOW_H,
  FollowStage,
  LEAD_H,
  LeadStage,
  QUAL_H,
  QualStage,
} from "./stages";
import { clamp, easeInOut } from "./ui";

// The chain runs downward: each stage plays, then a line draws down to the
// next one while the camera follows. It ends by running into the logo.

type Stage = { C: React.FC<{ t: number }>; h: number; hold: number };

// `hold`: frames after a stage's line arrives before the next line starts,
// long enough for that stage's own animation to play out and settle.
const STAGES: Stage[] = [
  { C: LeadStage, h: LEAD_H, hold: 96 },
  { C: CallStage, h: CALL_H, hold: 96 },
  { C: QualStage, h: QUAL_H, hold: 136 },
  { C: ApptStage, h: APPT_H, hold: 122 },
  { C: CrmStage, h: CRM_H, hold: 104 },
  { C: FollowStage, h: FOLLOW_H, hold: 88 },
];

const GAP = 130; // connector length between stages (layout px)
const LOGO_SCALE = 1.25;
const LOGO_H = 52 * LOGO_SCALE;
// The slash is skewed -18deg, so its top sits right of its centre.
const SLASH_TOP_X = LOGO_SLASH_CENTER_X + 26 * Math.tan((18 * Math.PI) / 180);

// Vertical layout: top of each block, logo block last.
const TOPS: number[] = [];
{
  let y = 0;
  for (const s of STAGES) {
    TOPS.push(y);
    y += s.h + GAP;
  }
  TOPS.push(y);
}
const blockH = (i: number) => (i < STAGES.length ? STAGES[i].h : LOGO_H);
// Approximate full logo width (wordmark + gap + slash + gap + RAPID), used to
// centre the finished logo rather than its slash.
const LOGO_W = 157 + 16 + 3 + 16 + 80;
const LOGO_CENTER_SHIFT = (LOGO_W / 2 - SLASH_TOP_X) * LOGO_SCALE;
const centerY = (i: number) => TOPS[i] + blockH(i) / 2;

// Timeline.
const FIRST_ARRIVE = 8;
const LINE = 24; // line draw
const CAM = 38; // camera move (starts with the line)
const ARRIVE: number[] = [FIRST_ARRIVE];
const LINE_START: number[] = [];
STAGES.forEach((s, i) => {
  LINE_START.push(ARRIVE[i] + s.hold);
  ARRIVE.push(LINE_START[i] + LINE);
});
const LOGO_ARRIVE = ARRIVE[STAGES.length];
export const LIFECYCLE_DURATION = LOGO_ARRIVE + 108;

const Connector: React.FC<{ i: number; frame: number; focus: number }> = ({ i, frame, focus }) => {
  const start = LINE_START[i];
  const p = interpolate(frame, [start, start + LINE], [0, 1], { ...clamp, easing: easeInOut });
  if (p <= 0) return null;
  const x = COL_W / 2;
  const toLogo = i === STAGES.length - 1;
  const y1 = TOPS[i] + STAGES[i].h + 12;
  // The last line runs straight into the top of the logo's slash.
  const y2 = toLogo ? TOPS[i + 1] + 2 : TOPS[i + 1] - 12;
  const head = y1 + (y2 - y1) * p;
  const arrived = interpolate(frame, [start + LINE, start + LINE + 12], [0, 1], clamp);
  // Once the last line has joined the slash, it drains down into it so only
  // the logo is left.
  const drain = toLogo
    ? interpolate(frame, [LOGO_ARRIVE + 14, LOGO_ARRIVE + 32], [0, 1], { ...clamp, easing: easeInOut })
    : 0;
  if (drain >= 1) return null;
  const tail = y1 + (y2 - y1) * drain;
  return (
    // Each line fades once it has delivered the camera to the next stage.
    <g opacity={toLogo ? 1 : 1 - interpolate(focus - i, [0.8, 1], [0, 1], clamp)}>
      <line x1={x} y1={tail} x2={x} y2={head} stroke={BRAND.teal} strokeWidth={3} strokeLinecap="round" opacity={toLogo ? 1 : 1 - 0.35 * arrived} />
      <circle cx={x} cy={y1} r={5} fill={BRAND.teal} opacity={toLogo ? 1 - interpolate(focus - i, [0.1, 0.6], [0, 1], clamp) : 1} />
      {toLogo ? null : (
        <>
          <circle cx={x} cy={head} r={14} fill={BRAND.teal} opacity={0.25 * (1 - arrived)} />
          <circle cx={x} cy={head} r={6} fill={BRAND.teal} />
        </>
      )}
    </g>
  );
};

const Chain: React.FC<{ scale: number; logoScreenScale: number }> = ({ scale, logoScreenScale }) => {
  const frame = useCurrentFrame();

  let focus = 0;
  LINE_START.forEach((s) => {
    focus += interpolate(frame, [s, s + CAM], [0, 1], { ...clamp, easing: easeInOut });
  });
  const i0 = Math.min(Math.floor(focus), STAGES.length);
  const frac = focus - i0;
  const camY = i0 >= STAGES.length ? centerY(i0) : centerY(i0) + (centerY(i0 + 1) - centerY(i0)) * frac;
  // Push in a little on the logo at the end.
  const endZoom = interpolate(focus, [STAGES.length - 1, STAGES.length], [1, logoScreenScale], clamp);
  const s = scale * endZoom;
  // Once the logo has built, ease across so it sits centred in frame.
  const settle = interpolate(frame, [LOGO_ARRIVE + 30, LOGO_ARRIVE + 60], [0, 1], { ...clamp, easing: easeInOut });

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 0,
        height: 0,
        transformOrigin: "0 0",
        transform: `scale(${s}) translate(${-(COL_W / 2 + LOGO_CENTER_SHIFT * settle)}px, ${-camY}px)`,
      }}
    >
      <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={1} height={1}>
        {STAGES.map((_, i) => (
          <Connector key={i} i={i} frame={frame} focus={focus} />
        ))}
      </svg>
      {STAGES.map(({ C }, i) => {
        // Once the camera starts moving on, the stage we're leaving fades out,
        // drifting up and settling back slightly as it goes.
        const past = interpolate(focus - i, [0.6, 1], [0, 1], { ...clamp, easing: easeInOut });
        if (past >= 1) return null;
        const t = frame - ARRIVE[i];
        if (t < 0) return null;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              top: TOPS[i],
              width: COL_W,
              opacity: 1 - past,
              translate: `0 ${-40 * past}px`,
              scale: String(1 - 0.05 * past),
              filter: past > 0 ? `blur(${6 * past}px)` : undefined,
            }}
          >
            <C t={t} />
          </div>
        );
      })}
      {/* Logo: the top of its slash sits on the column centre so the last line flows into it */}
      <div
        style={{
          position: "absolute",
          left: COL_W / 2 - SLASH_TOP_X,
          top: TOPS[STAGES.length],
          // The chain container is 0px wide; stop the logo shrinking to fit it.
          width: "max-content",
          transformOrigin: `${SLASH_TOP_X}px 0px`,
          scale: String(LOGO_SCALE),
        }}
      >
        <MesonRapidLogo start={LOGO_ARRIVE} slashFrom="top" timing={{ slash: 0, wordmark: 8, rapid: 14 }} />
      </div>
    </div>
  );
};

// ElevenLabs voiceover, one line per stage. Two voices are kept in
// public/audio; pick one with VOICE_NAME. Clips were loudness-matched after
// download (per-clip gain, peaks kept under -1dBFS) so they sit consistently
// over the music. `durS` is each clip's length, used to duck the music.
const FPS = 30;
const VOICES = {
  // "Katherine - Calm Luxury Narrator" (NtS6nEHDYMQC9QczMQuq)
  katherine: [2.65, 2.18, 3.81, 3.16, 2.55, 1.86, 3.81],
  // "Cass - Warm and Energetic British Woman" (ITRml9f5K7moz24wRnmV)
  cass: [2.28, 2.23, 3.34, 2.97, 2.41, 1.72, 3.3],
};
const VOICE_NAME: keyof typeof VOICES = "katherine";
const LINES = [
  { file: "vo-1-enquiry.mp3", at: ARRIVE[0] + 8 },
  { file: "vo-2-call.mp3", at: ARRIVE[1] + 4 },
  { file: "vo-3-qualify.mp3", at: ARRIVE[2] + 4 },
  { file: "vo-4-appointment.mp3", at: ARRIVE[3] + 4 },
  { file: "vo-5-crm.mp3", at: ARRIVE[4] + 4 },
  { file: "vo-6-followup.mp3", at: ARRIVE[5] + 4 },
  // Starts as the last line heads for the logo, so "Meson Rapid" lands on it.
  { file: "vo-7-logo.mp3", at: LINE_START[5] + 2 },
];
const VOICE = LINES.map((l, i) => ({ ...l, durS: VOICES[VOICE_NAME][i] }));

const Voiceover: React.FC = () => (
  <>
    {VOICE.map((v) => (
      <Sequence key={v.file} from={v.at} durationInFrames={Math.ceil(v.durS * FPS) + 6} layout="none">
        <Audio src={staticFile(`audio/vo-${VOICE_NAME}/${v.file}`)} />
      </Sequence>
    ))}
  </>
);

// ElevenLabs Music tracks (30s, generated for this video). Switch between the
// two variations here.
const MUSIC = "audio/lifecycle-music-a.mp3";
const MUSIC_VOLUME = 0.6;
const MUSIC_DUCKED = 0.16; // under the voiceover

// 1 while any voice line is playing (with short ramps either side).
const voiceActive = (f: number) =>
  Math.max(
    0,
    ...VOICE.map((v) => {
      const end = v.at + v.durS * FPS;
      return interpolate(f, [v.at - 6, v.at, end, end + 10], [0, 1, 1, 0], clamp);
    }),
  );

const Music: React.FC = () => (
  <Audio
    src={staticFile(MUSIC)}
    volume={(f) => {
      const base = MUSIC_VOLUME + (MUSIC_DUCKED - MUSIC_VOLUME) * voiceActive(f);
      // Short fade in; fade out as the logo holds at the end.
      return base * interpolate(f, [0, 12, LIFECYCLE_DURATION - 40, LIFECYCLE_DURATION - 2], [0, 1, 1, 0], clamp);
    }}
  />
);

const Backdrop: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse 55% 60% at 50% 45%, rgba(20,184,166,.10) 0%, rgba(20,184,166,0) 70%), radial-gradient(ellipse 120% 90% at 50% 50%, #151515 0%, #0B0B0B 100%)",
      fontFamily,
      overflow: "hidden",
    }}
  >
    <Music />
    <Voiceover />
    {children}
  </AbsoluteFill>
);

// 1920x1080
export const RapidLifecycle: React.FC = () => (
  <Backdrop>
    <Chain scale={1.6} logoScreenScale={1.2} />
  </Backdrop>
);

// 1080x1920: column fills ~82% of the width.
export const RapidLifecycleVertical: React.FC = () => (
  <Backdrop>
    <Chain scale={1.9} logoScreenScale={1.1} />
  </Backdrop>
);
