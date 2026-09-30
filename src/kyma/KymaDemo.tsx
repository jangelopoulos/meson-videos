import React from "react";
import { AbsoluteFill } from "remotion";
import { Captions } from "./film/Captions";
import { Desktop } from "./film/Desktop";
import { EndCard } from "./film/EndCard";
import { FlyingPhoto, PhoneFlow } from "./film/PhoneFlow";
import { GoldDust, Grain, LuxBackdrop, Vignette } from "./fx";

export { FILM_FRAMES as KYMA_DURATION } from "./film/layout";
export const KYMA_FPS = 30;

/**
 * 20-second product film. One continuous camera: open on the aerial photo, pull back to the
 * site on a laptop, search and pick a listing, carry its photo into the phone, use the app,
 * and let the notification icon become the logo.
 */
export const KymaDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <LuxBackdrop />
      <GoldDust count={22} seed="film" opacity={0.5} />
      <Desktop />
      <PhoneFlow />
      <FlyingPhoto />
      <Captions />
      <EndCard />
      <Vignette strength={0.4} />
      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};
