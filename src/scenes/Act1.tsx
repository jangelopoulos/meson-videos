import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import {
  beats,
  clusters,
  colors,
  copy,
  fonts,
  glass,
  prices,
  saas,
  type,
} from "../brand";
import { Avatar } from "../components/Avatar";
import { Flash } from "../components/Flash";
import { GlassCard } from "../components/GlassCard";
import { fitSize, KineticHeadline } from "../components/KineticHeadline";
import { SaasTile } from "../components/SaasTile";
import { clamp, ease, exitAt, mix, prog, smear, snap } from "../lib/anim";
import { Layout, useLayout } from "../lib/layout";
import { Center, Shot } from "./Shot";

type ShotProps = { dur: number };

// ---------------------------------------------------------------------------
// 1. "Subscriptions."
// ---------------------------------------------------------------------------
export const Subscriptions: React.FC<ShotProps> = ({ dur }) => {
  const L = useLayout();
  return (
    <Shot>
      <Center>
        <KineticHeadline
          lines={[copy.subscriptions]}
          fontSize={fitSize(copy.subscriptions, L.textWidth, L.t.hero)}
          exitFrame={dur - 7}
        />
      </Center>
    </Shot>
  );
};

// ---------------------------------------------------------------------------
// 2–3. Tile barrage: slams on every beat, then half-beat, then quarter-beat.
// ---------------------------------------------------------------------------
const spawnTimes = (() => {
  const t: number[] = [];
  for (let f = 0; f < beats(2); f += beats(1)) t.push(f);
  for (let f = beats(2); f < beats(4); f += beats(0.5)) t.push(f);
  for (let f = beats(4); f < beats(6); f += beats(0.25))
    t.push(Math.round(f), Math.round(f) + 1);
  return t;
})();

type BarrageTile = {
  name: string;
  price: string;
  at: number;
  depth: number;
  x: number;
  y: number;
  fromX: number;
  fromY: number;
  rot: number;
  value: number;
};

const barragePlan = (L: Layout): BarrageTile[] =>
  spawnTimes.map((at, i) => {
    const r = (k: string) => random(`barrage-${k}-${i}`);
    const depth = 0.55 + r("z") * 0.75;
    // Spread targets over the whole frame, with a bias to fill it.
    const x = (-0.05 + r("x") * 1.1) * L.width;
    const y = (0.04 + r("y") * 0.92) * L.height;
    const edge = Math.floor(r("edge") * 4);
    const off = 1.3;
    const fromX =
      edge === 0
        ? -off * L.width * 0.5
        : edge === 1
          ? L.width * (1 + off * 0.5)
          : x;
    const fromY =
      edge === 2
        ? -off * L.height * 0.5
        : edge === 3
          ? L.height * (1 + off * 0.5)
          : y;
    return {
      name: saas[Math.floor(r("name") * saas.length)],
      price: prices[Math.floor(r("price") * prices.length)],
      at,
      depth,
      x,
      y,
      fromX,
      fromY,
      rot: (r("rot") - 0.5) * 16,
      value: 120 + Math.round(r("val") * 780),
    };
  });

