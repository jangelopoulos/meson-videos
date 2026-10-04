import {useT} from "../lib/time";
import React from "react";
import { enter } from "../lib/anim";
import { deskBox, Framed, Key, PaperStage, useVertical } from "../lib/stage";
import { LANDED, RoutingScreen, TOKEN } from "../screens/routing";

export const ROUTING_LEN = 116;

// Board is 1280×940; the flow canvas starts at about (24, 246).
const H: Key[] = [
  { f: 0, x: 640, y: 470, z: 1.0 },
  { f: 8, x: 640, y: 470, z: 1.0 },
  { f: TOKEN - 4, x: 480, y: 520, z: 1.3 },
  { f: LANDED, x: 420, y: 580, z: 1.42 },
  { f: ROUTING_LEN, x: 430, y: 575, z: 1.45 },
];
const V: Key[] = [
  { f: 0, x: 640, y: 470, z: 1.0 },
  { f: 8, x: 640, y: 470, z: 1.0 },
  { f: TOKEN - 4, x: 330, y: 470, z: 2.05 },
  { f: LANDED, x: 340, y: 600, z: 2.1 },
  { f: ROUTING_LEN, x: 340, y: 600, z: 2.15 },
];

// 0:17–0:21 · Routing. Music lift. Nodes pop, connectors draw, the call
// token runs inbound → listing agent → no answer → Send SMS.
export const RoutingShot: React.FC = () => {
  const f = useT();
  const v = useVertical();
  return (
    <PaperStage>
      <Framed w={1280} h={940} box={deskBox(v)} cam={v ? V : H}>
        <div style={{ ...enter(f, 0, 12), borderRadius: 24, boxShadow: "0 50px 100px -40px rgba(16,74,52,.45)" }}>
          <RoutingScreen />
        </div>
      </Framed>
    </PaperStage>
  );
};
