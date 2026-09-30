import React from "react";
import { AbsoluteFill, Easing, Img, staticFile, useCurrentFrame } from "remotion";
import { Phone, Stage, phoneDims } from "../devices";
import { GoldDust, LightSweep } from "../fx";
import { Kicker, MaskLine } from "../type";
import { CheckIcon, GlassChip } from "../ui";
import {
  COLORS,
  EASE,
  EASE_INOUT,
  EASE_POP,
  SANS,
  SERIF,
  fadeOut,
  fmt,
  lerp,
  prog,
} from "../theme";

// Phone layout
const PW = 380;
const PCX = 560;
const PCY = 545;

// Where exploded cards settle
const CARD_CX = 1330;
const CARD_CY = 670;

type Accent = "scan" | "yield" | "cost" | "seal" | "partners";

type Beat = {
  num: string;
  q: string;
  sub: string;
  img: string;
  srcW: number;
  srcH: number;
  w: number;
  accent: Accent;
  /** Region of the mobile screenshot to highlight, in screenshot pixels. */
  hl?: { x: number; y: number; w: number; h: number };
};

const BEATS: Beat[] = [
  {
    num: "01",
    q: "Is it legally clean?",
    sub: "Title, permit and planning, each marked Verified, Declared or Unknown.",
    img: "kyma/ui/legal.png",
    srcW: 1588,
    srcH: 799,
    w: 940,
    accent: "scan",
    hl: { x: 40, y: 1192, w: 724, h: 520 },
  },
  {
    num: "02",
    q: "Is it a good investment?",
    sub: "Net yields from comparable rents nearby, and price per m² against the area.",
    img: "kyma/ui/yield.png",
    srcW: 1588,
    srcH: 389,
    w: 1000,
    accent: "yield",
    hl: { x: 287, y: 926, w: 230, h: 122 },
  },
  {
    num: "03",
    q: "What will it really cost?",
    sub: "Taxes, notary, lawyer and fees, itemised before you make an offer.",
    img: "kyma/ui/costs.png",
    srcW: 1588,
    srcH: 929,
    w: 820,
    accent: "cost",
    hl: { x: 40, y: 926, w: 234, h: 122 },
  },
  {
    num: "04",
    q: "Golden Visa? Holiday lets?",
    sub: "Clear eligibility, stated plainly on every home.",
    img: "kyma/ui/visa.png",
    srcW: 1588,
    srcH: 236,
    w: 1020,
    accent: "seal",
    hl: { x: 531, y: 926, w: 233, h: 122 },
  },
  {
    num: "05",
    q: "Who can I trust to get it done?",
    sub: "Licensed agents only, with reviews and vetted local partners.",
    img: "kyma/ui/agent.png",
    srcW: 755,
    srcH: 188,
    w: 720,
    accent: "partners",
  },
];

const STARTS = [150, 212, 274, 336, 398];
const BEAT_LEN = 62;

const PARTNERS = [
  "Licensed agents",
  "Property lawyers",
  "Mortgage brokers",
  "Currency transfers",
  "Property managers",
];

const SEAL_TEXT = "GOLDEN VISA · ELIGIBLE · €400K TIER · ";

const BadgePanel: React.FC<{ big: string; small: string }> = ({ big, small }) => (
  <div
    style={{
      padding: "18px 28px 20px",
      borderRadius: 22,
      backgroundColor: "rgba(8,20,36,0.88)",
      border: "1px solid rgba(232,211,166,0.6)",
      boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
      whiteSpace: "nowrap",
    }}
  >
    <div style={{ fontFamily: SERIF, fontSize: 84, fontWeight: 600, color: COLORS.goldLight, lineHeight: 1 }}>{big}</div>
    <div style={{ marginTop: 6, fontFamily: SANS, fontSize: 22, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: COLORS.ivoryMuted }}>
      {small}
    </div>
  </div>
);

