import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { Backdrop } from "../Backdrop";
import { BROWSER, BrowserFrame } from "../BrowserFrame";
import { Camera } from "../Camera";
import { Caption } from "../Caption";
import { Cursor } from "../Cursor";
import { Outline } from "../Spotlight";
import { COLORS, EASE_IN, fadeIn, kf } from "../theme";

// Screenshot is 2560px wide, shown at 1600px.
const K = 1600 / 2560;
const CX = BROWSER.left;
const CY = BROWSER.top + BROWSER.chrome;

/** Desktop home page: search chips, then scroll to the verified listings. */
export const Home: React.FC = () => {
  const frame = useCurrentFrame();

  const scroll = kf(frame, [
    { at: 190, value: 0 },
    { at: 240, value: 1120 },
  ]);

  const camScale = kf(frame, [
    { at: 32, value: 1 },
    { at: 78, value: 1.38 },
    { at: 150, value: 1.38 },
    { at: 192, value: 1 },
  ]);
  const camX = kf(frame, [
    { at: 32, value: 960 },
    { at: 78, value: 960 },
    { at: 150, value: 960 },
    { at: 192, value: 960 },
  ]);
  const camY = kf(frame, [
    { at: 32, value: 540 },
    { at: 78, value: 600 },
    { at: 150, value: 600 },
    { at: 192, value: 540 },
  ]);

  return (
    <Backdrop>
      <Camera scale={camScale} x={camX} y={camY}>
        <BrowserFrame
          url="kyma.gr"
          opacity={fadeIn(frame, 0, 18)}
          lift={(1 - EASE_IN(Math.min(1, frame / 24))) * 40}
        >
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
              src={staticFile("screens/4a-home-desktop.png")}
              style={{ width: 1600, display: "block" }}
            />
            {/* Golden Visa chip hover */}
            <Outline
              frame={frame}
              from={88}
              until={185}
              x={695 * K}
              y={850 * K}
              w={272 * K}
              h={72 * K}
              radius={999}
            />
            {/* Verified only chip hover */}
            <Outline
              frame={frame}
              from={126}
              until={185}
              x={1668 * K}
              y={850 * K}
              w={195 * K}
              h={72 * K}
              radius={999}
              color={COLORS.green}
            />
            {/* First verified card hover */}
            <Outline
              frame={frame}
              from={246}
              until={270}
              x={66 * K}
              y={2058 * K}
              w={579 * K}
              h={622 * K}
              radius={22}
            />
          </div>
        </BrowserFrame>

        <Cursor
          frame={frame}
          keys={[
            { at: 40, x: 1250, y: 860 },
            { at: 82, x: CX + 831 * K, y: CY + 886 * K },
            { at: 120, x: CX + 1765 * K, y: CY + 886 * K },
            { at: 200, x: 1350, y: 520 },
            { at: 250, x: CX + 356 * K, y: CY + 2369 * K - 1120 },
          ]}
          clicks={[90, 128, 258]}
        />
      </Camera>

      <Caption frame={frame} from={22} until={160}>
        Start with what you&apos;re buying for: Golden Visa, holiday home, rental income
      </Caption>
      <Caption frame={frame} from={218} until={262} accent={COLORS.green}>
        Verified listings with real yields and Golden Visa tags
      </Caption>
    </Backdrop>
  );
};
