import React from "react";
import { Audio, interpolate, Sequence, staticFile } from "remotion";
import { CUTS_60 as K } from "./cuts60";

const sec = (s: number) => Math.round(s * 30);

// Voiceover (ElevenLabs, "Becca", one take split into lines), each line
// placed in its section. Times in seconds.
export const VO_LINES: [file: string, at: number, dur: number, text: string][] = [
  ["01", 0.0, 4.33, "An agent makes forty calls a day. How much of it reaches the CRM?"],
  ["02", 5.4, 1.23, "Meet AgentPhone."],
  ["03", 7.3, 2.56, "Know who's calling, and why, before you answer."],
  ["04", 11.5, 4.38, "Every call is transcribed live, picking out the details that matter as you talk."],
  ["05", 19.3, 5.61, "Hang up, and the summary's already written. Tasks captured, and logged straight to your CRM."],
  ["06", 27.4, 2.84, "Every call is scored, so you know exactly who to coach."],
  ["07", 31.9, 2.05, "And the full picture is waiting on your desktop."],
  ["08", 38.1, 2.64, "Desktop or mobile, it's all in one place."],
  ["09", 42.7, 3.75, "Texts sit in the same thread, with replies drafted for you."],
  ["10", 49.2, 2.93, "And it plugs into the CRM you already use, in minutes."],
  ["11", 55.5, 4.31, "AgentPhone. Every call, in your CRM. Join the waitlist today."],
];

// Sound effects, in frames. Derived from the story timings in Intro60.
const RING = K.call + 4;
const ACCEPT = K.call + 109;
const END_CALL = K.call + beatFrames(23, 14) + 210;
const SLIDES = [
  K.call + beatFrames(23, 14), // → live
  K.call + beatFrames(39, 14), // → summary
  K.call + beatFrames(56, 14), // → score
  K.expand, // phone grows into desktop
  K.both, // board shrinks aside
  K.both + 92, // back to the phone
  K.mobile + 8, // → messages
  K.mobile + beatFrames(101, 87), // → set up
  K.close - 16, // phone folds into the logo
];
const LOGGED = K.call + beatFrames(39, 14) + 134; // "Auto-logged to CRM"
const SENT = K.mobile + 8 + 125; // AI reply sent
// Typing under the live transcript lines and the summary writing out.
const TYPING: [number, number][] = [
  [K.call + beatFrames(23, 14) + 10, 67],
  [K.call + beatFrames(23, 14) + 84, 66],
  [K.call + beatFrames(23, 14) + 155, 44],
  [K.call + beatFrames(39, 14) + 42, 60],
];

function beatFrames(a: number, b: number) {
  return Math.round((a - b) * (900 / 62));
}

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
    <Sfx at={ACCEPT} src="tap" volume={0.6} dur={sec(1)} />
    <Sfx at={END_CALL} src="tap" volume={0.6} dur={sec(1)} />
    {SLIDES.map((at) => (
      <Sfx key={at} at={at - 2} src="whoosh" volume={0.28} dur={sec(1)} />
    ))}
    <Sfx at={LOGGED} src="chime" volume={0.9} dur={sec(1)} />
    <Sfx at={SENT} src="chime" volume={0.6} dur={sec(1)} />
    {TYPING.map(([at, len]) => (
      <Sfx key={at} at={at} src="typing" volume={0.45} dur={len} loop />
    ))}
  </>
);
