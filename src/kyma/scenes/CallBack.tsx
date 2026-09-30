import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Phone, Stage, phoneDims } from "../devices";
import { GoldDust, LuxBackdrop } from "../fx";
import { Chapter, Kicker, MaskLine } from "../type";
import { AppIcon, CheckIcon } from "../ui";
import { COLORS, EASE, EASE_POP, SANS, SERIF, lerp, prog } from "../theme";

const GREECE = { x: 1000, y: 520 };

// Local times when it is 09:00 in Athens (late September).
const CITIES = [
  { name: "New York", x: 250, y: 440, hh: 2 },
  { name: "Toronto", x: 380, y: 290, hh: 2 },
  { name: "London", x: 700, y: 262, hh: 7 },
  { name: "Dubai", x: 1420, y: 620, hh: 10 },
  { name: "Singapore", x: 1640, y: 800, hh: 14 },
  { name: "Sydney", x: 1560, y: 960, hh: 16 },
];

const pad = (n: number) => String(n).padStart(2, "0");

const arc = (x1: number, y1: number, x2: number, y2: number) => {
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const cx = (x1 + x2) / 2;
  const cy = Math.min(y1, y2) - dist * 0.28;
  const at = (t: number) => ({
    x: (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2,
    y: (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2,
  });
  let len = 0;
  let prev = at(0);
  for (let i = 1; i <= 40; i++) {
    const p = at(i / 40);
    len += Math.hypot(p.x - prev.x, p.y - prev.y);
    prev = p;
  }
  return { d: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`, len, at };
};

const Notification: React.FC<{ title: React.ReactNode; body: string }> = ({ title, body }) => (
  <div
    style={{
      width: 620,
      display: "flex",
      gap: 20,
      padding: "22px 26px",
      borderRadius: 30,
      backgroundColor: "rgba(246,244,240,0.93)",
      boxShadow: "0 36px 70px rgba(0,0,0,0.5)",
      fontFamily: SANS,
    }}
  >
    <AppIcon size={66} />
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 700, letterSpacing: 2, color: COLORS.muted }}>
        <span>KYMA</span>
        <span style={{ letterSpacing: 0, fontWeight: 400 }}>now</span>
      </div>
      <div style={{ marginTop: 4, fontSize: 28, fontWeight: 700, color: COLORS.ink }}>{title}</div>
      <div style={{ marginTop: 4, fontSize: 22, lineHeight: 1.3, color: "#4B5563" }}>{body}</div>
    </div>
  </div>
);

/** Buyers everywhere connect to Greece; the phone lights up with a call-back in the buyer's time zone. */
export const CallBack: React.FC = () => {
  const frame = useCurrentFrame();
  const mm = pad(Math.floor(frame / 5) % 60);
  const dimMap = prog(frame, 96, 30);
  const phoneIn = prog(frame, 100, 42, EASE);
  const PW = 300;
  const pd = phoneDims(PW);

  return (
    <AbsoluteFill>
      <LuxBackdrop />
      <GoldDust count={18} seed="callback" opacity={0.5} />

      {/* World of buyers */}
      <AbsoluteFill
        style={{
          opacity: 1 - dimMap * 0.84,
          scale: String(1 + dimMap * 0.08),
          transformOrigin: `${GREECE.x}px ${GREECE.y}px`,
        }}
      >
        <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, filter: "drop-shadow(0 0 6px rgba(232,211,166,0.7))" }}>
          {CITIES.map((c, i) => {
            const a = arc(c.x, c.y, GREECE.x, GREECE.y);
            const start = 12 + i * 8;
            const draw = prog(frame, start, 40, EASE);
            const cometT = (((frame - start - 30) / 46) % 1 + 1) % 1;
            const comet = a.at(cometT);
            return (
              <g key={c.name}>
                <path
                  d={a.d}
                  fill="none"
                  stroke={COLORS.goldLight}
                  strokeWidth={2}
                  strokeOpacity={0.75}
                  strokeDasharray={a.len}
                  strokeDashoffset={a.len * (1 - draw)}
                />
                {frame > start + 30 ? <circle cx={comet.x} cy={comet.y} r={5} fill={COLORS.ivory} /> : null}
              </g>
            );
          })}
        </svg>
        {CITIES.map((c, i) => {
          const start = 8 + i * 8;
          return (
            <div
              key={c.name}
              style={{
                position: "absolute",
                left: c.x,
                top: c.y,
                opacity: prog(frame, start, 14),
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: -8,
                  top: -8,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  backgroundColor: COLORS.ivory,
                  boxShadow: `0 0 0 6px rgba(246,241,231,0.15)`,
                }}
              />
              <div style={{ position: "absolute", left: 22, top: -30, whiteSpace: "nowrap" }}>
                <div style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 600, color: COLORS.ivory, lineHeight: 1 }}>{c.name}</div>
                <div style={{ marginTop: 4, fontFamily: SANS, fontSize: 22, fontWeight: 600, letterSpacing: 2, color: COLORS.gold }}>
                  {`${pad(c.hh)}:${mm}`}
                </div>
              </div>
            </div>
          );
        })}
        {/* Greece */}
        <div style={{ position: "absolute", left: GREECE.x, top: GREECE.y }}>
          {[0, 25].map((delay) => {
            const t = ((((frame - delay) % 50) + 50) % 50) / 50;
            return (
              <div
                key={delay}
                style={{
                  position: "absolute",
                  left: -50,
                  top: -50,
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  border: `2px solid ${COLORS.goldLight}`,
                  scale: String(0.2 + t * 1.3),
                  opacity: 1 - t,
                }}
              />
            );
          })}
          <div
            style={{
              position: "absolute",
              left: -14,
              top: -14,
              width: 28,
              height: 28,
              borderRadius: "50%",
              backgroundColor: COLORS.goldLight,
              boxShadow: `0 0 40px ${COLORS.gold}`,
            }}
          />
          <div style={{ position: "absolute", left: -120, top: 30, width: 240, textAlign: "center" }}>
            <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 44, color: COLORS.goldLight, lineHeight: 1 }}>Greece</div>
            <div style={{ marginTop: 4, fontFamily: SANS, fontSize: 22, fontWeight: 600, letterSpacing: 2, color: COLORS.gold }}>
              {`09:${mm}`}
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Phase 1 heading */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 70, textAlign: "center", opacity: 1 - prog(frame, 92, 14) }}>
        <Kicker frame={frame} from={4} align="center">
          Buying from abroad
        </Kicker>
        <div style={{ marginTop: 18, fontFamily: SERIF, fontSize: 70, fontWeight: 500, color: COLORS.ivory }}>
          <MaskLine frame={frame} from={10}>
            Wherever you&apos;re buying from.
          </MaskLine>
        </div>
      </div>

      {/* Phase 2: phone + notifications */}
      <Stage perspective={2200}>
        <Phone
          width={PW}
          src="screens/listing-mobile.png"
          style={{
            left: 1160 - pd.outerW / 2,
            top: 610 - pd.outerH / 2,
            opacity: prog(frame, 100, 12),
            transform: `translateY(${lerp(760, Math.sin(frame / 30) * 8, phoneIn)}px) rotateX(${lerp(24, 4, phoneIn)}deg) rotateY(${lerp(-24, -10, phoneIn)}deg)`,
          }}
        />
        {[
          {
            at: 138,
            y: 330,
            title: "Call-back booked",
            body: "Tue 07:00 your time (Sydney) · Eleni Markaki, Chania Estates",
          },
          {
            at: 168,
            y: 490,
            title: (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                Enquiry qualified <CheckIcon size={30} color={COLORS.green} progress={prog(frame, 180, 14)} />
              </span>
            ),
            body: "Budget, timing and visa goals confirmed before it reaches the agent.",
          },
        ].map((n, i) => {
          const p = prog(frame, n.at, 22, EASE_POP);
          return (
            <div
              key={n.at}
              style={{
                position: "absolute",
                left: 1250,
                top: n.y,
                opacity: prog(frame, n.at, 10),
                transform: `translate3d(-50%, ${lerp(-80, 0, p)}px, ${160 + i * 30}px) scale(${lerp(0.85, 1, p)})`,
              }}
            >
              <Notification title={n.title} body={n.body} />
            </div>
          );
        })}
      </Stage>

      <Chapter
        frame={frame}
        from={116}
        num="04"
        label="Connect"
        lines={["A fast call-back,", "in your time zone."]}
        left={110}
        top={600}
        width={640}
        size={70}
      />
    </AbsoluteFill>
  );
};
