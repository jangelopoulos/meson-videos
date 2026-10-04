// Auto-converted from AgentPhone Motion Brief.html (data-shot="routing"), 1280x940.
import {useT} from "../lib/time";
import React from "react";
import {A} from "../lib/A";
import {Easing, interpolate} from "remotion";
import {draw, prog} from "../lib/anim";
import {Count} from "../lib/bits";
import {Amb} from "../lib/Amb";

export const TOKEN = 44;
export const LANDED = 96; // token reaches Send SMS; taken branch glows, others dim

// The call token's route, in canvas px: inbound → hours → contact →
// listing agent (rings out) → no answer → Send SMS.
const ROUTE: [number, number, number][] = [
  [TOKEN, 148, 52],
  [TOKEN + 8, 148, 145],
  [TOKEN + 16, 148, 254],
  [TOKEN + 24, 148, 361],
  [TOKEN + 36, 148, 361], // rings out at the listing agent
  [TOKEN + 44, 148, 463],
  [LANDED, 448, 463],
];
const PATH_NODES: Record<string, number> = {"28,14": 0, "28,106": 1, "28,210": 2, "28,320": 3, "28,424": 5, "328,424": 6};

const tokenAt = (f: number) => {
  const xs = ROUTE.map((r) => r[0]);
  const opts = {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad)} as const;
  return [interpolate(f, xs, ROUTE.map((r) => r[1]), opts), interpolate(f, xs, ROUTE.map((r) => r[2]), opts)];
};

/** Path nodes light green as the token passes. */
const lit = (f: number, left: number, top: number): React.CSSProperties => {
  const idx = PATH_NODES[`${left},${top}`];
  const p = prog(f, ROUTE[idx][0] - 2, 6);
  const final = idx === 6 ? prog(f, LANDED, 8) : 0;
  return {
    boxShadow: `0 0 0 ${2 * p}px rgba(16,196,110,${0.55 * p}), 0 0 0 ${10 * final}px rgba(16,196,110,.16), 0 14px 30px -16px rgba(16,74,52,.3)`,
  };
};

const CallToken: React.FC = () => {
  const f = useT();
  if (f < TOKEN - 4) return null;
  const [x, y] = tokenAt(f);
  const ring = f > TOKEN + 24 && f < TOKEN + 36;
  const veil = prog(f, LANDED - 2, 10);
  // Green trail behind the token.
  const pts = ROUTE.filter((r) => r[0] <= f).map((r) => `${r[1]},${r[2]}`);
  pts.push(`${x},${y}`);
  return (
    <>
      <div style={{position: "absolute", inset: 0, background: "rgba(238,244,240,.62)", opacity: veil, zIndex: 2}} />
      <svg width="900" height="600" style={{position: "absolute", left: 0, top: 0, zIndex: 2, overflow: "visible"}}>
        <polyline points={pts.join(" ")} fill="none" stroke="#10c46e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div style={{position: "absolute", left: x - 9, top: y - 9, width: 18, height: 18, borderRadius: "50%", zIndex: 4, opacity: prog(f, TOKEN - 4, 4) * (1 - prog(f, LANDED + 6, 6)),
        background: "radial-gradient(circle at 35% 35%,#7df0b6,#0c9a55)", boxShadow: "0 0 0 5px rgba(16,196,110,.25), 0 0 22px 6px rgba(16,196,110,.55)"}}>
        {ring ? <Amb as="span" kind="ccRing" dur={0.5} style={{position: "absolute", inset: -8, borderRadius: "50%", background: "rgba(245,158,11,.55)"}} /> : null}
      </div>
    </>
  );
};