const withCommas = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/** The barrage at local time `t` (also used, frozen, by the freeze beat). */
const BarrageView: React.FC<{ t: number }> = ({ t }) => {
  const L = useLayout();
  const plan = barragePlan(L);
  const onScreen = plan.filter((p) => p.at <= t).length;
  const solid = onScreen > glass.maxBlurredTiles;
  const tileW = L.vertical ? 400 : 420;

  // Counter climbs as tiles land; blurs with speed.
  const total = (time: number) =>
    plan.reduce(
      (acc, p) =>
        acc + p.value * interpolate(time, [p.at, p.at + 6], [0, 1], clamp),
      0,
    );
  const value = total(t);
  const speed = value - total(t - 1);

  return (
    <AbsoluteFill>
      {[...plan]
        .sort((a, b) => a.depth - b.depth)
        .map((p, i) => {
          if (t < p.at) return null;
          const k = prog(t, p.at, p.at + 6);
          const horizontal = p.fromY === p.y;
          const stretch = 1 + smear(k, 0.6);
          const drift = Math.max(0, t - p.at - 6) * 0.0025 * p.depth;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: mix(p.fromX, p.x, k),
                top: mix(p.fromY, p.y, k),
                translate: "-50% -50%",
                scale: `${p.depth * (1 + drift) * (horizontal ? stretch : 1)} ${p.depth * (1 + drift) * (horizontal ? 1 : stretch)}`,
                rotate: `${p.rot}deg`,
                filter: (() => {
                  const b = smear(k, 10) + Math.max(0, 0.78 - p.depth) * 9;
                  return b > 0.3 ? `blur(${b}px)` : undefined;
                })(),
              }}
            >
              <SaasTile
                name={p.name}
                price={p.price}
                width={tileW}
                solid={solid}
              />
            </div>
          );
        })}

      {/* Scrims keep the overlay and counter readable over the tiles. */}
      <AbsoluteFill
        style={{
          zIndex: 15,
          background: L.vertical
            ? "linear-gradient(180deg, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0) 22%, rgba(10,10,10,0) 58%, rgba(10,10,10,0.94) 72%)"
            : "radial-gradient(ellipse 40% 30% at 12% 6%, rgba(10,10,10,0.9), rgba(10,10,10,0)), radial-gradient(ellipse 38% 34% at 88% 90%, rgba(10,10,10,0.95), rgba(10,10,10,0))",
        }}
      />
      {/* Overlay line, top left. */}
      <div
        style={{
          position: "absolute",
          left: L.marginX,
          top: L.marginTop,
          zIndex: 20,
        }}
      >
        <KineticHeadline
          lines={[copy.tooMany]}
          font="body"
          weight={600}
          fontSize={L.t.overlay}
          align="left"
          delay={beats(1)}
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.8)" }}
        />
      </div>

      {/* Counter. */}
      <div
        style={{
          position: "absolute",
          zIndex: 20,
          ...(L.vertical
            ? { left: L.marginX, bottom: L.marginBottom }
            : { right: L.marginX, bottom: L.marginBottom }),
          textAlign: L.vertical ? "left" : "right",
          fontFamily: fonts.mono,
          color: colors.white,
          textShadow: "0 4px 30px rgba(0,0,0,0.9)",
        }}
      >
        <div
          style={{
            fontSize: L.t.mono,
            letterSpacing: type.monoTracking,
            color: colors.grey,
          }}
        >
          {copy.counterLabel}
        </div>
        <div
          style={{
            fontSize: L.vertical ? 150 : 140,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            fontVariantNumeric: "tabular-nums",
            filter:
              Math.abs(speed) > 4
                ? `blur(${Math.min(5, Math.abs(speed) / 60)}px)`
                : undefined,
          }}
        >
          {withCommas(value)}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Barrage: React.FC<ShotProps> = () => {
  const frame = useCurrentFrame();
  return (
    <Shot push={0.06}>
      <BarrageView t={frame} />
    </Shot>
  );
};

/** Everything freezes, then a 2-frame white flash. */
export const Freeze: React.FC<ShotProps> = ({ dur }) => (
  <Shot push={0}>
    <BarrageView t={beats(6) - 1} />
    <Flash at={dur - 2} />
  </Shot>
);

// ---------------------------------------------------------------------------
// 4. "None of them talk to each other."
// ---------------------------------------------------------------------------
export const NoTalk: React.FC<ShotProps> = ({ dur }) => {
  const L = useLayout();
  return (
    <Shot>
      <Center style={{ padding: `0 ${L.marginX}px` }}>
        <KineticHeadline
          lines={[copy.noTalk.text]}
          highlight={copy.noTalk.highlight}
          fontSize={L.t.headline}
          exitFrame={dur - 7}
          style={{ maxWidth: L.textWidth }}
        />
      </Center>
    </Shot>
  );
};

