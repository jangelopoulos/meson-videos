import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Box, deskBox, phoneBox, PHONE_H, PHONE_W } from "./stage";

export type Cam = { x: number; y: number; z: number };

/** Where a point in a shot's content lands on the stage, for a given camera. */
export const stagePoint = (
  v: boolean,
  kind: "phone" | "desk",
  size: [number, number],
  cam: Cam,
  pt: [number, number],
): [number, number] => {
  const box: Box = kind === "phone" ? phoneBox(v) : deskBox(v);
  const [w, h] = kind === "phone" ? [PHONE_W, PHONE_H] : size;
  const fit = Math.min(box.w / w, box.h / h);
  // Portrait phone shots damp their camera (see Framed).
  const c =
    kind === "phone" && v
      ? { x: w / 2 + (cam.x - w / 2) * 0.25, y: h / 2 + (cam.y - h / 2) * 0.25, z: 1 + (cam.z - 1) * 0.25 }
      : cam;
  const s = fit * c.z;
  return [box.x + box.w / 2 + (pt[0] - c.x) * s, box.y + box.h / 2 + (pt[1] - c.y) * s];
};

/**
 * The next shot opens out of an element of the last one (a tapped button,
 * the call token): a circle grows from that point, its edge drawn as a ring.
 */
export const Iris: React.FC<{
  origin: (v: boolean) => [number, number];
  dur?: number;
  ring?: string;
  seed?: number; // starting radius: the size of the element it grows from
  children: React.ReactNode;
}> = ({ origin, dur = 15, ring = "#7df0b6", seed = 30, children }) => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const [x, y] = origin(height > width);
  const maxR = Math.max(
    Math.hypot(x, y),
    Math.hypot(width - x, y),
    Math.hypot(x, height - y),
    Math.hypot(width - x, height - y),
  );
  const p = interpolate(f, [0, dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.55, 0, 0.25, 1),
  });
  const r = seed + (maxR + 20 - seed) * p;
  const done = p >= 1;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: done ? undefined : `circle(${r}px at ${x}px ${y}px)` }}>{children}</AbsoluteFill>
      {done ? null : (
        <div
          style={{
            position: "absolute",
            left: x - r,
            top: y - r,
            width: r * 2,
            height: r * 2,
            borderRadius: "50%",
            border: `${interpolate(p, [0, 1], [5, 2])}px solid ${ring}`,
            boxShadow: `0 0 40px ${ring}`,
            opacity: interpolate(p, [0, 0.15, 0.85, 1], [0, 1, 0.7, 0]),
          }}
        />
      )}
    </AbsoluteFill>
  );
};
