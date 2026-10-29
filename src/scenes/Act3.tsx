import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import {
  beats,
  colors,
  copy,
  fonts,
  FRAMES_PER_BEAT,
  prices,
  saas,
} from "../brand";
import { ChatWindow } from "../components/ChatWindow";
import { Dashboard } from "../components/Dashboard";
import { DataRow, DataStream } from "../components/DataStream";
import { Flash } from "../components/Flash";
import { GlassCard } from "../components/GlassCard";
import { KineticHeadline } from "../components/KineticHeadline";
import { Padlock } from "../components/Padlock";
import { SaasTile } from "../components/SaasTile";
import { clamp, ease, lin, mix, prog, progIn, smear } from "../lib/anim";
import { Layout, useLayout } from "../lib/layout";
import { Center, Shot } from "./Shot";

type ShotProps = { dur: number };

// ---------------------------------------------------------------------------
// 12a. The vortex: every tile in a 3D cloud, pulled into a glowing core.
// ---------------------------------------------------------------------------
const FRAGMENTS = [
  "id:4821",
  "$49.00",
  "lead_17",
  "inv#0932",
  "2024-06",
  "sync ok",
  "row 88",
  "tag:crm",
  "$0.10",
  "deal_6",
  "msg 312",
  "acct 7",
];
const WAVE_START = [16, 31, 44, 55, 64, 71];
const WAVE_LEN = [20, 17, 15, 13, 11, 10];

type CloudTile = {
  name: string;
  price: string;
  x: number;
  y: number;
  depth: number;
  start: number;
  len: number;
  seed: number;
};

const cloudPlan = (L: Layout): CloudTile[] =>
  saas.map((name, i) => {
    const r = (k: string) => random(`cloud-${k}-${i}`);
    let x = (r("x") - 0.5) * L.width * 1.2;
    let y = (r("y") - 0.5) * L.height * 1.15;
    // Keep the centre clear for the core.
    const d = Math.hypot(x, y);
    const minD = Math.min(L.width, L.height) * 0.22;
    if (d < minD) {
      x = (x / (d || 1)) * minD;
      y = (y / (d || 1)) * minD;
    }
    const wave = Math.floor(r("wave") * WAVE_START.length);
    return {
      name,
      price: prices[i % prices.length],
      x,
      y,
      depth: 0.45 + r("z") * 0.75,
      start: WAVE_START[wave] + Math.floor(r("j") * 4),
      len: WAVE_LEN[wave],
      seed: i,
    };
  });

/** Spiral position for a tile at pull progress p (0 = rest, 1 = in the core). */
const spiral = (sx: number, sy: number, cx: number, cy: number, p: number) => {
  const r0 = Math.hypot(sx - cx, sy - cy);
  const t0 = Math.atan2(sy - cy, sx - cx);
  const r = r0 * Math.pow(1 - p, 1.15);
  const t = t0 + p * 2.4;
  return { x: cx + Math.cos(t) * r, y: cy + Math.sin(t) * r };
};

