import React from "react";
import { Easing, Img, interpolate, staticFile } from "remotion";
import {
  Bubble,
  Check,
  DatabaseIcon,
  FlowDot,
  K,
  OrbitBubble,
  PhoneIcon,
  cardStyle,
  clamp,
  easeInOut,
  hover,
  pop,
  prog,
  pulseShadow,
  rise,
} from "./ui";

// Every stage is laid out in a 464px-wide column (the source card width) and
// reports a fixed height so the chain can be stacked and connected.
export const COL_W = 464;

type StageProps = { t: number };

const asset = (f: string) => staticFile(`lifecycle/${f}`);

// ---------------------------------------------------------------------------
// 01 The enquiry lands: sources float around the new lead, data flows in,
// then "New enquiry received" arrives as its own card below.
// ---------------------------------------------------------------------------
const ORBIT1_H = 300;
const C1 = { x: COL_W / 2, y: ORBIT1_H / 2 };

// Source positions (from the card's percentage layout), spread a little wider
// now they are no longer inside a container.
const spread = (cx: number, cy: number, c: { x: number; y: number }, k = 1.12) => ({
  cx: c.x + (cx - c.x) * k,
  cy: c.y + (cy - c.y) * k,
});
const src1 = (leftPct: number, topPct: number, size: number) =>
  spread((leftPct / 100) * COL_W + size / 2, (topPct / 100) * 250 + size / 2 + 25, C1);