// ---------------------------------------------------------------------------
// 5. Six clusters; an avatar darts between them, faster every trip.
// ---------------------------------------------------------------------------
const clusterAnchors = (L: Layout) =>
  L.vertical
    ? [
        { x: 250, y: 500 },
        { x: 540, y: 720 },
        { x: 830, y: 500 },
        { x: 250, y: 1260 },
        { x: 540, y: 1480 },
        { x: 830, y: 1260 },
      ]
    : [
        { x: 360, y: 230 },
        { x: 960, y: 200 },
        { x: 1560, y: 230 },
        { x: 360, y: 760 },
        { x: 960, y: 790 },
        { x: 1560, y: 760 },
      ];

const TRIP_ORDER = [0, 4, 2, 3, 1, 5, 0, 2, 4, 3];
const TRIP_LENGTHS = [14, 10, 8, 6, 5, 4, 3, 3];

const tripTimeline = () => {
  const out: { from: number; to: number; start: number; end: number }[] = [];
  let t = 6;
  for (let i = 0; i < TRIP_LENGTHS.length; i++) {
    out.push({
      from: TRIP_ORDER[i],
      to: TRIP_ORDER[i + 1],
      start: t,
      end: t + TRIP_LENGTHS[i],
    });
    t += TRIP_LENGTHS[i] + 1; // brief stop at each cluster
  }
  return out;
};

const avatarAt = (time: number, anchors: { x: number; y: number }[]) => {
  const trips = tripTimeline();
  if (time <= trips[0].start) return { ...anchors[trips[0].from], moving: 0 };
  for (const tr of trips) {
    if (time < tr.start) return { ...anchors[tr.from], moving: 0 };
    if (time <= tr.end) {
      const k = interpolate(time, [tr.start, tr.end], [0, 1], {
        ...clamp,
        easing: snap,
      });
      const a = anchors[tr.from];
      const b = anchors[tr.to];
      return { x: mix(a.x, b.x, k), y: mix(a.y, b.y, k), moving: smear(k, 1) };
    }
  }
  return { ...anchors[trips[trips.length - 1].to], moving: 0 };
};