export const Vortex: React.FC<ShotProps> = ({ dur }) => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const plan = cloudPlan(L);
  const whip = prog(frame, 0, 9);
  const coreIn = ease(frame, 5, 10);
  const absorbed = plan.filter((t) => frame >= t.start + t.len).length;
  const beatPhase = frame % FRAMES_PER_BEAT;
  const pulse = Math.exp(-beatPhase / 3) * 0.28;
  const coreSize = (34 + absorbed * 1.6) * coreIn * (1 + pulse);
  const tileW = L.vertical ? 380 : 400;

  const rows: DataRow[] = [];
  const tiles = plan
    .slice()
    .sort((a, b) => a.depth - b.depth)
    .map((t) => {
      const drift = {
        x: Math.sin(frame / 18 + t.seed) * 8,
        y: Math.cos(frame / 22 + t.seed) * 8,
      };
      const sx = L.cx + t.x * t.depth + drift.x;
      const sy = L.cy + t.y * t.depth + drift.y;
      const p = progIn(frame, t.start, t.start + t.len);
      const pos = spiral(sx, sy, L.cx, L.cy, p);
      const prev = spiral(sx, sy, L.cx, L.cy, Math.max(0, p - 0.03));
      const angle = Math.atan2(pos.y - prev.y, pos.x - prev.x);

      // Data rows streaming behind the tile once it starts to dissolve.
      if (p > 0.3 && p < 1) {
        for (let j = 0; j < 6; j++) {
          const pj = p - j * 0.05;
          if (pj < 0.25) continue;
          const a = spiral(sx, sy, L.cx, L.cy, pj);
          const b = spiral(sx, sy, L.cx, L.cy, Math.max(0, pj - 0.03));
          rows.push({
            x: a.x,
            y: a.y,
            angle: Math.atan2(a.y - b.y, a.x - b.x) + Math.PI,
            opacity:
              (1 - lin(pj, 0.85, 1)) * lin(p, 0.3, 0.42) * (1 - j * 0.13),
            text: FRAGMENTS[(t.seed + j) % FRAGMENTS.length],
            len: 30 + random(`row-${t.seed}-${j}`) * 60,
          });
        }
      }
      if (p >= 0.75) return null;
      const align = Math.min(1, p * 2.2);
      const stretch = 1 + p * 2.2;
      return (
        <div
          key={t.name}
          style={{
            position: "absolute",
            left: pos.x,
            top: pos.y,
            translate: "-50% -50%",
            rotate: `${align * angle}rad`,
            scale: `${t.depth * (1 - p * 0.5) * stretch} ${t.depth * (1 - p * 0.7)}`,
            opacity: 1 - lin(p, 0.4, 0.75),
            filter: (() => {
              const b = Math.max(0, 0.7 - t.depth) * 8 + p * 6;
              return b > 0.3 ? `blur(${b}px)` : undefined;
            })(),
          }}
        >
          <SaasTile
            name={t.name}
            price={t.price}
            width={tileW}
            solid
            peel={lin(p, 0.05, 0.35)}
          />
        </div>
      );
    });

  return (
    <Shot push={0}>
      <AbsoluteFill
        style={{
          scale: String(mix(2.6, 1, whip) * (1 + frame * 0.0012)),
          filter:
            smear(whip, 12) > 0.3 ? `blur(${smear(whip, 12)}px)` : undefined,
        }}
      >
        {tiles}
        <DataStream rows={rows} />
        {/* The core: white, Signal rim light, pulsing on the beat. */}
        <div
          style={{
            position: "absolute",
            left: L.cx,
            top: L.cy,
            width: coreSize,
            height: coreSize,
            translate: "-50% -50%",
            borderRadius: "50%",
            backgroundColor: colors.white,
            boxShadow: `0 0 0 3px ${colors.signal}, 0 0 ${40 + absorbed * 2}px ${10 + absorbed}px rgba(228,87,30,0.55), 0 0 160px rgba(255,255,255,0.25)`,
          }}
        />
      </AbsoluteFill>
      <Flash at={dur - 2} />
    </Shot>
  );
};

// ---------------------------------------------------------------------------
// 12b–14. The core snaps out into one glass card; a padlock clicks shut.
// ---------------------------------------------------------------------------
const cardSize = (L: Layout) =>
  L.vertical ? { w: 900, h: 900 } : { w: 1000, h: 620 };

const SecureCard: React.FC<{
  scale: number;
  blur?: number;
  draw: number;
  closed: number;
  lockY: number;
  fill?: string;
  contentOpacity?: number;
  children?: React.ReactNode;
}> = ({
  scale,
  blur = 0,
  draw,
  closed,
  lockY,
  fill,
  contentOpacity = 1,
  children,
}) => {
  const L = useLayout();
  const { w, h } = cardSize(L);
  return (
    <Center>
      <div
        style={{
          scale: String(scale),
          filter: blur > 0.3 ? `blur(${blur}px)` : undefined,
        }}
      >
        <GlassCard
          radius={40}
          glowEdge={1}
          style={{
            width: w,
            height: h,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            ...(fill
              ? { backgroundColor: fill, backdropFilter: undefined }
              : {}),
          }}
        >
          <div
            style={{
              opacity: contentOpacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ translate: `0 ${lockY}px` }}>
              <Padlock
                size={L.vertical ? 240 : 210}
                color={colors.white}
                draw={draw}
                closed={closed}
              />
            </div>
            {children}
          </div>
        </GlassCard>
      </div>
    </Center>
  );
};

export const Lock: React.FC<ShotProps> = () => {
  const frame = useCurrentFrame();
  const snapOut = prog(frame, 1, 8);
  const click =
    frame >= beats(1) ? Math.exp(-(frame - beats(1)) / 3) * 0.035 : 0;
  return (
    <Shot push={0.03}>
      <SecureCard
        scale={mix(0.04, 1, snapOut) * (1 + click)}
        blur={smear(snapOut, 10)}
        draw={prog(frame, 4, 14)}
        closed={prog(frame, beats(1), beats(1) + 4)}
        lockY={0}
      />
      <Flash at={0} />
    </Shot>
  );
};

