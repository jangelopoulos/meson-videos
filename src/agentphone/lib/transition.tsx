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
