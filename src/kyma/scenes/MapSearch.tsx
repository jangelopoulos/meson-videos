import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { Backdrop } from "../Backdrop";
import { BROWSER, BrowserFrame } from "../BrowserFrame";
import { Camera } from "../Camera";
import { Caption } from "../Caption";
import { Cursor } from "../Cursor";
import { Outline } from "../Spotlight";
import { COLORS, fadeIn, kf } from "../theme";

const K = 1600 / 2560;
const CX = BROWSER.left;
const CY = BROWSER.top + BROWSER.chrome;

// Map pin anchor points in screenshot pixels.
const PINS: { name: string; x: number; y: number; at: number }[] = [
  { name: "Halkidiki", x: 1853, y: 420, at: 118 },
  { name: "Corfu", x: 1486, y: 790, at: 126 },
  { name: "Athens", x: 1754, y: 860, at: 134 },
  { name: "Paros", x: 2022, y: 1075, at: 142 },
  { name: "Chania", x: 1786, y: 1180, at: 150 },
];

const Pulse: React.FC<{ frame: number; x: number; y: number; at: number }> = ({
  frame,
  x,
  y,
  at,
}) => {
  if (frame < at || frame > at + 70) {
    return null;
  }
  return (
    <>
      {[0, 18].map((delay) => {
        const t = (frame - at - delay) / 40;
        if (t < 0 || t > 1) {
          return null;
        }
        return (
          <div
            key={delay}
            style={{
              position: "absolute",
              left: x - 30,
              top: y - 30,
              width: 60,
              height: 60,
              borderRadius: 30,
              border: `3px solid ${COLORS.green}`,
              scale: String(0.2 + t * 1.6),
              opacity: 1 - t,
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          left: x - 7,
          top: y - 7,
          width: 14,
          height: 14,
          borderRadius: 7,
          backgroundColor: COLORS.green,
          boxShadow: "0 0 0 3px white",
          opacity: fadeIn(frame, at, 6),
        }}
      />
    </>
  );
};

/** Map + filter search page: refine filters, pins pulse, open a listing card. */
export const MapSearch: React.FC = () => {
  const frame = useCurrentFrame();

  const scroll = kf(frame, [
    { at: 188, value: 0 },
    { at: 222, value: 225 },
  ]);

  const camScale = kf(frame, [
    { at: 100, value: 1 },
    { at: 140, value: 1.3 },
    { at: 185, value: 1.3 },
    { at: 222, value: 1 },
  ]);
  // Keep the browser's right edge on the frame edge while zoomed: (1760 - x) * 1.3 + 960 = 1920.
  const camX = kf(frame, [
    { at: 100, value: 960 },
    { at: 140, value: 1022 },
    { at: 185, value: 1022 },
    { at: 222, value: 960 },
  ]);
  const camY = kf(frame, [
    { at: 100, value: 540 },
    { at: 140, value: 600 },
    { at: 185, value: 600 },
    { at: 222, value: 540 },
  ]);

  return (
    <Backdrop>
      <Camera scale={camScale} x={camX} y={camY}>
        <BrowserFrame url="kyma.gr/buy?goal=golden-visa" opacity={fadeIn(frame, 0, 12)}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 1600,
              translate: `0px ${-scroll}px`,
            }}
          >
            <Img
              src={staticFile("screens/4b-home-desktop.png")}
              style={{ width: 1600, display: "block" }}
            />
            {/* Verified only chip */}
            <Outline
              frame={frame}
              from={58}
              until={180}
              x={48 * K}
              y={1000 * K}
              w={195 * K}
              h={70 * K}
              radius={999}
              color={COLORS.green}
            />
            {/* Min yield chip */}
            <Outline
              frame={frame}
              from={93}
              until={180}
              x={528 * K}
              y={1002 * K}
              w={142 * K}
              h={68 * K}
              radius={999}
            />
            {PINS.map((p) => (
              <Pulse key={p.name} frame={frame} x={p.x * K} y={p.y * K} at={p.at} />
            ))}
            {/* Chania pin card */}
            <Outline
              frame={frame}
              from={175}
              until={215}
              x={1660 * K}
              y={1102 * K}
              w={252 * K}
              h={96 * K}
              radius={14}
              color={COLORS.green}
            />
            {/* First result card */}
            <Outline
              frame={frame}
              from={228}
              until={240}
              x={919 * K}
              y={1380 * K}
              w={383 * K}
              h={377 * K}
              radius={22}
            />
          </div>
        </BrowserFrame>

        <Cursor
          frame={frame}
          keys={[
            { at: 12, x: 700, y: 900 },
            { at: 50, x: CX + 145 * K, y: CY + 1034 * K },
            { at: 85, x: CX + 600 * K, y: CY + 1036 * K },
            { at: 165, x: CX + 1786 * K, y: CY + 1152 * K },
            { at: 222, x: CX + 1110 * K, y: CY + 1568 * K - 225 },
          ]}
          clicks={[58, 93, 175, 230]}
        />
      </Camera>

      <Caption frame={frame} from={14} until={108}>
        Filter by goal, budget, minimum yield and legal status
      </Caption>
      <Caption frame={frame} from={120} until={195}>
        Price per m², growth and stock for every area, live on the map
      </Caption>
      <Caption frame={frame} from={202} until={236} accent={COLORS.green}>
        Every listing checked before you see it
      </Caption>
    </Backdrop>
  );
};
