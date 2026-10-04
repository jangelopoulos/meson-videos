// Auto-converted from AgentPhone Motion Brief.html (data-shot="mapping"), 390x844.
import React from "react";
import {useT} from "../lib/time";
import {draw, prog, pulse} from "../lib/anim";
import {CheckDraw, Ripple} from "../lib/bits";
import {interpolate} from "remotion";
import {A} from "../lib/A";

export const ROW0 = 26; // first mapping row
export const STEP = 12; // 1.0 speed: each row fully resolves before the next

export const MappingScreen: React.FC<{pressAt?: number}> = ({pressAt}) => {
  const f = useT();
  return (
  <div style={{position: "relative", width: 390, height: 844, overflow: "hidden"}}>
    <div data-screen-label="Mobile 4 Contacts" style={{width: "390px", height: "844px", borderRadius: "46px", overflow: "hidden", position: "relative", color: "#16241d", background: "#eef4f0", boxShadow: "0 30px 60px -24px rgba(16,74,52,.4)", fontFamily: "'Geist',sans-serif"}}>
      <div style={{position: "absolute", inset: "0", background: "radial-gradient(70% 55% at 6% 0%,#b9f6d6 0%,transparent 58%),radial-gradient(64% 48% at 100% 6%,#cbe8ff 0%,transparent 56%),radial-gradient(82% 60% at 96% 100%,#ffe2c2 0%,transparent 54%),#eef4f0"}} />
      <div style={{position: "relative", height: "100%", display: "flex", flexDirection: "column"}}>
        <div style={{height: "54px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 30px 0 34px", fontSize: "15px", fontWeight: "700", flex: "none"}}>
          <span style={{fontFamily: "'Geist Mono',monospace"}}>
            9:41
          </span>
          <span style={{width: "20px", height: "11px", border: "1.5px solid #16241d", borderRadius: "3px", display: "inline-block", position: "relative"}}>
            <span style={{position: "absolute", inset: "1.5px", background: "#16241d", borderRadius: "1px", width: "13px"}} />
          </span>
        </div>
        <A as="div" fx="enter" at={0} style={{flex: "none", padding: "6px 22px 0", display: "flex", alignItems: "center", gap: "12px"}}>
          <span style={{width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,.62)", border: "1px solid rgba(255,255,255,.95)", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16241d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </span>
          <span style={{fontSize: "15px", fontWeight: "700"}}>
            Connect a CRM
          </span>
          <span style={{marginLeft: "auto", fontFamily: "'Geist Mono',monospace", fontSize: "11px", color: "#5d7468"}}>
            4/6
          </span>
        </A>
        <div style={{flex: "none", padding: "14px 22px 0"}}>
          <div style={{display: "flex", gap: "4px"}}>
            <span style={{flex: "1", height: "3px", borderRadius: "2px", background: `linear-gradient(90deg, #10c46e ${100 * draw(f, 3, 6)}%, rgba(22,36,29,.12) 0)`}} />
            <span style={{flex: "1", height: "3px", borderRadius: "2px", background: `linear-gradient(90deg, #10c46e ${100 * draw(f, 6, 6)}%, rgba(22,36,29,.12) 0)`}} />
            <span style={{flex: "1", height: "3px", borderRadius: "2px", background: `linear-gradient(90deg, #10c46e ${100 * draw(f, 9, 6)}%, rgba(22,36,29,.12) 0)`}} />
            <span style={{flex: "1", height: "3px", borderRadius: "2px", background: `linear-gradient(90deg, #10c46e ${100 * draw(f, 12, 6)}%, rgba(22,36,29,.12) 0)`}} />
            <span style={{flex: "1", height: "3px", borderRadius: "2px", background: "rgba(22,36,29,.12)"}} />
            <span style={{flex: "1", height: "3px", borderRadius: "2px", background: "rgba(22,36,29,.12)"}} />
          </div>
        </div>
        <A as="div" fx="enter" at={8} style={{flex: "none", padding: "18px 22px 0"}}>
          <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "10px", letterSpacing: ".16em", color: "#5d7468", fontWeight: "600"}}>
            CONTACTS
          </div>
          <div style={{fontFamily: "'Geist',sans-serif", fontSize: "26px", fontWeight: "800", letterSpacing: "-.025em", lineHeight: "1.08", marginTop: "6px"}}>
            Contacts table
          </div>
          <div style={{fontSize: "13.5px", lineHeight: "1.5", color: "#5b6b62", marginTop: "8px", textWrap: "pretty"}}>
            Columns matched by name and sample values.
          </div>
        </A>
        <div style={{flex: "1", minHeight: "0", margin: "16px 22px 0", overflow: "hidden"}}>
          <A as="div" fx="pop" at={14}>
            <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "10px", letterSpacing: ".16em", color: "#5d7468", fontWeight: "600"}}>
              TABLE
            </div>
            <div style={{marginTop: "6px"}}>
              <div style={{display: "flex", alignItems: "center", gap: "10px", borderRadius: "12px", padding: "10px 12px", background: "rgba(255,255,255,.62)", border: "1px solid rgba(255,255,255,.95)", width: "100%"}}>
                <span style={{flex: "1", minWidth: "0"}}>
                  <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "12.5px", fontWeight: "600", color: "#16241d"}}>
                    public.contacts
                  </span>
                  <span style={{fontSize: "11px", color: "#8a9690", marginLeft: "8px"}}>
                    2,418 rows · matched by name
                  </span>
                </span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5d7468" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
            <A as="div" fx="enter" at={20} style={{marginTop: "14px", display: "flex", alignItems: "baseline", justifyContent: "space-between"}}>
              <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "10px", letterSpacing: ".16em", color: "#5d7468", fontWeight: "600"}}>
                FIELD MAPPING
              </div>
              <span style={{fontSize: "11px", color: "#0c6b43", fontWeight: "700"}}>
                4 of 5 auto-matched
              </span>
            </A>
            <div style={{marginTop: "4px"}}>
              <A as="div" fx="enter" at={ROW0 + 0 * STEP} style={{display: "grid", gridTemplateColumns: "1fr 20px 1.3fr 22px", alignItems: "center", gap: "10px", padding: "10px 4px", borderBottom: "1px solid rgba(22,36,29,.07)"}}>
                <span style={{fontSize: "13px", fontWeight: "600"}}>
                  Full name
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9aa8a1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw(f, ROW0 + 0 * STEP + 3, 9)} />
                </svg>
                <A as="span" fx="pop" at={ROW0 + 0 * STEP + 12} style={{display: "flex", alignItems: "center", gap: "8px", borderRadius: "10px", padding: "7px 10px", background: "rgba(255,255,255,.62)", border: "1px solid rgba(255,255,255,.95)"}}>
                  <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "12px", fontWeight: "600", flex: "1"}}>
                    full_name
                  </span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5d7468" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </A>
                <span style={{display: "flex", justifyContent: "center"}}>
                  <CheckDraw at={ROW0 + 0 * STEP + 15} size={12} color="#0c6b43" width={3} />
                </span>
              </A>
              <A as="div" fx="enter" at={ROW0 + 1 * STEP} style={{display: "grid", gridTemplateColumns: "1fr 20px 1.3fr 22px", alignItems: "center", gap: "10px", padding: "10px 4px", borderBottom: "1px solid rgba(22,36,29,.07)"}}>
                <span style={{fontSize: "13px", fontWeight: "600"}}>
                  Mobile
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9aa8a1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw(f, ROW0 + 1 * STEP + 3, 9)} />
                </svg>
                <A as="span" fx="pop" at={ROW0 + 1 * STEP + 12} style={{display: "flex", alignItems: "center", gap: "8px", borderRadius: "10px", padding: "7px 10px", background: "rgba(255,255,255,.62)", border: "1px solid rgba(255,255,255,.95)"}}>
                  <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "12px", fontWeight: "600", flex: "1"}}>
                    phone_e164
                  </span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5d7468" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </A>
                <span style={{display: "flex", justifyContent: "center"}}>
                  <CheckDraw at={ROW0 + 1 * STEP + 15} size={12} color="#0c6b43" width={3} />
                </span>
              </A>
              <A as="div" fx="enter" at={ROW0 + 2 * STEP} style={{display: "grid", gridTemplateColumns: "1fr 20px 1.3fr 22px", alignItems: "center", gap: "10px", padding: "10px 4px", borderBottom: "1px solid rgba(22,36,29,.07)"}}>
                <span style={{fontSize: "13px", fontWeight: "600"}}>
                  Email
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9aa8a1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw(f, ROW0 + 2 * STEP + 3, 9)} />
                </svg>
                <A as="span" fx="pop" at={ROW0 + 2 * STEP + 12} style={{display: "flex", alignItems: "center", gap: "8px", borderRadius: "10px", padding: "7px 10px", background: "rgba(255,255,255,.62)", border: "1px solid rgba(255,255,255,.95)"}}>
                  <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "12px", fontWeight: "600", flex: "1"}}>
                    email
                  </span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5d7468" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </A>
                <span style={{display: "flex", justifyContent: "center"}}>
                  <CheckDraw at={ROW0 + 2 * STEP + 15} size={12} color="#0c6b43" width={3} />
                </span>
              </A>
              <A as="div" fx="enter" at={ROW0 + 3 * STEP} style={{display: "grid", gridTemplateColumns: "1fr 20px 1.3fr 22px", alignItems: "center", gap: "10px", padding: "10px 4px", borderBottom: "1px solid rgba(22,36,29,.07)"}}>
                <span style={{fontSize: "13px", fontWeight: "600"}}>
                  Owner (agent)
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9aa8a1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw(f, ROW0 + 3 * STEP + 3, 9)} />
                </svg>
                <A as="span" fx="pop" at={ROW0 + 3 * STEP + 12} style={{display: "flex", alignItems: "center", gap: "8px", borderRadius: "10px", padding: "7px 10px", background: "rgba(255,255,255,.62)", border: "1px solid rgba(255,255,255,.95)"}}>
                  <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "12px", fontWeight: "600", flex: "1"}}>
                    assigned_to
                  </span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5d7468" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </A>
                <span style={{display: "flex", justifyContent: "center"}}>
                  <CheckDraw at={ROW0 + 3 * STEP + 15} size={12} color="#0c6b43" width={3} />
                </span>
              </A>
              <A as="div" fx="enter" at={ROW0 + 4 * STEP} style={{display: "grid", gridTemplateColumns: "1fr 20px 1.3fr 22px", alignItems: "center", gap: "10px", padding: "10px 4px"}}>
                <span style={{fontSize: "13px", fontWeight: "600"}}>
                  Stage
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9aa8a1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw(f, ROW0 + 4 * STEP + 3, 9)} />
                </svg>
                <A as="span" fx="pop" at={ROW0 + 4 * STEP + 12} style={{display: "flex", alignItems: "center", gap: "8px", borderRadius: "10px", padding: "7px 10px", border: "1px dashed rgba(22,36,29,.2)"}}>
                  <span style={{fontSize: "12px", color: "#8a9690", flex: "1"}}>
                    Choose column
                  </span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5d7468" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </A>
                <span style={{display: "flex", justifyContent: "center"}}>
                  <span style={{width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b", opacity: prog(f, ROW0 + 4 * STEP + 12, 4), scale: `${1 + 0.6 * pulse(f, ROW0 + 4 * STEP + 16, 16)}`, boxShadow: `0 0 ${8 + 10 * pulse(f, ROW0 + 4 * STEP + 16, 16)}px rgba(245,158,11,.7)`}} />
                </span>
              </A>
            </div>
            <A as="div" fx="enter" at={ROW0 + 4 * STEP + 14} style={{marginTop: "8px", fontSize: "11.5px", color: "#b45309", display: "flex", gap: "6px", alignItems: "center"}}>
              <span style={{width: "6px", height: "6px", borderRadius: "50%", background: "#f59e0b"}} />
              Stage has no obvious column — pick one or leave AgentPhone to manage it.
            </A>
          </A>
        </div>
        <div style={{flex: "none", padding: "14px 22px 26px", display: "flex", flexDirection: "column", gap: "8px"}}>
          <A as="span" fx="rise" at={ROW0 + 4 * STEP + 22} extra={pressAt === undefined ? undefined : {scale: `${interpolate(f, [pressAt - 3, pressAt, pressAt + 8], [1, 0.94, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}`}} style={{position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", borderRadius: "13px", padding: "12px 20px", fontWeight: "700", fontSize: "14px", background: "linear-gradient(180deg,#10c46e,#0c9a55)", color: "#fff", boxShadow: "0 10px 22px -8px rgba(12,154,85,.55),inset 0 1px 0 rgba(255,255,255,.4)", width: "100%"}}>
            {pressAt === undefined ? null : <Ripple at={pressAt} size={46} />}
            Continue to activity
          </A>
        </div>
      </div>
    </div>
  </div>
  );
};
