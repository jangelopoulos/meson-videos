import React from "react";
import { AbsoluteFill, Easing, random, useCurrentFrame } from "remotion";
import { Stage } from "../devices";
import { GoldDust, LuxBackdrop } from "../fx";
import { PINS, PLANE_H, PLANE_W, TOWNS, project } from "../greece";
import { Chapter } from "../type";
import { COLORS, EASE, EASE_INOUT, EASE_POP, SANS, SERIF, fmt, lerp, prog } from "../theme";

const CENTER_Y = 520;
const HEIGHT_PER_EURO = 0.05;
const PERSPECTIVE = 2200;
const ORIGIN_X = 960;
const ORIGIN_Y = 1080 * 0.4;

const SEAS = [
  { label: "Aegean Sea", lat: 38.75, lon: 25.6 },
  { label: "Ionian Sea", lat: 37.2, lon: 20.3 },
  { label: "Sea of Crete", lat: 35.95, lon: 26.3 },
];

/**
 * Where a point on the map plane (plane pixels, plus height above it) lands on screen.
 * Mirrors the CSS: `scale(sc) rotateX(rx) rotateZ(rz)` about the plane centre,
 * then the stage's perspective.
 */
const toScreen = (px: number, py: number, h: number, rx: number, rz: number, sc: number) => {
  let x = px - PLANE_W / 2;
  let y = py - PLANE_H / 2;
  let z = h;
  const az = (rz * Math.PI) / 180;
  const ax = (rx * Math.PI) / 180;
  [x, y] = [x * Math.cos(az) - y * Math.sin(az), x * Math.sin(az) + y * Math.cos(az)];
  [y, z] = [y * Math.cos(ax) - z * Math.sin(ax), y * Math.sin(ax) + z * Math.cos(ax)];
  x *= sc;
  y *= sc;
  z *= sc;
  const k = PERSPECTIVE / (PERSPECTIVE - z);
  return {
    x: ORIGIN_X + (960 + x - ORIGIN_X) * k,
    y: ORIGIN_Y + (CENTER_Y + y - ORIGIN_Y) * k,
    k,
  };
};

/**
 * Greece as a constellation of towns on a tilted 3D plane. Gold columns rise
 * from each area, their height set by average price per m².
 */
