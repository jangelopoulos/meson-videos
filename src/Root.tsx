import "./index.css";
import { Composition, Folder } from "remotion";
import { MyComposition } from "./Composition";
import { KYMA_DURATION, KYMA_FPS, KYMA_SCENES, KymaDemo } from "./kyma/KymaDemo";
import { CallBack } from "./kyma/scenes/CallBack";
import { Everywhere } from "./kyma/scenes/Everywhere";
import { Finale } from "./kyma/scenes/Finale";
import { Listing } from "./kyma/scenes/Listing";
import { MapGreece } from "./kyma/scenes/MapGreece";
import { Opening } from "./kyma/scenes/Opening";
import { Reveal } from "./kyma/scenes/Reveal";
import { Search } from "./kyma/scenes/Search";

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
      <Folder name="KymaDemo-Scenes">
        <Composition id="KymaOpening" component={Opening} durationInFrames={KYMA_SCENES.opening} fps={KYMA_FPS} width={1920} height={1080} />
        <Composition id="KymaReveal" component={Reveal} durationInFrames={KYMA_SCENES.reveal} fps={KYMA_FPS} width={1920} height={1080} />
        <Composition id="KymaSearch" component={Search} durationInFrames={KYMA_SCENES.search} fps={KYMA_FPS} width={1920} height={1080} />
        <Composition id="KymaMap" component={MapGreece} durationInFrames={KYMA_SCENES.map} fps={KYMA_FPS} width={1920} height={1080} />
        <Composition id="KymaListing" component={Listing} durationInFrames={KYMA_SCENES.listing} fps={KYMA_FPS} width={1920} height={1080} />
        <Composition id="KymaCallBack" component={CallBack} durationInFrames={KYMA_SCENES.callback} fps={KYMA_FPS} width={1920} height={1080} />
        <Composition id="KymaEverywhere" component={Everywhere} durationInFrames={KYMA_SCENES.everywhere} fps={KYMA_FPS} width={1920} height={1080} />
        <Composition id="KymaFinale" component={Finale} durationInFrames={KYMA_SCENES.finale} fps={KYMA_FPS} width={1920} height={1080} />
      </Folder>
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
