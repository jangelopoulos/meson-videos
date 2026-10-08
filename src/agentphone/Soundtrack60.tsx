import React from "react";
import { Audio, interpolate, Sequence, staticFile } from "remotion";
import { CUTS_60 as K, S1, S2 } from "./cuts60";
import { DRAFT, DRAFT_DONE, SENT as SENT_AT } from "./screens/messages";

const sec = (s: number) => Math.round(s * 30);

// Voiceover (ElevenLabs v3, "Sunny", one lightly directed take split into lines), each line
// placed in its section. Times in seconds.
export const VO_LINES: [file: string, at: number, dur: number, text: string][] = [
  ["01", 0.1, 2.7, "On average, you make forty calls a day."],
  ["02", 3.0, 2.71, "But barely any of it gets logged properly."],
  ["03", 7.85, 1.41, "Meet AgentPhone."],
  ["04", 9.5, 3.73, "Know exactly who's calling, with context from your CRM."],
  ["05", 13.65, 4.97, "Every call is transcribed live, picking out the details that matter as you talk."],
  ["06", 20.6, 6.47, "Hang up, and the summary's already written. Tasks captured, and logged straight to your CRM."],
  ["07", 28.1, 5.01, "Get AI coaching and insights on every call, so you keep getting better."],
  ["08", 33.3, 4.28, "Plus analytics on all your calls, not just a phone log."],
  ["09", 38.9, 3.2, "Desktop or mobile, it's all in one place."],
  ["10", 43.0, 4.13, "Texts sit in the same thread, with replies drafted for you."],
  ["11", 49.2, 3.7, "And it plugs into the CRM you already use, in minutes."],
  ["12", 54.7, 5.24, "AgentPhone. Every call, in your CRM. Join the waitlist today."],
];

// Sound effects, in frames, derived from the story timings in cuts60. Only
// moments that make a sound in real life get one (answer, hang up, keys,
// send); the in-phone slides stay silent, and a whoosh only marks the jump
// between phone and desktop.
const LIVE = K.call + S1.live;
const AFTER = K.call + S1.after;
const RING = K.call + 4;
const ACCEPT = K.call + 109;
const END_CALL = LIVE + 186;
const WHOOSH = [
  K.expand, // phone grows into the desktop
  K.mobile - 39, // desktop hands back to the phone
];
const LOGGED = AFTER + 134; // "Auto-logged to CRM"
const ZERO = 87; // "0 logged" lands
// Messages screen runs at pace 1.6 with a 2-frame lead: screen frame x is
// shot frame (x - 2) * 1.6.
const MSG = K.mobile + S2.messages;
const msg = (x: number) => MSG + Math.round((x - 2) * 1.6);
const KEYS: [number, number] = [msg(DRAFT), msg(DRAFT_DONE) - msg(DRAFT)];
const SENT = msg(SENT_AT + 1);
// Soft typing under the live transcript lines and the summary writing out.
const TYPING: [number, number][] = [
  [LIVE + 10, 57],
  [LIVE + 74, 56],
  [LIVE + 136, 37],
  [AFTER + 42, 60],
];

/**
 * VO for a cut that starts `from` frames in (social version): lines that
 * would start before the cut are dropped, except "Meet AgentPhone", which
 * moves to open the cut.
 */
const voLines = (from: number) =>
  from === 0
    ? VO_LINES
    : VO_LINES.filter(([file, at]) => file === "03" || sec(at) >= from).map(
        ([file, at, dur, text]) => [file, file === "03" ? from / 30 + 0.02 : at, dur, text] as (typeof VO_LINES)[number],
      );

/** Music ducks under the voice, with short ramps. */
const musicVolume = (f: number, withVo: boolean, from: number, voFrames: (readonly [number, number])[]) => {
  const fadeIn = from === 0 ? [0, 12] : [from, from + 3];
  const base = interpolate(f, [fadeIn[0], fadeIn[1], sec(57.5), sec(60)], [0, 0.62, 0.62, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (!withVo) return base;
  let duck = 0;
  for (const [a, b] of voFrames) {
    duck = Math.max(duck, interpolate(f, [a - 6, a, b, b + 9], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  }
  return base * (1 - 0.65 * duck);
};

const Sfx: React.FC<{ at: number; src: string; volume: number; dur?: number; loop?: boolean }> = ({ at, src, volume, dur = 60, loop }) => (
  <Sequence from={at} durationInFrames={dur} layout="none" name={`sfx · ${src}`}>
    <Audio src={staticFile(`audio/sfx/${src}.mp3`)} volume={volume} loop={loop} />
  </Sequence>
);

export const Soundtrack60: React.FC<{ voiceover: boolean; music: boolean; from?: number }> = ({ voiceover, music, from = 0 }) => {
  const lines = voLines(from);
  const voFrames = lines.map(([, at, dur]) => [sec(at), sec(at + dur)] as const);
  return (
    <>
      {music ? <Audio src={staticFile("audio/music.mp3")} volume={(f) => musicVolume(f, voiceover, from, voFrames)} /> : null}
      {voiceover
        ? lines.map(([file, at, dur]) => (
            <Sequence key={file} from={sec(at)} durationInFrames={sec(dur) + 6} layout="none" name={`VO ${file}`}>
              <Audio src={staticFile(`audio/vo/${file}.wav`)} volume={1} />
            </Sequence>
          ))
        : null}
      <Sfx at={RING} src="ring" volume={0.55} dur={sec(3.5)} />
      <Sfx at={ACCEPT} src="answer" volume={0.45} dur={sec(1)} />
      <Sfx at={END_CALL} src="hangup" volume={0.5} dur={sec(1.5)} />
      {WHOOSH.map((at) => (
        <Sfx key={at} at={at - 4} src="whoosh" volume={0.3} dur={sec(1)} />
      ))}
      <Sfx at={ZERO} src="tap" volume={0.7} dur={sec(1)} />
      <Sfx at={LOGGED} src="chime" volume={0.7} dur={sec(1)} />
      {TYPING.map(([at, len]) => (
        <Sfx key={at} at={at} src="typing" volume={0.35} dur={len} loop />
      ))}
      <Sfx at={KEYS[0]} src="keys" volume={0.6} dur={KEYS[1]} loop />
      <Sfx at={SENT} src="sent" volume={0.7} dur={sec(1)} />
    </>
  );
};
