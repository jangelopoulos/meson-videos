import "./index.css";
import { Composition, Folder } from "remotion";
import { AgentPhoneIntro, IntroProps } from "./agentphone/Intro";
import { AgentPhoneIntro60, AgentPhoneSocial60, DURATION_60, Intro60Props, SOCIAL_FROM } from "./agentphone/Intro60";
import { ColdOpenShot } from "./agentphone/shots/ColdOpen";
import { DialerShot } from "./agentphone/shots/Dialer";
import { MappingShot } from "./agentphone/shots/Mapping";
import { MessagesShot } from "./agentphone/shots/Messages";
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

const props60: Intro60Props = {
  supers: "vo",
  url: "agentphone.com.au",
  voiceover: true,
  music: true,
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
      <Folder name="AgentPhone-60">
        <Composition id="AgentPhone-60" component={AgentPhoneIntro60} durationInFrames={DURATION_60} fps={30} width={1920} height={1080} defaultProps={props60} />
        <Composition id="AgentPhone-60-NoSupers" component={AgentPhoneIntro60} durationInFrames={DURATION_60} fps={30} width={1920} height={1080} defaultProps={{ ...props60, supers: "none" as const, voiceover: false }} />
        <Composition id="AgentPhone-60-Muted" component={AgentPhoneIntro60} durationInFrames={DURATION_60} fps={30} width={1920} height={1080} defaultProps={{ ...props60, supers: "muted" as const }} />
        <Composition id="AgentPhone-60-Vertical" component={AgentPhoneIntro60} durationInFrames={DURATION_60} fps={30} width={1080} height={1920} defaultProps={props60} />
        <Composition id="AgentPhone-Social-Vertical" component={AgentPhoneSocial60} durationInFrames={DURATION_60 - SOCIAL_FROM} fps={30} width={1080} height={1920} defaultProps={{ ...props60, from: SOCIAL_FROM }} />
      </Folder>
      <Folder name="AgentPhone-Shots">
        <Composition id="Shot-ColdOpen" component={ColdOpenShot} durationInFrames={189} fps={30} width={1920} height={1080} />
        <Composition id="Shot-Dialer" component={DialerShot} durationInFrames={131} fps={30} width={1920} height={1080} />
        <Composition id="Shot-Messages" component={MessagesShot} durationInFrames={116} fps={30} width={1920} height={1080} />
        <Composition id="Shot-Mapping" component={MappingShot} durationInFrames={116} fps={30} width={1920} height={1080} />
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
