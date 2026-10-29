import React from "react";
import type { IconName } from "../brand";
import { strokes } from "../brand";

/** Simple generic line icons on a 24-unit grid. No real app logos. */
const GLYPHS: Record<IconName, React.ReactNode> = {
  envelope: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="M3.5 6.5 L12 13 L20.5 6.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
      <path d="M3.5 9.5 H20.5 M8 3 V7 M16 3 V7" />
      <path d="M7.5 13 H9.5 M11 13 H13 M14.5 13 H16.5 M7.5 16.5 H9.5 M11 16.5 H13" />
    </>
  ),
  grid: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
      <path d="M3.5 9.5 H20.5 M3.5 14.5 H20.5 M9.5 4.5 V19.5 M15 4.5 V19.5" />
    </>
  ),
  chat: (
    <>
      <path d="M4 6 a2 2 0 0 1 2 -2 H18 a2 2 0 0 1 2 2 V14 a2 2 0 0 1 -2 2 H10 L6 19.5 V16 H6 a2 2 0 0 1 -2 -2 Z" />
      <path d="M8 8.5 H16 M8 11.5 H13.5" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M10.5 18.5 H13.5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 3.5 V20 H20.5" />
      <path d="M8 16 V12 M12 16 V8 M16 16 V10.5" />
    </>
  ),
  summary: (
    <>
      <path d="M6 3 H14.5 L19 7.5 V21 H6 Z" />
      <path d="M14.5 3 V7.5 H19" />
      <path d="M9 11.5 H16 M9 14.5 H16 M9 17.5 H13" />
    </>
  ),
  ask: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15 15 L20.5 20.5" />
    </>
  ),
  followup: (
    <>
      <circle cx="12" cy="12.5" r="8" />
      <path d="M12 8 V12.5 L15 14.5" />
      <path d="M9.5 2.5 H14.5" />
    </>
  ),
};

export const Icon: React.FC<{
  name: IconName;
  size: number;
  color: string;
  strokeWidth?: number;
}> = ({ name, size, color, strokeWidth = strokes.icon }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={(strokeWidth * 24) / size}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "block", overflow: "visible" }}
  >
    {GLYPHS[name]}
  </svg>
);
