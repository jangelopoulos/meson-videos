// Auto-converted from AgentPhone Motion Brief.html (data-shot="dialer"), 390x844.
import React from "react";
import {interpolate} from "remotion";
import {useT} from "../lib/time";
import {prog, pulse} from "../lib/anim";
import {Ripple, Typed} from "../lib/bits";
import {A} from "../lib/A";
import {Amb} from "../lib/Amb";

export const D = 22; // dialer content starts once the pill has opened
export const TYPE = 60;
export const MATCH = 84;
export const CALL = 108;

export const DialerScreen: React.FC = () => {
  const f = useT();
  return (
  <div style={{position: "relative", width: 390, height: 844, overflow: "hidden"}}>
    <div style={{width: "390px", height: "844px", borderRadius: "46px", overflow: "hidden", position: "relative", fontFamily: "'Geist',sans-serif", color: "#16241d", background: "#eef4f0", boxShadow: "0 30px 60px -24px rgba(16,74,52,.4)", display: "flex", flexDirection: "column"}}>
      <div style={{position: "absolute", inset: "0", background: "radial-gradient(64% 50% at 100% 0%,#cbe8ff 0%,transparent 56%),radial-gradient(70% 52% at 0% 12%,#b9f6d6 0%,transparent 56%),radial-gradient(80% 60% at 50% 100%,#d8fbe8 0%,transparent 55%),#eef4f0"}} />
      <Amb as="div" kind="ccFloat" dur={11} style={{position: "absolute", width: "230px", height: "230px", borderRadius: "50%", background: "#7dd3fc", filter: "blur(64px)", opacity: ".4", top: "-40px", right: "-60px"}} />
      <div style={{position: "relative", display: "flex", flexDirection: "column", height: "100%"}}>
        <div style={{height: "54px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 30px 0 34px", fontSize: "15px", fontWeight: "700", flex: "none"}}>
          <span style={{fontFamily: "'Geist Mono',monospace"}}>
            9:41
          </span>
          <span style={{width: "20px", height: "11px", border: "1.5px solid #16241d", borderRadius: "3px", display: "inline-block", position: "relative"}}>
            <span style={{position: "absolute", inset: "1.5px", background: "#16241d", borderRadius: "1px", width: "13px"}} />
          </span>
        </div>
        <div style={{padding: "6px 22px 0", flex: "none"}}>
          <A as="div" fx="enter" at={D + 2} style={{display: "flex", alignItems: "center", gap: "11px", borderRadius: "16px", padding: "13px 15px", background: "linear-gradient(150deg,rgba(255,255,255,.6),rgba(255,255,255,.32))", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,.7)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)"}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5d7468" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4-4" />
            </svg>
            <span style={{fontSize: "15px", color: "#5d7468"}}>
              Search name or number
            </span>
          </A>
        </div>
        <div style={{padding: "20px 22px 4px", flex: "none"}}>
          <A as="div" fx="enter" at={D + 6} style={{fontFamily: "'Geist Mono',monospace", fontSize: "11px", letterSpacing: ".14em", color: "#5d7468", fontWeight: "600", marginBottom: "13px"}}>
            FAVOURITES
          </A>
          <div style={{display: "flex", gap: "16px"}}>
            <A as="div" fx="pop" at={D + 8} style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "7px"}}>
              <div style={{scale: `${1 + 0.12 * pulse(f, MATCH, 14)}`, outline: `${3 * prog(f, MATCH, 6)}px solid rgba(16,196,110,.7)`, outlineOffset: 3, width: "54px", height: "54px", borderRadius: "50%", background: "linear-gradient(150deg,rgba(255,255,255,.66),rgba(255,255,255,.36))", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,.78)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", color: "#0c6b43"}}>
                JH
              </div>
              <span style={{fontSize: "11px", color: "#5d7468", fontWeight: "500"}}>
                James
              </span>
            </A>
            <A as="div" fx="pop" at={D + 10} style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "7px"}}>
              <div style={{width: "54px", height: "54px", borderRadius: "50%", background: "linear-gradient(150deg,rgba(255,255,255,.66),rgba(255,255,255,.36))", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,.78)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", color: "#0369a1"}}>
                PN
              </div>
              <span style={{fontSize: "11px", color: "#5d7468", fontWeight: "500"}}>
                Priya
              </span>
            </A>
            <A as="div" fx="pop" at={D + 12} style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "7px"}}>
              <div style={{width: "54px", height: "54px", borderRadius: "50%", background: "linear-gradient(150deg,rgba(255,255,255,.66),rgba(255,255,255,.36))", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,.78)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", color: "#b45309"}}>
                RR
              </div>
              <span style={{fontSize: "11px", color: "#5d7468", fontWeight: "500"}}>
                Reardons
              </span>
            </A>
            <A as="div" fx="pop" at={D + 14} style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "7px"}}>
              <div style={{width: "54px", height: "54px", borderRadius: "50%", background: "linear-gradient(150deg,rgba(255,255,255,.66),rgba(255,255,255,.36))", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,.78)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", color: "#5d7468"}}>
                DO
              </div>
              <span style={{fontSize: "11px", color: "#5d7468", fontWeight: "500"}}>
                Daniel
              </span>
            </A>
          </div>
        </div>
        <div style={{flex: "1"}} />
        <div style={{textAlign: "center", padding: "0 22px", flex: "none"}}>
          <div style={{fontFamily: "'Geist',sans-serif", fontSize: "40px", fontWeight: "700", letterSpacing: ".01em", minHeight: "50px", color: "#16241d"}}>
            <Typed text="0414 226 " at={TYPE} cps={12} />
            <Amb as="span" kind="ccPulse" dur={1.1} style={{color: "#0c6b43"}}>
              |
            </Amb>
          </div>
          <A as="div" fx="fade" at={MATCH} style={{fontSize: "13px", color: "#0c6b43", fontWeight: "700", marginTop: "2px"}}>
            Add to contacts
          </A>
        </div>
        <div style={{padding: "20px 42px 6px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "14px 24px", flex: "none"}}>
          <A as="div" fx="pop" at={D + 16} style={{height: "60px", borderRadius: "50%", background: "linear-gradient(150deg,rgba(255,255,255,.58),rgba(255,255,255,.3))", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.68)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.85)", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <span style={{fontSize: "27px", fontWeight: "500"}}>
              1
            </span>
          </A>
          <A as="div" fx="pop" at={D + 17} style={{height: "60px", borderRadius: "50%", background: "linear-gradient(150deg,rgba(255,255,255,.58),rgba(255,255,255,.3))", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.68)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.85)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <span style={{fontSize: "25px", fontWeight: "500", lineHeight: "1"}}>
              2
            </span>
            <span style={{fontSize: "8px", letterSpacing: ".16em", color: "#5d7468", fontWeight: "600"}}>
              ABC
            </span>
          </A>
          <A as="div" fx="pop" at={D + 18} style={{height: "60px", borderRadius: "50%", background: "linear-gradient(150deg,rgba(255,255,255,.58),rgba(255,255,255,.3))", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.68)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.85)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <span style={{fontSize: "25px", fontWeight: "500", lineHeight: "1"}}>
              3
            </span>
            <span style={{fontSize: "8px", letterSpacing: ".16em", color: "#5d7468", fontWeight: "600"}}>
              DEF
            </span>
          </A>
          <A as="div" fx="pop" at={D + 20} style={{height: "60px", borderRadius: "50%", background: "linear-gradient(150deg,rgba(255,255,255,.58),rgba(255,255,255,.3))", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.68)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.85)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <span style={{fontSize: "25px", fontWeight: "500", lineHeight: "1"}}>
              4
            </span>
            <span style={{fontSize: "8px", letterSpacing: ".16em", color: "#5d7468", fontWeight: "600"}}>
              GHI
            </span>
          </A>
          <A as="div" fx="pop" at={D + 21} style={{height: "60px", borderRadius: "50%", background: "linear-gradient(150deg,rgba(255,255,255,.58),rgba(255,255,255,.3))", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.68)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.85)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <span style={{fontSize: "25px", fontWeight: "500", lineHeight: "1"}}>
              5
            </span>
            <span style={{fontSize: "8px", letterSpacing: ".16em", color: "#5d7468", fontWeight: "600"}}>
              JKL
            </span>
          </A>
          <A as="div" fx="pop" at={D + 22} style={{height: "60px", borderRadius: "50%", background: "linear-gradient(150deg,rgba(255,255,255,.58),rgba(255,255,255,.3))", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.68)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.85)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <span style={{fontSize: "25px", fontWeight: "500", lineHeight: "1"}}>
              6
            </span>
            <span style={{fontSize: "8px", letterSpacing: ".16em", color: "#5d7468", fontWeight: "600"}}>
              MNO
            </span>
          </A>
          <A as="div" fx="pop" at={D + 23} style={{height: "60px", borderRadius: "50%", background: "linear-gradient(150deg,rgba(255,255,255,.58),rgba(255,255,255,.3))", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.68)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.85)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <span style={{fontSize: "25px", fontWeight: "500", lineHeight: "1"}}>
              7
            </span>
            <span style={{fontSize: "8px", letterSpacing: ".16em", color: "#5d7468", fontWeight: "600"}}>
              PQRS
            </span>
          </A>
          <A as="div" fx="pop" at={D + 24} style={{height: "60px", borderRadius: "50%", background: "linear-gradient(150deg,rgba(255,255,255,.58),rgba(255,255,255,.3))", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.68)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.85)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <span style={{fontSize: "25px", fontWeight: "500", lineHeight: "1"}}>
              8
            </span>
            <span style={{fontSize: "8px", letterSpacing: ".16em", color: "#5d7468", fontWeight: "600"}}>
              TUV
            </span>
          </A>
          <A as="div" fx="pop" at={D + 26} style={{height: "60px", borderRadius: "50%", background: "linear-gradient(150deg,rgba(255,255,255,.58),rgba(255,255,255,.3))", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.68)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.85)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <span style={{fontSize: "25px", fontWeight: "500", lineHeight: "1"}}>
              9
            </span>
            <span style={{fontSize: "8px", letterSpacing: ".16em", color: "#5d7468", fontWeight: "600"}}>
              WXYZ
            </span>
          </A>
          <A as="div" fx="pop" at={D + 27} style={{height: "60px", borderRadius: "50%", background: "linear-gradient(150deg,rgba(255,255,255,.58),rgba(255,255,255,.3))", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.68)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.85)", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <span style={{fontSize: "27px", fontWeight: "500"}}>
              *
            </span>
          </A>
          <A as="div" fx="pop" at={D + 28} style={{height: "60px", borderRadius: "50%", background: "linear-gradient(150deg,rgba(255,255,255,.58),rgba(255,255,255,.3))", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.68)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.85)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <span style={{fontSize: "25px", fontWeight: "500", lineHeight: "1"}}>
              0
            </span>
            <span style={{fontSize: "11px", color: "#5d7468", fontWeight: "600", lineHeight: ".6"}}>
              +
            </span>
          </A>
          <A as="div" fx="pop" at={D + 29} style={{height: "60px", borderRadius: "50%", background: "linear-gradient(150deg,rgba(255,255,255,.58),rgba(255,255,255,.3))", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.68)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.85)", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <span style={{fontSize: "27px", fontWeight: "500"}}>
              #
            </span>
          </A>
        </div>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "38px", padding: "10px 42px 28px", flex: "none"}}>
          <div style={{width: "52px"}} />
          <div style={{position: "relative", scale: `${interpolate(f, [CALL - 3, CALL, CALL + 8], [1, 0.9, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}`, width: "72px", height: "72px", borderRadius: "50%", background: "linear-gradient(180deg,#10c46e,#0a8f4e)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 14px 30px -8px rgba(12,154,85,.7),inset 0 1px 0 rgba(255,255,255,.4)"}}>
            <Ripple at={CALL} size={72} />
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
              <path d="M19.6 21c-2.3 0-4.6-.6-6.9-1.7-2.2-1.1-4.2-2.6-6-4.4-1.8-1.8-3.3-3.8-4.4-6C1.2 6.7.6 4.4.6 2.1c0-.4.1-.7.4-1C1.3.8 1.6.7 2 .7h3.3c.3 0 .6.1.8.3.2.2.4.5.4.8.1.8.3 1.6.6 2.4.2.5.1 1-.3 1.4L5.6 8.1c1.2 2.2 2.9 3.9 5.1 5.1l1.7-1.7c.4-.4.9-.5 1.4-.3.8.3 1.6.5 2.4.6.3 0 .6.2.8.4.2.2.3.5.3.8V19c0 .4-.1.7-.4 1-.3.3-.6.4-1 .4z" />
            </svg>
          </div>
          <div style={{width: "52px", display: "flex", justifyContent: "center"}}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5d7468" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 5H8l-6 7 6 7h13a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1z" />
              <path d="M15 9l-5 6M10 9l5 6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
