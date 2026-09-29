import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { Backdrop } from "../Backdrop";
import { BrowserFrame } from "../BrowserFrame";
import { Camera } from "../Camera";
import { Caption } from "../Caption";
import { Spotlight } from "../Spotlight";
import { COLORS, fadeIn, kf } from "../theme";

const K = 1600 / 2560;

/** Listing page deep-dive: price panel, legal checks, yields, costs, Golden Visa. */
export const Listing: React.FC = () => {
  const frame = useCurrentFrame();

  const scroll = kf(frame, [
    { at: 45, value: 0 },
    { at: 85, value: 340 },
    { at: 225, value: 340 },
    { at: 265, value: 1090 },
    { at: 330, value: 1090 },
    { at: 362, value: 1600 },
    { at: 405, value: 1600 },
    { at: 428, value: 1930 },
  ]);

  // Zoom towards the price panel while keeping the browser's right edge inside the frame.
  const camScale = kf(frame, [
    { at: 82, value: 1 },
    { at: 122, value: 1.25 },
    { at: 190, value: 1.25 },
    { at: 228, value: 1 },
  ]);
  const camX = kf(frame, [
    { at: 82, value: 960 },
    { at: 122, value: 1030 },
    { at: 190, value: 1030 },
    { at: 228, value: 960 },
  ]);
  const camY = kf(frame, [
    { at: 82, value: 540 },
    { at: 122, value: 700 },
    { at: 190, value: 700 },
    { at: 228, value: 540 },
  ]);

  return (
    <Backdrop>
      <Camera scale={camScale} x={camX} y={camY}>
        <BrowserFrame url="kyma.gr/homes/sea-view-stone-villa-chania" opacity={fadeIn(frame, 0, 12)}>
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
              src={staticFile("screens/listing-desktop.png")}
              style={{ width: 1600, display: "block" }}
            />
            {/* Price / summary panel */}
            <Spotlight
              frame={frame}
              from={112}
              until={200}
              x={1732 * K}
              y={1230 * K}
              w={756 * K}
              h={752 * K}
              radius={22}
            />
            {/* Legal status */}
            <Spotlight
              frame={frame}
              from={268}
              until={328}
              x={62 * K}
              y={1855 * K}
              w={1588 * K}
              h={795 * K}
              radius={22}
            />
            {/* Rental yields */}
            <Spotlight
              frame={frame}
              from={365}
              until={403}
              x={62 * K}
              y={2687 * K}
              w={1588 * K}
              h={388 * K}
              radius={22}
            />
            {/* Total cost of acquisition */}
            <Spotlight
              frame={frame}
              from={432}
              until={470}
              x={62 * K}
              y={3125 * K}
              w={1588 * K}
              h={912 * K}
              radius={22}
            />
            {/* Golden Visa banner */}
            <Spotlight
              frame={frame}
              from={474}
              until={510}
              x={62 * K}
              y={4070 * K}
              w={1588 * K}
              h={242 * K}
              radius={22}
              color={COLORS.blue}
            />
          </div>
        </BrowserFrame>
      </Camera>

      <Caption frame={frame} from={14} until={98}>
        Every answer a foreign buyer needs, on one page
      </Caption>
      <Caption frame={frame} from={118} until={198}>
        All-in cost, net yield, legal checks and visa status at a glance
      </Caption>
      <Caption frame={frame} from={270} until={326} accent={COLORS.green}>
        Legally clean? Each check labelled Verified, Declared or Unknown
      </Caption>
      <Caption frame={frame} from={367} until={401} accent={COLORS.green}>
        Good investment? Net yields from comparable rents nearby
      </Caption>
      <Caption frame={frame} from={434} until={468} accent={COLORS.amber}>
        What will it really cost? Taxes, notary, lawyer and fees, itemised
      </Caption>
      <Caption frame={frame} from={476} until={510} accent={COLORS.blue}>
        Golden Visa and short-term let eligibility, stated plainly
      </Caption>
    </Backdrop>
  );
};