export const SecureBase: React.FC<ShotProps> = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const up = prog(frame, 0, 7);
  return (
    <Shot push={0.03}>
      <SecureCard
        scale={1.03 + frame * 0.001}
        draw={1}
        closed={1}
        lockY={mix(0, -20, up)}
      >
        <div style={{ marginTop: 40 }}>
          <KineticHeadline
            lines={[copy.secureBase]}
            fontSize={L.vertical ? 100 : 96}
            delay={2}
          />
        </div>
      </SecureCard>
    </Shot>
  );
};

export const ZoomWhite: React.FC<ShotProps> = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const z = progIn(frame, 0, 12);
  const whiteness = lin(frame, 3, 10);
  return (
    <Shot push={0}>
      <SecureCard
        scale={1.05 * mix(1, 16, z)}
        blur={smear(z, 6)}
        draw={1}
        closed={1}
        lockY={-20}
        fill={`rgba(255,255,255,${mix(0.08, 1, whiteness)})`}
        contentOpacity={1 - lin(frame, 0, 5)}
      >
        <div style={{ marginTop: 40 }}>
          <KineticHeadline
            lines={[copy.secureBase]}
            fontSize={L.vertical ? 100 : 96}
            delay={-50}
          />
        </div>
      </SecureCard>
      {frame >= 12 ? (
        <AbsoluteFill style={{ backgroundColor: colors.white }} />
      ) : null}
    </Shot>
  );
};

// ---------------------------------------------------------------------------
// 15. White: dashboard in 3D, benefits stack in, one camera angle per benefit.
// ---------------------------------------------------------------------------
const ANGLES = [-28, -18, -10, -3];
const FLICKER = [
  colors.signal,
  colors.black,
  colors.grey,
  colors.signal,
  colors.black,
  colors.signal,
];
const SURFACES = ["#F4F3F0", "#ECEAE4", "#F7EFE9"];

export const Benefit: React.FC<ShotProps & { index: number }> = ({
  dur,
  index,
}) => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const turn = prog(frame, 0, dur);
  const rotY = ANGLES[index] + turn * 7;
  const rotX = 9 - index * 2;
  const enter = prog(frame, 0, 6);

  // Micro-animation per benefit.
  const tagDrop = index === 0 ? progIn(frame, 8, 26) : 1;
  const slotted = index < 1 ? 0 : index === 1 ? prog(frame, 3, 20) : 1;
  let accent: string = colors.black;
  let surface = SURFACES[0];
  if (index === 2) {
    const step = Math.floor((frame - 4) / 2);
    accent =
      frame < 4 ? colors.black : FLICKER[Math.min(FLICKER.length - 1, step)];
    surface =
      frame < 4 || step >= FLICKER.length
        ? SURFACES[0]
        : SURFACES[step % SURFACES.length];
  }
  const ai = index === 3 ? (Math.floor(frame / 8) % 2 === 0 ? 1 : 0.15) : 0;
  const dashW = L.vertical ? 940 : 880;

  return (
    <Shot bg="white" push={0.05}>
      <AbsoluteFill style={{ perspective: 2400 }}>
        <div
          style={{
            position: "absolute",
            left: L.vertical ? L.cx : 1390,
            top: L.vertical ? 640 : L.cy,
            translate: "-50% -50%",
            transform: `rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${(0.94 + index * 0.03) * mix(1.06, 1, enter)})`,
          }}
        >
          <Dashboard
            width={dashW}
            accent={accent}
            surface={surface}
            slotted={slotted}
            ai={ai}
            tagDrop={tagDrop}
          />
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          gap: L.vertical ? 26 : 30,
          ...(L.vertical
            ? { left: L.marginX, right: L.marginX, top: 1080 }
            : { left: L.marginX, width: 720, top: "50%", translate: "0 -50%" }),
        }}
      >
        {copy.benefits.slice(0, index + 1).map((b, i) => (
          <KineticHeadline
            key={b}
            lines={[b]}
            fontSize={L.vertical ? 68 : 66}
            color={i === index ? colors.black : colors.grey}
            align="left"
            lineHeight={1.02}
            delay={i === index ? 0 : -100}
          />
        ))}
      </div>
    </Shot>
  );
};