const AccentLayer: React.FC<{ beat: Beat; f: number; frame: number; w: number; h: number }> = ({
  beat,
  f,
  frame,
  w,
  h,
}) => {
  if (beat.accent === "scan") {
    const scan = prog(f, 20, 26, (t) => t);
    const pop = prog(f, 30, 16, EASE_POP);
    return (
      <>
        {f >= 20 && f <= 48 ? (
          <div
            style={{
              position: "absolute",
              left: -w / 2 - 10,
              top: -h / 2 + scan * h,
              width: w + 20,
              height: 3,
              backgroundColor: COLORS.goldLight,
              boxShadow: `0 0 24px 6px rgba(232,211,166,0.6)`,
              transform: "translateZ(30px)",
            }}
          />
        ) : null}
        <div
          style={{
            position: "absolute",
            left: w / 2 - 40,
            top: -h / 2 - 30,
            opacity: prog(f, 30, 8),
            transform: `translateZ(90px) translate(-100%, -50%) scale(${lerp(0.5, 1, pop)})`,
          }}
        >
          <GlassChip dot={COLORS.green} size={26}>
            3 of 4 checks verified
          </GlassChip>
        </div>
      </>
    );
  }
  if (beat.accent === "yield" || beat.accent === "cost") {
    const t = prog(f, 18, 26, EASE);
    const pop = prog(f, 16, 16, EASE_POP);
    const big = beat.accent === "yield" ? `${(3.2 * t).toFixed(1)}%` : `€${fmt(lerp(485000, 525110, t))}`;
    const small = beat.accent === "yield" ? "Net yield · long-term let" : "All-in, before you offer";
    return (
      <div
        style={{
          position: "absolute",
          left: w / 2 + 40,
          top: -h / 2 + 10,
          opacity: prog(f, 16, 8),
          transform: `translateZ(110px) translate(-100%, -70%) scale(${lerp(0.5, 1, pop)})`,
          transformOrigin: "100% 100%",
        }}
      >
        <BadgePanel big={big} small={small} />
      </div>
    );
  }
  if (beat.accent === "seal") {
    const pop = prog(f, 14, 20, EASE_POP);
    const size = 230;
    const r = 88;
    return (
      <div
        style={{
          position: "absolute",
          left: w / 2 - size * 1.05,
          top: -h / 2 - size * 1.02,
          width: size,
          height: size,
          opacity: prog(f, 14, 8),
          transform: `translateZ(120px) scale(${lerp(0.3, 1, pop)}) rotate(${lerp(-40, 0, pop)}deg)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 30%, #F3E3BD 0%, #C8A56A 55%, #8E6E3A 100%)",
            boxShadow: "0 24px 50px rgba(0,0,0,0.5), inset 0 0 0 6px rgba(255,255,255,0.25)",
          }}
        />
        <svg width={size} height={size} style={{ position: "absolute", left: 0, top: 0, rotate: `${frame * 1.2}deg` }}>
          <defs>
            <path
              id="kyma-seal-path"
              d={`M ${size / 2} ${size / 2} m -${r} 0 a ${r} ${r} 0 1 1 ${r * 2} 0 a ${r} ${r} 0 1 1 -${r * 2} 0`}
            />
          </defs>
          <text fontFamily={SANS} fontSize={19} fontWeight={700} letterSpacing={3.2} fill={COLORS.navy}>
            <textPath href="#kyma-seal-path">{SEAL_TEXT}</textPath>
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            left: size / 2 - 42,
            top: size / 2 - 42,
            width: 84,
            height: 84,
            borderRadius: "50%",
            backgroundColor: COLORS.navy,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckIcon size={52} color={COLORS.goldLight} progress={prog(f, 24, 16)} stroke={3.4} />
        </div>
      </div>
    );
  }
  // partners
  return (
    <>
      {PARTNERS.map((label, j) => {
        const row = j < 3 ? 0 : 1;
        const col = row === 0 ? j - 1 : j - 3.5;
        const pop = prog(f, 14 + j * 4, 16, EASE_POP);
        return (
          <div
            key={label}
            style={{
              position: "absolute",
              left: col * 330,
              top: h / 2 + 70 + row * 84,
              opacity: prog(f, 14 + j * 4, 8),
              transform: `translateZ(${60 + j * 12}px) translate(-50%, -50%) scale(${lerp(0.5, 1, pop)})`,
            }}
          >
            <GlassChip dot={j === 0 ? COLORS.green : COLORS.gold} size={26}>
              {label}
            </GlassChip>
          </div>
        );
      })}
    </>
  );
};

/**
 * The villa, full bleed, shrinks into the phone. Then each buyer question
 * bursts out of the phone as a floating card from the real listing page.
 */
export const Listing: React.FC = () => {
  const frame = useCurrentFrame();
  const pd = phoneDims(PW);
  const phoneLeft = PCX - pd.outerW / 2;
  const phoneTop = PCY - pd.outerH / 2;
  const screenLeft = phoneLeft + pd.bezel;
  const screenTop = phoneTop + pd.bezel;
  const heroH = 625 * pd.imgScale;

  const morph = prog(frame, 86, 42, EASE_INOUT);
  const kb = lerp(1.1, 1.0, prog(frame, 0, 110, Easing.out(Easing.quad)));
  const textOut = fadeOut(frame, 72, 16);
  const phoneTurn = prog(frame, 136, 34, EASE_INOUT);
  const bob = Math.sin(frame / 30) * 8 * phoneTurn;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.night }}>
      {/* Blurred villa backdrop for the second half */}
      <AbsoluteFill style={{ opacity: prog(frame, 80, 50), overflow: "hidden" }}>
        <Img
          src={staticFile("kyma/photos/villa.jpg")}
          style={{
            position: "absolute",
            left: -140,
            top: -560,
            width: 2200,
            maxWidth: "none",
            filter: "blur(36px) brightness(0.34) saturate(1.15)",
          }}
        />
        <AbsoluteFill
          style={{
            background: "linear-gradient(90deg, rgba(5,11,21,0.35) 0%, rgba(5,11,21,0.7) 60%, rgba(5,11,21,0.85) 100%)",
          }}
        />
      </AbsoluteFill>
      <GoldDust count={20} seed="listing" opacity={0.5 * prog(frame, 110, 30)} />

      <Stage perspective={2000} origin="50% 50%">
        <Phone
          width={PW}
          src="screens/listing-mobile.png"
          screenOpacity={prog(frame, 108, 16)}
          style={{
            left: phoneLeft,
            top: phoneTop,
            opacity: prog(frame, 104, 14),
            transform: `translateY(${bob}px) rotateY(${lerp(0, 14, phoneTurn) + Math.sin(frame / 50) * 3 * phoneTurn}deg)`,
          }}
        >
          {BEATS.map((b, i) => {
            if (!b.hl) {
              return null;
            }
            const f = frame - STARTS[i];
            if (f < 0 || f > BEAT_LEN) {
              return null;
            }
            const s = pd.imgScale;
            return (
              <div
                key={b.num}
                style={{
                  position: "absolute",
                  left: b.hl.x * s,
                  top: b.hl.y * s,
                  width: b.hl.w * s,
                  height: b.hl.h * s,
                  borderRadius: 14,
                  border: `3px solid ${COLORS.goldLight}`,
                  boxShadow: "0 0 24px rgba(232,211,166,0.8), inset 0 0 18px rgba(232,211,166,0.35)",
                  opacity: Math.min(prog(f, 4, 10), 1 - prog(f, 48, 10)),
                }}
              />
            );
          })}
          <LightSweep frame={frame} from={138} duration={30} />
        </Phone>

        {BEATS.map((b, i) => {
          const f = frame - STARTS[i];
          if (f < 0 || f > BEAT_LEN + 14) {
            return null;
          }
          const w = b.w;
          const h = (b.srcH / b.srcW) * w;
          const cin = prog(f, 4, 28, EASE);
          const cout = prog(f, 50, 14, EASE_INOUT);
          const x = lerp(PCX - CARD_CX, 0, cin) + cout * 260;
          const y = lerp(PCY - CARD_CY, 0, cin) - cout * 80 + Math.sin(frame / 26) * 6 * cin;
          const z = lerp(-300, 0, cin) - cout * 520;
          return (
            <div
              key={b.num}
              style={{
                position: "absolute",
                left: CARD_CX,
                top: CARD_CY,
                width: 0,
                height: 0,
                transformStyle: "preserve-3d",
                opacity: Math.min(prog(f, 4, 8), 1 - cout),
                transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${lerp(40, -6, cin) - cout * 22}deg) rotateX(${lerp(10, 2, cin)}deg) scale(${lerp(0.25, 1, cin)})`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: -w / 2,
                  top: -h / 2,
                  width: w,
                  height: h,
                  borderRadius: 18,
                  overflow: "hidden",
                  boxShadow: "0 50px 100px rgba(0,0,0,0.55), 0 0 0 1.5px rgba(232,211,166,0.55)",
                }}
              >
                <Img src={staticFile(b.img)} style={{ width: w, height: h, display: "block" }} />
                <LightSweep frame={f} from={22} duration={28} opacity={0.7} />
              </div>
              <AccentLayer beat={b} f={f} frame={frame} w={w} h={h} />
            </div>
          );
        })}
      </Stage>

      {/* Question headings */}
      {BEATS.map((b, i) => {
        const f = frame - STARTS[i];
        if (f < -2 || f > BEAT_LEN + 2) {
          return null;
        }
        return (
          <div
            key={b.num}
            style={{
              position: "absolute",
              left: 830,
              top: 96,
              width: 1000,
              opacity: 1 - prog(f, 50, 10),
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 22 }}>
              <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 44, color: COLORS.gold, opacity: prog(f, 0, 12) }}>
                {b.num}
              </div>
              <div style={{ fontFamily: SERIF, fontSize: 70, fontWeight: 500, color: COLORS.ivory, lineHeight: 1.05 }}>
                <MaskLine frame={f} from={2}>
                  {b.q}
                </MaskLine>
              </div>
            </div>
            <div
              style={{
                marginTop: 10,
                marginLeft: 66,
                fontFamily: SANS,
                fontSize: 28,
                color: COLORS.ivoryMuted,
                opacity: prog(f, 10, 16),
                translate: `0px ${(1 - prog(f, 10, 18, EASE)) * 12}px`,
              }}
            >
              {b.sub}
            </div>
          </div>
        );
      })}

      {/* Full-bleed villa that shrinks into the phone's hero image */}
      {frame < 142 ? (
        <div
          style={{
            position: "absolute",
            left: lerp(0, screenLeft, morph),
            top: lerp(0, screenTop, morph),
            width: lerp(1920, PW, morph),
            height: lerp(1080, heroH, morph),
            overflow: "hidden",
            borderRadius: `${pd.radius * morph}px ${pd.radius * morph}px 0 0`,
            opacity: 1 - prog(frame, 128, 12),
            boxShadow: `0 40px 80px rgba(0,0,0,${0.5 * morph})`,
          }}
        >
          <Img
            src={staticFile("kyma/photos/villa.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 64%", scale: String(kb) }}
          />
          <AbsoluteFill
            style={{
              opacity: 1 - morph,
              background:
                "linear-gradient(180deg, rgba(5,11,21,0) 22%, rgba(5,11,21,0.55) 52%, rgba(5,11,21,0.94) 100%), linear-gradient(90deg, rgba(5,11,21,0.55) 0%, rgba(5,11,21,0) 60%)",
            }}
          />
        </div>
      ) : null}

      {/* Brochure text over the full-bleed photo */}
      {frame < 92 ? (
        <div style={{ position: "absolute", left: 120, top: 560, opacity: textOut }}>
          <Kicker frame={frame} from={6}>
            Kambani · Chania · Crete
          </Kicker>
          <div style={{ marginTop: 18, fontFamily: SERIF, fontSize: 104, fontWeight: 500, lineHeight: 1.0, color: COLORS.ivory }}>
            <MaskLine frame={frame} from={12}>
              Sea-view stone villa
            </MaskLine>
            <MaskLine frame={frame} from={22} style={{ fontStyle: "italic", color: COLORS.goldLight }}>
              with pool.
            </MaskLine>
          </div>
          <div
            style={{
              marginTop: 24,
              display: "flex",
              alignItems: "center",
              gap: 28,
              opacity: prog(frame, 36, 16),
              translate: `0px ${(1 - prog(frame, 36, 20, EASE)) * 14}px`,
            }}
          >
            <div style={{ fontFamily: SERIF, fontSize: 64, fontWeight: 600, color: COLORS.goldLight }}>€485,000</div>
            <div style={{ fontFamily: SANS, fontSize: 26, color: COLORS.ivoryMuted }}>
              4 beds · 3 baths · 210 m² · Built 2019
            </div>
            <GlassChip dot={COLORS.green} size={22}>
              Verified · 3 of 4 checks
            </GlassChip>
          </div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
