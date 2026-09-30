import React from "react";
import { AbsoluteFill, Easing, Img, staticFile, useCurrentFrame } from "remotion";
import { Laptop, Phone, Stage, laptopDims, phoneDims, projectPoint } from "../devices";
import { GoldDust, LightSweep, LuxBackdrop } from "../fx";
import { Chapter } from "../type";
import { GlassChip } from "../ui";
import { COLORS, EASE, EASE_IN, EASE_INOUT, EASE_POP, lerp, prog } from "../theme";

const LW = 1000;
const LCX = 1090;
const LCY = 440;
const PW = 270;

const CHIPS = [
  { label: "Title & permit verified", dot: COLORS.green, x: 640, y: 140, z: 260, at: 120 },
  { label: "€485,000 · Chania, Crete", dot: COLORS.goldLight, x: 1110, y: 64, z: 150, at: 128 },
  { label: "4.1% gross yield", dot: COLORS.green, x: 1570, y: 150, z: 320, at: 136 },
  { label: "Golden Visa eligible", dot: COLORS.gold, x: 330, y: 690, z: 240, at: 144 },
];

/** The laptop rises and opens, the phone swings in, and verified facts float off the screens. */
export const Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const d = laptopDims(LW);
  const pd = phoneDims(PW);

  const enter = prog(frame, 0, 72, EASE);
  const drift = prog(frame, 60, 140, Easing.inOut(Easing.sin));
  const lid = lerp(-86, 12, prog(frame, 24, 52, EASE_INOUT));
  const on = prog(frame, 72, 16, EASE_IN);
  const flash = frame >= 70 && frame <= 84 ? (1 - Math.abs(frame - 75) / 9) * 0.6 : 0;
  const scroll = lerp(0, 240, prog(frame, 110, 90, EASE_INOUT));
  const phoneIn = prog(frame, 80, 46, EASE);

  return (
    <AbsoluteFill>
      <LuxBackdrop />
      <GoldDust count={24} seed="reveal" opacity={0.6} />
      <Stage>
        <Laptop
          width={LW}
          lidAngle={lid}
          screenOn={on}
          style={{
            left: LCX - LW / 2,
            top: LCY - d.lidH / 2,
            transform: `translateY(${lerp(560, 0, enter)}px) translateZ(${lerp(-300, 0, enter)}px) rotateX(${lerp(-42, -15, enter)}deg) rotateY(${lerp(-36, -14, enter) + drift * 8}deg)`,
          }}
          screen={
            <>
              <Img
                src={staticFile("screens/4a-home-desktop.png")}
                style={{ position: "absolute", left: 0, top: -scroll, width: d.screenW }}
              />
              <LightSweep frame={frame} from={78} duration={34} />
              <AbsoluteFill style={{ backgroundColor: "#fff", opacity: flash }} />
            </>
          }
        />
        <Phone
          width={PW}
          src="screens/4a-home-mobile.png"
          style={{
            left: 1620 - pd.outerW / 2,
            top: 610 - pd.outerH / 2,
            transform: `translateX(${lerp(560, 0, phoneIn)}px) translateZ(170px) translateY(${Math.sin(frame / 28) * 8}px) rotateY(${lerp(-70, -22, phoneIn) + drift * 6}deg) rotateX(-4deg)`,
          }}
        >
          <LightSweep frame={frame} from={112} duration={30} />
        </Phone>
      </Stage>
      {CHIPS.map((c, i) => {
        const p = prog(frame, c.at, 18, EASE_POP);
        const pt = projectPoint(c.x, c.y + Math.sin((frame + i * 25) / 30) * 10, c.z, 2200, 960, 1080 * 0.45);
        return (
          <div
            key={c.label}
            style={{
              position: "absolute",
              left: pt.x,
              top: pt.y,
              opacity: prog(frame, c.at, 8),
              scale: String(pt.k * lerp(0.4, 1, p)),
            }}
          >
            <GlassChip dot={c.dot} style={{ translate: "-50% -50%" }}>
              {c.label}
            </GlassChip>
          </div>
        );
      })}
      <Chapter
        frame={frame}
        from={96}
        num="01"
        label="Discover"
        lines={["Greek property,", "checked before", "you see it."]}
        left={110}
        top={330}
        width={500}
        size={76}
      />
    </AbsoluteFill>
  );
};
