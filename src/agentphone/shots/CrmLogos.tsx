import React from "react";
import { Easing, Img, staticFile } from "remotion";
import { pop, prog } from "../lib/anim";
import { useVertical } from "../lib/stage";
import { useT } from "../lib/time";
import { C, FONT, MONO } from "../theme";

// CRMs AgentPhone connects to. Files go in public/crm/ (set LOGO_FILES once
// they're there); until then each tile shows the name as a wordmark.
export const CRMS: { name: string; file: string; color: string }[] = [
  { name: "HubSpot", file: "hubspot.jpg", color: "#ff5c35" },
  { name: "Reapit", file: "reapit.svg", color: "#0b2f6a" },
  { name: "LockedOn", file: "lockedon.webp", color: "#1f2937" },
  { name: "Box+Dice", file: "boxanddice.webp", color: "#111827" },
  { name: "Rex", file: "rex.png", color: "#e11d48" },
  { name: "Spark", file: "spark.png", color: "#2563eb" },
  { name: "Pipedrive", file: "pipedrive.png", color: "#1a1a1a" },
  { name: "monday.com", file: "monday.jpg", color: "#6161ff" },
];
const LOGO_FILES = false;

/** "Works with" grid of CRM logos, popping in beside the set-up screen. */
export const CrmLogos: React.FC<{ at: number; outAt: number }> = ({ at, outAt }) => {
  const f = useT();
  const v = useVertical();
  if (f < at - 2) return null;
  const out = 1 - prog(f, outAt, 10, Easing.in(Easing.cubic));
  const tileW = v ? 220 : 150;
  const tileH = v ? 104 : 84;
  const gap = v ? 16 : 14;
  const label = prog(f, at, 10);
  return (
    <div
      style={{
        position: "absolute",
        ...(v
          ? { left: 0, right: 0, top: 1560, display: "flex", flexDirection: "column", alignItems: "center" }
          : { left: 150, top: 690 }),
        opacity: out,
      }}
    >
      <div
        style={{
          ...(v
            ? {
                padding: "22px 26px 26px",
                borderRadius: 30,
                background: "rgba(12,20,16,.78)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(125,240,182,.18)",
              }
            : {}),
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: v ? 22 : 18, letterSpacing: ".18em", color: C.mint, fontWeight: 600, marginBottom: v ? 14 : 12, opacity: label, textAlign: v ? "center" : "left" }}>
          WORKS WITH
        </div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(4, ${tileW}px)`, gap }}>
          {CRMS.map((c, i) => (
            <div
              key={c.name}
              style={{
                ...pop(f, at + 4 + i * 3, 0.8),
                width: tileW,
                height: tileH,
                borderRadius: 16,
                background: "#fff",
                boxShadow: "0 14px 30px -14px rgba(0,0,0,.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 12,
                overflow: "hidden",
              }}
            >
              {LOGO_FILES ? (
                <Img src={staticFile(`crm/${c.file}`)} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
              ) : (
                <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: v ? 26 : 21, letterSpacing: "-0.02em", color: c.color }}>{c.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
