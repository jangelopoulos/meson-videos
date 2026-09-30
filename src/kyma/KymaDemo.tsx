import React from "react";
import { AbsoluteFill } from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Grain, Vignette } from "./fx";
import { CallBack } from "./scenes/CallBack";
import { Everywhere } from "./scenes/Everywhere";
import { Finale } from "./scenes/Finale";
import { Listing } from "./scenes/Listing";
import { MapGreece } from "./scenes/MapGreece";
import { Opening } from "./scenes/Opening";
import { Reveal } from "./scenes/Reveal";
import { Search } from "./scenes/Search";

export const KYMA_FPS = 30;

export const KYMA_SCENES = {
  opening: 170,
  reveal: 200,
  search: 255,
  map: 255,
  listing: 470,
  callback: 225,
  everywhere: 200,
  finale: 172,
};

export const KYMA_TRANSITION = 18;

export const KYMA_DURATION =
  Object.values(KYMA_SCENES).reduce((a, b) => a + b, 0) -
  (Object.keys(KYMA_SCENES).length - 1) * KYMA_TRANSITION;

/** Full cinematic product film for the Kyma property marketplace. */
export const KymaDemo: React.FC = () => {
  const cut = (
    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: KYMA_TRANSITION })}
    />
  );
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={KYMA_SCENES.opening} name="Opening">
          <Opening />
        </TransitionSeries.Sequence>
        {cut}
        <TransitionSeries.Sequence durationInFrames={KYMA_SCENES.reveal} name="Device reveal">
          <Reveal />
        </TransitionSeries.Sequence>
        {cut}
        <TransitionSeries.Sequence durationInFrames={KYMA_SCENES.search} name="Desktop search">
          <Search />
        </TransitionSeries.Sequence>
        {cut}
        <TransitionSeries.Sequence durationInFrames={KYMA_SCENES.map} name="3D market map">
          <MapGreece />
        </TransitionSeries.Sequence>
        {cut}
        <TransitionSeries.Sequence durationInFrames={KYMA_SCENES.listing} name="Listing, exploded">
          <Listing />
        </TransitionSeries.Sequence>
        {cut}
        <TransitionSeries.Sequence durationInFrames={KYMA_SCENES.callback} name="Call-back">
          <CallBack />
        </TransitionSeries.Sequence>
        {cut}
        <TransitionSeries.Sequence durationInFrames={KYMA_SCENES.everywhere} name="Every screen">
          <Everywhere />
        </TransitionSeries.Sequence>
        {cut}
        <TransitionSeries.Sequence durationInFrames={KYMA_SCENES.finale} name="Finale">
          <Finale />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Vignette strength={0.45} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