const LEAD_SOURCES: Bubble[] = [
  {
    key: "rea",
    ...src1(9, 12, 54),
    size: 54,
    periodS: 7,
    phaseS: 0.74,
    content: <span style={{ fontSize: 12, fontWeight: 700, color: "#E4002B", letterSpacing: "-0.03em" }}>rea</span>,
  },
  {
    key: "crm",
    ...src1(40, 4, 46),
    size: 46,
    periodS: 7,
    phaseS: 2.3,
    content: <DatabaseIcon color={K.ink} size={22} />,
  },
  {
    key: "domain",
    ...src1(68, 8, 58),
    size: 58,
    periodS: 7,
    phaseS: 1.11,
    content: <span style={{ fontSize: 12, fontWeight: 700, color: "#0EA800", letterSpacing: "-0.02em" }}>Domain</span>,
  },
  {
    key: "facebook",
    ...src1(82, 52, 50),
    size: 50,
    periodS: 7,
    phaseS: 4.1,
    content: (
      <span style={{ width: 26, height: 26, borderRadius: "50%", background: "#1877F2", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 700, fontFamily: "Georgia, serif" }}>
        f
      </span>
    ),
  },
  {
    key: "instagram",
    ...src1(60, 70, 48),
    size: 48,
    periodS: 5,
    phaseS: 1.8,
    content: (
      <span style={{ width: 22, height: 22, borderRadius: 7, border: "2.2px solid #E1306C", display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", border: "2.2px solid #E1306C", boxSizing: "border-box" }} />
      </span>
    ),
  },
  {
    key: "form",
    ...src1(14, 62, 56),
    size: 56,
    periodS: 5,
    phaseS: 3.3,
    content: (
      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={K.ink} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18" />
        <path d="M7 13h6" />
        <path d="M7 16h4" />
      </svg>
    ),
  },
];

const Ring: React.FC<{ c: { x: number; y: number }; d: number; color: string; p: number }> = ({ c, d, color, p }) => (
  <span
    style={{
      position: "absolute",
      left: c.x - d / 2,
      top: c.y - d / 2,
      width: d,
      height: d,
      borderRadius: "50%",
      border: `1px dashed ${color}`,
      opacity: p,
      scale: String(0.6 + 0.4 * p),
    }}
  />
);

const ENQUIRY_Y = ORBIT1_H + 18;
export const LEAD_H = ENQUIRY_Y + 78;

export const LeadStage: React.FC<StageProps> = ({ t }) => {
  const flowStart = 34;
  // The lead gives a small pulse as the flowing data lands.
  const landed = prog(t, flowStart + 14, 18);
  return (
    <div style={{ position: "relative", width: COL_W, height: LEAD_H }}>
      <span
        style={{
          position: "absolute",
          left: C1.x - 170,
          top: C1.y - 170,
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(20,184,166,.18) 0%, rgba(20,184,166,0) 65%)",
          opacity: prog(t, 0, 20),
        }}
      />
      <Ring c={C1} d={150} color="rgba(20,184,166,.45)" p={prog(t, 4, 18)} />
      <Ring c={C1} d={236} color="rgba(20,184,166,.25)" p={prog(t, 8, 18)} />
      {LEAD_SOURCES.map((b, i) => (
        <FlowDot key={`d-${b.key}`} from={{ x: b.cx, y: b.cy }} to={C1} t={t} start={flowStart + i * 2} />
      ))}
      <span
        style={{
          position: "absolute",
          left: C1.x - 32,
          top: C1.y - 32,
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: K.tealDark,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 0 8px rgba(14,138,125,.28), 0 0 0 ${8 + 14 * landed}px rgba(20,184,166,${0.35 * (1 - landed) * (landed > 0 ? 1 : 0)})`,
          ...pop(t, 0, 16),
        }}
      >
        <svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="#F6F6F4" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </span>
      <span
        style={{
          position: "absolute",
          left: C1.x,
          top: C1.y + 42,
          translate: "-50% 0",
          fontSize: 11,
          fontWeight: 600,
          color: K.tealDark,
          background: K.white,
          borderRadius: 999,
          padding: "3px 9px",
          whiteSpace: "nowrap",
          boxShadow: "0 2px 8px rgba(0,0,0,.25)",
          opacity: prog(t, 10, 10),
        }}
      >
        New lead
      </span>
      {LEAD_SOURCES.map((b, i) => (
        <OrbitBubble key={b.key} b={b} t={t} enterAt={8 + i * 3} center={C1} />
      ))}

      <div style={{ position: "absolute", left: 0, top: ENQUIRY_Y, width: COL_W, ...cardStyle, padding: "14px 18px 16px", ...rise(t, 50) }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>New enquiry received</span>
          <span style={{ fontSize: 12, color: K.tealDark, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>09:14</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", marginTop: 6, fontSize: 13, color: K.body }}>
          <span style={{ fontWeight: 600, color: K.ink }}>Sam Taylor</span>
          <span>Brighton East</span>
          <span>Enquired on 12 Example St</span>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 02 Called within 10 minutes: rings, connects, voice waveform talks, and a
// timer clock sweeps to 7 minutes.
// ---------------------------------------------------------------------------
export const CALL_H = 213;

const VOICE = [8, 14, 20, 12, 22, 16, 10, 18, 24, 14, 8, 16, 20, 12, 18, 10, 22, 14, 9, 17, 21, 12];

// Speech-like level: bursts of talk with short pauses, plus per-bar jitter.
const voiceLevel = (t: number, i: number) => {
  const s = t / 30;
  const burst = 0.55 + 0.45 * Math.sin(s * 2.1) * Math.sin(s * 0.9 + 1);
  const jitter = 0.5 + 0.5 * Math.sin(s * 11 + i * 1.7) * Math.cos(s * 7.3 + i * 0.6);
  return Math.max(0.2, Math.min(1, 0.25 + burst * jitter));
};

const TimerClock: React.FC<{ p: number; done: number }> = ({ p, done }) => {
  const r = 19;
  const c = 2 * Math.PI * r;
  const frac = 0.7 * p; // 7 of 10 minutes
  const a = frac * 2 * Math.PI - Math.PI / 2;
  return (
    <span style={{ position: "relative", width: 44, height: 44, flex: "none" }}>
      <svg width={44} height={44} viewBox="0 0 44 44" style={{ position: "absolute", inset: 0 }}>
        <circle cx={22} cy={22} r={r} fill="none" stroke={K.mintBg} strokeWidth={5} />
        {Array.from({ length: 10 }, (_, i) => {
          const ta = (i / 10) * 2 * Math.PI - Math.PI / 2;
          return (
            <line key={i} x1={22 + 13 * Math.cos(ta)} y1={22 + 13 * Math.sin(ta)} x2={22 + 11 * Math.cos(ta)} y2={22 + 11 * Math.sin(ta)} stroke="#C9C9C4" strokeWidth={1} opacity={1 - done} />
          );
        })}
        <circle
          cx={22}
          cy={22}
          r={r}
          fill="none"
          stroke={K.tealDark}
          strokeWidth={5}
          strokeDasharray={`${frac * c} ${c}`}
          transform="rotate(-90 22 22)"
        />
        <g opacity={1 - done}>
          <line x1={22} y1={22} x2={22 + 11 * Math.cos(a)} y2={22 + 11 * Math.sin(a)} stroke={K.ink} strokeWidth={1.6} strokeLinecap="round" />
          <circle cx={22} cy={22} r={1.8} fill={K.ink} />
        </g>
      </svg>
      <span
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 700,
          fontVariantNumeric: "tabular-nums",
          opacity: done,
          scale: String(0.7 + 0.3 * done),
        }}
      >
        7<span style={{ fontSize: 8, fontWeight: 600, color: K.muted, marginLeft: 1 }}>m</span>
      </span>
    </span>
  );
};

export const CallStage: React.FC<StageProps> = ({ t }) => {
  const connected = prog(t, 16, 8);
  const talk = prog(t, 18, 10);
  const clock = prog(t, 22, 36, easeInOut);
  const clockDone = prog(t, 58, 10);
  const minute = Math.round(14 + 7 * clock);
  return (
    <div style={{ width: COL_W, ...cardStyle, padding: 18, ...rise(t, 0) }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ position: "relative", width: 52, height: 52, flex: "none" }}>
          <Img src={asset("meson-caller.jpg")} style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", objectPosition: "52% 24%", display: "block" }} />
          <span style={{ position: "absolute", right: -2, bottom: -2, width: 14, height: 14, borderRadius: "50%", background: K.tealDark, border: "2px solid #fff", boxSizing: "border-box", boxShadow: pulseShadow(t) }} />
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 2, height: 26, flex: 1, minWidth: 0, overflow: "hidden" }}>
          {VOICE.map((h, i) => (
            <span
              key={i}
              style={{
                width: 3,
                height: h,
                borderRadius: 2,
                background: K.tealDark,
                scale: `1 ${0.18 + (1 - 0.18) * talk * voiceLevel(t, i)}`,
              }}
            />
          ))}
        </div>
        <span style={{ width: 52, height: 52, borderRadius: "50%", background: K.soft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 600, color: K.body, flex: "none" }}>
          ST
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginTop: 14 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>Calling Sam Taylor</div>
          <div style={{ fontSize: 12, color: K.muted }}>Attempt 1 · your agency's name</div>
        </div>
        <span style={{ position: "relative", display: "inline-grid" }}>
          <span style={{ gridArea: "1/1", justifySelf: "end", fontSize: 12, fontWeight: 600, color: K.muted, background: K.soft, borderRadius: 999, padding: "5px 10px", display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap", opacity: 1 - connected }}>
            <PhoneIcon color={K.muted} />
            Ringing…
          </span>
          <span
            style={{
              gridArea: "1/1",
              fontSize: 12,
              fontWeight: 600,
              color: K.tealDark,
              background: K.mintBg,
              borderRadius: 999,
              padding: "5px 10px",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              whiteSpace: "nowrap",
              opacity: connected,
              scale: String(interpolate(t, [16, 28], [0.7, 1], { ...clamp, easing: Easing.out(Easing.back(2)) })),
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: K.tealDark }} />
            Connected
          </span>
        </span>
      </div>
      <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${K.line}`, display: "flex", alignItems: "center", gap: 12 }}>
        <TimerClock p={clock} done={clockDone} />
        <div style={{ fontSize: 13, color: K.body, lineHeight: 1.4 }}>
          <span style={{ fontWeight: 600, color: K.ink, fontVariantNumeric: "tabular-nums" }}>09:{String(minute).padStart(2, "0")}</span>
          <span style={{ opacity: clockDone }}> · connected 7 minutes after the enquiry</span>
          <br />
          <span style={{ fontSize: 12, color: K.muted, opacity: prog(t, 64, 10) }}>Inside the 10-minute window</span>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 03 Qualified, or filtered out: fields fill, the recording plays, the
// transcript writes itself live, then "Qualified" is ticked.
// ---------------------------------------------------------------------------
export const QUAL_H = 421;

const REC = [6, 10, 16, 9, 18, 12, 7, 14, 20, 11, 6, 13, 17, 9, 5, 12, 15, 8, 11, 6, 9, 14, 7, 10, 8, 5, 11, 7, 4, 9, 6, 10, 5, 8, 4, 7, 9, 5];
const QUOTE = `"Downsizing once the youngest finishes school. We'd want a price guide first."`;
export const QUAL_TIMING = { play: 22, typeStart: 30, charsPerFrame: 1.7 };
const typeEnd = QUAL_TIMING.typeStart + QUOTE.length / QUAL_TIMING.charsPerFrame;
const QUALIFIED_AT = Math.round(typeEnd) + 6;

const Field: React.FC<{ label: string; value: string; dot?: boolean; t: number; at: number }> = ({ label, value, dot, t, at }) => (
  <div style={{ background: K.soft, borderRadius: 10, padding: "9px 12px", ...rise(t, at, 12, 8) }}>
    <div style={{ fontSize: 12, color: K.muted }}>{label}</div>
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em", marginTop: 2 }}>
      {dot ? <span style={{ width: 7, height: 7, borderRadius: "50%", background: K.tealDark }} /> : null}
      {value}
    </div>
  </div>
);

export const QualStage: React.FC<StageProps> = ({ t }) => {
  const playing = t >= QUAL_TIMING.play;
  const playP = prog(t, QUAL_TIMING.play, typeEnd - QUAL_TIMING.play + 10, Easing.linear);
  const head = playP * 0.64 * REC.length; // bars played so far
  const typed = Math.max(0, Math.floor((t - QUAL_TIMING.typeStart) * QUAL_TIMING.charsPerFrame));
  const shown = QUOTE.slice(0, typed);
  const typing = typed > 0 && typed < QUOTE.length;
  const secs = Math.floor(Math.max(0, t - QUAL_TIMING.play) / 30);
  const q = prog(t, QUALIFIED_AT, 12);
  return (
    <div style={{ width: COL_W, display: "flex", flexDirection: "column" }}>
      <div style={{ ...cardStyle, padding: 18, ...rise(t, 0) }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>Qualification</div>
          <span style={{ display: "inline-grid" }}>
            <span style={{ gridArea: "1/1", justifySelf: "end", fontSize: 12, fontWeight: 600, color: K.muted, background: K.soft, borderRadius: 999, padding: "5px 10px", whiteSpace: "nowrap", opacity: 1 - q }}>
              Qualifying…
            </span>
            <span
              style={{
                gridArea: "1/1",
                fontSize: 12,
                fontWeight: 600,
                color: K.tealDark,
                background: K.mintBg,
                borderRadius: 999,
                padding: "5px 10px",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                opacity: q,
                scale: String(interpolate(t, [QUALIFIED_AT, QUALIFIED_AT + 14], [0.6, 1], { ...clamp, easing: Easing.out(Easing.back(2.2)) })),
              }}
            >
              <Check p={prog(t, QUALIFIED_AT + 4, 12)} />
              Qualified
            </span>
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8, marginTop: 12 }}>
          <Field label="Intent" value="Selling" dot t={t} at={8} />
          <Field label="Timeframe" value="3–6 months" dot t={t} at={12} />
          <Field label="Appraisal" value="Not yet" t={t} at={16} />
          <Field label="Suburb" value="Brighton East" t={t} at={20} />
        </div>
        <div style={{ marginTop: 12, background: K.ink, color: "#F6F6F4", borderRadius: 12, padding: "12px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 32, height: 32, borderRadius: "50%", background: K.tealDark, display: "flex", alignItems: "center", justifyContent: "center", flex: "none", boxShadow: playing ? pulseShadow(t, 5, 40) : "none" }}>
              {playing ? (
                <svg width={14} height={14} viewBox="0 0 24 24" fill="#F6F6F4">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg width={14} height={14} viewBox="0 0 24 24" fill="#F6F6F4">
                  <path d="M7 5v14l11-7z" />
                </svg>
              )}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 2, height: 22, flex: 1, minWidth: 0, overflow: "hidden" }}>
              {REC.map((h, i) => {
                const played = i < head;
                const near = Math.max(0, 1 - Math.abs(i - head) / 3);
                const bounce = playing ? 1 + 0.35 * near * Math.sin(t * 0.9 + i) : 1;
                return (
                  <span
                    key={i}
                    style={{
                      width: 2.5,
                      height: h,
                      borderRadius: 2,
                      background: played ? K.tealDark : "#C9C9C4",
                      opacity: played ? 0.9 : 1,
                      scale: `1 ${bounce}`,
                    }}
                  />
                );
              })}
            </div>
            <span style={{ fontSize: 12, color: K.faint, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
              0:{String(secs).padStart(2, "0")} / 4:12
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginTop: 10, paddingTop: 10, borderTop: "1px solid #2A2A2A" }}>
            <span style={{ fontSize: 12, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={K.teal} strokeWidth={2.4} strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h10" />
              </svg>
              Transcript
              <span style={{ fontSize: 10, fontWeight: 600, color: K.teal, marginLeft: 4, opacity: typing ? 0.6 + 0.4 * Math.sin(t * 0.4) : 0 }}>● live</span>
            </span>
            <span style={{ fontSize: 11, color: K.faint }}>Recorded · attached to the contact</span>
          </div>
          <p style={{ margin: "8px 0 0", fontSize: 13, color: "#C9C9C4", lineHeight: 1.45 }}>
            <span style={{ color: K.teal, fontWeight: 600, opacity: prog(t, QUAL_TIMING.typeStart - 6, 6) }}>Sam:</span>{" "}
            {shown}
            {typing ? <span style={{ display: "inline-block", width: 2, height: 14, background: K.teal, verticalAlign: "-2px", marginLeft: 1, opacity: Math.floor(t / 8) % 2 ? 1 : 0.2 }} /> : null}
            {/* Reserve the full text's space so the card doesn't grow while typing */}
            <span style={{ color: "transparent" }}>{QUOTE.slice(shown.length)}</span>
          </p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", opacity: prog(t, QUALIFIED_AT + 12, 8) }}>
        <span style={{ width: 2, height: 10, background: "#2A2A2A" }} />
      </div>
      <div
        style={{
          ...cardStyle,
          padding: "10px 14px",
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          alignItems: "center",
          ...rise(t, QUALIFIED_AT + 14, 14, 12),
          opacity: 0.9 * prog(t, QUALIFIED_AT + 14, 14),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 28, height: 28, borderRadius: "50%", background: K.soft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: K.muted }}>JR</span>
          <span style={{ fontSize: 13, color: K.body }}>Second enquiry, same listing · renter</span>
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, color: K.body, background: K.soft, borderRadius: 999, padding: "5px 10px", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 6 }}>
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={K.muted} strokeWidth={2.6} strokeLinecap="round">
            <path d="M6 6 18 18" />
            <path d="M18 6 6 18" />
          </svg>
          Not a fit — no follow-up
        </span>
      </div>
    </div>
  );
};
export const QUAL_DONE = QUALIFIED_AT + 30;

// ---------------------------------------------------------------------------
// 04 Appointment booked: the calendar tile pings on its own, then opens out
// into the booking card; the week, SMS and delivered tick follow.
// ---------------------------------------------------------------------------
export const APPT_H = 266;
const TILE_W = 52;
const TILE_H = 62;
const TILE_FINAL = { x: 18 + TILE_W / 2, y: 18 + TILE_H / 2 };
const TILE_START = { x: COL_W / 2, y: APPT_H / 2 };
const OPEN_AT = 34;
const OPEN_LEN = 22;

const CalendarTile: React.FC = () => (
  <span style={{ display: "block", width: TILE_W, borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 14px rgba(17,17,17,.14)", textAlign: "center", background: K.white }}>
    <span style={{ display: "block", background: K.tealDark, color: "#F6F6F4", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 0 3px" }}>Thu</span>
    <span style={{ display: "block", color: K.ink, fontSize: 22, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1, padding: "6px 0 7px" }}>17</span>
  </span>
);

export const ApptStage: React.FC<StageProps> = ({ t }) => {
  const open = prog(t, OPEN_AT, OPEN_LEN, easeInOut);
  const tileScale = 1.6 + (1 - 1.6) * open;
  const tx = TILE_START.x + (TILE_FINAL.x - TILE_START.x) * open;
  const ty = TILE_START.y + (TILE_FINAL.y - TILE_START.y) * open;
  // Card grows out of the tile: clip from the tile's box to the full card.
  const hw = (TILE_W / 2) * 1.6 + 6;
  const hh = (TILE_H / 2) * 1.6 + 6;
  const top = (TILE_START.y - hh) * (1 - open);
  const left = (TILE_START.x - hw) * (1 - open);
  const right = (COL_W - TILE_START.x - hw) * (1 - open);
  const bottom = (APPT_H - TILE_START.y - hh) * (1 - open);
  const radius = 14 + 2 * open;
  const content = (at: number) => rise(t, OPEN_AT + OPEN_LEN - 6 + at, 12, 8);
  const ping = (at: number) => {
    const p = prog(t, at, 22, Easing.out(Easing.quad));
    return p > 0 && p < 1 ? p : 0;
  };
  const days = [
    ["M", "14"],
    ["T", "15"],
    ["W", "16"],
    ["T", "17"],
    ["F", "18"],
  ];
  const pick = prog(t, OPEN_AT + OPEN_LEN + 20, 12, Easing.out(Easing.back(2)));
  return (
    <div style={{ position: "relative", width: COL_W, height: APPT_H }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          ...cardStyle,
          boxShadow: open >= 1 ? cardStyle.boxShadow : "none",
          clipPath: open >= 1 ? undefined : `inset(${top}px ${right}px ${bottom}px ${left}px round ${radius}px)`,
          opacity: open > 0 ? 1 : 0,
          padding: 18,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: TILE_W, height: TILE_H, flex: "none" }} />
          <div style={{ flex: 1, minWidth: 0, ...content(0) }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>Appointment booked</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: K.tealDark, whiteSpace: "nowrap" }}>2:30pm</span>
            </div>
            <div style={{ fontSize: 13, color: K.body }}>Your agent · 12 Example St, Brighton East</div>
            <div style={{ fontSize: 12, color: K.muted }}>Added to the agent's calendar</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4, marginTop: 14, paddingTop: 12, borderTop: `1px solid ${K.line}` }}>
          {days.map(([d, n], i) => {
            const sel = i === 3;
            return (
              <div key={n} style={{ textAlign: "center", ...content(6 + i * 2) }}>
                <div style={{ fontSize: 10, color: K.muted }}>{d}</div>
                <div style={{ position: "relative", margin: "4px auto 0", width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: sel && pick > 0.5 ? "#F6F6F4" : K.body }}>
                  {sel ? <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: K.tealDark, scale: String(pick) }} /> : null}
                  <span style={{ position: "relative" }}>{n}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end", ...rise(t, OPEN_AT + OPEN_LEN + 32, 14, 14) }}>
          <div style={{ maxWidth: "86%", background: K.tealDark, color: "#F6F6F4", borderRadius: "16px 16px 4px", padding: "10px 13px", fontSize: 13, lineHeight: 1.45 }}>
            Hi Sam, confirming your appraisal on Thursday at 2:30pm with your agent from [Agency]. Reply C to confirm.
          </div>
        </div>
        <div style={{ textAlign: "right", fontSize: 11, color: K.muted, marginTop: 5, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 4, opacity: prog(t, OPEN_AT + OPEN_LEN + 44, 8) }}>
          <Check p={prog(t, OPEN_AT + OPEN_LEN + 46, 12)} />
          Delivered · SMS sent automatically
        </div>
      </div>

      {/* Ping rings around the lone tile before it opens */}
      {[4, 16].map((at) => {
        const p = ping(at);
        return (
          <span
            key={at}
            style={{
              position: "absolute",
              left: TILE_START.x - 50,
              top: TILE_START.y - 50,
              width: 100,
              height: 100,
              borderRadius: 26,
              border: `2px solid ${K.teal}`,
              opacity: (1 - p) * (p > 0 ? 0.9 : 0) * (1 - open),
              scale: String(0.9 + 1.1 * p),
            }}
          />
        );
      })}
      <span
        style={{
          position: "absolute",
          left: tx - TILE_W / 2,
          top: ty - TILE_H / 2,
          width: TILE_W,
          height: TILE_H,
          scale: String(tileScale * interpolate(t, [0, 12], [0.3, 1], { ...clamp, easing: Easing.out(Easing.back(1.8)) })),
          opacity: prog(t, 0, 6, Easing.linear),
          rotate: `${interpolate(t, [4, 8, 12, 16, 20], [0, -6, 5, -3, 0], clamp)}deg`,
        }}
      >
        <CalendarTile />
      </span>
    </div>
  );
};
export const APPT_DONE = OPEN_AT + OPEN_LEN + 60;

// ---------------------------------------------------------------------------
// 05 Everything lands in your CRM: CRM mark with logos hovering, then the
// contact card ticks off each synced item.
// ---------------------------------------------------------------------------
const ORBIT5_H = 220;
const C5 = { x: COL_W / 2, y: ORBIT5_H / 2 };
const src5 = (leftPct: number, topPct: number, size: number) =>
  spread((leftPct / 100) * COL_W + size / 2, (topPct / 100) * 190 + size / 2 + 15, C5, 1.1);
const logo = (f: string, h: number) => <Img src={asset(f)} style={{ maxWidth: "100%", height: h, width: "auto", objectFit: "contain", display: "block" }} />;

const CRM_LOGOS: Bubble[] = [
  { key: "reapit", ...src5(6, 14, 60), size: 60, periodS: 5, phaseS: 0, content: <span style={{ padding: 12, display: "flex" }}>{logo("reapit.png", 14)}</span> },
  { key: "mri", ...src5(30, 4, 54), size: 54, periodS: 7, phaseS: 1.1, content: <span style={{ padding: 11, display: "flex" }}>{logo("mri-box-dice.png", 18)}</span> },
  { key: "lockedon", ...src5(66, 8, 58), size: 58, periodS: 7, phaseS: 0.4, content: <span style={{ padding: 12, display: "flex" }}>{logo("lockedon.png", 13)}</span> },
  { key: "rex", ...src5(84, 46, 50), size: 50, periodS: 7, phaseS: 1.7, content: <span style={{ padding: 10, display: "flex" }}>{logo("rex.svg", 16)}</span> },
  { key: "hubspot", ...src5(64, 66, 56), size: 56, periodS: 5, phaseS: 0.8, content: <span style={{ padding: 11, display: "flex" }}>{logo("hubspot.png", 12)}</span> },
  { key: "pipedrive", ...src5(28, 70, 52), size: 52, periodS: 5, phaseS: 2.2, content: <span style={{ padding: 10, display: "flex" }}>{logo("pipedrive.png", 10)}</span> },
  { key: "api", ...src5(6, 54, 46), size: 46, periodS: 7, phaseS: 1.4, content: <span style={{ fontSize: 10, fontWeight: 700, color: K.body, letterSpacing: "-0.02em" }}>API</span> },
];

const CONTACT_Y = ORBIT5_H + 18;
const SYNC_ROWS = ["Contact updated", "Call outcome and notes logged", "Recording and transcript attached", "Appraisal added to agent calendar"];
export const CRM_H = CONTACT_Y + 196;
const CONTACT_AT = 40;

export const CrmStage: React.FC<StageProps> = ({ t }) => {
  const rowsAt = CONTACT_AT + 18;
  return (
    <div style={{ position: "relative", width: COL_W, height: CRM_H }}>
      <span
        style={{
          position: "absolute",
          left: C5.x - 150,
          top: C5.y - 150,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(20,184,166,.16) 0%, rgba(20,184,166,0) 65%)",
          opacity: prog(t, 0, 20),
        }}
      />
      <Ring c={C5} d={136} color="rgba(20,184,166,.4)" p={prog(t, 4, 18)} />
      {CRM_LOGOS.map((b, i) => (
        <FlowDot key={`d-${b.key}`} from={C5} to={{ x: b.cx, y: b.cy }} t={t} start={26 + i * 2} />
      ))}
      <span
        style={{
          position: "absolute",
          left: C5.x - 30,
          top: C5.y - 30,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: K.ink,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 0 8px rgba(255,255,255,.07), 0 0 0 1px rgba(20,184,166,.5)",
          ...pop(t, 0, 16),
          translate: `0 ${hover(t, 6, 0.5) * 0.5}px`,
        }}
      >
        <DatabaseIcon color={K.teal} size={26} />
      </span>
      <span
        style={{
          position: "absolute",
          left: C5.x,
          top: C5.y + 40,
          translate: "-50% 0",
          fontSize: 11,
          fontWeight: 600,
          color: K.ink,
          background: K.white,
          borderRadius: 999,
          padding: "3px 9px",
          whiteSpace: "nowrap",
          boxShadow: "0 2px 8px rgba(0,0,0,.25)",
          opacity: prog(t, 10, 10),
        }}
      >
        Your CRM
      </span>
      {CRM_LOGOS.map((b, i) => (
        <OrbitBubble key={b.key} b={b} t={t} enterAt={6 + i * 3} center={C5} />
      ))}

      <div style={{ position: "absolute", left: 0, top: CONTACT_Y, width: COL_W, ...cardStyle, padding: "12px 18px 14px", ...rise(t, CONTACT_AT) }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>Contact: Sam Taylor</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: K.tealDark, display: "inline-flex", alignItems: "center", gap: 4, opacity: prog(t, CONTACT_AT + 10, 8) }}>
            <Check p={prog(t, CONTACT_AT + 10, 12)} size={13} />
            Synced
          </span>
        </div>
        <div style={{ marginTop: 6 }}>
          {SYNC_ROWS.map((label, i) => {
            const at = rowsAt + i * 7;
            return (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderTop: `1px solid ${K.line}`, fontSize: 13 }}>
                <span style={{ width: 20, height: 20, borderRadius: "50%", background: K.mintBg, display: "flex", alignItems: "center", justifyContent: "center", flex: "none", ...pop(t, at, 10) }}>
                  <Check p={prog(t, at + 3, 10)} />
                </span>
                <span style={{ flex: 1, fontWeight: 500, ...rise(t, at, 10, 6) }}>{label}</span>
                <span style={{ fontSize: 12, color: K.muted, opacity: prog(t, at + 4, 8) }}>09:29</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export const CRM_DONE = CONTACT_AT + 18 + 3 * 7 + 20;

// ---------------------------------------------------------------------------
// 06 Follow-up keeps running: the timeline draws down, attempt 1 completes
// and "next" moves on to attempt 2.
// ---------------------------------------------------------------------------
export const FOLLOW_H = 286;
const STEPS = [
  { label: "Call · attempt 1", when: "Today", icon: "phone" },
  { label: "Call · attempt 2", when: "Tomorrow", icon: "phone" },
  { label: "SMS · check-in", when: "Next week", icon: "sms" },
  { label: "Call · market update", when: "Next month", icon: "phone" },
] as const;
const ADVANCE_AT = 52;

const SmsIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export const FollowStage: React.FC<StageProps> = ({ t }) => {
  const rail = prog(t, 10, 30, easeInOut);
  const adv = prog(t, ADVANCE_AT, 10);
  // Row states: 0 = done, 1 = current, 2 = upcoming. Before the advance,
  // attempt 1 is current; after, it's done and attempt 2 is current.
  const stateOf = (i: number) => (i === 0 ? 1 - adv : i === 1 ? 1 + (1 - adv) : 2);
  return (
    <div style={{ width: COL_W, ...cardStyle, padding: 18, ...rise(t, 0) }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>Follow-up sequence</div>
          <div style={{ fontSize: 12, color: K.muted }}>Didn't answer, or not ready yet</div>
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, color: K.tealDark, background: K.mintBg, borderRadius: 999, padding: "5px 10px", display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap", ...pop(t, 6, 14) }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: K.tealDark, boxShadow: pulseShadow(t) }} />
          Campaign active
        </span>
      </div>
      <div style={{ position: "relative", marginTop: 10 }}>
        <span style={{ position: "absolute", left: 11, top: 14, bottom: 14, width: 2, background: K.line, transformOrigin: "50% 0", scale: `1 ${rail}` }} />
        {/* Progress along the rail up to the current step */}
        <span style={{ position: "absolute", left: 11, top: 14, width: 2, height: 40 * adv, background: K.tealDark }} />
        {STEPS.map((s, i) => {
          const st = stateOf(i);
          const done = Math.max(0, 1 - st); // 1 when fully done
          const cur = st <= 1 ? st : 2 - st; // 1 when current
          const isPhone = s.icon === "phone";
          const iconColor = done > 0.5 ? "#F6F6F4" : cur > 0.5 ? K.tealDark : K.muted;
          return (
            <div key={s.label} style={{ display: "grid", gridTemplateColumns: "24px 1fr auto", gap: 10, alignItems: "center", padding: "8px 0", ...rise(t, 12 + i * 7, 12, 8) }}>
              <span
                style={{
                  position: "relative",
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: done > 0.5 ? K.tealDark : cur > 0.5 ? K.white : K.soft,
                  boxShadow: cur > 0.5 ? `inset 0 0 0 2px ${K.tealDark}, ${pulseShadow(t)}` : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  scale: String(1 + 0.25 * Math.sin(Math.PI * Math.min(1, Math.max(0, (t - ADVANCE_AT) / 10))) * (i < 2 ? 1 : 0)),
                }}
              >
                {isPhone ? <PhoneIcon color={iconColor} /> : <SmsIcon color={iconColor} />}
              </span>
              <span style={{ fontSize: 13, fontWeight: cur > 0.5 ? 600 : 500, color: done > 0.5 ? K.muted : K.ink }}>{s.label}</span>
              <span style={{ fontSize: 12, color: cur > 0.5 ? K.tealDark : K.muted, fontWeight: cur > 0.5 ? 600 : 400 }}>{s.when}</span>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 8, paddingTop: 10, borderTop: `1px solid ${K.line}`, fontSize: 12, color: K.muted, opacity: prog(t, 44, 12) }}>
        People make the calls. Automation sets the timing.
      </div>
    </div>
  );
};
