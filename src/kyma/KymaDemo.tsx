import React from "react";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Home } from "./scenes/Home";
import { Intro } from "./scenes/Intro";
import { Listing } from "./scenes/Listing";
import { MapSearch } from "./scenes/MapSearch";
import { Mobile } from "./scenes/Mobile";
import { Outro } from "./scenes/Outro";
import { Summary } from "./scenes/Summary";

export const KYMA_FPS = 30;

export const KYMA_SCENES = {
  intro: 105,
  home: 270,
  map: 240,
  listing: 520,
  mobile: 300,
  summary: 210,
  outro: 120,
};

export const KYMA_TRANSITION = 15;

export const KYMA_DURATION =
  Object.values(KYMA_SCENES).reduce((a, b) => a + b, 0) -
  (Object.keys(KYMA_SCENES).length - 1) * KYMA_TRANSITION;

/** Full product walkthrough for the Kyma property marketplace. */
export const KymaDemo: React.FC = () => {
  const cut = (
    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: KYMA_TRANSITION })}
    />
  );
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={KYMA_SCENES.intro} name="Intro">
        <Intro />
      </TransitionSeries.Sequence>
      {cut}
      <TransitionSeries.Sequence durationInFrames={KYMA_SCENES.home} name="Desktop home">
        <Home />
      </TransitionSeries.Sequence>
      {cut}
      <TransitionSeries.Sequence durationInFrames={KYMA_SCENES.map} name="Map search">
        <MapSearch />
      </TransitionSeries.Sequence>
      {cut}
      <TransitionSeries.Sequence durationInFrames={KYMA_SCENES.listing} name="Listing">
        <Listing />
      </TransitionSeries.Sequence>
      {cut}
      <TransitionSeries.Sequence durationInFrames={KYMA_SCENES.mobile} name="Mobile">
        <Mobile />
      </TransitionSeries.Sequence>
      {cut}
      <TransitionSeries.Sequence durationInFrames={KYMA_SCENES.summary} name="Summary">
        <Summary />
      </TransitionSeries.Sequence>
      {cut}
      <TransitionSeries.Sequence durationInFrames={KYMA_SCENES.outro} name="Outro">
        <Outro />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
