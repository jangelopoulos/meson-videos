import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { beats, colors, copy, fonts } from "../brand";
import { ChatWindow } from "../components/ChatWindow";
import { GlassCard } from "../components/GlassCard";
import { KineticHeadline } from "../components/KineticHeadline";
import { clamp, exitAt, mix, prog, smear } from "../lib/anim";
import { Layout, useLayout } from "../lib/layout";
import { Center, Shot } from "./Shot";

type ShotProps = { dur: number };

const chipSlots = (L: Layout) =>
  L.vertical
    ? copy.aiChips.map((_, i) => ({ x: L.cx, y: 780 + i * 230 }))
    : copy.aiChips.map((_, i) => ({ x: L.cx + (i - 1) * 520, y: 600 }));

const Chip: React.FC<{ label: string; fontSize: number }> = ({
  label,
  fontSize,
}) => (
  <GlassCard
    radius={999}
    style={{
      padding: `${fontSize * 0.42}px ${fontSize * 0.9}px`,
      display: "flex",
      alignItems: "center",
      gap: fontSize * 0.35,
      whiteSpace: "nowrap",
    }}
  >
    <div
      style={{
        width: fontSize * 0.36,
        height: fontSize * 0.36,
        borderRadius: "50%",
        border: "2px solid rgba(255,255,255,0.7)",
      }}
    />
    <div
      style={{
        fontFamily: fonts.body,
        fontWeight: 600,
        fontSize,
        color: colors.white,
        letterSpacing: "-0.01em",
      }}
    >
      {label}
    </div>
  </GlassCard>
);

// ---------------------------------------------------------------------------
// 8. Three AI chips drop in on consecutive beats.
// ---------------------------------------------------------------------------
export const Chips: React.FC<ShotProps> = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const slots = chipSlots(L);
  const size = L.vertical ? 76 : 68;
  return (
    <Shot push={0.06}>
      {copy.aiChips.map((label, i) => {
        const at = beats(i);
        const k = prog(frame, at, at + 7);
        if (frame < at) return null;
        return (
          <div
            key={label}
            style={{
              position: "absolute",
              left: slots[i].x,
              top: mix(-200, slots[i].y, k),
              translate: "-50% -50%",
              scale: `1 ${1 + smear(k, 0.35)}`,
              filter:
                smear(k, 10) > 0.3 ? `blur(${smear(k, 10)}px)` : undefined,
            }}
          >
            <Chip label={label} fontSize={size} />
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: L.vertical ? L.marginTop : 230,
          padding: `0 ${L.marginX}px`,
        }}
      >
        <KineticHeadline
          lines={[copy.aiTalk]}
          fontSize={L.vertical ? 96 : 96}
          delay={2}
        />
      </div>
    </Shot>
  );
};

// ---------------------------------------------------------------------------
// 9. Chips merge into a chat window that can't see your data.
// ---------------------------------------------------------------------------
export const Chat: React.FC<ShotProps> = ({ dur }) => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const slots = chipSlots(L);
  const merge = prog(frame, 0, 7);
  const punch = prog(frame, 4, 12);
  const replyAt = 36;
  const shakeT = frame - (replyAt + 2);
  const shake =
    shakeT > 0 && shakeT < 12
      ? Math.sin(shakeT * 2.4) * 22 * (1 - shakeT / 12)
      : 0;
  const out = exitAt(frame, dur, 6);
  const width = L.vertical ? 940 : 1240;

  return (
    <Shot push={0.05}>
      {merge < 1
        ? copy.aiChips.map((label, i) => (
            <div
              key={label}
              style={{
                position: "absolute",
                left: mix(slots[i].x, L.cx, merge),
                top: mix(slots[i].y, L.cy, merge),
                translate: "-50% -50%",
                opacity: 1 - merge,
                scale: String(1 - merge * 0.4),
              }}
            >
              <Chip label={label} fontSize={L.vertical ? 76 : 68} />
            </div>
          ))
        : null}
      <Center>
        <div
          style={{
            scale: String(mix(0.55, 1, punch) * (1 + (1 - out) * 0.08)),
            opacity: Math.min(punch * 1.5, out),
            translate: `${shake}px 0`,
            filter:
              smear(punch, 8) > 0.3 ? `blur(${smear(punch, 8)}px)` : undefined,
          }}
        >
          <ChatWindow
            width={width}
            fontSize={L.vertical ? 64 : 54}
            question={copy.question}
            typed={interpolate(
              frame,
              [9, 30],
              [0, copy.question.length],
              clamp,
            )}
            reply={frame >= replyAt ? copy.noAccess : undefined}
            cursor
          />
        </div>
      </Center>
    </Shot>
  );
};

// ---------------------------------------------------------------------------
// 10. "AI is only as good / as the data it can see."
// ---------------------------------------------------------------------------
export const AiData: React.FC<ShotProps> = ({ dur }) => {
  const L = useLayout();
  return (
    <Shot>
      <Center style={{ padding: `0 ${L.marginX}px` }}>
        <KineticHeadline
          lines={copy.aiData.lines}
          highlight={copy.aiData.highlight}
          fontSize={L.vertical ? L.t.statement : 132}
          lineDelay={beats(1)}
          lineHeight={1.05}
          exitFrame={dur - 7}
          style={{ maxWidth: L.textWidth }}
        />
      </Center>
    </Shot>
  );
};

// ---------------------------------------------------------------------------
// 11. "We had the same problem." then a beat of silence.
// ---------------------------------------------------------------------------
export const SameProblem: React.FC<ShotProps> = ({ dur }) => {
  const L = useLayout();
  const textEnd = dur - beats(1);
  return (
    <Shot>
      <Center style={{ padding: `0 ${L.marginX}px` }}>
        <KineticHeadline
          lines={[copy.sameProblem]}
          fontSize={L.t.headline}
          exitFrame={textEnd - 7}
          style={{ maxWidth: L.textWidth }}
        />
      </Center>
    </Shot>
  );
};
