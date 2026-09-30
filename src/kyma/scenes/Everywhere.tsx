import React from "react";
import { AbsoluteFill, Easing, Img, staticFile, useCurrentFrame } from "remotion";
import { Laptop, Phone, Stage, laptopDims, phoneDims, projectPoint } from "../devices";
import { GoldDust, LightSweep, LuxBackdrop } from "../fx";
import { Chapter } from "../type";
import { GlassChip } from "../ui";
import { COLORS, EASE, EASE_POP, lerp, prog } from "../theme";

const LW = 860;
const PW = 230;

const CHIPS = [
  { label: "EN · €", x: -260, y: -330, z: 260, at: 50, dot: COLORS.goldLight },
  { label: "AUD · USD · GBP", x: 360, y: -300, z: 180, at: 58, dot: COLORS.gold },
  { label: "Verified listings", x: -700, y: -340, z: 120, at: 66, dot: COLORS.green },
  { label: "Golden Visa ready", x: 720, y: -210, z: -40, at: 74, dot: COLORS.gold },
];

/** A slow orbit around the full product family on a glossy floor. */
export const Everywhere: React.FC = () => {
  const frame = useCurrentFrame();
  const d = laptopDims(LW);
  const pd = phoneDims(PW);
  const enter = prog(frame, 0, 44, EASE);
  const spin = lerp(-18, 18, prog(frame, 0, 200, Easing.inOut(Easing.sin)));
  const floorY = d.lidH / 2;
  const tz = lerp(-520, 0, enter);

  const phone = (x: number, z: number, rot: number, src: string, delay: number) => (
    <Phone
      width={PW}
      src={src}
      reflect
      style={{
        left: x - pd.outerW / 2,
        top: floorY - pd.outerH,
        opacity: prog(frame, delay, 12),
        transform: `translateZ(${z}px) translateY(${lerp(120, 0, prog(frame, delay, 36, EASE)) + Math.sin((frame + delay) / 30) * 6}px) rotateY(${rot}deg)`,
      }}
    >
      <LightSweep frame={frame} from={delay + 40} duration={32} />
    </Phone>
  );

  return (
    <AbsoluteFill>
      <LuxBackdrop />
      <GoldDust count={22} seed="every" opacity={0.55} />
      <Stage perspective={2400} origin="50% 40%">
        <div
          style={{
            position: "absolute",
            left: 960,
            top: 590,
            width: 0,
            height: 0,
            transformStyle: "preserve-3d",
            transform: `translateZ(${tz}px) rotateX(-8deg) rotateY(${spin}deg)`,
          }}
        >
          {/* Glossy floor */}
          <div
            style={{
              position: "absolute",
              left: -1400,
              top: floorY,
              width: 2800,
              height: 1800,
              transformOrigin: "top center",
              transform: "rotateX(90deg) translateY(-700px)",
              background:
                "radial-gradient(ellipse 50% 45% at 50% 40%, rgba(200,165,106,0.22) 0%, rgba(30,91,133,0.12) 45%, rgba(0,0,0,0) 75%)",
            }}
          />
          <Laptop
            width={LW}
            lidAngle={10}
            style={{
              left: -LW / 2,
              top: -d.lidH / 2,
            }}
            screen={
              <>
                <Img src={staticFile("screens/4b-home-desktop.png")} style={{ position: "absolute", left: 0, top: 0, width: d.screenW }} />
                <LightSweep frame={frame} from={30} duration={34} />
              </>
            }
          />
          {phone(-380, -440, 12, "screens/4b-home-mobile.png", 24)}
          {phone(-590, 230, 22, "screens/4a-home-mobile.png", 10)}
          {phone(590, 230, -22, "screens/listing-mobile.png", 16)}
        </div>
      </Stage>
      {CHIPS.map((c, i) => {
        const p = prog(frame, c.at, 18, EASE_POP);
        // Same transform as the group: translateZ(tz) rotateX(-8deg) rotateY(spin)
        const ay = (spin * Math.PI) / 180;
        const ax = (-8 * Math.PI) / 180;
        const y0 = c.y + Math.sin((frame + i * 20) / 28) * 10;
        const x1 = c.x * Math.cos(ay) + c.z * Math.sin(ay);
        const z1 = -c.x * Math.sin(ay) + c.z * Math.cos(ay);
        const y2 = y0 * Math.cos(ax) - z1 * Math.sin(ax);
        const z2 = y0 * Math.sin(ax) + z1 * Math.cos(ax) + tz;
        const pt = projectPoint(960 + x1, 590 + y2, z2, 2400, 960, 1080 * 0.4);
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
        from={8}
        num="05"
        label="Everywhere"
        lines={["One experience.", "Every screen."]}
        left={0}
        top={56}
        width={1920}
        size={64}
        align="center"
      />
    </AbsoluteFill>
  );
};
