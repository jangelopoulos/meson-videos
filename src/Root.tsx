import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { KYMA_DURATION, KYMA_FPS, KymaDemo } from "./kyma/KymaDemo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="KymaDemo"
        component={KymaDemo}
        durationInFrames={KYMA_DURATION}
        fps={KYMA_FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
