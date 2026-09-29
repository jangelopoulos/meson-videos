import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { Backdrop } from "../Backdrop";
import { Caption } from "../Caption";
import { COLORS, EASE, EASE_IN, fadeIn, fadeOut, kf } from "../theme";

// Phone screenshots are 804x1748, shown at 900px tall.
const PH = 900;
const K = PH / 1748;
const PW = 804 * K;
const CENTER_X = 960 - PW / 2;
const TOP = 90;

const Tap: React.FC<{ frame: number; at: number; x: number; y: number }> = ({
  frame,
  at,
  x,
  y,
}) => {
  if (frame < at - 6 || frame > at + 26) {
    return null;
  }
  const press = frame < at ? (frame - (at - 6)) / 6 : 1;
  const t = Math.max(0, (frame - at) / 26);
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: x - 40,
          top: y - 40,
          width: 80,
          height: 80,
          borderRadius: 40,
          border: `3px solid ${COLORS.blue}`,
          scale: String(0.3 + t * 1.2),
          opacity: frame < at ? 0 : 1 - t,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: x - 22,
          top: y - 22,
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: "rgba(59,79,228,0.35)",
          border: "2px solid rgba(255,255,255,0.9)",
          scale: String(press * (1 - t * 0.5)),
          opacity: press * (1 - t),
        }}
      />
    </>
  );
};

const PhoneImage: React.FC<{ src: string; opacity: number; scale?: number }> = ({
  src,
  opacity,
  scale = 1,
}) => (
  <Img
    src={staticFile(src)}
    style={{
      position: "absolute",
      left: 0,
      top: 0,
      width: PW,
      height: PH,
      opacity,
      scale: String(scale),
      filter: "drop-shadow(0 40px 70px rgba(0,0,0,0.5))",
    }}
  />
);

/** Mobile flow: home → search/map → listing, then all three screens together. */
export const Mobile: React.FC = () => {
  const frame = useCurrentFrame();

  // Centre phone screen switching.
  const homeO = fadeOut(frame, 80, 14);
  const mapO = Math.min(fadeIn(frame, 80, 14), fadeOut(frame, 175, 14));
  const listO = fadeIn(frame, 175, 14);

  const rise = (1 - EASE_IN(Math.min(1, frame / 28))) * 90;

  // Final beat: siblings fan out.
  const fan = kf(frame, [
    { at: 250, value: 0 },
    { at: 290, value: 1 },
  ]);

  return (
    <Backdrop>
      {/* Left phone: home */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X - 470,
          top: TOP + 40,
          width: PW,
          height: PH,
          opacity: fan,
          translate: `${(1 - fan) * -160}px 0px`,
          scale: String(0.92),
        }}
      >
        <PhoneImage src="screens/4a-home-mobile.png" opacity={1} />
      </div>

      {/* Right phone: map */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X + 470,
          top: TOP + 40,
          width: PW,
          height: PH,
          opacity: fan,
          translate: `${(1 - fan) * 160}px 0px`,
          scale: String(0.92),
        }}
      >
        <PhoneImage src="screens/4b-home-mobile.png" opacity={1} />
      </div>

      {/* Centre phone */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X,
          top: TOP,
          width: PW,
          height: PH,
          opacity: fadeIn(frame, 0, 20),
          translate: `0px ${rise}px`,
        }}
      >
        <PhoneImage src="screens/4a-home-mobile.png" opacity={homeO} />
        <PhoneImage src="screens/4b-home-mobile.png" opacity={mapO} scale={1 + (1 - Math.min(1, EASE((frame - 80) / 20))) * 0.03} />
        <PhoneImage src="screens/listing-mobile.png" opacity={listO} scale={1 + (1 - Math.min(1, EASE((frame - 175) / 20))) * 0.03} />

        <Tap frame={frame} at={68} x={402 * K} y={820 * K} />
        <Tap frame={frame} at={163} x={240 * K} y={1530 * K} />
      </div>

      <Caption frame={frame} from={22} until={72}>
        The same experience on mobile, wherever you&apos;re buying from
      </Caption>
      <Caption frame={frame} from={98} until={160}>
        Map, filters and verified homes in your pocket
      </Caption>
      <Caption frame={frame} from={194} until={246} accent={COLORS.green}>
        Legal checks, yields and costs, one thumb-scroll away
      </Caption>
      <Caption frame={frame} from={262} until={300} accent={COLORS.blue}>
        One design, every screen
      </Caption>
    </Backdrop>
  );
};