export const Clusters: React.FC<ShotProps> = ({ dur }) => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const anchors = clusterAnchors(L);
  const tileW = L.vertical ? 320 : 360;
  const trips = tripTimeline();
  const out = exitAt(frame, dur);
  const avatarSize = L.vertical ? 110 : 96;

  return (
    <Shot push={0.05}>
      <AbsoluteFill style={{ opacity: out }}>
        {clusters.map((c, ci) => {
          const a = anchors[ci];
          const pin = prog(frame, ci * 1.5, ci * 1.5 + 8);
          // Badge pops each time the avatar leaves this cluster.
          const leaves = trips.filter(
            (tr) => tr.from === ci && tr.start <= frame,
          );
          const lastLeave = leaves[leaves.length - 1];
          const badgeIndex = lastLeave ? trips.indexOf(lastLeave) : 0;
          const badgePop = lastLeave ? ease(frame, lastLeave.start, 10) : 0;
          return (
            <div
              key={c.label}
              style={{
                position: "absolute",
                left: a.x,
                top: a.y,
                translate: "-50% -50%",
                scale: String(mix(1.25, 1, pin)),
                opacity: pin,
                filter: pin < 1 ? `blur(${(1 - pin) * 12}px)` : undefined,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: L.vertical ? 48 : 40,
                  letterSpacing: type.monoTracking,
                  color: colors.grey,
                  marginBottom: 14,
                  textAlign: "center",
                }}
              >
                {c.label}
              </div>
              <div
                style={{
                  position: "relative",
                  width: tileW + 30,
                  height: tileW * 0.34 + 30,
                }}
              >
                {c.tools.slice(0, 3).map((t, ti) => (
                  <div
                    key={t}
                    style={{
                      position: "absolute",
                      left: ti * 15,
                      top: ti * 15,
                      rotate: `${(ti - 1) * 3}deg`,
                    }}
                  >
                    <SaasTile
                      name={saas[t]}
                      price={prices[(t * 7) % prices.length]}
                      width={tileW}
                    />
                  </div>
                ))}
              </div>
              {lastLeave ? (
                <div
                  style={{
                    position: "absolute",
                    right: L.vertical ? 0 : -22,
                    top: L.vertical ? 50 : 34,
                    minWidth: 58,
                    height: 58,
                    padding: "0 14px",
                    boxSizing: "border-box",
                    borderRadius: 29,
                    backgroundColor: colors.white,
                    color: colors.black,
                    fontFamily: fonts.mono,
                    fontSize: 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    scale: String(badgePop),
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  }}
                >
                  {copy.badges[Math.max(0, badgeIndex) % copy.badges.length]}
                </div>
              ) : null}
            </div>
          );
        })}

        {/* Avatar with motion trail and a data card. */}
        {[6, 4, 2, 0].map((lag) => {
          const p = avatarAt(frame - lag, anchors);
          const isHead = lag === 0;
          if (!isHead && p.moving < 0.05) return null;
          return (
            <div
              key={lag}
              style={{
                position: "absolute",
                left: p.x,
                top: p.y + (L.vertical ? 190 : 175),
                translate: "-50% -50%",
                opacity: isHead ? 1 : 0.12 + (6 - lag) * 0.05,
                zIndex: 10,
              }}
            >
              <Avatar size={avatarSize} />
              {isHead ? (
                <GlassCard
                  radius={12}
                  style={{
                    position: "absolute",
                    left: avatarSize * 0.7,
                    top: -avatarSize * 0.35,
                    width: 74,
                    height: 54,
                    padding: 10,
                    rotate: `${p.moving * 12}deg`,
                  }}
                >
                  <div
                    style={{
                      height: 6,
                      width: "80%",
                      borderRadius: 3,
                      backgroundColor: "rgba(255,255,255,0.7)",
                    }}
                  />
                  <div
                    style={{
                      height: 6,
                      width: "55%",
                      marginTop: 7,
                      borderRadius: 3,
                      backgroundColor: "rgba(255,255,255,0.4)",
                    }}
                  />
                  <div
                    style={{
                      height: 6,
                      width: "65%",
                      marginTop: 7,
                      borderRadius: 3,
                      backgroundColor: "rgba(255,255,255,0.4)",
                    }}
                  />
                </GlassCard>
              ) : null}
            </div>
          );
        })}
      </AbsoluteFill>
    </Shot>
  );
};

// ---------------------------------------------------------------------------
// 6. Montage: one word per beat. The avatar slumps on the last one.
// ---------------------------------------------------------------------------
export const Montage: React.FC<ShotProps> = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const i = Math.min(copy.montage.length - 1, Math.floor(frame / beats(1)));
  const local = frame - i * beats(1);
  const isLast = i === copy.montage.length - 1;
  const word = copy.montage[i];
  return (
    <Shot push={0}>
      <AbsoluteFill style={{ scale: String(1 + local * 0.005) }}>
        <Center style={{ flexDirection: "column", gap: 40 }}>
          {/* Keyed per word so each beat is a hard cut with a fresh reveal. */}
          <WordAt
            key={i}
            word={word}
            size={fitSize(word, L.textWidth, L.t.hero)}
            offset={i * beats(1)}
          />
          <Avatar
            size={L.vertical ? 150 : 120}
            slump={isLast ? ease(local, 3, 10) : 0}
          />
        </Center>
      </AbsoluteFill>
    </Shot>
  );
};

const WordAt: React.FC<{ word: string; size: number; offset: number }> = ({
  word,
  size,
  offset,
}) => <KineticHeadline lines={[word]} fontSize={size} delay={offset} />;

// ---------------------------------------------------------------------------
// 7. "You became the integration."
// ---------------------------------------------------------------------------
export const Integration: React.FC<ShotProps> = ({ dur }) => {
  const L = useLayout();
  return (
    <Shot>
      <Center style={{ padding: `0 ${L.marginX}px` }}>
        <KineticHeadline
          lines={[copy.integration.text]}
          highlight={copy.integration.highlight}
          fontSize={L.t.headline}
          exitFrame={dur - 7}
          style={{ maxWidth: L.textWidth }}
        />
      </Center>
    </Shot>
  );
};
