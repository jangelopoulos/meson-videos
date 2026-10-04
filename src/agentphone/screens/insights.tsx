// Auto-converted from AgentPhone Motion Brief.html (data-shot="insights"), 1280x1010.
import {useT} from "../lib/time";
import React from "react";
import {A} from "../lib/A";
import {draw, prog} from "../lib/anim";
import {Count} from "../lib/bits";

export const InsightsScreen: React.FC = () => {
  const f = useT();
  return (
  <div style={{position: "relative", width: 1280, height: 1010, overflow: "hidden"}}>
    <div style={{width: "1280px", height: "1010px", borderRadius: "24px", overflow: "hidden", position: "relative", color: "#16241d", background: "#eef4f0"}}>
      <div style={{position: "absolute", inset: "0", background: "radial-gradient(60% 70% at 0% 0%,#b9f6d6 0%,transparent 55%),radial-gradient(50% 60% at 100% 8%,#cbe8ff 0%,transparent 55%),radial-gradient(70% 60% at 92% 100%,#ffe2c2 0%,transparent 50%),#eef4f0"}} />
      <div style={{position: "relative", height: "100%", display: "flex", gap: "16px", padding: "26px 24px 22px"}}>
        <div style={{flex: "1", minWidth: "0", display: "flex", flexDirection: "column"}}>
          <div style={{flex: "none", display: "flex", alignItems: "flex-end", gap: "20px"}}>
            <div>
              <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "10px", letterSpacing: ".18em", color: "#5d7468", fontWeight: "600"}}>
                TUE · 18 JUNE
              </div>
              <div style={{fontFamily: "'Geist',sans-serif", fontSize: "28px", fontWeight: "800", letterSpacing: "-.02em", marginTop: "2px"}}>
                Calls
              </div>
            </div>
            <span style={{marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: "700", color: "#0c6b43", background: "rgba(16,196,110,.1)", border: "1px solid rgba(16,196,110,.24)", borderRadius: "999px", padding: "7px 14px", cursor: "pointer", alignSelf: "center"}}>
              Collapse ▴
            </span>
          </div>
          <div style={{flex: "none", marginTop: "14px", borderRadius: "22px", background: "linear-gradient(160deg,rgba(255,255,255,.78),rgba(255,255,255,.55))", backdropFilter: "blur(28px) saturate(155%)", border: "1px solid rgba(255,255,255,.94)", boxShadow: "0 22px 52px -20px rgba(16,74,52,.32)", padding: "18px 20px"}}>
            <div style={{display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "16px"}}>
              <div style={{borderRadius: "16px", padding: "13px 15px", background: "rgba(255,255,255,.55)", border: "1px solid rgba(255,255,255,.9)"}}>
                <div style={{display: "flex", alignItems: "baseline"}}>
                  <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".14em", color: "#8a9690", fontWeight: "600"}}>
                    CALLS BY HOUR
                  </span>
                  <span style={{marginLeft: "auto", fontSize: "9.5px", color: "#5d7468"}}>
                    {"today vs "}
                    <span style={{color: "#b6c2bb"}}>
                      avg
                    </span>
                  </span>
                </div>
                <div style={{marginTop: "12px", display: "flex", alignItems: "flex-end", gap: "5px", height: `${88 * draw(f, 2.0, 14)}px`}}>
                  <div style={{flex: "1", display: "flex", alignItems: "flex-end", gap: "2px"}}>
                    <span style={{flex: "1", background: "#10c46e", borderRadius: "3px", height: `${78 * draw(f, 2.0, 14)}px`}} />
                    <span style={{flex: "1", background: "rgba(22,36,29,.1)", borderRadius: "3px", height: `${54 * draw(f, 3.5, 14)}px`}} />
                  </div>
                  <div style={{flex: "1", display: "flex", alignItems: "flex-end", gap: "2px"}}>
                    <span style={{flex: "1", background: "#10c46e", borderRadius: "3px", height: `${88 * draw(f, 3.5, 14)}px`, boxShadow: "0 0 10px rgba(16,196,110,.4)"}} />
                    <span style={{flex: "1", background: "rgba(22,36,29,.1)", borderRadius: "3px", height: `${60 * draw(f, 5.0, 14)}px`}} />
                  </div>
                  <div style={{flex: "1", display: "flex", alignItems: "flex-end", gap: "2px"}}>
                    <span style={{flex: "1", background: "rgba(12,107,67,.45)", borderRadius: "3px", height: `${44 * draw(f, 5.0, 14)}px`}} />
                    <span style={{flex: "1", background: "rgba(22,36,29,.1)", borderRadius: "3px", height: `${50 * draw(f, 6.5, 14)}px`}} />
                  </div>
                  <div style={{flex: "1", display: "flex", alignItems: "flex-end", gap: "2px"}}>
                    <span style={{flex: "1", background: "rgba(12,107,67,.4)", borderRadius: "3px", height: `${30 * draw(f, 6.5, 14)}px`}} />
                    <span style={{flex: "1", background: "rgba(22,36,29,.1)", borderRadius: "3px", height: `${38 * draw(f, 8.0, 14)}px`}} />
                  </div>
                  <div style={{flex: "1", display: "flex", alignItems: "flex-end", gap: "2px"}}>
                    <span style={{flex: "1", background: "rgba(12,107,67,.45)", borderRadius: "3px", height: `${52 * draw(f, 8.0, 14)}px`}} />
                    <span style={{flex: "1", background: "rgba(22,36,29,.1)", borderRadius: "3px", height: `${44 * draw(f, 9.5, 14)}px`}} />
                  </div>
                  <div style={{flex: "1", display: "flex", alignItems: "flex-end", gap: "2px"}}>
                    <span style={{flex: "1", background: "rgba(12,107,67,.35)", borderRadius: "3px", height: `${38 * draw(f, 9.5, 14)}px`}} />
                    <span style={{flex: "1", background: "rgba(22,36,29,.1)", borderRadius: "3px", height: `${46 * draw(f, 11.0, 14)}px`}} />
                  </div>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", fontFamily: "'Geist Mono',monospace", fontSize: "8px", color: "#b6c2bb", marginTop: "5px"}}>
                  <span>
                    8A
                  </span>
                  <span>
                    9A
                  </span>
                  <span>
                    10A
                  </span>
                  <span>
                    12P
                  </span>
                  <span>
                    2P
                  </span>
                  <span>
                    4P
                  </span>
                </div>
                <div style={{marginTop: "8px", fontSize: "10.5px", color: "#3f5249"}}>
                  {"Busiest "}
                  <b>
                    9–10am
                  </b>
                  {" \u2014 protect it for outbound."}
                </div>
              </div>
              <div style={{borderRadius: "16px", padding: "13px 15px", background: "rgba(255,255,255,.55)", border: "1px solid rgba(255,255,255,.9)"}}>
                <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".14em", color: "#8a9690", fontWeight: "600"}}>
                  TALK TIME · 7D
                </div>
                <div style={{display: "flex", alignItems: "baseline", gap: "6px", marginTop: "8px"}}>
                  <span style={{fontFamily: "'Geist',sans-serif", fontSize: "23px", fontWeight: "800"}}>
                    1h <Count to={42} at={4} />m
                  </span>
                  <span style={{fontSize: "9.5px", color: "#0c6b43", fontWeight: "700"}}>
                    +18%
                  </span>
                </div>
                <svg width="100%" height="52" viewBox="0 0 180 52" preserveAspectRatio="none" style={{marginTop: "8px"}}>
                  <path d="M0,40 L30,34 L60,38 L90,26 L120,30 L150,18 L180,10" fill="none" stroke="#10c46e" strokeWidth="2.5" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw(f, 4, 18)} />
                  <path d="M0,40 L30,34 L60,38 L90,26 L120,30 L150,18 L180,10 L180,52 L0,52 Z" fill="rgba(16,196,110,.12)" opacity={prog(f, 14, 8)} />
                </svg>
                <div style={{display: "flex", justifyContent: "space-between", fontFamily: "'Geist Mono',monospace", fontSize: "8px", color: "#b6c2bb", marginTop: "4px"}}>
                  <span>
                    WED
                  </span>
                  <span>
                    FRI
                  </span>
                  <span>
                    TODAY
                  </span>
                </div>
              </div>
              <div style={{borderRadius: "16px", padding: "13px 15px", background: "rgba(255,255,255,.55)", border: "1px solid rgba(255,255,255,.9)"}}>
                <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".14em", color: "#8a9690", fontWeight: "600"}}>
                  OUTCOMES · TODAY
                </div>
                <div style={{marginTop: "12px", display: "flex", height: "12px", borderRadius: "6px", overflow: "hidden"}}>
                  <span style={{width: `${38 * draw(f, 6, 16)}%`, background: "#10c46e"}} />
                  <span style={{width: `${21 * draw(f, 6, 16)}%`, background: "rgba(12,107,67,.45)"}} />
                  <span style={{width: `${16 * draw(f, 6, 16)}%`, background: "#f59e0b"}} />
                  <span style={{width: `${12 * draw(f, 6, 16)}%`, background: "#e11d48"}} />
                  <span style={{width: `${13 * draw(f, 6, 16)}%`, background: "rgba(22,36,29,.12)"}} />
                </div>
                <div style={{marginTop: "11px", display: "flex", flexDirection: "column", gap: "5px", fontSize: "10.5px"}}>
                  <div style={{display: "flex", alignItems: "center", gap: "6px"}}>
                    <span style={{width: "7px", height: "7px", borderRadius: "2px", background: "#10c46e"}} />
                    Interested / booked
                    <span style={{marginLeft: "auto", fontFamily: "'Geist Mono',monospace", fontSize: "9.5px"}}>
                      9
                    </span>
                  </div>
                  <div style={{display: "flex", alignItems: "center", gap: "6px"}}>
                    <span style={{width: "7px", height: "7px", borderRadius: "2px", background: "rgba(12,107,67,.45)"}} />
                    Follow-up set
                    <span style={{marginLeft: "auto", fontFamily: "'Geist Mono',monospace", fontSize: "9.5px"}}>
                      5
                    </span>
                  </div>
                  <div style={{display: "flex", alignItems: "center", gap: "6px"}}>
                    <span style={{width: "7px", height: "7px", borderRadius: "2px", background: "#f59e0b"}} />
                    Undecided
                    <span style={{marginLeft: "auto", fontFamily: "'Geist Mono',monospace", fontSize: "9.5px"}}>
                      4
                    </span>
                  </div>
                  <div style={{display: "flex", alignItems: "center", gap: "6px"}}>
                    <span style={{width: "7px", height: "7px", borderRadius: "2px", background: "#e11d48"}} />
                    Missed / no answer
                    <span style={{marginLeft: "auto", fontFamily: "'Geist Mono',monospace", fontSize: "9.5px"}}>
                      3
                    </span>
                  </div>
                </div>
              </div>
              <div style={{borderRadius: "16px", padding: "13px 15px", background: "rgba(255,255,255,.55)", border: "1px solid rgba(255,255,255,.9)", display: "flex", flexDirection: "column"}}>
                <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".14em", color: "#8a9690", fontWeight: "600"}}>
                  ANSWER RATE
                </div>
                <div style={{display: "flex", alignItems: "center", gap: "12px", marginTop: "10px"}}>
                  <div style={{position: "relative", width: "62px", height: "62px", flex: "none"}}>
                    <svg width="62" height="62" viewBox="0 0 62 62" style={{transform: "rotate(-90deg)"}}>
                      <circle cx="31" cy="31" r="26" fill="none" stroke="rgba(22,36,29,.08)" strokeWidth="6" />
                      <circle cx="31" cy="31" r="26" fill="none" stroke="#10c46e" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${140 * draw(f, 6, 18)} 163`} />
                    </svg>
                    <span style={{position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Geist Mono',monospace", fontSize: "13px", fontWeight: "600", color: "#0c6b43"}}>
                      <Count to={86} at={6} dur={18} />%
                    </span>
                  </div>
                  <div style={{fontSize: "10.5px", lineHeight: "1.5", color: "#3f5249"}}>
                    of your outbound calls connected this week
                  </div>
                </div>
                <div style={{marginTop: "auto", paddingTop: "9px", borderTop: "1px solid rgba(22,36,29,.06)", fontSize: "10.5px", color: "#3f5249"}}>
                  {"Avg callback on missed: "}
                  <b style={{fontFamily: "'Geist Mono',monospace", fontSize: "10px"}}>
                    41m
                  </b>
                  {" \u2014 aim under 30."}
                </div>
              </div>
            </div>
          </div>
          <div style={{flex: "none", display: "flex", alignItems: "center", gap: "9px", marginTop: "15px"}}>
            <div style={{display: "flex", gap: "3px", background: "rgba(22,36,29,.06)", borderRadius: "12px", padding: "3px"}}>
              <span style={{padding: "7px 14px", borderRadius: "9px", background: "#fff", boxShadow: "0 4px 12px -4px rgba(16,74,52,.25)", fontSize: "12px", fontWeight: "700", color: "#0c6b43"}}>
                All
              </span>
              <span style={{padding: "7px 14px", borderRadius: "9px", fontSize: "12px", fontWeight: "600", color: "#5d7468"}}>
                Outgoing
              </span>
              <span style={{padding: "7px 14px", borderRadius: "9px", fontSize: "12px", fontWeight: "600", color: "#5d7468"}}>
                Incoming
              </span>
              <span style={{padding: "7px 14px", borderRadius: "9px", fontSize: "12px", fontWeight: "600", color: "#5d7468"}}>
                {"Missed "}
                <b style={{fontFamily: "'Geist Mono',monospace", fontSize: "9.5px", color: "#be123c"}}>
                  2
                </b>
              </span>
              <span style={{padding: "7px 14px", borderRadius: "9px", fontSize: "12px", fontWeight: "600", color: "#5d7468"}}>
                Voicemail
              </span>
            </div>
            <span style={{display: "flex", alignItems: "center", gap: "6px", fontSize: "11.5px", fontWeight: "700", color: "#5d7468", background: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.9)", borderRadius: "999px", padding: "7px 13px"}}>
              Outcome · Any ▾
            </span>
            <span style={{display: "flex", alignItems: "center", gap: "6px", fontSize: "11.5px", fontWeight: "700", color: "#5d7468", background: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.9)", borderRadius: "999px", padding: "7px 13px"}}>
              Today ▾
            </span>
            <div style={{marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.9)", borderRadius: "12px", padding: "8px 13px", width: "190px", color: "#8a9690", fontSize: "12px"}}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8a9690" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              Search…
            </div>
          </div>
          <div style={{marginTop: "13px", flex: "1", borderRadius: "22px", background: "linear-gradient(160deg,rgba(255,255,255,.74),rgba(255,255,255,.5))", backdropFilter: "blur(28px) saturate(155%)", border: "1px solid rgba(255,255,255,.92)", boxShadow: "0 20px 48px -20px rgba(16,74,52,.3)", padding: "4px 10px", minHeight: "0", overflow: "hidden"}}>
            <div style={{display: "flex", alignItems: "center", gap: "12px", padding: "9px 12px 5px", fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".14em", color: "#8a9690", fontWeight: "600", borderBottom: "1px solid rgba(22,36,29,.07)"}}>
              <span style={{width: "196px", flex: "none"}}>
                CONTACT
              </span>
              <span style={{flex: "1"}}>
                SUMMARY
              </span>
              <span style={{width: "78px", flex: "none"}}>
                OUTCOME
              </span>
              <span style={{width: "70px", flex: "none"}}>
                DIRECTION
              </span>
              <span style={{width: "44px", flex: "none", textAlign: "right"}}>
                LENGTH
              </span>
              <span style={{width: "40px", flex: "none", textAlign: "right"}}>
                TIME
              </span>
            </div>
            <A as="div" fx="enter" at={14} style={{display: "flex", alignItems: "center", gap: "12px", padding: "9px 12px", margin: "5px 0 0", borderRadius: "14px", background: "rgba(16,196,110,.11)", border: "1px solid rgba(16,196,110,.26)"}}>
              <span style={{width: "196px", flex: "none", display: "flex", alignItems: "center", gap: "9px"}}>
                <span style={{width: "32px", height: "32px", borderRadius: "50%", background: "rgba(125,211,252,.4)", color: "#0369a1", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "11px"}}>
                  RK
                </span>
                <span>
                  <span style={{display: "block", fontSize: "13px", fontWeight: "700"}}>
                    Rachel Kim
                  </span>
                  <span style={{display: "block", fontSize: "9.5px", color: "#5d7468"}}>
                    Warm buyer
                  </span>
                </span>
              </span>
              <span style={{flex: "1", fontSize: "11.5px", color: "#2c3f36", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                Northcote booked Thu — Tom coming, report first
              </span>
              <span style={{width: "78px", flex: "none"}}>
                <span style={{fontSize: "8.5px", fontWeight: "700", color: "#0c6b43", background: "rgba(255,255,255,.75)", border: "1px solid rgba(16,196,110,.32)", borderRadius: "999px", padding: "2px 8px"}}>
                  INTERESTED
                </span>
              </span>
              <span style={{width: "70px", flex: "none", display: "flex", alignItems: "center", gap: "4px", fontSize: "10.5px", fontWeight: "600", color: "#5d7468"}}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0c6b43" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
                Out
              </span>
              <span style={{width: "44px", flex: "none", textAlign: "right", fontFamily: "'Geist Mono',monospace", fontSize: "10.5px", fontWeight: "600", color: "#0c6b43"}}>
                12:47
              </span>
              <span style={{width: "40px", flex: "none", textAlign: "right", fontFamily: "'Geist Mono',monospace", fontSize: "9.5px", color: "#8a9690"}}>
                14:21
              </span>
            </A>
            <A as="div" fx="enter" at={16} style={{display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderBottom: "1px solid rgba(22,36,29,.05)"}}>
              <span style={{width: "196px", flex: "none", display: "flex", alignItems: "center", gap: "9px"}}>
                <span style={{width: "32px", height: "32px", borderRadius: "50%", background: "rgba(225,29,72,.13)", color: "#be123c", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "11px"}}>
                  ST
                </span>
                <span>
                  <span style={{display: "block", fontSize: "13px", fontWeight: "700"}}>
                    Sophie Tran
                  </span>
                  <span style={{display: "block", fontSize: "9.5px", color: "#5d7468"}}>
                    Buyer · cooling
                  </span>
                </span>
              </span>
              <span style={{flex: "1", fontSize: "11.5px", color: "#be123c"}}>
                Missed — second this week, no voicemail
              </span>
              <span style={{width: "78px", flex: "none"}}>
                <span style={{fontSize: "8.5px", fontWeight: "700", color: "#be123c", background: "rgba(225,29,72,.08)", border: "1px solid rgba(225,29,72,.24)", borderRadius: "999px", padding: "2px 8px"}}>
                  CALL BACK
                </span>
              </span>
              <span style={{width: "70px", flex: "none", display: "flex", alignItems: "center", gap: "4px", fontSize: "10.5px", fontWeight: "600", color: "#be123c"}}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#be123c" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 7L7 17M15 17H7V9" />
                </svg>
                Missed
              </span>
              <span style={{width: "44px", flex: "none", textAlign: "right", fontFamily: "'Geist Mono',monospace", fontSize: "10.5px", color: "#c4d2cb"}}>
                —
              </span>
              <span style={{width: "40px", flex: "none", textAlign: "right", fontFamily: "'Geist Mono',monospace", fontSize: "9.5px", color: "#8a9690"}}>
                08:51
              </span>
            </A>
            <A as="div" fx="enter" at={18} style={{display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderBottom: "1px solid rgba(22,36,29,.05)"}}>
              <span style={{width: "196px", flex: "none", display: "flex", alignItems: "center", gap: "9px"}}>
                <span style={{width: "32px", height: "32px", borderRadius: "50%", background: "rgba(22,36,29,.07)", color: "#5d7468", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5d7468" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7" />
                  </svg>
                </span>
                <span>
                  <span style={{display: "block", fontFamily: "'Geist Mono',monospace", fontSize: "11.5px", fontWeight: "600"}}>
                    +61 401 552 190
                  </span>
                  <span style={{display: "block", fontSize: "9.5px", color: "#5d7468"}}>
                    New number
                  </span>
                </span>
              </span>
              <span style={{flex: "1", fontSize: "11.5px", color: "#3f5249", display: "flex", alignItems: "center", gap: "7px"}}>
                Voicemail · “Saturday open home…”
                <span style={{fontSize: "8.5px", fontWeight: "700", color: "#0c6b43", background: "rgba(16,196,110,.12)", border: "1px solid rgba(16,196,110,.26)", borderRadius: "999px", padding: "2px 7px"}}>
                  ▸ 0:32
                </span>
              </span>
              <span style={{width: "78px", flex: "none"}}>
                <span style={{fontSize: "8.5px", fontWeight: "700", color: "#b45309", background: "rgba(245,158,11,.1)", border: "1px solid rgba(245,158,11,.28)", borderRadius: "999px", padding: "2px 8px"}}>
                  NEW LEAD
                </span>
              </span>
              <span style={{width: "70px", flex: "none", display: "flex", alignItems: "center", gap: "4px", fontSize: "10.5px", fontWeight: "600", color: "#5d7468"}}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0369a1" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 17L7 7M7 15V7h8" />
                </svg>
                In
              </span>
              <span style={{width: "44px", flex: "none", textAlign: "right", fontFamily: "'Geist Mono',monospace", fontSize: "10.5px", color: "#c4d2cb"}}>
                0:32
              </span>
              <span style={{width: "40px", flex: "none", textAlign: "right", fontFamily: "'Geist Mono',monospace", fontSize: "9.5px", color: "#8a9690"}}>
                08:12
              </span>
            </A>
            <A as="div" fx="enter" at={20} style={{display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderBottom: "1px solid rgba(22,36,29,.05)"}}>
              <span style={{width: "196px", flex: "none", display: "flex", alignItems: "center", gap: "9px"}}>
                <span style={{width: "32px", height: "32px", borderRadius: "50%", background: "rgba(16,196,110,.15)", color: "#0c6b43", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "11px"}}>
                  JH
                </span>
                <span>
                  <span style={{display: "block", fontSize: "13px", fontWeight: "700"}}>
                    James Holloway
                  </span>
                  <span style={{display: "block", fontSize: "9.5px", color: "#5d7468"}}>
                    Hot buyer
                  </span>
                </span>
              </span>
              <span style={{flex: "1", fontSize: "11.5px", color: "#3f5249"}}>
                Offer this week if inspection clears
              </span>
              <span style={{width: "78px", flex: "none"}}>
                <span style={{fontSize: "8.5px", fontWeight: "700", color: "#0c6b43", background: "rgba(16,196,110,.12)", border: "1px solid rgba(16,196,110,.3)", borderRadius: "999px", padding: "2px 8px"}}>
                  OFFER SOON
                </span>
              </span>
              <span style={{width: "70px", flex: "none", display: "flex", alignItems: "center", gap: "4px", fontSize: "10.5px", fontWeight: "600", color: "#5d7468"}}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0c6b43" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
                Out
              </span>
              <span style={{width: "44px", flex: "none", textAlign: "right", fontFamily: "'Geist Mono',monospace", fontSize: "10.5px", fontWeight: "600", color: "#5d7468"}}>
                6:12
              </span>
              <span style={{width: "40px", flex: "none", textAlign: "right", fontFamily: "'Geist Mono',monospace", fontSize: "9.5px", color: "#8a9690"}}>
                09:24
              </span>
            </A>
            <A as="div" fx="enter" at={22} style={{display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderBottom: "1px solid rgba(22,36,29,.05)"}}>
              <span style={{width: "196px", flex: "none", display: "flex", alignItems: "center", gap: "9px"}}>
                <span style={{width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,226,194,.85)", color: "#b45309", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "11px"}}>
                  PN
                </span>
                <span>
                  <span style={{display: "block", fontSize: "13px", fontWeight: "700"}}>
                    Priya Nair
                  </span>
                  <span style={{display: "block", fontSize: "9.5px", color: "#5d7468"}}>
                    Seller · Marlowe Cr
                  </span>
                </span>
              </span>
              <span style={{flex: "1", fontSize: "11.5px", color: "#3f5249"}}>
                Wants the appraisal by Friday
              </span>
              <span style={{width: "78px", flex: "none"}}>
                <span style={{fontSize: "8.5px", fontWeight: "700", color: "#5d7468", background: "rgba(255,255,255,.72)", border: "1px solid rgba(255,255,255,.95)", borderRadius: "999px", padding: "2px 8px"}}>
                  TASK SET
                </span>
              </span>
              <span style={{width: "70px", flex: "none", display: "flex", alignItems: "center", gap: "4px", fontSize: "10.5px", fontWeight: "600", color: "#5d7468"}}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0369a1" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 17L7 7M7 15V7h8" />
                </svg>
                In
              </span>
              <span style={{width: "44px", flex: "none", textAlign: "right", fontFamily: "'Geist Mono',monospace", fontSize: "10.5px", fontWeight: "600", color: "#5d7468"}}>
                4:03
              </span>
              <span style={{width: "40px", flex: "none", textAlign: "right", fontFamily: "'Geist Mono',monospace", fontSize: "9.5px", color: "#8a9690"}}>
                16:40
              </span>
            </A>
            <A as="div" fx="enter" at={24} style={{display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderBottom: "1px solid rgba(22,36,29,.05)"}}>
              <span style={{width: "196px", flex: "none", display: "flex", alignItems: "center", gap: "9px"}}>
                <span style={{width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,226,194,.7)", color: "#b45309", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "11px"}}>
                  DW
                </span>
                <span>
                  <span style={{display: "block", fontSize: "13px", fontWeight: "700"}}>
                    Daniel Wu
                  </span>
                  <span style={{display: "block", fontSize: "9.5px", color: "#5d7468"}}>
                    Re-qualifying
                  </span>
                </span>
              </span>
              <span style={{flex: "1", fontSize: "11.5px", color: "#3f5249"}}>
                Pre-approval expired — lender intro made
              </span>
              <span style={{width: "78px", flex: "none"}}>
                <span style={{fontSize: "8.5px", fontWeight: "700", color: "#5d7468", background: "rgba(255,255,255,.72)", border: "1px solid rgba(255,255,255,.95)", borderRadius: "999px", padding: "2px 8px"}}>
                  NURTURE
                </span>
              </span>
              <span style={{width: "70px", flex: "none", display: "flex", alignItems: "center", gap: "4px", fontSize: "10.5px", fontWeight: "600", color: "#5d7468"}}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0c6b43" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
                Out
              </span>
              <span style={{width: "44px", flex: "none", textAlign: "right", fontFamily: "'Geist Mono',monospace", fontSize: "10.5px", fontWeight: "600", color: "#5d7468"}}>
                8:20
              </span>
              <span style={{width: "40px", flex: "none", textAlign: "right", fontFamily: "'Geist Mono',monospace", fontSize: "9.5px", color: "#8a9690"}}>
                09:02
              </span>
            </A>
            <A as="div" fx="fade" at={26} style={{display: "flex", alignItems: "center", gap: "12px", padding: "11px 12px 4px", fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".16em", color: "#8a9690", fontWeight: "600"}}>
              FRIDAY
            </A>
            <A as="div" fx="enter" at={27} style={{display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderBottom: "1px solid rgba(22,36,29,.05)"}}>
              <span style={{width: "196px", flex: "none", display: "flex", alignItems: "center", gap: "9px"}}>
                <span style={{width: "32px", height: "32px", borderRadius: "50%", background: "rgba(125,211,252,.28)", color: "#0369a1", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "11px"}}>
                  MW
                </span>
                <span>
                  <span style={{display: "block", fontSize: "13px", fontWeight: "700"}}>
                    Marcus Wong
                  </span>
                  <span style={{display: "block", fontSize: "9.5px", color: "#5d7468"}}>
                    Buyer · new
                  </span>
                </span>
              </span>
              <span style={{flex: "1", fontSize: "11.5px", color: "#3f5249"}}>
                Settlement timelines on Pine Ct
              </span>
              <span style={{width: "78px", flex: "none"}}>
                <span style={{fontSize: "8.5px", fontWeight: "700", color: "#5d7468", background: "rgba(255,255,255,.72)", border: "1px solid rgba(255,255,255,.95)", borderRadius: "999px", padding: "2px 8px"}}>
                  UNDECIDED
                </span>
              </span>
              <span style={{width: "70px", flex: "none", display: "flex", alignItems: "center", gap: "4px", fontSize: "10.5px", fontWeight: "600", color: "#5d7468"}}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0369a1" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 17L7 7M7 15V7h8" />
                </svg>
                In
              </span>
              <span style={{width: "44px", flex: "none", textAlign: "right", fontFamily: "'Geist Mono',monospace", fontSize: "10.5px", fontWeight: "600", color: "#5d7468"}}>
                3:44
              </span>
              <span style={{width: "40px", flex: "none", textAlign: "right", fontFamily: "'Geist Mono',monospace", fontSize: "9.5px", color: "#8a9690"}}>
                09:47
              </span>
            </A>
            <A as="div" fx="enter" at={29} style={{display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderBottom: "1px solid rgba(22,36,29,.05)"}}>
              <span style={{width: "196px", flex: "none", display: "flex", alignItems: "center", gap: "9px"}}>
                <span style={{width: "32px", height: "32px", borderRadius: "50%", background: "rgba(16,196,110,.15)", color: "#0c6b43", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "11px"}}>
                  ED
                </span>
                <span>
                  <span style={{display: "block", fontSize: "13px", fontWeight: "700"}}>
                    Elena Diaz
                  </span>
                  <span style={{display: "block", fontSize: "9.5px", color: "#5d7468"}}>
                    First-home buyer
                  </span>
                </span>
              </span>
              <span style={{flex: "1", fontSize: "11.5px", color: "#3f5249"}}>
                Wants weekend viewings — send Sat list
              </span>
              <span style={{width: "78px", flex: "none"}}>
                <span style={{fontSize: "8.5px", fontWeight: "700", color: "#0c6b43", background: "rgba(16,196,110,.12)", border: "1px solid rgba(16,196,110,.3)", borderRadius: "999px", padding: "2px 8px"}}>
                  INTERESTED
                </span>
              </span>
              <span style={{width: "70px", flex: "none", display: "flex", alignItems: "center", gap: "4px", fontSize: "10.5px", fontWeight: "600", color: "#5d7468"}}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0c6b43" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
                Out
              </span>
              <span style={{width: "44px", flex: "none", textAlign: "right", fontFamily: "'Geist Mono',monospace", fontSize: "10.5px", fontWeight: "600", color: "#5d7468"}}>
                5:31
              </span>
              <span style={{width: "40px", flex: "none", textAlign: "right", fontFamily: "'Geist Mono',monospace", fontSize: "9.5px", color: "#8a9690"}}>
                15:12
              </span>
            </A>
            <A as="div" fx="enter" at={31} style={{display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", opacity: ".45", borderBottom: "none"}}>
              <span style={{width: "196px", flex: "none", display: "flex", alignItems: "center", gap: "9px"}}>
                <span style={{width: "32px", height: "32px", borderRadius: "50%", background: "rgba(22,36,29,.07)", color: "#5d7468", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "11px"}}>
                  ?
                </span>
                <span>
                  <span style={{display: "block", fontSize: "13px", fontWeight: "700"}}>
                    Unknown
                  </span>
                  <span style={{display: "block", fontSize: "9.5px", color: "#5d7468"}}>
                    No match
                  </span>
                </span>
              </span>
              <span style={{flex: "1", fontSize: "11.5px", color: "#be123c"}}>
                Missed · no voicemail
              </span>
              <span style={{width: "78px", flex: "none"}}>
                <span style={{fontSize: "8.5px", fontWeight: "700", color: "#be123c", background: "rgba(225,29,72,.08)", border: "1px solid rgba(225,29,72,.24)", borderRadius: "999px", padding: "2px 8px"}}>
                  MISSED
                </span>
              </span>
              <span style={{width: "70px", flex: "none", display: "flex", alignItems: "center", gap: "4px", fontSize: "10.5px", fontWeight: "600", color: "#be123c"}}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#be123c" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 7L7 17M15 17H7V9" />
                </svg>
                Missed
              </span>
              <span style={{width: "44px", flex: "none", textAlign: "right", fontFamily: "'Geist Mono',monospace", fontSize: "10.5px", color: "#c4d2cb"}}>
                —
              </span>
              <span style={{width: "40px", flex: "none", textAlign: "right", fontFamily: "'Geist Mono',monospace", fontSize: "9.5px", color: "#8a9690"}}>
                11:20
              </span>
            </A>
          </div>
        </div>
        <A as="div" fx="slideL" at={30} style={{width: "372px", flex: "none", borderRadius: "24px", background: "linear-gradient(160deg,rgba(255,255,255,.86),rgba(255,255,255,.64))", backdropFilter: "blur(32px) saturate(160%)", border: "1px solid rgba(255,255,255,.98)", boxShadow: "0 28px 62px -22px rgba(16,74,52,.45),inset 0 1px 0 rgba(255,255,255,1)", display: "flex", flexDirection: "column", minHeight: "0", overflow: "hidden", padding: "14px"}}>
          <div style={{flex: "none", borderRadius: "16px", background: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.95)", padding: "11px 13px", display: "flex", gap: "12px"}}>
            <div style={{flex: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px"}}>
              <div style={{position: "relative", width: "50px", height: "50px"}}>
                <svg width="50" height="50" viewBox="0 0 50 50" style={{position: "absolute", inset: "0", transform: "rotate(-90deg)"}}>
                  <circle cx="25" cy="25" r="21" fill="none" stroke="rgba(22,36,29,.08)" strokeWidth="3.5" />
                  <circle cx="25" cy="25" r="21" fill="none" stroke="#10c46e" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="92 132" />
                </svg>
                <div style={{position: "absolute", inset: "6px", borderRadius: "50%", background: "rgba(125,211,252,.35)", color: "#0369a1", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "12px"}}>
                  RK
                </div>
              </div>
              <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "9px", fontWeight: "600", color: "#0c6b43"}}>
                70°
              </span>
            </div>
            <div style={{flex: "1", minWidth: "0"}}>
              <div style={{display: "flex", alignItems: "center", gap: "6px"}}>
                <span style={{fontFamily: "'Geist',sans-serif", fontSize: "14.5px", fontWeight: "800"}}>
                  Rachel Kim
                </span>
                <span style={{fontSize: "8.5px", fontWeight: "700", color: "#0c6b43", background: "rgba(16,196,110,.14)", border: "1px solid rgba(16,196,110,.3)", borderRadius: "999px", padding: "1px 7px"}}>
                  WARMING ↑
                </span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0c6b43" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: "auto"}}>
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </div>
              <div style={{fontSize: "10px", color: "#5d7468", marginTop: "1px"}}>
                Buyer · Northcote · $650k pre-approved
              </div>
              <div style={{marginTop: "5px", display: "flex", flexDirection: "column", gap: "2.5px", fontSize: "9.5px"}}>
                <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                  <span style={{width: "4px", height: "4px", borderRadius: "50%", background: "#10c46e", flex: "none"}} />
                  {"Replies within "}
                  <b>
                    2 hours
                  </b>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                  <span style={{width: "4px", height: "4px", borderRadius: "50%", background: "#f59e0b", flex: "none"}} />
                  {"Prefers "}
                  <b>
                    calls after 4pm
                  </b>
                </div>
              </div>
            </div>
          </div>
          <div style={{flex: "none", marginTop: "9px", borderRadius: "16px", background: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.95)", padding: "11px 13px"}}>
            <div style={{display: "flex", alignItems: "center", marginBottom: "8px"}}>
              <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".16em", color: "#8a9690", fontWeight: "600"}}>
                CALL DETAILS
              </span>
              <span style={{marginLeft: "auto", display: "flex", alignItems: "center", gap: "4px", fontSize: "9px", fontWeight: "700", color: "#0c6b43", background: "rgba(255,255,255,.75)", border: "1px solid rgba(16,196,110,.32)", borderRadius: "999px", padding: "2px 9px"}}>
                INTERESTED
                <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#0c6b43" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </div>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 14px", fontSize: "11px"}}>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{color: "#8a9690"}}>
                  Direction
                </span>
                <span style={{fontWeight: "700"}}>
                  Outgoing ↗
                </span>
              </div>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{color: "#8a9690"}}>
                  Line
                </span>
                <span style={{fontWeight: "700", fontFamily: "'Geist Mono',monospace", fontSize: "10.5px"}}>
                  ···4471
                </span>
              </div>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{color: "#8a9690"}}>
                  Time
                </span>
                <span style={{fontWeight: "700", fontFamily: "'Geist Mono',monospace", fontSize: "10.5px"}}>
                  14:21
                </span>
              </div>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{color: "#8a9690"}}>
                  Duration
                </span>
                <span style={{fontWeight: "700", fontFamily: "'Geist Mono',monospace", fontSize: "10.5px"}}>
                  12:47
                </span>
              </div>
            </div>
            <div style={{marginTop: "9px", borderRadius: "11px", padding: "7px 10px", background: "rgba(255,255,255,.72)", border: "1px solid rgba(255,255,255,.98)", display: "flex", alignItems: "center", gap: "8px"}}>
              <span style={{width: "24px", height: "24px", borderRadius: "50%", background: "linear-gradient(180deg,#10c46e,#0c9a55)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none"}}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="#fff">
                  <path d="M7 4l13 8-13 8V4z" />
                </svg>
              </span>
              <span style={{flex: "1", height: "2px", borderRadius: "2px", background: "linear-gradient(90deg,#0c9a55 25%,rgba(12,107,67,.18) 25%)"}} />
              <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", color: "#5d7468"}}>
                3:12 / 12:47
              </span>
              <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "8px", fontWeight: "700", color: "#0c6b43", background: "rgba(16,196,110,.1)", border: "1px solid rgba(16,196,110,.24)", borderRadius: "6px", padding: "1px 5px"}}>
                1.5×
              </span>
            </div>
          </div>
          <div style={{flex: "1", marginTop: "9px", borderRadius: "16px", background: "rgba(255,255,255,.55)", border: "1px solid rgba(255,255,255,.92)", padding: "11px 13px", display: "flex", flexDirection: "column", minHeight: "0", overflow: "hidden"}}>
            <div style={{flex: "none", display: "flex", gap: "3px", background: "rgba(22,36,29,.06)", borderRadius: "11px", padding: "3px"}}>
              <span style={{flex: "1", textAlign: "center", padding: "6px 0", borderRadius: "8px", background: "#fff", boxShadow: "0 4px 12px -4px rgba(16,74,52,.25)", fontSize: "11px", fontWeight: "700", color: "#0c6b43"}}>
                Summary
              </span>
              <span style={{flex: "1", textAlign: "center", padding: "6px 0", borderRadius: "8px", fontSize: "11px", fontWeight: "600", color: "#5d7468"}}>
                Transcript
              </span>
            </div>
            <div style={{marginTop: "10px", borderRadius: "13px", padding: "11px 13px", background: "linear-gradient(150deg,rgba(16,196,110,.13),rgba(255,255,255,.45))", border: "1px solid rgba(16,196,110,.26)"}}>
              <div style={{fontFamily: "'Geist',sans-serif", fontSize: "14px", lineHeight: "1.42", fontWeight: "700", textWrap: "pretty"}}>
                {"Thursday 10am locked \u2014 she's "}
                <span style={{color: "#0c6b43"}}>
                  bringing Tom
                </span>
                {" and wants the building report first."}
              </div>
            </div>
            <div style={{marginTop: "9px", display: "flex", flexDirection: "column", gap: "5px", fontSize: "10.5px"}}>
              <div style={{display: "flex", alignItems: "center", gap: "7px"}}>
                <span style={{width: "13px", height: "13px", borderRadius: "4px", background: "linear-gradient(180deg,#10c46e,#0c9a55)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none"}}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                </span>
                <span style={{color: "#5d7468", textDecoration: "line-through"}}>
                  Book Thursday 10am viewing
                </span>
              </div>
              <div style={{display: "flex", alignItems: "center", gap: "7px"}}>
                <span style={{width: "13px", height: "13px", borderRadius: "4px", border: "1.5px solid rgba(12,107,67,.4)", background: "rgba(255,255,255,.7)", flex: "none"}} />
                Send building report to Tom
              </div>
              <div style={{display: "flex", alignItems: "center", gap: "7px"}}>
                <span style={{width: "13px", height: "13px", borderRadius: "4px", border: "1.5px solid rgba(12,107,67,.4)", background: "rgba(255,255,255,.7)", flex: "none"}} />
                Answer body-corporate fee question
              </div>
            </div>
            <div style={{marginTop: "10px", paddingTop: "9px", borderTop: "1px solid rgba(22,36,29,.07)"}}>
              <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "8px", letterSpacing: ".16em", color: "#8a9690", fontWeight: "600", marginBottom: "6px"}}>
                FROM THE TRANSCRIPT
              </div>
              <div style={{display: "flex", flexDirection: "column", gap: "6px", fontSize: "10.5px", lineHeight: "1.5", color: "#5d7468"}}>
                <div style={{display: "flex", gap: "7px"}}>
                  <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "8px", color: "#b6c2bb", width: "26px", flex: "none", paddingTop: "2px"}}>
                    02:58
                  </span>
                  <span>
                    <b style={{color: "#0c6b43"}}>
                      Rachel
                    </b>
                    {" \u00b7 Can we see it before Saturday? Tom's off Thursday."}
                  </span>
                </div>
                <div style={{display: "flex", gap: "7px"}}>
                  <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "8px", color: "#b6c2bb", width: "26px", flex: "none", paddingTop: "2px"}}>
                    07:40
                  </span>
                  <span>
                    <b style={{color: "#3f5249"}}>
                      Rachel
                    </b>
                    {" \u00b7 What are the body-corporate fees like on that block?"}
                  </span>
                </div>
                <div style={{display: "flex", gap: "7px"}}>
                  <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "8px", color: "#b6c2bb", width: "26px", flex: "none", paddingTop: "2px"}}>
                    11:05
                  </span>
                  <span>
                    <b style={{color: "#3f5249"}}>
                      You
                    </b>
                    {" \u00b7 Locked \u2014 Thursday 10am, report tonight."}
                  </span>
                </div>
              </div>
            </div>
            <div style={{marginTop: "auto", paddingTop: "8px", fontSize: "10px", color: "#8a9690"}}>
              {"Key moments: "}
              <b style={{color: "#0c6b43"}}>
                02:58 intent
              </b>
              {" \u00b7 "}
              <b style={{color: "#b45309"}}>
                07:40 objection
              </b>
              {" \u00b7 "}
              <b style={{color: "#0c6b43"}}>
                11:05 commitment
              </b>
            </div>
          </div>
          <div style={{flex: "none", display: "flex", gap: "6px", paddingTop: "11px"}}>
            <span style={{flex: "1", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", fontSize: "11px", fontWeight: "700", color: "#fff", background: "linear-gradient(180deg,#10c46e,#0c9a55)", borderRadius: "999px", padding: "9px 0", boxShadow: "0 10px 22px -8px rgba(12,154,85,.55)"}}>
              Call back
            </span>
            <span style={{flex: "1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "700", color: "#16241d", background: "rgba(255,255,255,.72)", border: "1px solid rgba(255,255,255,.98)", borderRadius: "999px", padding: "9px 0"}}>
              Message
            </span>
            <span style={{flex: "1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "700", color: "#16241d", background: "rgba(255,255,255,.72)", border: "1px solid rgba(255,255,255,.98)", borderRadius: "999px", padding: "9px 0"}}>
              Contact →
            </span>
          </div>
        </A>
      </div>
    </div>
  </div>
  );
};
