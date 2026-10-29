import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { beats, colors, copy, fonts } from "../brand";
import { KineticHeadline } from "../components/KineticHeadline";
import { PinaxWordmark } from "../components/PinaxWordmark";
import { clamp } from "../lib/anim";
import { useLayout } from "../lib/layout";
import { Center, Shot } from "./Shot";

type ShotProps = { dur: number };

// ---------------------------------------------------------------------------
// 18. "One system." / "Your data." / "AI that works for you."
// ---------------------------------------------------------------------------
export const Cta: React.FC<ShotProps & { index: number }> = ({
  dur,
  index,
}) => {
  const L = useLayout();
  const line = copy.cta[index];
  return (
    <Shot>
      <Center style={{ padding: `0 ${L.marginX}px` }}>
        <KineticHeadline
          lines={[line.text]}
          highlight={"highlight" in line ? line.highlight : undefined}
          fontSize={L.vertical ? L.t.headline : 190}
          exitFrame={dur - 7}
          style={{ maxWidth: L.textWidth }}
        />
      </Center>
    </Shot>
  );
};

// ---------------------------------------------------------------------------
// 19. "We'll build it for you."
// ---------------------------------------------------------------------------
export const Build: React.FC<ShotProps> = ({ dur }) => {
  const L = useLayout();
  return (
    <Shot>
      <Center style={{ padding: `0 ${L.marginX}px` }}>
        <KineticHeadline
          lines={[copy.build]}
          fontSize={L.t.headline}
          exitFrame={dur - 7}
          style={{ maxWidth: L.textWidth }}
        />
      </Center>
    </Shot>
  );
};

// ---------------------------------------------------------------------------
// 20. The wordmark: the one gentle ease and full hold.
// ---------------------------------------------------------------------------
export const Wordmark: React.FC<ShotProps> = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const easeOut = (from: number, to: number) =>
    interpolate(frame, [from, to], [0, 1], {
      ...clamp,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  const mark = easeOut(2, 26);
  const url = easeOut(beats(3), beats(3) + 14);
  return (
    <Shot push={0.02}>
      <Center style={{ flexDirection: "column", padding: `0 ${L.marginX}px` }}>
        <div
          style={{
            opacity: mark,
            scale: String(1.06 - 0.06 * mark),
            filter: mark < 1 ? `blur(${(1 - mark) * 26}px)` : undefined,
          }}
        >
          <PinaxWordmark size={L.vertical ? 280 : 300} color={colors.white} />
        </div>
        <KineticHeadline
          lines={[copy.tagline.text]}
          highlight={copy.tagline.highlight}
          font="body"
          weight={500}
          fontSize={L.vertical ? 72 : 64}
          delay={beats(1.5)}
          lineHeight={1.15}
          style={{ marginTop: 34, maxWidth: L.vertical ? 880 : 1600 }}
        />
        <div
          style={{
            marginTop: L.vertical ? 70 : 56,
            fontFamily: fonts.mono,
            fontSize: L.t.mono,
            letterSpacing: "0.24em",
            color: colors.grey,
            opacity: url,
            translate: `0 ${(1 - url) * 10}px`,
            filter: url < 1 ? `blur(${(1 - url) * 8}px)` : undefined,
          }}
        >
          {copy.url}
        </div>
      </Center>
    </Shot>
  );
};
