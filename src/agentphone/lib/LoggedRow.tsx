import React from "react";
import { C, FONT } from "../theme";

/**
 * The after-call summary row. It flies out of the phone at the end of the
 * after-call shot and lands in the desktop list: the object-led bridge.
 */
export const LoggedRow: React.FC<{ width?: number; style?: React.CSSProperties }> = ({
  width = 346,
  style,
}) => (
  <div
    style={{
      width,
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 14px",
      borderRadius: 18,
      fontFamily: FONT,
      color: C.ink,
      background: "linear-gradient(150deg,rgba(255,255,255,.96),rgba(255,255,255,.86))",
      border: "1px solid rgba(255,255,255,.95)",
      boxShadow: "0 24px 50px -18px rgba(16,74,52,.5), inset 0 1px 0 #fff",
      ...style,
    }}
  >
    <div
      style={{
        width: 38,
        height: 38,
        borderRadius: "50%",
        background: "rgba(16,196,110,.16)",
        color: "#0c6b43",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: 14,
        flex: "none",
      }}
    >
      JH
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 14, fontWeight: 700 }}>James Holloway</div>
      <div style={{ fontSize: 11.5, color: C.muted, marginTop: 1, whiteSpace: "nowrap" }}>
        Call summary · 3 actions · Sat inspection
      </div>
    </div>
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: "#1d4ed8",
        background: "rgba(59,130,246,.14)",
        border: "1px solid rgba(59,130,246,.3)",
        borderRadius: 8,
        padding: "5px 9px",
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        flex: "none",
      }}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
      Logged
    </span>
  </div>
);
