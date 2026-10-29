import { beats, motion, sec } from "../brand";
import { sceneStart } from "../timeline";

const RAMP = 45; // frames to reach full speed

/**
 * Centre-gear angle (deg) as a function of the *absolute* video frame, so the
 * mechanism turns continuously across scene cuts. Starts at rest and eases up
 * to a steady `motion.gearSpeed`.
 */
export const mechanismAngle = (absoluteFrame: number) => {
  const t = absoluteFrame - (sceneStart.connect + sec(beats.connect.spin));
  if (t <= 0) return 0;
  if (t < RAMP) return (motion.gearSpeed * t * t) / (2 * RAMP);
  return motion.gearSpeed * (t - RAMP / 2);
};
