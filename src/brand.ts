import { staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";

// Self-hosted fonts so renders don't depend on Google Fonts.
export const fontFamily = "Instrument Sans";
loadFont({
  family: fontFamily,
  url: staticFile("fonts/InstrumentSans-latin.woff2"),
  weight: "400 600",
  format: "woff2",
});
export const logoFont = "Archivo";
loadFont({
  family: logoFont,
  url: staticFile("fonts/Archivo-SemiExpanded-600-latin.woff2"),
  weight: "600",
  stretch: "112.5%",
  format: "woff2",
});

export const BRAND = {
  teal: "#14B8A6",
  ink: "#F6F6F4",
};
