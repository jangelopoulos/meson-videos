import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { EASE_CAM } from "./anim";
import { ambStyle } from "./Amb";
import { C } from "../theme";

export const useVertical = () => {
  const { width, height } = useVideoConfig();
  return height > width;
};

/** Camera keyframe: look at (x, y) in screen px at zoom z, reached at frame f. */
export type Key = { f: number; x: number; y: number; z: number };

const camAt = (keys: Key[], f: number) => {
  if (f <= keys[0].f) return keys[0];
  for (let i = 1; i < keys.length; i++) {
    const a = keys[i - 1];
    const b = keys[i];
    if (f <= b.f) {
      const t = interpolate(f, [a.f, b.f], [0, 1], { easing: EASE_CAM });
      return {
        f,
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
        z: a.z + (b.z - a.z) * t,
      };
    }
  }
  return keys[keys.length - 1];
};

export type Box = { x: number; y: number; w: number; h: number };

/**
 * Places a w×h screen inside `box`, fit to the box, then applies a
 * Screen-Studio style camera (look-at point + zoom).
 */
export const Framed: React.FC<{
  w: number;
  h: number;
  box: Box;
  cam?: Key[];
  children: React.ReactNode;
  style?: React.CSSProperties;
  damp?: boolean;
}> = ({ w, h, box, cam, children, style, damp }) => {
  const f = useCurrentFrame();
  const fit = Math.min(box.w / w, box.h / h);
  const raw = cam ? camAt(cam, f) : { x: w / 2, y: h / 2, z: 1 };
  // Portrait phone shots leave the top of frame for the super, so their
  // pushes are damped to keep the phone below it.
  const c = damp ? { x: w / 2 + (raw.x - w / 2) * 0.25, y: h / 2 + (raw.y - h / 2) * 0.25, z: 1 + (raw.z - 1) * 0.25 } : raw;
  const s = fit * c.z;
  return (
    <div
      style={{
        position: "absolute",
        left: box.x + box.w / 2 - c.x * s,
        top: box.y + box.h / 2 - c.y * s,
        width: w,
        height: h,
        transformOrigin: "0 0",
        scale: `${s}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Dark call layer with dimmed aurora that never stops drifting. */
export const DarkStage: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  return (
    <AbsoluteFill style={{ background: C.callLayer, overflow: "hidden" }}>
      <Blob t={t} color="#10c46e" size={900} x="62%" y="18%" o={0.16} dur={12} />
      <Blob t={t} color="#38bdf8" size={700} x="88%" y="80%" o={0.1} dur={14} reverse />
      <Blob t={t} color="#7df0b6" size={760} x="8%" y="92%" o={0.08} dur={11} />
      {children}
    </AbsoluteFill>
  );
};

/** Paper ground with the morning-water aurora. */
export const PaperStage: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  return (
    <AbsoluteFill style={{ background: C.paper, overflow: "hidden" }}>
      <Blob t={t} color={C.aurora1} size={1100} x="10%" y="0%" o={0.9} dur={12} />
      <Blob t={t} color={C.aurora2} size={1000} x="95%" y="10%" o={0.9} dur={13} reverse />
      <Blob t={t} color={C.aurora3} size={900} x="80%" y="105%" o={0.8} dur={12} />
      {children}
    </AbsoluteFill>
  );
};

const Blob: React.FC<{
  t: number;
  color: string;
  size: number;
  x: string;
  y: string;
  o: number;
  dur: number;
  reverse?: boolean;
}> = ({ t, color, size, x, y, o, dur, reverse }) => {
  const a = ambStyle("ccFloat", t, dur, 0, reverse);
  // Scale the brief's 22px drift up to stage size.
  const [dx, dy] = String(a.translate).split(" ").map((v) => parseFloat(v) * 3);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        borderRadius: "50%",
        background: color,
        filter: "blur(140px)",
        opacity: o,
        translate: `${dx}px ${dy}px`,
      }}
    />
  );
};

/** Device bezel around a 390×844 phone screen. */
export const PHONE_W = 390 + 24;
export const PHONE_H = 844 + 24;
export const Phone: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      width: PHONE_W,
      height: PHONE_H,
      padding: 12,
      borderRadius: 58,
      background: "linear-gradient(160deg,#26332c,#121a16)",
      boxShadow:
        "0 0 0 1.5px rgba(125,240,182,.18), 0 60px 120px -30px rgba(0,0,0,.7), 0 0 120px -20px rgba(16,196,110,.25)",
    }}
  >
    <div style={{ width: 390, height: 844, borderRadius: 46, overflow: "hidden", position: "relative" }}>
      {children}
    </div>
  </div>
);

/** Desktop window chrome around a 1280-wide screen. */
export const Desk: React.FC<{ w: number; h: number; children: React.ReactNode }> = ({ w, h, children }) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: 18,
      overflow: "hidden",
      position: "relative",
      boxShadow: "0 0 0 1px rgba(22,36,29,.08), 0 50px 100px -40px rgba(16,74,52,.45)",
    }}
  >
    {children}
  </div>
);

export const phoneBox = (vertical: boolean): Box =>
  vertical ? { x: 40, y: 430, w: 1000, h: 1430 } : { x: 860, y: 40, w: 800, h: 1000 };

export const deskBox = (vertical: boolean): Box =>
  vertical ? { x: 0, y: 0, w: 1080, h: 1920 } : { x: 100, y: 40, w: 1720, h: 1000 };
