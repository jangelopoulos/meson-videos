// Auto-converted from AgentPhone Motion Brief.html (data-shot="incoming"), 390x844.
import {useT} from "../lib/time";
import React from "react";
import {interpolate} from "remotion";
import {pulse} from "../lib/anim";
import {Ripple} from "../lib/bits";
import {Amb} from "../lib/Amb";
import {A} from "../lib/A";

export const TAP = 44;
const acceptScale = (f: number, TAP: number) =>
  f < TAP - 3
    ? 1 + 0.05 * pulse(f, 24, 18)
    : interpolate(f, [TAP - 3, TAP, TAP + 8], [1, 0.9, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

export const IncomingScreen: React.FC<{tap?: number}> = ({tap = TAP}) => {
  const f = useT();
  return (
  <div style={{position: "relative", width: 390, height: 844, overflow: "hidden"}}>
    <div style={{width: "390px", height: "844px", borderRadius: "46px", overflow: "hidden", position: "relative", fontFamily: "'Geist',sans-serif", color: "#16241d", background: "#e6f2ec", boxShadow: "0 30px 60px -24px rgba(16,74,52,.4)", display: "flex", flexDirection: "column"}}>
      <div style={{position: "absolute", inset: "0", background: "radial-gradient(80% 50% at 50% 0%,#a7f3d0 0%,transparent 52%),radial-gradient(64% 44% at 100% 10%,#bae6fd 0%,transparent 52%),radial-gradient(75% 50% at 0% 100%,#d1fae5 0%,transparent 54%),#e6f2ec"}} />
      <Amb as="div" kind="ccFloat" dur={10} style={{position: "absolute", width: "250px", height: "250px", borderRadius: "50%", background: "#6ee7b7", filter: "blur(68px)", opacity: ".45", top: "60px", left: "50%", marginLeft: "-125px"}} />
      <div style={{position: "relative", display: "flex", flexDirection: "column", height: "100%"}}>
        <div style={{height: "54px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 30px 0 34px", fontSize: "15px", fontWeight: "700", flex: "none"}}>
          <span style={{fontFamily: "'Geist Mono',monospace"}}>
            9:41
          </span>
          <span style={{width: "20px", height: "11px", border: "1.5px solid #16241d", borderRadius: "3px", display: "inline-block", position: "relative"}}>
            <span style={{position: "absolute", inset: "1.5px", background: "#16241d", borderRadius: "1px", width: "13px"}} />
          </span>
        </div>
        <div style={{flex: "none", padding: "30px 24px 0", textAlign: "center"}}>
          <A as="div" fx="enter" at={2} style={{fontFamily: "'Geist Mono',monospace", fontSize: "12px", letterSpacing: ".16em", color: "#0c6b43", fontWeight: "600"}}>
            INCOMING CALL
          </A>
          <A as="div" fx="pop" at={4} style={{position: "relative", width: "128px", height: "128px", margin: "26px auto 0"}}>
            <Amb as="span" kind="ccRing" dur={2} style={{position: "absolute", inset: "0", borderRadius: "50%", background: "rgba(16,196,110,.3)"}} />
            <Amb as="span" kind="ccRing" dur={2} delay={1} style={{position: "absolute", inset: "0", borderRadius: "50%", background: "rgba(16,196,110,.3)"}} />
            <div style={{position: "absolute", inset: "0", borderRadius: "50%", background: "linear-gradient(150deg,rgba(255,255,255,.7),rgba(255,255,255,.42))", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,.85)", boxShadow: "0 16px 40px -12px rgba(16,74,52,.35),inset 0 1px 0 rgba(255,255,255,.9)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Geist',sans-serif", fontWeight: "700", fontSize: "44px", color: "#0c6b43"}}>
              JH
            </div>
          </A>
          <A as="div" fx="enter" at={7} style={{fontFamily: "'Geist',sans-serif", fontSize: "28px", fontWeight: "800", letterSpacing: "-.02em", marginTop: "22px"}}>
            James Holloway
          </A>
          <A as="div" fx="enter" at={9} style={{marginTop: "7px", display: "inline-flex", alignItems: "center", gap: "7px"}}>
            <span style={{fontSize: "11px", fontWeight: "700", letterSpacing: ".05em", color: "#0c6b43", background: "rgba(16,196,110,.18)", borderRadius: "7px", padding: "4px 9px"}}>
              BUYER
            </span>
            <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "13px", color: "#5d7468"}}>
              +61 414 226 058
            </span>
          </A>
        </div>
        <A as="div" fx="slideL" at={12} style={{margin: "26px 22px 0", flex: "none", borderRadius: "22px", padding: "16px 18px", background: "linear-gradient(150deg,rgba(255,255,255,.64),rgba(255,255,255,.36))", backdropFilter: "blur(22px) saturate(150%)", border: "1px solid rgba(255,255,255,.74)", boxShadow: "0 12px 30px -16px rgba(16,74,52,.26),inset 0 1px 0 rgba(255,255,255,.92)"}}>
          <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
            <div style={{width: "44px", height: "44px", borderRadius: "12px", background: "linear-gradient(150deg,#bbf7d0,#86efac)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none"}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0c6b43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11l9-8 9 8" />
                <path d="M5 10v10h14V10" />
              </svg>
            </div>
            <div style={{flex: "1"}}>
              <div style={{fontSize: "13.5px", fontWeight: "700"}}>
                Re: 14 Marlowe Crescent
              </div>
              <div style={{fontSize: "11.5px", color: "#5d7468", marginTop: "1px"}}>
                Last spoke 09:24 · 6m 12s
              </div>
            </div>
          </div>
          <A as="div" fx="slideL" at={18} style={{marginTop: "12px", borderTop: "1px solid rgba(22,36,29,.08)", paddingTop: "11px", fontSize: "13px", lineHeight: "1.45", color: "#3f5249"}}>
            <span style={{fontWeight: "700", color: "#0c6b43"}}>
              {"AI note \u00b7 "}
            </span>
            Likely calling to confirm Saturday's inspection. Brochure still pending.
          </A>
        </A>
        <div style={{flex: "1"}} />
        <A as="div" fx="enter" at={22} style={{flex: "none", display: "flex", justifyContent: "center", gap: "10px", padding: "0 22px 16px"}}>
          <span style={{fontSize: "12px", fontWeight: "600", color: "#16241d", background: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.8)", borderRadius: "13px", padding: "8px 13px"}}>
            "On my way 🚗"
          </span>
          <span style={{fontSize: "12px", fontWeight: "600", color: "#16241d", background: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.8)", borderRadius: "13px", padding: "8px 13px"}}>
            Remind me later
          </span>
        </A>
        <div style={{flex: "none", display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "0 50px 30px"}}>
          <A as="div" fx="rise" at={15} style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "9px"}}>
            <div style={{width: "74px", height: "74px", borderRadius: "50%", background: "linear-gradient(180deg,#fb5e7e,#e11d48)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 14px 30px -10px rgba(225,29,72,.55),inset 0 1px 0 rgba(255,255,255,.35)"}}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" style={{transform: "rotate(135deg)"}}>
                <path d="M19.6 21c-2.3 0-4.6-.6-6.9-1.7-2.2-1.1-4.2-2.6-6-4.4-1.8-1.8-3.3-3.8-4.4-6C1.2 6.7.6 4.4.6 2.1c0-.4.1-.7.4-1C1.3.8 1.6.7 2 .7h3.3c.3 0 .6.1.8.3.2.2.4.5.4.8.1.8.3 1.6.6 2.4.2.5.1 1-.3 1.4L5.6 8.1c1.2 2.2 2.9 3.9 5.1 5.1l1.7-1.7c.4-.4.9-.5 1.4-.3.8.3 1.6.5 2.4.6.3 0 .6.2.8.4.2.2.3.5.3.8V19c0 .4-.1.7-.4 1-.3.3-.6.4-1 .4z" />
              </svg>
            </div>
            <span style={{fontSize: "12px", color: "#5d7468", fontWeight: "600"}}>
              Decline
            </span>
          </A>
          <A as="div" fx="rise" at={17} style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "9px"}}>
            <div style={{scale: acceptScale(f, tap), position: "relative", width: "82px", height: "82px", borderRadius: "50%", background: "linear-gradient(180deg,#10c46e,#0a8f4e)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 16px 36px -10px rgba(12,154,85,.65),inset 0 1px 0 rgba(255,255,255,.4)"}}>
              <Ripple at={tap} size={82} />
              <svg width="34" height="34" viewBox="0 0 24 24" fill="#fff">
                <path d="M19.6 21c-2.3 0-4.6-.6-6.9-1.7-2.2-1.1-4.2-2.6-6-4.4-1.8-1.8-3.3-3.8-4.4-6C1.2 6.7.6 4.4.6 2.1c0-.4.1-.7.4-1C1.3.8 1.6.7 2 .7h3.3c.3 0 .6.1.8.3.2.2.4.5.4.8.1.8.3 1.6.6 2.4.2.5.1 1-.3 1.4L5.6 8.1c1.2 2.2 2.9 3.9 5.1 5.1l1.7-1.7c.4-.4.9-.5 1.4-.3.8.3 1.6.5 2.4.6.3 0 .6.2.8.4.2.2.3.5.3.8V19c0 .4-.1.7-.4 1-.3.3-.6.4-1 .4z" />
              </svg>
            </div>
            <span style={{fontSize: "12px", color: "#0c6b43", fontWeight: "700"}}>
              Accept
            </span>
          </A>
        </div>
      </div>
    </div>
  </div>
  );
};
