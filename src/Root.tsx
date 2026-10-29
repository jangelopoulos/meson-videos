import "./index.css";
import { Composition } from "remotion";
import { FPS } from "./brand";
import { PinaxExplainer } from "./PinaxExplainer";
import { TOTAL_FRAMES } from "./timeline";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PinaxExplainer"
        component={PinaxExplainer}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="PinaxExplainerVertical"
        component={PinaxExplainer}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
