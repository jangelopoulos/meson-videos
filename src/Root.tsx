import "./index.css";
import { Composition, Folder } from "remotion";
import { MyComposition } from "./Composition";
import { KYMA_DURATION, KYMA_FPS, KYMA_SCENES, KymaDemo } from "./kyma/KymaDemo";
import { Home } from "./kyma/scenes/Home";
import { Intro } from "./kyma/scenes/Intro";
import { Listing } from "./kyma/scenes/Listing";
import { MapSearch } from "./kyma/scenes/MapSearch";
import { Mobile } from "./kyma/scenes/Mobile";
import { Outro } from "./kyma/scenes/Outro";
import { Summary } from "./kyma/scenes/Summary";

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
        <Composition id="KymaIntro" component={Intro} durationInFrames={KYMA_SCENES.intro} fps={KYMA_FPS} width={1920} height={1080} />
        <Composition id="KymaHome" component={Home} durationInFrames={KYMA_SCENES.home} fps={KYMA_FPS} width={1920} height={1080} />
        <Composition id="KymaMapSearch" component={MapSearch} durationInFrames={KYMA_SCENES.map} fps={KYMA_FPS} width={1920} height={1080} />
        <Composition id="KymaListing" component={Listing} durationInFrames={KYMA_SCENES.listing} fps={KYMA_FPS} width={1920} height={1080} />
        <Composition id="KymaMobile" component={Mobile} durationInFrames={KYMA_SCENES.mobile} fps={KYMA_FPS} width={1920} height={1080} />
        <Composition id="KymaSummary" component={Summary} durationInFrames={KYMA_SCENES.summary} fps={KYMA_FPS} width={1920} height={1080} />
        <Composition id="KymaOutro" component={Outro} durationInFrames={KYMA_SCENES.outro} fps={KYMA_FPS} width={1920} height={1080} />
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
