import { continueRender, delayRender } from "remotion";
import { GEIST, GEIST_MONO } from "./fontData";

// Fonts are decoded from embedded data rather than fetched, so a busy render
// tab can't stall on a network request.
const toBuffer = (b64: string) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)).buffer;

const handle = delayRender("Loading Geist fonts");

export const fontsReady = Promise.all(
  ([["Geist", GEIST], ["Geist Mono", GEIST_MONO]] as const).map(async ([family, data]) => {
    const face = new FontFace(family, toBuffer(data), { weight: "100 900" });
    await face.load();
    document.fonts.add(face);
  }),
).then(() => continueRender(handle));
