import React from "react";
import { Audio } from "@remotion/media";
import { interpolate, Sequence, staticFile } from "remotion";
import { FPS, soundtrack } from "../brand";

/** Seconds of speech in each clip (measured from the files), for ducking. */
const SPEECH: Record<string, number> = {
  "audio/vo/vo01.mp3": 3.44,
  "audio/vo/vo02.mp3": 2.2,
  "audio/vo/vo03.mp3": 2.31,
  "audio/vo/vo04.mp3": 2.26,
  "audio/vo/vo05.mp3": 1.97,
  "audio/vo/vo07.mp3": 3.02,
  "audio/vo/vo08.mp3": 1.79,
  "audio/vo/vo09.mp3": 3.14,
  "audio/vo/vo10.mp3": 4.79,
  "audio/vo/vo11.mp3": 2.92,
  "audio/vo/vo13.mp3": 4.43,
  "audio/vo/vo15.mp3": 4.04,
};

/** Voice windows in absolute seconds. */
const windows = soundtrack.voiceover.map((v) => ({
  start: v.at,
  end: v.at + (SPEECH[v.src] ?? 3) / (v.rate ?? 1),
}));

/** Music level at absolute time t: ducked while the voice is speaking. */
const musicLevel = (t: number) => {
  const { volume, duckedVolume } = soundtrack.music;
  const r = soundtrack.duckRamp;
  let duck = 0;
  for (const w of windows) {
    const k = interpolate(
      t,
      [w.start - r, w.start, w.end, w.end + r * 2],
      [0, 1, 1, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );
    duck = Math.max(duck, k);
  }
  return volume + (duckedVolume - volume) * duck;
};

/** Music bed plus voiceover clips, placed in absolute time. */
export const Soundtrack: React.FC = () => {
  const musicFrom = Math.round(soundtrack.music.at * FPS);
  return (
    <>
      <Sequence from={musicFrom} name="Music" layout="none">
        <Audio
          src={staticFile(soundtrack.music.src)}
          volume={(f) => musicLevel((f + musicFrom) / FPS)}
        />
      </Sequence>
      {soundtrack.voiceover.map((v) => (
        <Sequence
          key={v.src}
          from={Math.round(v.at * FPS)}
          name={`VO ${v.text.slice(0, 24)}`}
          layout="none"
        >
          <Audio
            src={staticFile(v.src)}
            volume={() => soundtrack.voiceVolume}
            playbackRate={v.rate ?? 1}
          />
        </Sequence>
      ))}
    </>
  );
};
