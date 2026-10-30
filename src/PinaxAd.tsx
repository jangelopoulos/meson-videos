import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { beats, colors, shots, ShotId } from "./brand";
import {
  Barrage,
  Clusters,
  Freeze,
  Integration,
  Montage,
  NoTalk,
  Subscriptions,
} from "./scenes/Act1";
import { AiData, Chat, Chips, SameProblem } from "./scenes/Act2";
import {
  Answer,
  Benefit,
  Command,
  Lock,
  SecureBase,
  Vortex,
  ZoomWhite,
} from "./scenes/Act3";
import { Build, Cta, Wordmark } from "./scenes/Act4";
import { Soundtrack } from "./components/Soundtrack";

type ShotComponent = React.FC<{ dur: number }>;

const SHOTS: Record<ShotId, ShotComponent> = {
  subscriptions: Subscriptions,
  barrage: Barrage,
  freeze: Freeze,
  noTalk: NoTalk,
  clusters: Clusters,
  montage: Montage,
  integration: Integration,
  chips: Chips,
  chat: Chat,
  aiData: AiData,
  sameProblem: SameProblem,
  vortex: Vortex,
  lock: Lock,
  secureBase: SecureBase,
  zoomWhite: ZoomWhite,
  benefit0: (p) => <Benefit {...p} index={0} />,
  benefit1: (p) => <Benefit {...p} index={1} />,
  benefit2: (p) => <Benefit {...p} index={2} />,
  benefit3: (p) => <Benefit {...p} index={3} />,
  answer: Answer,
  command: Command,
  cta0: (p) => <Cta {...p} index={0} />,
  cta1: (p) => <Cta {...p} index={1} />,
  cta2: (p) => <Cta {...p} index={2} />,
  build: Build,
  wordmark: Wordmark,
};

/**
 * The Pinax ad: a beat-locked sequence of hard cuts. Shared by the landscape
 * and vertical compositions; shots switch layout on width/height.
 */
export const PinaxAd: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.black }}>
    <Soundtrack />
    <Series>
      {shots.map((s) => {
        const C = SHOTS[s.id];
        const dur = beats(s.beats);
        return (
          <Series.Sequence key={s.id} durationInFrames={dur} name={s.id}>
            <C dur={dur} />
          </Series.Sequence>
        );
      })}
    </Series>
  </AbsoluteFill>
);