// ---------------------------------------------------------------------------
// 16. White: the chat slams back in, and this time it knows.
// ---------------------------------------------------------------------------
const chatWidth = (L: Layout) => (L.vertical ? 940 : 1300);
const chatFont = (L: Layout) => (L.vertical ? 64 : 54);

export const Answer: React.FC<ShotProps> = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const slam = prog(frame, 0, 6);
  return (
    <Shot bg="white" push={0.04}>
      <Center>
        <div
          style={{
            scale: String(mix(1.35, 1, slam)),
            filter:
              smear(slam, 10) > 0.3 ? `blur(${smear(slam, 10)}px)` : undefined,
          }}
        >
          <ChatWindow
            light
            width={chatWidth(L)}
            fontSize={chatFont(L)}
            question={copy.question}
            typed={interpolate(
              frame,
              [3, 13],
              [0, copy.question.length],
              clamp,
            )}
            reply={copy.answer}
            stream={lin(frame, 16, 28)}
            cursor
          />
        </div>
      </Center>
    </Shot>
  );
};

export const Command: React.FC<ShotProps> = ({ dur }) => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const shift = prog(frame, 0, 8);
  const zip = prog(frame, 16, 16 + beats(1));
  const fan = prog(frame, 31, 41);
  const zoom = progIn(frame, dur - 10, dur);
  const black = lin(frame, dur - 8, dur - 2);

  const winX = L.vertical ? L.cx : mix(L.cx, 760, shift);
  const winY = L.vertical ? mix(L.cy, 800, shift) : mix(L.cy, 600, shift);
  const fanOrigin = L.vertical ? { x: L.cx, y: 1360 } : { x: 1520, y: 620 };

  return (
    <Shot bg="white" push={0.03}>
      <AbsoluteFill style={{ scale: String(mix(1, 5, zoom)) }}>
        {/* Drafted emails fan out. */}
        {copy.emails.map((subject, i) => {
          const spread =
            (i - (copy.emails.length - 1) / 2) * (L.vertical ? 9 : 11);
          return (
            <div
              key={subject}
              style={{
                position: "absolute",
                left: fanOrigin.x,
                top: fanOrigin.y + spread * (L.vertical ? 14 : 12) * fan,
                translate: "-50% -50%",
                rotate: `${spread * fan}deg`,
                opacity: lin(frame, 31 + i, 34 + i),
                zIndex: i,
              }}
            >
              <GlassCard
                light
                radius={22}
                style={{ width: L.vertical ? 520 : 440, padding: "22px 28px", backgroundColor: colors.white }}
              >
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 22,
                    letterSpacing: "0.06em",
                    color: colors.grey,
                  }}
                >
                  DRAFT
                </div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontWeight: 600,
                    fontSize: L.vertical ? 40 : 34,
                    color: colors.black,
                    marginTop: 6,
                  }}
                >
                  {subject}
                </div>
              </GlassCard>
            </div>
          );
        })}

        <div
          style={{
            position: "absolute",
            left: winX,
            top: winY,
            translate: "-50% -50%",
            scale: String(mix(1, L.vertical ? 0.86 : 0.82, shift)),
            zIndex: 20,
          }}
        >
          <ChatWindow
            light
            width={chatWidth(L)}
            fontSize={chatFont(L)}
            question={copy.question}
            typed={copy.question.length}
            reply={copy.answer}
            input={copy.command}
            inputTyped={interpolate(
              frame,
              [2, 16],
              [0, copy.command.length],
              clamp,
            )}
            cursor
          >
            {/* Signal progress line zips across in one beat. */}
            <div
              style={{
                marginTop: 24,
                height: 5,
                borderRadius: 3,
                backgroundColor: colors.rule,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${zip * 100}%`,
                  height: "100%",
                  backgroundColor: colors.signal,
                }}
              />
            </div>
          </ChatWindow>
        </div>

        <div
          style={{
            position: "absolute",
            left: L.marginX,
            right: L.marginX,
            top: L.vertical ? L.marginTop : 70,
            zIndex: 30,
          }}
        >
          <KineticHeadline
            lines={[copy.customActions]}
            color={colors.black}
            fontSize={L.vertical ? 76 : 72}
            delay={5}
            lineHeight={1.02}
          />
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: colors.black, opacity: black }} />
    </Shot>
  );
};
