import { useVideoConfig } from "remotion";
import { typeScale } from "../brand";

export type Layout = ReturnType<typeof useLayout>;

/** Switches layout on the video's aspect ratio (landscape vs vertical). */
export const useLayout = () => {
  const { width, height } = useVideoConfig();
  const vertical = height > width;
  return {
    width,
    height,
    vertical,
    type: vertical ? typeScale.vertical : typeScale.landscape,
    /** Horizontal safe margin. */
    marginX: vertical ? 90 : 140,
    /** Top / bottom safe margins (vertical leaves room for app UI). */
    marginTop: vertical ? 220 : 110,
    marginBottom: vertical ? 300 : 110,
  };
};
