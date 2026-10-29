import React from "react";

/** Outline padlock. `draw` 0..1 strokes it on; `closed` 0..1 drops the shackle. */
export const Padlock: React.FC<{
  size: number;
  color: string;
  draw: number;
  closed: number;
}> = ({ size, color, draw, closed }) => {
  const dash = { pathLength: 1, strokeDasharray: `${draw} 1` };
  const lift = (1 - closed) * 9;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      style={{ overflow: "visible" }}
    >
      <rect x="9" y="21" width="30" height="22" rx="5" {...dash} />
      <path
        d={`M16 ${21 - lift} V${14 - lift} a8 8 0 0 1 16 0 V${21 - lift * 0.2}`}
        {...dash}
      />
      <circle cx="24" cy="31" r="2.4" {...dash} />
      <path d="M24 33.4 V37" {...dash} />
    </svg>
  );
};
