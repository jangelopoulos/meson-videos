import React from "react";
import { Audio, interpolate, Sequence, staticFile } from "remotion";
import { CUTS_60 as K, S1, S2 } from "./cuts60";
import { DRAFT, DRAFT_DONE, SENT as SENT_AT } from "./screens/messages";

const sec = (s: number) => Math.round(s * 30);

// Voiceover (ElevenLabs v3, "Becca", one directed take split into lines), each line
// placed in its section. Times in seconds.
export const VO_LINES: [file: string, at: number, dur: number, text: string][] = [
  ["01", 0.1, 3.3, "On average, you make forty calls a day."],
  ["02", 3.5, 2.33, "But barely any of it gets logged properly."],
  ["03", 7.85, 1.6, "Meet AgentPhone."],
  ["04", 9.55, 3.59, "Know exactly who's calling, with context from your CRM."],
  ["05", 13.65, 4.9, "Every call is transcribed live, picking out the details that matter as you talk."],
  ["06", 20.6, 6.1, "Hang up, and the summary's already written. Tasks captured, and logged straight to your CRM."],
  ["07", 28.1, 4.41, "Get AI coaching and insights on every call, so you keep getting better."],
  ["08", 33.2, 3.66, "Plus analytics on all your calls, not just a phone log."],
  ["09", 38.9, 2.91, "Desktop or mobile, it's all in one place."],
  ["10", 43.0, 3.52, "Texts sit in the same thread, with replies drafted for you."],
  ["11", 49.2, 3.69, "And it plugs into the CRM you already use, in minutes."],
  ["12", 54.8, 5.1, "AgentPhone. Every call, in your CRM. Join the waitlist today."],
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

const voFrames = VO_LINES.map(([, at, dur]) => [sec(at), sec(at + dur)] as const);
/** Music ducks under the voice, with short ramps. */
const musicVolume = (f: number, withVo: boolean) => {
  const base = interpolate(f, [0, 12, sec(57.5), sec(60)], [0, 0.62, 0.62, 0.5], {
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

export const Soundtrack60: React.FC<{ voiceover: boolean; music: boolean }> = ({ voiceover, music }) => (
  <>
    {music ? <Audio src={staticFile("audio/music.mp3")} volume={(f) => musicVolume(f, voiceover)} /> : null}
    {voiceover
      ? VO_LINES.map(([file, at, dur]) => (
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
