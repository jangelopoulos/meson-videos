import React from "react";
import { AbsoluteFill } from "remotion";
import { Captions } from "./film/Captions";
import { Desktop } from "./film/Desktop";
import { EndCard } from "./film/EndCard";
import { Morph } from "./film/Morph";
import { PhoneFlow } from "./film/PhoneFlow";
import { GoldDust, Grain, LuxBackdrop, Vignette } from "./fx";

export { FILM_FRAMES as KYMA_DURATION } from "./film/layout";
export const KYMA_FPS = 30;

/**
 * 20-second product film. One continuous camera: search and pick a listing on the laptop,
 * the laptop screen becomes the phone, the app gets used, and the notification icon
 * becomes the logo.
 */
export const KymaDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <LuxBackdrop />
      <GoldDust count={22} seed="film" opacity={0.5} />
      <Desktop />
      <Morph />
      <PhoneFlow />
      <Captions />
      <EndCard />
      <Vignette strength={0.4} />
      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};
