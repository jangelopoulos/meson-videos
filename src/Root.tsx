import "./index.css";
import { Composition, Folder } from "remotion";
import { FPS, TOTAL_FRAMES } from "./brand";
import { PinaxAd } from "./PinaxAd";
import { FPS as EXPLAINER_FPS } from "./explainer/brand";
import { PinaxExplainer } from "./explainer/PinaxExplainer";
import { TOTAL_FRAMES as EXPLAINER_FRAMES } from "./explainer/timeline";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PinaxAd"
        component={PinaxAd}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="PinaxAdVertical"
        component={PinaxAd}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Folder name="Explainer">
        <Composition
          id="PinaxExplainer"
          component={PinaxExplainer}
          durationInFrames={EXPLAINER_FRAMES}
          fps={EXPLAINER_FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="PinaxExplainerVertical"
          component={PinaxExplainer}
          durationInFrames={EXPLAINER_FRAMES}
          fps={EXPLAINER_FPS}
          width={1080}
          height={1920}
        />
      </Folder>
    </>
  );
};