export const MapGreece: React.FC = () => {
  const frame = useCurrentFrame();
  const rx = lerp(0, 56, prog(frame, 8, 60, EASE_INOUT));
  const rz = lerp(8, -10, prog(frame, 8, 247, Easing.inOut(Easing.sin)));
  const sc = lerp(0.62, 1.0, prog(frame, 8, 70, EASE_INOUT));

  const pins = PINS.map((pin) => {
    const p = project(pin.lat, pin.lon);
    const grow = prog(frame, pin.start, 40, EASE);
    const h = pin.perM2 * HEIGHT_PER_EURO * grow;
    return {
      pin,
      p,
      grow,
      base: toScreen(p.x, p.y, 0, rx, rz, sc),
      top: toScreen(p.x, p.y, h, rx, rz, sc),
    };
  });

  return (
    <AbsoluteFill>
      <LuxBackdrop />
      <GoldDust count={16} seed="map" opacity={0.45} />
      <Stage perspective={PERSPECTIVE} origin="50% 40%">
        <div
          style={{
            position: "absolute",
            left: 960 - PLANE_W / 2,
            top: CENTER_Y - PLANE_H / 2,
            width: PLANE_W,
            height: PLANE_H,
            transformStyle: "preserve-3d",
            transform: `scale(${sc}) rotateX(${rx}deg) rotateZ(${rz}deg)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at 50% 50%, rgba(30,91,133,0.4) 0%, rgba(10,26,46,0) 62%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: prog(frame, 0, 30),
              backgroundImage:
                "linear-gradient(rgba(232,211,166,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(232,211,166,0.10) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              WebkitMaskImage: "radial-gradient(ellipse at center, #000 30%, transparent 68%)",
            }}
          />
          <svg width={PLANE_W} height={PLANE_H} style={{ position: "absolute", left: 0, top: 0 }}>
            {TOWNS.flatMap(([lat, lon], i) => {
              const p = project(lat, lon);
              return [0, 1, 2].map((j) => {
                const jx = j === 0 ? 0 : (random(`tx${i}-${j}`) - 0.5) * 30;
                const jy = j === 0 ? 0 : (random(`ty${i}-${j}`) - 0.5) * 30;
                const appear = prog(frame, 4 + random(`ta${i}-${j}`) * 44, 14);
                return (
                  <circle
                    key={`${i}-${j}`}
                    cx={p.x + jx}
                    cy={p.y + jy}
                    r={j === 0 ? 4.2 : 2.6}
                    fill={COLORS.ivory}
                    opacity={appear * (j === 0 ? 0.8 : 0.4)}
                  />
                );
              });
            })}
          </svg>
          {SEAS.map((s) => {
            const p = project(s.lat, s.lon);
            return (
              <div
                key={s.label}
                style={{
                  position: "absolute",
                  left: p.x,
                  top: p.y,
                  translate: "-50% -50%",
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontSize: 34,
                  letterSpacing: 8,
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  color: COLORS.goldLight,
                  opacity: 0.5 * prog(frame, 30, 30),
                }}
              >
                {s.label}
              </div>
            );
          })}

          {pins.map(({ pin, p }, i) => {
            if (frame < pin.start - 4) {
              return null;
            }
            const ring = ((frame - pin.start) % 50) / 50;
            return (
              <React.Fragment key={pin.name}>
                <div
                  style={{
                    position: "absolute",
                    left: p.x - 40,
                    top: p.y - 40,
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    border: `2px solid ${COLORS.goldLight}`,
                    scale: String(0.3 + ring * 1.4),
                    opacity: (1 - ring) * 0.8,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: p.x - 9,
                    top: p.y - 9,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: COLORS.goldLight,
                    boxShadow: `0 0 24px ${COLORS.gold}`,
                  }}
                />
                {new Array(12).fill(0).map((_, j) => {
                  const a = random(`la${i}-${j}`) * Math.PI * 2;
                  const r = 18 + random(`lr${i}-${j}`) * 46;
                  const tw = 0.5 + 0.5 * Math.sin(frame / 9 + j * 2.1 + i);
                  return (
                    <div
                      key={j}
                      style={{
                        position: "absolute",
                        left: p.x + Math.cos(a) * r - 3,
                        top: p.y + Math.sin(a) * r - 3,
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: COLORS.goldLight,
                        opacity: prog(frame, pin.start + j * 2, 10) * tw,
                      }}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </Stage>

      {/* Light columns, projected to screen space */}
      <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
        <defs>
          {pins.map(({ pin, base, top }) => (
            <linearGradient
              key={pin.name}
              id={`beam-${pin.name}`}
              gradientUnits="userSpaceOnUse"
              x1={base.x}
              y1={base.y}
              x2={top.x}
              y2={Math.min(top.y, base.y - 1)}
            >
              <stop offset="0" stopColor={COLORS.goldLight} stopOpacity={0.15} />
              <stop offset="1" stopColor={COLORS.ivory} stopOpacity={1} />
            </linearGradient>
          ))}
        </defs>
        {pins.map(({ pin, base, top }) =>
          frame < pin.start ? null : (
            <g key={pin.name}>
              <line
                x1={base.x}
                y1={base.y}
                x2={top.x}
                y2={top.y}
                stroke={COLORS.goldLight}
                strokeOpacity={0.25}
                strokeWidth={34 * base.k}
                strokeLinecap="round"
                style={{ filter: "blur(10px)" }}
              />
              <line
                x1={base.x}
                y1={base.y}
                x2={top.x}
                y2={top.y}
                stroke={`url(#beam-${pin.name})`}
                strokeWidth={8 * base.k}
                strokeLinecap="round"
              />
              <circle cx={top.x} cy={top.y} r={7 * top.k} fill={COLORS.ivory} />
            </g>
          ),
        )}
      </svg>
      {pins.map(({ pin, grow, top }) => {
        const labelIn = prog(frame, pin.start + 22, 18, EASE_POP);
        if (frame < pin.start + 20) {
          return null;
        }
        return (
          <div
            key={pin.name}
            style={{
              position: "absolute",
              left: top.x + (pin.side === "right" ? 18 : -18),
              top: top.y + 10,
              width: 236,
              padding: "12px 18px 14px",
              borderRadius: 18,
              backgroundColor: "rgba(8,20,36,0.84)",
              border: "1px solid rgba(232,211,166,0.55)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.45)",
              opacity: prog(frame, pin.start + 22, 10),
              translate: pin.side === "right" ? "0% -100%" : "-100% -100%",
              scale: String(lerp(0.6, 1, labelIn) * Math.min(1.1, top.k)),
              transformOrigin: pin.side === "right" ? "0% 100%" : "100% 100%",
            }}
          >
            <div style={{ fontFamily: SERIF, fontSize: 34, fontWeight: 600, color: COLORS.ivory, lineHeight: 1 }}>{pin.name}</div>
            <div style={{ marginTop: 6, fontFamily: SANS, fontSize: 24, fontWeight: 700, color: COLORS.goldLight }}>
              €{fmt(Math.round((pin.perM2 * grow) / 10) * 10)}/m²
            </div>
            <div style={{ marginTop: 2, fontFamily: SANS, fontSize: 20, color: COLORS.ivoryMuted }}>
              <span style={{ color: COLORS.green, fontWeight: 700 }}>{pin.growth}</span> · {pin.homes} homes
            </div>
          </div>
        );
      })}

      <Chapter
        frame={frame}
        from={60}
        num="03"
        label="Market"
        lines={["Know the market", "before you fly."]}
        left={110}
        top={800}
        width={800}
        size={66}
      />
      <div
        style={{
          position: "absolute",
          right: 110,
          bottom: 90,
          textAlign: "right",
          fontFamily: SANS,
          fontSize: 20,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: COLORS.gold,
          opacity: prog(frame, 150, 20),
          translate: `0px ${(1 - prog(frame, 150, 24, EASE)) * 12}px`,
        }}
      >
        Column height · average price per m²
        <div style={{ marginTop: 8, letterSpacing: 1, textTransform: "none", fontSize: 20, color: COLORS.ivoryMuted }}>
          Indicative area averages
        </div>
      </div>
    </AbsoluteFill>
  );
};
