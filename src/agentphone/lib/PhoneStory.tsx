import React from "react";
import { Easing, interpolate, Sequence, useVideoConfig } from "remotion";
import { prog } from "./anim";
import { DarkStage, Framed, Key, Phone, PHONE_H, PHONE_W, phoneBox, useVertical } from "./stage";
import { Pace, Shift, useT } from "./time";
import { Cam, stagePoint } from "./transition";
import { HANDSET } from "./Wordmark";
import { C } from "../theme";

export type Screen = {
  name: string;
  from: number; // story frame the screen slides in
  el: React.ReactNode;
  pace?: number;
  lead?: number; // screen-time head start, so it slides in with content on it
};

export const SLIDE = 14; // frames for one screen to push the last one off

/**
 * One phone that stays on stage while its screens change like app
 * navigation: the next screen pushes in from the right, the last one eases
 * off to the left. Optionally rises in at the start and folds into the
 * handset circle at the end.
 */
export const PhoneStory: React.FC<{
  screens: Screen[];
  len: number;
  cam: Key[];
  rise?: boolean;
  foldAt?: number;
  /** Stage overlays (e.g. the CRM logo grid) on the story clock. */
  children?: React.ReactNode;
}> = ({ screens, len, cam, rise = false, foldAt, children }) => {
  const f = useT();
  const v = useVertical();
  const r = rise ? prog(f, 0, 16, Easing.out(Easing.cubic)) : 1;
  const fold = foldAt === undefined ? 0 : prog(f, foldAt, len - foldAt, Easing.inOut(Easing.cubic));
  return (
    <DarkStage>
      <Framed w={PHONE_W} h={PHONE_H} box={phoneBox(v)} damp={v} cam={cam}>
        <div style={{ opacity: r * (1 - Math.min(1, fold * 2.2)), translate: `0px ${(1 - r) * 260}px` }}>
          <Phone>
            {screens.map((s, i) => {
              const next = screens[i + 1];
              const end = next ? next.from + SLIDE : len;
              return (
                <Sequence key={s.name} name={s.name} from={s.from} durationInFrames={end - s.from} layout="none">
                  <Slot entering={i > 0} exitAt={next ? next.from - s.from : undefined}>
                    <Pace scale={s.pace ?? 1}>
                      <Shift by={-(s.lead ?? 0)}>{s.el}</Shift>
                    </Pace>
                  </Slot>
                </Sequence>
              );
            })}
          </Phone>
        </div>
      </Framed>
      {children}
      {foldAt !== undefined && fold > 0 ? <Fold m={fold} cam={cam[cam.length - 1]} /> : null}
    </DarkStage>
  );
};

const Slot: React.FC<{ entering: boolean; exitAt?: number; children: React.ReactNode }> = ({
  entering,
  exitAt,
  children,
}) => {
  const f = useT();
  const ease = Easing.bezier(0.65, 0, 0.25, 1);
  const inP = entering ? prog(f, 0, SLIDE, ease) : 1;
  const outP = exitAt === undefined ? 0 : prog(f, exitAt, SLIDE, ease);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        translate: `${(1 - inP) * 100 - outP * 28}% 0px`,
        filter: outP > 0 ? `brightness(${1 - 0.25 * outP})` : undefined,
        boxShadow: entering && inP < 1 ? "-20px 0 40px rgba(12,20,16,.18)" : undefined,
      }}
    >
      {children}
    </div>
  );
};

/** The phone collapses into the handset circle at stage centre. */
const Fold: React.FC<{ m: number; cam: Cam }> = ({ m, cam }) => {
  const v = useVertical();
  const { width, height } = useVideoConfig();
  const [x0, y0] = stagePoint(v, "phone", [PHONE_W, PHONE_H], cam, [12, 12]);
  const [x1, y1] = stagePoint(v, "phone", [PHONE_W, PHONE_H], cam, [PHONE_W - 12, PHONE_H - 12]);
  const D = 140;
  const lerp = (a: number, b: number) => a + (b - a) * m;
  return (
    <div
      style={{
        position: "absolute",
        left: lerp(x0, width / 2 - D / 2),
        top: lerp(y0, height / 2 - D / 2),
        width: lerp(x1 - x0, D),
        height: lerp(y1 - y0, D),
        borderRadius: lerp(46 * ((x1 - x0) / 390), D / 2),
        background: `rgba(125,240,182,${Math.min(1, m * 2.2)})`,
        boxShadow: `0 0 ${D * 0.6}px rgba(125,240,182,.18)`,
      }}
    >
      <svg
        width={D}
        height={D}
        viewBox="0 0 40 40"
        style={{ position: "absolute", left: "50%", top: "50%", marginLeft: -D / 2, marginTop: -D / 2, opacity: interpolate(m, [0.7, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}
      >
        <path d={HANDSET} fill={C.callLayer} transform="translate(9.5 9.5) scale(.95)" />
      </svg>
    </div>
  );
};
