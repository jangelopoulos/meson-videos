import "./index.css";
import { Composition, Folder } from "remotion";
import { AgentPhoneIntro, IntroProps } from "./agentphone/Intro";
import { fontsReady } from "./agentphone/lib/fonts";
import { AfterShot } from "./agentphone/shots/After";
import { CloseShot } from "./agentphone/shots/Close";
import { DashboardShot } from "./agentphone/shots/Dashboard";
import { DesktopShot } from "./agentphone/shots/Desktop";
import { IncomingShot } from "./agentphone/shots/Incoming";
import { InsightsShot } from "./agentphone/shots/Insights";
import { LiveShot } from "./agentphone/shots/Live";
import { LogoShot } from "./agentphone/shots/Logo";
import { RoutingShot } from "./agentphone/shots/Routing";
import { ScoreShot } from "./agentphone/shots/Score";

void fontsReady;

const props: IntroProps = {
  muted: false,
  url: "agentphone.com.au",
  voiceover: null,
  music: null,
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="AgentPhone">
        <Composition id="AgentPhone-Intro" component={AgentPhoneIntro} durationInFrames={900} fps={30} width={1920} height={1080} defaultProps={props} />
        <Composition id="AgentPhone-Intro-Muted" component={AgentPhoneIntro} durationInFrames={900} fps={30} width={1920} height={1080} defaultProps={{ ...props, muted: true }} />
        <Composition id="AgentPhone-Intro-Vertical" component={AgentPhoneIntro} durationInFrames={900} fps={30} width={1080} height={1920} defaultProps={props} />
        <Composition id="AgentPhone-Intro-Vertical-Muted" component={AgentPhoneIntro} durationInFrames={900} fps={30} width={1080} height={1920} defaultProps={{ ...props, muted: true }} />
      </Folder>
      <Folder name="AgentPhone-Shots">
        <Composition id="Shot-Logo" component={LogoShot} durationInFrames={87} fps={30} width={1920} height={1080} />
        <Composition id="Shot-Incoming" component={IncomingShot} durationInFrames={58} fps={30} width={1920} height={1080} />
        <Composition id="Shot-Live" component={LiveShot} durationInFrames={58} fps={30} width={1920} height={1080} />
        <Composition id="Shot-After" component={AfterShot} durationInFrames={131} fps={30} width={1920} height={1080} />
        <Composition id="Shot-Desktop" component={DesktopShot} durationInFrames={174} fps={30} width={1920} height={1080} />
        <Composition id="Shot-Routing" component={RoutingShot} durationInFrames={116} fps={30} width={1920} height={1080} />
        <Composition id="Shot-Score" component={ScoreShot} durationInFrames={58} fps={30} width={1920} height={1080} />
        <Composition id="Shot-Insights" component={InsightsShot} durationInFrames={73} fps={30} width={1920} height={1080} />
        <Composition id="Shot-Dashboard" component={DashboardShot} durationInFrames={87} fps={30} width={1920} height={1080} />
        <Composition id="Shot-Close" component={CloseShot} durationInFrames={58} fps={30} width={1920} height={1080} defaultProps={{ url: props.url }} />
      </Folder>
    </>
  );
};
