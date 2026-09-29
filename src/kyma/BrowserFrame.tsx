import React from "react";
import { COLORS, FONT } from "./theme";

export const BROWSER = {
  left: 160,
  top: 64,
  width: 1600,
  chrome: 56,
  contentHeight: 900,
};

/**
 * Desktop browser window. Children are placed inside the clipped content area.
 * Content area top-left in scene coordinates is (BROWSER.left, BROWSER.top + BROWSER.chrome).
 */
export const BrowserFrame: React.FC<{
  url: string;
  opacity?: number;
  lift?: number;
  children: React.ReactNode;
}> = ({ url, opacity = 1, lift = 0, children }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: BROWSER.left,
        top: BROWSER.top,
        width: BROWSER.width,
        height: BROWSER.chrome + BROWSER.contentHeight,
        borderRadius: 18,
        overflow: "hidden",
        backgroundColor: COLORS.white,
        boxShadow: "0 40px 90px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08)",
        opacity,
        translate: `0px ${lift}px`,
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          height: BROWSER.chrome,
          backgroundColor: "#F1F2F4",
          borderBottom: `1px solid ${COLORS.line}`,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          gap: 8,
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#FF5F57" }} />
        <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#FEBC2E" }} />
        <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#28C840" }} />
        <div
          style={{
            marginLeft: 24,
            flex: 1,
            maxWidth: 720,
            height: 34,
            borderRadius: 10,
            backgroundColor: COLORS.white,
            border: `1px solid ${COLORS.line}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            color: COLORS.muted,
            gap: 8,
          }}
        >
          <span style={{ fontSize: 13 }}>🔒</span>
          {url}
        </div>
      </div>
      <div
        style={{
          position: "relative",
          width: BROWSER.width,
          height: BROWSER.contentHeight,
          overflow: "hidden",
          backgroundColor: COLORS.paper,
        }}
      >
        {children}
      </div>
    </div>
  );
};
