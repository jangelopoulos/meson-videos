import React, { createContext, useContext } from "react";
import { useCurrentFrame } from "remotion";

// Shot time. Screens and shots read beats through useT() instead of
// useCurrentFrame(), so one shot can be re-paced for the 60s cut without
// retiming every beat. Ambient motion (aurora, waveform, REC timer) stays on
// real frames.
const Ctx = createContext({ scale: 1, offset: 0 });

export const useT = () => {
  const f = useCurrentFrame();
  const { scale, offset } = useContext(Ctx);
  return f / scale - offset;
};

/** Plays the children `scale`× slower (2 = half speed). */
export const Pace: React.FC<{ scale: number; children: React.ReactNode }> = ({ scale, children }) => {
  const parent = useContext(Ctx);
  return <Ctx.Provider value={{ scale: parent.scale * scale, offset: parent.offset }}>{children}</Ctx.Provider>;
};

/** Starts the children's clock `by` shot-frames later. */
export const Shift: React.FC<{ by: number; children: React.ReactNode }> = ({ by, children }) => {
  const parent = useContext(Ctx);
  return <Ctx.Provider value={{ scale: parent.scale, offset: parent.offset + by }}>{children}</Ctx.Provider>;
};

/** Global frame offset, so the stage aurora drifts on across shot cuts. */
export const StageClock = createContext(0);

/**
 * Head start (shot frames) for a screen revealed by a transition: its content
 * is already filling in as it opens, while the camera still starts exactly
 * where the last shot ended.
 */
export const LeadCtx = createContext(0);

export const Lead: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lead = useContext(LeadCtx);
  return lead ? <Shift by={-lead}>{children}</Shift> : <>{children}</>;
};
