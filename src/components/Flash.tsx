import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

/** A hard white flash lasting `length` frames starting at `at`. */
export const Flash: React.FC<{ at: number; length?: number }> = ({
  at,
  length = 2,
}) => {
  const frame = useCurrentFrame();
  if (frame < at || frame >= at + length) return null;
  return <AbsoluteFill style={{ backgroundColor: "#FFFFFF" }} />;
};
