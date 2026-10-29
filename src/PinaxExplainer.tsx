import React from "react";
import { AbsoluteFill, Easing } from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { colors } from "./brand";
import { AiAtWork } from "./scenes/AiAtWork";
import { Connect } from "./scenes/Connect";
import { Cost } from "./scenes/Cost";
import { Hook } from "./scenes/Hook";
import { MakeItStick } from "./scenes/MakeItStick";
import { Outro } from "./scenes/Outro";
import { Problem } from "./scenes/Problem";
import { sceneFrames, transitionFrames } from "./timeline";

// import { Audio } from "@remotion/media";
// import { staticFile } from "remotion";

const fadeTiming = linearTiming({
  durationInFrames: transitionFrames.fade,
  easing: Easing.inOut(Easing.cubic),
});

/**
 * The Pinax explainer. Shared by the landscape and vertical compositions;
 * scenes adapt their layout to the video's width and height.
 */
export const PinaxExplainer: React.FC = () => {
  const f = sceneFrames;
  return (
    <AbsoluteFill style={{ backgroundColor: colors.black }}>
      {/* Background music, when ready (npx remotion add @remotion/media):
      <Audio src={staticFile("audio/pinax-bed.mp3")} volume={0.6} />
      */}
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={f.hook}>
          <Hook duration={f.hook} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={fadeTiming}
        />
        <TransitionSeries.Sequence durationInFrames={f.problem}>
          <Problem duration={f.problem} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence durationInFrames={f.cost}>
          <Cost duration={f.cost} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={fadeTiming}
        />
        <TransitionSeries.Sequence durationInFrames={f.connect}>
          <Connect duration={f.connect} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence durationInFrames={f.ai}>
          <AiAtWork duration={f.ai} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence durationInFrames={f.stick}>
          <MakeItStick duration={f.stick} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence durationInFrames={f.outro}>
          <Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