export const RoutingScreen: React.FC = () => {
  const f = useT();
  return (
  <div style={{position: "relative", width: 1280, height: 940, overflow: "hidden"}}>
    <div data-screen-label="46a" style={{width: "1280px", height: "940px", borderRadius: "24px", overflow: "hidden", position: "relative", background: "#eef4f0", color: "#16241d"}}>
      <div style={{position: "absolute", inset: "0", background: "radial-gradient(60% 50% at 8% 0%,#b9f6d6 0%,transparent 58%),radial-gradient(55% 50% at 100% 12%,#cbe8ff 0%,transparent 56%),radial-gradient(60% 55% at 70% 100%,#ffe2c2 0%,transparent 50%),#eef4f0"}} />
      <div style={{position: "absolute", inset: "0", padding: "26px 24px", display: "flex", flexDirection: "column", minHeight: "0"}}>
        <div style={{display: "flex", alignItems: "flex-end", gap: "14px", flex: "none"}}>
          <div>
            <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "10px", letterSpacing: ".16em", color: "#8a9690", fontWeight: "600"}}>
              SETTINGS · CALL FLOWS
            </div>
            <div style={{display: "flex", alignItems: "center", gap: "9px", marginTop: "3px"}}>
              <span style={{fontFamily: "'Geist',sans-serif", fontSize: "26px", fontWeight: "800", letterSpacing: "-.02em"}}>
                Main line · +61 3 9000 4471
              </span>
              <span style={{fontSize: "9px", fontWeight: "700", color: "#0c6b43", background: "rgba(16,196,110,.13)", border: "1px solid rgba(16,196,110,.3)", borderRadius: "999px", padding: "3px 9px"}}>
                LIVE
              </span>
            </div>
          </div>
          <div style={{marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px"}}>
            <span style={{display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: "700", color: "#5d7468", background: "rgba(255,255,255,.65)", border: "1px solid rgba(255,255,255,.95)", borderRadius: "11px", padding: "8px 13px"}}>
              Test call
            </span>
            <span style={{display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: "700", color: "#5d7468", background: "rgba(255,255,255,.65)", border: "1px solid rgba(255,255,255,.95)", borderRadius: "11px", padding: "8px 13px"}}>
              Version history
            </span>
            <span style={{display: "flex", alignItems: "center", gap: "7px", fontSize: "12.5px", fontWeight: "700", color: "#fff", background: "linear-gradient(180deg,#10c46e,#0c9a55)", boxShadow: "0 12px 26px -10px rgba(12,154,85,.6)", borderRadius: "11px", padding: "9px 16px"}}>
              Publish changes
            </span>
          </div>
        </div>
        <div style={{display: "flex", alignItems: "center", gap: "9px", marginTop: "14px", flex: "none", flexWrap: "wrap"}}>
          <div style={{display: "flex", gap: "3px", background: "rgba(22,36,29,.06)", borderRadius: "12px", padding: "3px"}}>
            <span style={{padding: "7px 13px", borderRadius: "9px", background: "#fff", boxShadow: "0 4px 12px -4px rgba(16,74,52,.25)", fontSize: "12px", fontWeight: "700", color: "#0c6b43"}}>
              Inbound
            </span>
            <span style={{padding: "7px 13px", borderRadius: "9px", fontSize: "12px", fontWeight: "600", color: "#5d7468"}}>
              Outbound
            </span>
            <span style={{padding: "7px 13px", borderRadius: "9px", fontSize: "12px", fontWeight: "600", color: "#5d7468"}}>
              Missed & voicemail
            </span>
            <span style={{padding: "7px 13px", borderRadius: "9px", fontSize: "12px", fontWeight: "600", color: "#5d7468"}}>
              SMS
            </span>
          </div>
          <span style={{display: "flex", alignItems: "center", gap: "6px", fontSize: "11.5px", fontWeight: "700", color: "#5d7468", background: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.9)", borderRadius: "999px", padding: "7px 13px"}}>
            Number · Main line ▾
          </span>
          <span style={{display: "flex", alignItems: "center", gap: "6px", fontSize: "11.5px", fontWeight: "700", color: "#5d7468", background: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.9)", borderRadius: "999px", padding: "7px 13px"}}>
            Team · All ▾
          </span>
          <span style={{display: "flex", alignItems: "center", gap: "6px", fontSize: "11.5px", fontWeight: "700", color: "#5d7468", background: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.9)", borderRadius: "999px", padding: "7px 13px"}}>
            Last 30 days ▾
          </span>
          <span style={{marginLeft: "auto", fontFamily: "'Geist Mono',monospace", fontSize: "9.5px", color: "#8a9690", fontWeight: "600"}}>
            EDITED 4 MIN AGO · DRAFT
          </span>
        </div>
        <div style={{display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginTop: "13px", flex: "none"}}>
          <div style={{borderRadius: "16px", background: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.95)", padding: "12px 14px"}}>
            <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".16em", color: "#8a9690", fontWeight: "600"}}>
              ANSWERED BY A HUMAN
            </div>
            <div style={{fontFamily: "'Geist',sans-serif", fontSize: "26px", fontWeight: "800", letterSpacing: "-.03em", marginTop: "3px"}}>
              <Count to={71} at={4} />%
            </div>
            <div style={{fontSize: "10.5px", lineHeight: "1.5", color: "#3f5249", marginTop: "2px"}}>
              Up 9pts since the VIP branch was added — keep it above the pool.
            </div>
          </div>
          <div style={{borderRadius: "16px", background: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.95)", padding: "12px 14px"}}>
            <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".16em", color: "#8a9690", fontWeight: "600"}}>
              FELL THROUGH TO VOICEMAIL
            </div>
            <div style={{fontFamily: "'Geist',sans-serif", fontSize: "26px", fontWeight: "800", letterSpacing: "-.03em", marginTop: "3px"}}>
              <Count to={118} at={6} />
            </div>
            <div style={{fontSize: "10.5px", lineHeight: "1.5", color: "#3f5249", marginTop: "2px"}}>
              Two thirds land between 12–2pm — nobody is rostered on the pool then.
            </div>
          </div>
          <div style={{borderRadius: "16px", background: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.95)", padding: "12px 14px"}}>
            <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".16em", color: "#8a9690", fontWeight: "600"}}>
              AVG TIME TO PICK UP
            </div>
            <div style={{fontFamily: "'Geist',sans-serif", fontSize: "26px", fontWeight: "800", letterSpacing: "-.03em", marginTop: "3px"}}>
              <Count to={14} at={8} />s
            </div>
            <div style={{fontSize: "10.5px", lineHeight: "1.5", color: "#3f5249", marginTop: "2px"}}>
              Your 20s ring window is doing nothing after second 16 — trim it.
            </div>
          </div>
        </div>
        <div style={{flex: "1", minHeight: "0", display: "flex", gap: "12px", marginTop: "13px"}}>
          <div style={{flex: "1", minWidth: "0", position: "relative", borderRadius: "22px", background: "linear-gradient(160deg,rgba(255,255,255,.62),rgba(255,255,255,.42))", backdropFilter: "blur(24px) saturate(150%)", border: "1px solid rgba(255,255,255,.9)", boxShadow: "0 20px 48px -20px rgba(16,74,52,.3)", overflow: "hidden"}}>
            <div style={{position: "absolute", inset: "0", backgroundImage: "radial-gradient(rgba(22,36,29,.12) 1px,transparent 1px)", backgroundSize: "22px 22px", opacity: prog(f, 0, 10)}} />
            <CallToken />
            <div style={{position: "absolute", left: "147px", top: "90px", width: "2px", height: "16px", background: "#9dbcac", transformOrigin: "top", scale: `1 ${draw(f, 9, 8)}`}} />
            <div style={{position: "absolute", left: "143px", top: "99px", width: "0", height: "0", borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "7px solid #9dbcac", opacity: prog(f, 9 + 6, 3)}} />
            <div style={{position: "absolute", left: "268px", top: "144px", height: "2px", width: "60px", background: "#9dbcac", transformOrigin: "left", scale: `${draw(f, 15, 8)} 1`}} />
            <div style={{position: "absolute", left: "321px", top: "140px", width: "0", height: "0", borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "7px solid #9dbcac", opacity: prog(f, 15 + 6, 3)}} />
            <div style={{position: "absolute", left: "568px", top: "144px", height: "2px", width: "60px", background: "#9dbcac", transformOrigin: "left", scale: `${draw(f, 19, 8)} 1`}} />
            <div style={{position: "absolute", left: "621px", top: "140px", width: "0", height: "0", borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "7px solid #9dbcac", opacity: prog(f, 19 + 6, 3)}} />
            <div style={{position: "absolute", left: "147px", top: "184px", width: "2px", height: "26px", background: "#9dbcac", transformOrigin: "top", scale: `1 ${draw(f, 13, 8)}`}} />
            <div style={{position: "absolute", left: "143px", top: "203px", width: "0", height: "0", borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "7px solid #9dbcac", opacity: prog(f, 13 + 6, 3)}} />
            <div style={{position: "absolute", left: "268px", top: "253px", height: "2px", width: "60px", background: "#9dbcac", transformOrigin: "left", scale: `${draw(f, 21, 8)} 1`}} />
            <div style={{position: "absolute", left: "321px", top: "249px", width: "0", height: "0", borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "7px solid #9dbcac", opacity: prog(f, 21 + 6, 3)}} />
            <div style={{position: "absolute", left: "147px", top: "298px", width: "2px", height: "22px", background: "#9dbcac", transformOrigin: "top", scale: `1 ${draw(f, 19, 8)}`}} />
            <div style={{position: "absolute", left: "143px", top: "313px", width: "0", height: "0", borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "7px solid #9dbcac", opacity: prog(f, 19 + 6, 3)}} />
            <div style={{position: "absolute", left: "447px", top: "298px", width: "2px", height: "114px", background: "repeating-linear-gradient(180deg,#9dbcac 0 5px,transparent 5px 9px)", transformOrigin: "top", scale: `1 ${draw(f, 27, 8)}`}} />
            <div style={{position: "absolute", left: "148px", top: "411px", height: "2px", width: "300px", background: "repeating-linear-gradient(90deg,#9dbcac 0 5px,transparent 5px 9px)", transformOrigin: "left", scale: `${draw(f, 30, 8)} 1`}} />
            <div style={{position: "absolute", left: "147px", top: "402px", width: "2px", height: "22px", background: "#9dbcac", transformOrigin: "top", scale: `1 ${draw(f, 25, 8)}`}} />
            <div style={{position: "absolute", left: "143px", top: "417px", width: "0", height: "0", borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "7px solid #9dbcac", opacity: prog(f, 25 + 6, 3)}} />
            <div style={{position: "absolute", left: "268px", top: "462px", height: "2px", width: "60px", background: "#9dbcac", transformOrigin: "left", scale: `${draw(f, 31, 8)} 1`}} />
            <div style={{position: "absolute", left: "321px", top: "458px", width: "0", height: "0", borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "7px solid #9dbcac", opacity: prog(f, 31 + 6, 3)}} />
            <div style={{position: "absolute", left: "568px", top: "462px", height: "2px", width: "60px", background: "#9dbcac", transformOrigin: "left", scale: `${draw(f, 35, 8)} 1`}} />
            <div style={{position: "absolute", left: "621px", top: "458px", width: "0", height: "0", borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "7px solid #9dbcac", opacity: prog(f, 35 + 6, 3)}} />
            <A as="div" fx="pop" at={6} extra={lit(f, 28, 14)} style={{position: "absolute", zIndex: 3, left: "28px", top: "14px", width: "240px", height: "76px", borderRadius: "16px", background: "rgba(255,255,255,.92)", border: "1px solid rgba(255,255,255,.98)", boxShadow: "0 14px 32px -18px rgba(16,74,52,.45)", padding: "10px 12px"}}>
              <div style={{display: "flex", alignItems: "center", gap: "7px"}}>
                <span style={{width: "22px", height: "22px", borderRadius: "7px", background: "rgba(16,196,110,.16)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="#0c6b43">
                    <path d="M19.6 21c-2.3 0-4.6-.6-6.9-1.7-2.2-1.1-4.2-2.6-6-4.4-1.8-1.8-3.3-3.8-4.4-6C1.2 6.7.6 4.4.6 2.1c0-.4.1-.7.4-1C1.3.8 1.6.7 2 .7h3.3c.3 0 .6.1.8.3.2.2.4.5.4.8.1.8.3 1.6.6 2.4.2.5.1 1-.3 1.4L5.6 8.1c1.2 2.2 2.9 3.9 5.1 5.1l1.7-1.7c.4-.4.9-.5 1.4-.3.8.3 1.6.5 2.4.6.3 0 .6.2.8.4.2.2.3.5.3.8V19c0 .4-.1.7-.4 1-.3.3-.6.4-1 .4z" />
                  </svg>
                </span>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".14em", color: "#0c6b43", fontWeight: "600"}}>
                  TRIGGER
                </span>
              </div>
              <div style={{fontSize: "13px", fontWeight: "700", marginTop: "5px"}}>
                Inbound call
              </div>
              <div style={{fontSize: "10.5px", color: "#5d7468"}}>
                Any caller · main line
              </div>
            </A>
            <A as="div" fx="pop" at={11} extra={lit(f, 28, 106)} style={{position: "absolute", zIndex: 3, left: "28px", top: "106px", width: "240px", height: "78px", borderRadius: "16px", background: "rgba(255,255,255,.9)", border: "1px solid rgba(125,211,252,.55)", boxShadow: "0 14px 32px -18px rgba(16,74,52,.45)", padding: "10px 12px"}}>
              <div style={{display: "flex", alignItems: "center", gap: "7px"}}>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".14em", color: "#0369a1", fontWeight: "600"}}>
                  IF · SCHEDULE
                </span>
                <span style={{marginLeft: "auto", fontSize: "9px", fontWeight: "700", color: "#0369a1", background: "rgba(125,211,252,.22)", borderRadius: "999px", padding: "2px 7px"}}>
                  2 PATHS
                </span>
              </div>
              <div style={{fontSize: "13px", fontWeight: "700", marginTop: "5px"}}>
                Within business hours?
              </div>
              <div style={{fontSize: "10.5px", color: "#5d7468"}}>
                Mon–Fri 8:30–18:00 · Melbourne
              </div>
            </A>
            <A as="span" fx="fade" at={14} style={{position: "absolute", left: "158px", top: "186px", fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", fontWeight: "700", color: "#0c6b43", background: "rgba(255,255,255,.95)", border: "1px solid rgba(16,196,110,.35)", borderRadius: "999px", padding: "2px 7px"}}>
              YES
            </A>
            <A as="span" fx="fade" at={16} style={{position: "absolute", left: "276px", top: "120px", fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", fontWeight: "700", color: "#8a9690", background: "rgba(255,255,255,.95)", border: "1px solid rgba(22,36,29,.12)", borderRadius: "999px", padding: "2px 7px"}}>
              NO
            </A>
            <A as="div" fx="pop" at={17} style={{position: "absolute", left: "328px", top: "106px", width: "240px", height: "78px", borderRadius: "16px", background: "rgba(255,255,255,.85)", border: "1px solid rgba(255,255,255,.95)", boxShadow: "0 14px 32px -18px rgba(16,74,52,.4)", padding: "10px 12px"}}>
              <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".14em", color: "#a35c07", fontWeight: "600"}}>
                PLAY RECORDING
              </div>
              <div style={{fontSize: "13px", fontWeight: "700", marginTop: "5px"}}>
                After-hours greeting
              </div>
              <div style={{display: "flex", alignItems: "center", gap: "6px", marginTop: "4px"}}>
                <span style={{fontSize: "9px", fontWeight: "700", color: "#a35c07", background: "rgba(245,158,11,.14)", borderRadius: "999px", padding: "2px 7px"}}>
                  ▸ 0:12
                </span>
                <span style={{fontSize: "10px", color: "#5d7468"}}>
                  after-hours-v3.mp3
                </span>
              </div>
            </A>
            <A as="div" fx="pop" at={21} style={{position: "absolute", left: "628px", top: "106px", width: "240px", height: "78px", borderRadius: "16px", background: "rgba(255,255,255,.85)", border: "1px solid rgba(255,255,255,.95)", boxShadow: "0 14px 32px -18px rgba(16,74,52,.4)", padding: "10px 12px"}}>
              <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".14em", color: "#5d7468", fontWeight: "600"}}>
                VOICEMAIL
              </div>
              <div style={{fontSize: "13px", fontWeight: "700", marginTop: "5px"}}>
                After-hours box
              </div>
              <div style={{fontSize: "10.5px", color: "#5d7468"}}>
                Transcribe · CRM task next morning
              </div>
            </A>
            <A as="div" fx="pop" at={15} extra={lit(f, 28, 210)} style={{position: "absolute", zIndex: 3, left: "28px", top: "210px", width: "240px", height: "88px", borderRadius: "16px", background: "rgba(255,255,255,.9)", border: "1px solid rgba(125,211,252,.55)", boxShadow: "0 14px 32px -18px rgba(16,74,52,.45)", padding: "10px 12px"}}>
              <div style={{display: "flex", alignItems: "center", gap: "7px"}}>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".14em", color: "#0369a1", fontWeight: "600"}}>
                  IF · CONTACT
                </span>
                <span style={{marginLeft: "auto", fontSize: "9px", fontWeight: "700", color: "#0369a1", background: "rgba(125,211,252,.22)", borderRadius: "999px", padding: "2px 7px"}}>
                  2 PATHS
                </span>
              </div>
              <div style={{fontSize: "13px", fontWeight: "700", marginTop: "5px"}}>
                Tagged VIP or Vendor?
              </div>
              <div style={{display: "flex", gap: "4px", marginTop: "5px"}}>
                <span style={{fontSize: "9px", fontWeight: "700", color: "#0c6b43", background: "rgba(16,196,110,.12)", border: "1px solid rgba(16,196,110,.26)", borderRadius: "999px", padding: "2px 7px"}}>
                  VIP
                </span>
                <span style={{fontSize: "9px", fontWeight: "700", color: "#0c6b43", background: "rgba(16,196,110,.12)", border: "1px solid rgba(16,196,110,.26)", borderRadius: "999px", padding: "2px 7px"}}>
                  Vendor
                </span>
              </div>
            </A>
            <A as="span" fx="fade" at={22} style={{position: "absolute", left: "276px", top: "229px", fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", fontWeight: "700", color: "#0c6b43", background: "rgba(255,255,255,.95)", border: "1px solid rgba(16,196,110,.35)", borderRadius: "999px", padding: "2px 7px"}}>
              MATCH
            </A>
            <A as="span" fx="fade" at={20} style={{position: "absolute", left: "158px", top: "300px", fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", fontWeight: "700", color: "#8a9690", background: "rgba(255,255,255,.95)", border: "1px solid rgba(22,36,29,.12)", borderRadius: "999px", padding: "2px 7px"}}>
              EVERYONE ELSE
            </A>
            <A as="div" fx="pop" at={23} style={{position: "absolute", left: "328px", top: "210px", width: "240px", height: "88px", borderRadius: "16px", background: "linear-gradient(160deg,rgba(16,196,110,.16),rgba(255,255,255,.9) 60%)", border: "2px solid #10c46e", boxShadow: "0 0 0 5px rgba(16,196,110,.14),0 18px 40px -18px rgba(16,74,52,.5)", padding: "10px 12px"}}>
              <div style={{display: "flex", alignItems: "center", gap: "7px"}}>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".14em", color: "#0c6b43", fontWeight: "600"}}>
                  DIVERT TO TEAM
                </span>
                <span style={{marginLeft: "auto", fontSize: "9px", fontWeight: "700", color: "#fff", background: "#10c46e", borderRadius: "999px", padding: "2px 7px"}}>
                  EDITING
                </span>
              </div>
              <div style={{fontSize: "13px", fontWeight: "700", marginTop: "5px"}}>
                Ring Priya + Sam together
              </div>
              <div style={{display: "flex", alignItems: "center", gap: "6px", marginTop: "5px"}}>
                <span style={{width: "20px", height: "20px", borderRadius: "50%", background: "rgba(16,196,110,.18)", color: "#0c6b43", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8.5px", fontWeight: "700"}}>
                  PT
                </span>
                <span style={{width: "20px", height: "20px", borderRadius: "50%", background: "rgba(125,211,252,.35)", color: "#0369a1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8.5px", fontWeight: "700"}}>
                  SG
                </span>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "9.5px", color: "#5d7468", marginLeft: "auto"}}>
                  25s
                </span>
              </div>
            </A>
            <A as="div" fx="pop" at={21} extra={lit(f, 28, 320)} style={{position: "absolute", zIndex: 3, left: "28px", top: "320px", width: "240px", height: "82px", borderRadius: "16px", background: "rgba(255,255,255,.85)", border: "1px solid rgba(255,255,255,.95)", boxShadow: "0 14px 32px -18px rgba(16,74,52,.4)", padding: "10px 12px"}}>
              <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".14em", color: "#0c6b43", fontWeight: "600"}}>
                DIVERT TO TEAM
              </div>
              <div style={{fontSize: "13px", fontWeight: "700", marginTop: "5px"}}>
                Assigned agent, then pool
              </div>
              <div style={{display: "flex", alignItems: "center", gap: "6px", marginTop: "4px"}}>
                <span style={{fontSize: "9px", fontWeight: "700", color: "#5d7468", background: "rgba(22,36,29,.07)", borderRadius: "999px", padding: "2px 7px"}}>
                  Sequential
                </span>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "9.5px", color: "#5d7468", marginLeft: "auto"}}>
                  20s
                </span>
              </div>
            </A>
            <A as="div" fx="pop" at={28} extra={lit(f, 28, 424)} style={{position: "absolute", zIndex: 3, left: "28px", top: "424px", width: "240px", height: "78px", borderRadius: "16px", background: "rgba(255,255,255,.9)", border: "1px solid rgba(245,158,11,.5)", boxShadow: "0 14px 32px -18px rgba(16,74,52,.45)", padding: "10px 12px"}}>
              <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".14em", color: "#a35c07", fontWeight: "600"}}>
                IF · NO ANSWER
              </div>
              <div style={{fontSize: "13px", fontWeight: "700", marginTop: "5px"}}>
                Nobody picked up
              </div>
              <div style={{fontSize: "10.5px", color: "#5d7468"}}>
                Also runs on busy / declined
              </div>
            </A>
            <A as="div" fx="pop" at={33} extra={lit(f, 328, 424)} style={{position: "absolute", zIndex: 3, left: "328px", top: "424px", width: "240px", height: "78px", borderRadius: "16px", background: "rgba(255,255,255,.85)", border: "1px solid rgba(255,255,255,.95)", boxShadow: "0 14px 32px -18px rgba(16,74,52,.4)", padding: "10px 12px"}}>
              <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".14em", color: "#0369a1", fontWeight: "600"}}>
                SEND SMS
              </div>
              <div style={{fontSize: "13px", fontWeight: "700", marginTop: "5px"}}>
                “Sorry we missed you…”
              </div>
              <div style={{fontSize: "10.5px", color: "#5d7468"}}>
                From main line · 1 credit
              </div>
            </A>
            <A as="div" fx="pop" at={37} style={{position: "absolute", left: "628px", top: "424px", width: "240px", height: "78px", borderRadius: "16px", background: "rgba(255,255,255,.85)", border: "1px solid rgba(255,255,255,.95)", boxShadow: "0 14px 32px -18px rgba(16,74,52,.4)", padding: "10px 12px"}}>
              <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".14em", color: "#5d7468", fontWeight: "600"}}>
                VOICEMAIL
              </div>
              <div style={{fontSize: "13px", fontWeight: "700", marginTop: "5px"}}>
                Sales box
              </div>
              <div style={{fontSize: "10.5px", color: "#5d7468"}}>
                Transcribe → CRM task → notify owner
              </div>
            </A>
            <A as="div" fx="rise" at={30} style={{position: "absolute", left: "16px", bottom: "14px", display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,.9)", border: "1px solid rgba(255,255,255,.98)", borderRadius: "14px", padding: "7px 9px", boxShadow: "0 16px 36px -18px rgba(16,74,52,.45)"}}>
              <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".14em", color: "#8a9690", fontWeight: "600", paddingRight: "3px"}}>
                ADD
              </span>
              <span style={{fontSize: "11px", fontWeight: "700", color: "#5d7468", background: "rgba(22,36,29,.06)", borderRadius: "9px", padding: "5px 10px"}}>
                ＋ Condition
              </span>
              <span style={{fontSize: "11px", fontWeight: "700", color: "#5d7468", background: "rgba(22,36,29,.06)", borderRadius: "9px", padding: "5px 10px"}}>
                ＋ Ring
              </span>
              <span style={{fontSize: "11px", fontWeight: "700", color: "#5d7468", background: "rgba(22,36,29,.06)", borderRadius: "9px", padding: "5px 10px"}}>
                ＋ Recording
              </span>
              <span style={{fontSize: "11px", fontWeight: "700", color: "#5d7468", background: "rgba(22,36,29,.06)", borderRadius: "9px", padding: "5px 10px"}}>
                ＋ SMS
              </span>
              <span style={{fontSize: "11px", fontWeight: "700", color: "#5d7468", background: "rgba(22,36,29,.06)", borderRadius: "9px", padding: "5px 10px"}}>
                ＋ Voicemail
              </span>
              <span style={{fontSize: "11px", fontWeight: "700", color: "#5d7468", background: "rgba(22,36,29,.06)", borderRadius: "9px", padding: "5px 10px"}}>
                ＋ AI receptionist
              </span>
            </A>
            <div style={{position: "absolute", right: "14px", bottom: "14px", display: "flex", alignItems: "center", gap: "4px", background: "rgba(255,255,255,.9)", border: "1px solid rgba(255,255,255,.98)", borderRadius: "11px", padding: "5px 7px"}}>
              <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "10px", fontWeight: "600", color: "#5d7468"}}>
                −
              </span>
              <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "10px", fontWeight: "600", color: "#16241d"}}>
                92%
              </span>
              <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "10px", fontWeight: "600", color: "#5d7468"}}>
                ＋
              </span>
            </div>
          </div>
          <A as="div" fx="slideL" at={32} style={{width: "300px", flex: "none", display: "flex", flexDirection: "column", gap: "10px"}}>
            <div style={{flex: "none", borderRadius: "20px", background: "linear-gradient(160deg,rgba(255,255,255,.9),rgba(255,255,255,.66))", backdropFilter: "blur(26px)", border: "1px solid rgba(255,255,255,.96)", boxShadow: "0 18px 44px -22px rgba(16,74,52,.42)", padding: "14px"}}>
              <div style={{display: "flex", alignItems: "center", gap: "7px"}}>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "9px", letterSpacing: ".16em", color: "#0c6b43", fontWeight: "600"}}>
                  STEP · DIVERT TO TEAM
                </span>
                <span style={{marginLeft: "auto", fontSize: "10px", fontWeight: "700", color: "#be123c"}}>
                  Remove
                </span>
              </div>
              <div style={{fontFamily: "'Geist',sans-serif", fontSize: "17px", fontWeight: "800", letterSpacing: "-.01em", marginTop: "6px"}}>
                Ring Priya + Sam
              </div>
              <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".14em", color: "#8a9690", fontWeight: "600", marginTop: "12px"}}>
                RING STYLE
              </div>
              <div style={{display: "flex", gap: "3px", background: "rgba(22,36,29,.06)", borderRadius: "11px", padding: "3px", marginTop: "5px"}}>
                <span style={{flex: "1", textAlign: "center", padding: "6px 0", borderRadius: "8px", background: "#fff", boxShadow: "0 4px 12px -5px rgba(16,74,52,.3)", fontSize: "11.5px", fontWeight: "700", color: "#0c6b43"}}>
                  All at once
                </span>
                <span style={{flex: "1", textAlign: "center", padding: "6px 0", borderRadius: "8px", fontSize: "11.5px", fontWeight: "600", color: "#5d7468"}}>
                  Sequential
                </span>
                <span style={{flex: "1", textAlign: "center", padding: "6px 0", borderRadius: "8px", fontSize: "11.5px", fontWeight: "600", color: "#5d7468"}}>
                  Longest idle
                </span>
              </div>
              <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".14em", color: "#8a9690", fontWeight: "600", marginTop: "12px"}}>
                MEMBERS
              </div>
              <div style={{display: "flex", flexDirection: "column", gap: "5px", marginTop: "5px"}}>
                <div style={{display: "flex", alignItems: "center", gap: "8px", borderRadius: "11px", background: "rgba(255,255,255,.72)", border: "1px solid rgba(255,255,255,.95)", padding: "7px 9px"}}>
                  <span style={{width: "24px", height: "24px", borderRadius: "50%", background: "rgba(16,196,110,.18)", color: "#0c6b43", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9.5px", fontWeight: "700"}}>
                    PT
                  </span>
                  <span style={{fontSize: "12px", fontWeight: "700", flex: "1"}}>
                    Priya Tan
                  </span>
                  <span style={{width: "7px", height: "7px", borderRadius: "50%", background: "#10c46e"}} />
                  <span style={{fontSize: "10px", color: "#5d7468"}}>
                    Available
                  </span>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: "8px", borderRadius: "11px", background: "rgba(255,255,255,.72)", border: "1px solid rgba(255,255,255,.95)", padding: "7px 9px"}}>
                  <span style={{width: "24px", height: "24px", borderRadius: "50%", background: "rgba(125,211,252,.35)", color: "#0369a1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9.5px", fontWeight: "700"}}>
                    SG
                  </span>
                  <span style={{fontSize: "12px", fontWeight: "700", flex: "1"}}>
                    Sam Green
                  </span>
                  <span style={{width: "7px", height: "7px", borderRadius: "50%", background: "#f59e0b"}} />
                  <span style={{fontSize: "10px", color: "#5d7468"}}>
                    On a call
                  </span>
                </div>
                <div style={{borderRadius: "11px", border: "1px dashed rgba(22,36,29,.18)", padding: "7px 9px", fontSize: "11.5px", fontWeight: "700", color: "#5d7468", textAlign: "center"}}>
                  ＋ Add teammate or team
                </div>
              </div>
              <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".14em", color: "#8a9690", fontWeight: "600", marginTop: "12px"}}>
                RING FOR
              </div>
              <div style={{display: "flex", alignItems: "center", gap: "9px", marginTop: "6px"}}>
                <div style={{flex: "1", height: "5px", borderRadius: "3px", background: "rgba(22,36,29,.1)", position: "relative"}}>
                  <div style={{position: "absolute", left: "0", top: "0", bottom: "0", width: "56%", borderRadius: "3px", background: "#10c46e"}} />
                  <div style={{position: "absolute", left: "56%", top: "50%", transform: "translate(-50%,-50%)", width: "15px", height: "15px", borderRadius: "50%", background: "#fff", border: "2px solid #10c46e", boxShadow: "0 4px 10px -3px rgba(12,154,85,.6)"}} />
                </div>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "12px", fontWeight: "600"}}>
                  25s
                </span>
              </div>
              <div style={{display: "flex", alignItems: "center", gap: "9px", marginTop: "12px", borderTop: "1px solid rgba(22,36,29,.07)", paddingTop: "11px"}}>
                <div style={{flex: "1"}}>
                  <div style={{fontSize: "12px", fontWeight: "700"}}>
                    Whisper caller context
                  </div>
                  <div style={{fontSize: "10.5px", color: "#5d7468", lineHeight: "1.4"}}>
                    Reads the AI summary before connecting
                  </div>
                </div>
                <span style={{width: "34px", height: "20px", borderRadius: "999px", background: "#10c46e", position: "relative", flex: "none"}}>
                  <span style={{position: "absolute", top: "2px", right: "2px", width: "16px", height: "16px", borderRadius: "50%", background: "#fff"}} />
                </span>
              </div>
            </div>
            <div style={{flex: "1", minHeight: "0", borderRadius: "20px", background: "linear-gradient(150deg,rgba(16,196,110,.14),rgba(255,255,255,.5) 45%),linear-gradient(160deg,rgba(255,255,255,.86),rgba(255,255,255,.62))", backdropFilter: "blur(26px)", border: "1px solid rgba(16,196,110,.26)", boxShadow: "0 18px 44px -22px rgba(16,74,52,.42)", padding: "13px 15px"}}>
              <div style={{display: "flex", alignItems: "center", gap: "6px"}}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#0c6b43">
                  <path d="M12 2l1.9 5.2L19 9l-5.1 1.8L12 16l-1.9-5.2L5 9l5.1-1.8L12 2z" />
                </svg>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "9px", letterSpacing: ".16em", color: "#0c6b43", fontWeight: "600"}}>
                  FLOW CHECK
                </span>
              </div>
              <div style={{fontFamily: "'Geist',sans-serif", fontSize: "14.5px", lineHeight: "1.42", fontWeight: "700", letterSpacing: "-.01em", marginTop: "7px", textWrap: "pretty"}}>
                {"Ringing both for 25s pushes the average caller to "}
                <span style={{color: "#0c6b43"}}>
                  39s before voicemail
                </span>
                . Most VIPs hang up at 30.
              </div>
              <div style={{display: "flex", gap: "5px", marginTop: "10px", flexWrap: "wrap"}}>
                <span style={{fontSize: "10px", fontWeight: "700", color: "#0c6b43", background: "rgba(255,255,255,.75)", border: "1px solid rgba(255,255,255,.95)", borderRadius: "999px", padding: "4px 10px"}}>
                  Set to 18s
                </span>
                <span style={{fontSize: "10px", fontWeight: "700", color: "#0c6b43", background: "rgba(255,255,255,.75)", border: "1px solid rgba(255,255,255,.95)", borderRadius: "999px", padding: "4px 10px"}}>
                  Keep 25s
                </span>
              </div>
            </div>
          </A>
        </div>
      </div>
    </div>
  </div>
  );
};
