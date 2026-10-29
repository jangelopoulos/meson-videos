import React from "react";
import { fonts } from "../brand";

export type DataRow = {
  x: number;
  y: number;
  angle: number;
  opacity: number;
  text: string;
  len: number;
};

/** Streaks of tiny data rows: a hairline plus a mono fragment, oriented along their path. */
export const DataStream: React.FC<{ rows: DataRow[] }> = ({ rows }) => (
  <>
    {rows.map((r, i) =>
      r.opacity <= 0.01 ? null : (
        <div
          key={i}
          style={{
            position: "absolute",
            left: r.x,
            top: r.y,
            rotate: `${r.angle}rad`,
            transformOrigin: "0 50%",
            display: "flex",
            alignItems: "center",
            gap: 6,
            opacity: r.opacity,
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              width: r.len,
              height: 1.5,
              backgroundColor: "rgba(255,255,255,0.75)",
            }}
          />
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 13,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {r.text}
          </div>
        </div>
      ),
    )}
  </>
);
