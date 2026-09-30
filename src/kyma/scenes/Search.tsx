import React from "react";
import { AbsoluteFill, Easing, Img, staticFile, useCurrentFrame } from "remotion";
import { Cursor } from "../Cursor";
import { Laptop, Stage, laptopDims } from "../devices";
import { GoldDust, LightSweep, LuxBackdrop } from "../fx";
import { Chapter } from "../type";
import { GlassChip } from "../ui";
import { COLORS, EASE, EASE_INOUT, EASE_POP, SANS, kf, lerp, prog } from "../theme";

const LW = 1180;
const LCX = 1050;
const LCY = 500;
const SCROLL_TO = 1850;
const TYPED = "Crete, Athens, Paros…";

// Positions in original screenshot pixels (2560 wide).
const FILTERS = [
  { label: "Crete · Athens · Paros", x: 700, y: 760, at: 50, dot: COLORS.goldLight },
  { label: "Golden Visa eligible", x: 831, y: 887, at: 58, dot: COLORS.gold },
  { label: "Verified only", x: 1765, y: 887, at: 84, dot: COLORS.green },
];
const CARD_X = [64, 680, 1297, 1913];
const CARD_Y = 2055;

/**
 * Desktop search: type a location, tap goal chips (which lift off the glass into a
 * floating filter stack), search, then the verified listing cards rise out of the screen.
 */
export const Search: React.FC = () => {
  const frame = useCurrentFrame();
  const d = laptopDims(LW);
  const K = d.screenW / 2560;

  const scroll = kf(
    frame,
    [
      { at: 124, value: 0 },
      { at: 168, value: SCROLL_TO },
    ],
    EASE_INOUT,
  );
  const enter = prog(frame, 0, 40, EASE);
  const orbit = prog(frame, 0, 255, Easing.inOut(Easing.sin));
  const chars = Math.floor(prog(frame, 22, 26, (t) => t) * TYPED.length);
  const caret = Math.floor(frame / 8) % 2 === 0;
  const dim = prog(frame, 178, 20) * 0.5;

  return (
    <AbsoluteFill>
      <LuxBackdrop />
      <GoldDust count={18} seed="search" opacity={0.5} />
      <Stage>
        <Laptop
          width={LW}
          lidAngle={10}
          style={{
            left: LCX - LW / 2,
            top: LCY - d.lidH / 2,
            transform: `translateZ(${lerp(-260, 0, enter)}px) rotateX(-12deg) rotateY(${lerp(-15, -4, orbit)}deg)`,
          }}
          screen={
            <>
              <div style={{ position: "absolute", left: 0, top: -scroll * K, width: d.screenW }}>
                <Img src={staticFile("screens/4a-home-desktop.png")} style={{ width: d.screenW, display: "block" }} />
                {frame < 50 ? (
                  <div
                    style={{
                      position: "absolute",
                      left: 448 * K,
                      top: 736 * K,
                      width: 330 * K,
                      height: 44 * K,
                      backgroundColor: COLORS.white,
                      fontFamily: SANS,
                      fontWeight: 600,
                      fontSize: 27 * K,
                      lineHeight: `${44 * K}px`,
                      color: COLORS.ink,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {TYPED.slice(0, chars)}
                    {frame > 18 && caret ? (
                      <span style={{ display: "inline-block", width: 1.5, height: 28 * K, marginLeft: 1, backgroundColor: COLORS.ink, verticalAlign: "middle" }} />
                    ) : null}
                  </div>
                ) : null}
              </div>
              <AbsoluteFill style={{ backgroundColor: COLORS.navy, opacity: dim }} />
              <Cursor
                frame={frame}
                keys={[
                  { at: 6, x: 620, y: 560 },
                  { at: 18, x: 700 * K, y: 760 * K },
                  { at: 52, x: 831 * K, y: 887 * K },
                  { at: 78, x: 1765 * K, y: 887 * K },
                  { at: 104, x: 2045 * K, y: 741 * K },
                  { at: 150, x: 600, y: 520 },
                  { at: 178, x: 355 * K, y: (2367 - SCROLL_TO) * K },
                ]}
                clicks={[20, 58, 84, 110]}
                hideAfter={196}
              />
            </>
          }
          popout={
            <>
              {FILTERS.map((f, i) => {
                if (frame < f.at) {
                  return null;
                }
                const p1 = prog(frame, f.at, 14, EASE);
                const p2 = prog(frame, f.at + 10, 26, EASE_INOUT);
                const out = prog(frame, 176, 16);
                const x = lerp(f.x * K, d.screenW - 190, p2);
                const y = lerp(f.y * K, 60 + i * 64, p2);
                const z = lerp(0, 110, p1) + p2 * 70;
                return (
                  <div
                    key={f.label}
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      opacity: (1 - out) * prog(frame, f.at, 6),
                      transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${lerp(0.55, 1, p1)})`,
                    }}
                  >
                    <GlassChip dot={f.dot} size={22} style={{ translate: "-50% -50%" }}>
                      {f.label}
                    </GlassChip>
                  </div>
                );
              })}
              {CARD_X.map((cx, i) => {
                const start = 180 + i * 7;
                if (frame < start) {
                  return null;
                }
                const p = prog(frame, start, 30, EASE);
                const pop = prog(frame, start, 30, EASE_POP);
                const w = 582 * K;
                const h = 625 * K;
                const float = Math.sin((frame + i * 12) / 20) * 5 * p;
                return (
                  <div
                    key={cx}
                    style={{
                      position: "absolute",
                      left: cx * K,
                      top: (CARD_Y - SCROLL_TO) * K,
                      width: w,
                      height: h,
                      borderRadius: 12,
                      overflow: "hidden",
                      boxShadow: `0 ${34 * p}px ${70 * p}px rgba(0,0,0,${0.5 * p}), 0 0 0 ${2 * p}px rgba(232,211,166,${0.75 * p})`,
                      transform: `translate3d(0px, ${-36 * p + float}px, ${(150 + i * 26) * p}px) rotateX(${-8 * p}deg) rotateZ(${(i - 1.5) * 2.2 * p}deg) scale(${1 + 0.05 * pop})`,
                    }}
                  >
                    <Img src={staticFile(`kyma/ui/card${i + 1}.png`)} style={{ width: w, height: h, display: "block" }} />
                    <LightSweep frame={frame} from={start + 14} duration={26} />
                  </div>
                );
              })}
            </>
          }
        />
      </Stage>
      <Chapter
        frame={frame}
        from={6}
        until={140}
        num="02"
        label="Search"
        lines={["Start with", "what you're", "buying for."]}
        left={80}
        top={310}
        width={400}
        size={64}
      />
      <Chapter
        frame={frame}
        from={172}
        num="02"
        label="Verified homes"
        lines={["Real yields.", "Clean titles.", "Visa answers."]}
        left={80}
        top={310}
        width={400}
        size={64}
      />
    </AbsoluteFill>
  );
};
