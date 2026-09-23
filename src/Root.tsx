import "./index.css";
import { Composition } from "remotion";
import { RapidClock, RapidClockVertical } from "./RapidClock";
import { LIFECYCLE_DURATION, RapidLifecycle } from "./lifecycle/RapidLifecycle";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="RapidClock"
        component={RapidClock}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="RapidClockVertical"
        component={RapidClockVertical}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="RapidLifecycle"
        component={RapidLifecycle}
        durationInFrames={LIFECYCLE_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
