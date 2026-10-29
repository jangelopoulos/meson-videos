import { useVideoConfig } from "remotion";
import { type as typeScale } from "../brand";

export type Layout = ReturnType<typeof useLayout>;

/** Landscape vs vertical layout, from the video's width and height. */
export const useLayout = () => {
  const { width, height } = useVideoConfig();
  const vertical = height > width;
  return {
    width,
    height,
    vertical,
    cx: width / 2,
    cy: height / 2,
    t: vertical ? typeScale.vertical : typeScale.landscape,
    /** Safe margins (vertical leaves room for platform UI). */
    marginX: vertical ? 80 : 120,
    marginTop: vertical ? 240 : 90,
    marginBottom: vertical ? 340 : 90,
    /** Max width for centred text. */
    textWidth: vertical ? 920 : 1680,
  };
};
