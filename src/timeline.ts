import { sceneSeconds, sec, transitionSeconds } from "./brand";

export type SceneId = keyof typeof sceneSeconds;

/** Scene order, and the transition that leads *out* of each scene. */
export const SCENE_ORDER: { id: SceneId; out: "fade" | "wipe" | "cut" }[] = [
  { id: "hook", out: "fade" },
  { id: "problem", out: "cut" },
  { id: "cost", out: "wipe" },
  { id: "connect", out: "cut" },
  { id: "ai", out: "cut" },
  { id: "stick", out: "wipe" },
  { id: "outro", out: "cut" },
];

export const sceneFrames = Object.fromEntries(
  Object.entries(sceneSeconds).map(([k, v]) => [k, sec(v)]),
) as Record<SceneId, number>;

export const transitionFrames = {
  fade: sec(transitionSeconds.fade),
  wipe: sec(transitionSeconds.wipe),
  cut: 0,
} as const;

/** Absolute start frame of each scene within the full video. */
export const sceneStart = (() => {
  const starts = {} as Record<SceneId, number>;
  let t = 0;
  for (const { id, out } of SCENE_ORDER) {
    starts[id] = t;
    t += sceneFrames[id] - transitionFrames[out];
  }
  return starts;
})();

export const TOTAL_FRAMES = SCENE_ORDER.reduce(
  (acc, { id, out }) => acc + sceneFrames[id] - transitionFrames[out],
  0,
);
