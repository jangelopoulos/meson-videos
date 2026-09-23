import "./index.css";
import { Composition } from "remotion";
import { RapidClock, RapidClockVertical } from "./RapidClock";

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
    </>
  );
};
