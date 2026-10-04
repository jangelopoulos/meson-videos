import React from "react";
import { useCurrentFrame } from "remotion";
import { enter, fade, pop, slide } from "./anim";

export type Fx = "enter" | "pop" | "fade" | "slideL" | "slideR" | "rise";

const fxStyle = (fx: Fx, f: number, at: number): React.CSSProperties => {
  switch (fx) {
    case "enter":
      return enter(f, at);
    case "rise":
      return enter(f, at, 40);
    case "pop":
      return pop(f, at);
    case "fade":
      return fade(f, at);
    case "slideL": // comes in from the right, moving left
      return slide(f, at, 60);
    case "slideR":
      return slide(f, at, -60);
  }
};

/** Any element with one of the brief's motion helpers applied at frame `at`. */
export const A: React.FC<{
  as?: string;
  fx?: Fx;
  at: number;
  style?: React.CSSProperties;
  extra?: React.CSSProperties;
  children?: React.ReactNode;
  [k: string]: unknown;
}> = ({ as = "div", fx = "enter", at, style, extra, children, ...rest }) => {
  const f = useCurrentFrame();
  const s = fxStyle(fx, f, at);
  const merged: React.CSSProperties = { ...style, ...s, ...extra };
  if (style?.opacity !== undefined) {
    merged.opacity = Number(style.opacity) * Number(s.opacity ?? 1);
  }
  return React.createElement(as, { ...rest, style: merged }, children);
};
