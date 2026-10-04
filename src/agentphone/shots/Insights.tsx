import React from "react";
import { Lead } from "../lib/time";
import { deskBox, Framed, Key, PaperStage, useVertical } from "../lib/stage";
import { InsightsScreen } from "../screens/insights";

// Board is 1280×1010. Start on the metric strip, pull out as rows load.
const H: Key[] = [
  { f: 0, x: 470, y: 200, z: 1.55 },
  { f: 22, x: 480, y: 220, z: 1.5 },
  { f: 60, x: 640, y: 505, z: 1.0 },
  { f: 73, x: 640, y: 505, z: 0.99 },
];
const V: Key[] = [
  { f: 0, x: 470, y: 200, z: 1.45 },
  { f: 22, x: 470, y: 230, z: 1.42 },
  { f: 60, x: 450, y: 520, z: 1.25 },
  { f: 73, x: 450, y: 520, z: 1.24 },
];

// 0:23–0:25 · Insights. Hard cut on the beat; answer rate counts to 86%,
// the hour bars and sparkline draw.
export const InsightsShot: React.FC<{ camH?: Key[]; camV?: Key[] }> = ({ camH = H, camV = V }) => {
  const v = useVertical();
  return (
    <PaperStage>
      <Framed w={1280} h={1010} box={deskBox(v)} cam={v ? camV : camH}>
        <div style={{ borderRadius: 24, boxShadow: "0 50px 100px -40px rgba(16,74,52,.45)" }}>
          <Lead>
            <InsightsScreen />
          </Lead>
        </div>
      </Framed>
    </PaperStage>
  );
};
