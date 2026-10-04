import { continueRender, delayRender, staticFile } from "remotion";

// Geist + Geist Mono (variable, OFL), latin subset, extracted from the motion
// brief bundle. Loaded with a short timeout and retries: a stalled font fetch
// in one render tab reloads that tab instead of failing the whole render.
const faces: [string, string][] = [
  ["Geist", "Geist-latin.woff2"],
  ["Geist Mono", "GeistMono-latin.woff2"],
];

const handle = delayRender("Loading Geist fonts", {
  timeoutInMilliseconds: 20000,
  retries: 3,
});

export const fontsReady = Promise.all(
  faces.map(async ([family, file]) => {
    const face = new FontFace(family, `url('${staticFile(`fonts/${file}`)}') format('woff2')`, {
      weight: "100 900",
    });
    await face.load();
    document.fonts.add(face);
  }),
).then(() => continueRender(handle));
