// Auto-converted from AgentPhone Motion Brief.html (data-shot="dashboard"), 390x844.
import {useT} from "../lib/time";
import React from "react";
import {EASE_POP, prog, pulse} from "../lib/anim";
import {Count} from "../lib/bits";
import {A} from "../lib/A";
import {Amb} from "../lib/Amb";

export const START = 40; // Start follow-ups pulses once

export const DashboardScreen: React.FC = () => {
  const f = useT();
  return (
  <div style={{position: "relative", width: 390, height: 844, overflow: "hidden"}}>
    <div style={{width: "390px", height: "844px", borderRadius: "46px", overflow: "hidden", position: "relative", fontFamily: "'Geist',sans-serif", color: "#16241d", background: "#eef4f0", boxShadow: "0 30px 60px -24px rgba(16,74,52,.4)"}}>
      <div style={{position: "absolute", inset: "0", background: "radial-gradient(70% 55% at 6% 0%,#b9f6d6 0%,transparent 58%),radial-gradient(64% 48% at 100% 6%,#cbe8ff 0%,transparent 56%),radial-gradient(82% 60% at 96% 100%,#ffe2c2 0%,transparent 54%),radial-gradient(74% 58% at 0% 100%,#d8fbe8 0%,transparent 54%),#eef4f0"}} />
      <Amb as="div" kind="ccFloat" dur={9} style={{position: "absolute", width: "240px", height: "240px", borderRadius: "50%", background: "#86efac", filter: "blur(64px)", opacity: ".5", top: "-50px", left: "-60px"}} />
      <Amb as="div" kind="ccFloat" dur={12} reverse style={{position: "absolute", width: "220px", height: "220px", borderRadius: "50%", background: "#7dd3fc", filter: "blur(64px)", opacity: ".42", bottom: "80px", right: "-70px"}} />
      <div style={{position: "relative", height: "100%", display: "flex", flexDirection: "column"}}>
        <div style={{height: "54px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 30px 0 34px", fontSize: "15px", fontWeight: "700", flex: "none"}}>
          <span style={{fontFamily: "'Geist Mono',monospace"}}>
            9:41
          </span>
          <span style={{width: "20px", height: "11px", border: "1.5px solid #16241d", borderRadius: "3px", display: "inline-block", position: "relative"}}>
            <span style={{position: "absolute", inset: "1.5px", background: "#16241d", borderRadius: "1px", width: "13px"}} />
          </span>
        </div>
        <div style={{padding: "10px 22px 0", flex: "none", display: "flex", justifyContent: "space-between", alignItems: "flex-start"}}>
          <div>
            <A as="div" fx="enter" at={2} style={{fontFamily: "'Geist Mono',monospace", fontSize: "11px", letterSpacing: ".16em", color: "#5d7468", fontWeight: "500"}}>
              TUE · 18 JUNE
            </A>
            <A as="div" fx="enter" at={4} style={{fontFamily: "'Geist',sans-serif", fontSize: "32px", fontWeight: "800", letterSpacing: "-.025em", lineHeight: "1.04", marginTop: "3px"}}>
              Morning,
              <br />
              Maya.
            </A>
          </div>
          <A as="div" fx="pop" at={6} style={{width: "46px", height: "46px", borderRadius: "50%", background: "linear-gradient(155deg,rgba(255,255,255,.7),rgba(255,255,255,.4))", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,.8)", boxShadow: "0 6px 18px -6px rgba(16,74,52,.28),inset 0 1px 0 rgba(255,255,255,.9)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "14px", flex: "none"}}>
            ME
          </A>
        </div>
        <A as="div" fx="pop" at={8} style={{margin: "18px 22px 0", flex: "none", borderRadius: "28px", padding: "20px 22px", position: "relative", overflow: "hidden", background: "linear-gradient(150deg,rgba(255,255,255,.66),rgba(255,255,255,.36))", backdropFilter: "blur(24px) saturate(150%)", border: "1px solid rgba(255,255,255,.75)", boxShadow: "0 14px 38px -14px rgba(16,74,52,.28),inset 0 1px 0 rgba(255,255,255,.95)"}}>
          <div style={{display: "flex", alignItems: "flex-start", gap: "16px"}}>
            <div style={{fontFamily: "'Geist',sans-serif", fontSize: "60px", fontWeight: "800", lineHeight: ".85", color: "#0c6b43", letterSpacing: "-.04em"}}>
              <Count to={5} at={10} />
            </div>
            <div style={{flex: "1", paddingTop: "4px"}}>
              <A as="div" fx="enter" at={12} style={{fontSize: "13px", fontWeight: "700", color: "#0c6b43", letterSpacing: ".01em"}}>
                follow-ups due today
              </A>
              <A as="div" fx="enter" at={14} style={{fontSize: "14px", lineHeight: "1.45", color: "#3f5249", marginTop: "5px"}}>
                Five buyers are waiting to hear back. Clear them before your 11 o'clock and you're inbox-zero by lunch.
              </A>
            </div>
          </div>
          <A as="div" fx="rise" at={16} extra={{scale: `${1 + 0.05 * pulse(f, START, 16)}`, boxShadow: `0 0 0 ${10 * pulse(f, START, 16)}px rgba(16,196,110,.2), 0 14px 30px -10px rgba(12,154,85,.6)`}} style={{marginTop: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: "9px", background: "linear-gradient(180deg,#10c46e,#0c9a55)", borderRadius: "15px", padding: "13px", color: "#fff", fontWeight: "700", fontSize: "15px", boxShadow: "0 10px 22px -8px rgba(12,154,85,.6),inset 0 1px 0 rgba(255,255,255,.4)"}}>
            {" Start follow-ups "}
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </A>
        </A>
        <div style={{margin: "12px 22px 0", flex: "none", display: "flex", gap: "11px"}}>
          <A as="div" fx="enter" at={18} style={{flex: "1.3", borderRadius: "18px", padding: "13px 16px", display: "flex", alignItems: "center", gap: "11px", background: "linear-gradient(150deg,rgba(255,255,255,.6),rgba(255,255,255,.32))", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,.7)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)"}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0c6b43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.27a2 2 0 0 1 2.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <div>
              <div style={{fontFamily: "'Geist',sans-serif", fontSize: "20px", fontWeight: "700", lineHeight: "1"}}>
                <Count to={24} at={18} />
              </div>
              <div style={{fontSize: "11px", color: "#5d7468", marginTop: "1px"}}>
                calls today
              </div>
            </div>
          </A>
          <A as="div" fx="enter" at={20} style={{flex: "1", borderRadius: "18px", padding: "13px 16px", display: "flex", alignItems: "center", gap: "10px", background: "linear-gradient(150deg,rgba(255,236,236,.7),rgba(255,255,255,.3))", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,.7)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)"}}>
            <div style={{width: "8px", height: "8px", borderRadius: "50%", background: "#e11d48", flex: "none", boxShadow: "0 0 8px rgba(225,29,72,.6)"}} />
            <div>
              <div style={{fontFamily: "'Geist',sans-serif", fontSize: "20px", fontWeight: "700", lineHeight: "1", color: "#be123c"}}>
                <Count to={2} at={20} />
              </div>
              <div style={{fontSize: "11px", color: "#5d7468", marginTop: "1px"}}>
                missed
              </div>
            </div>
          </A>
        </div>
        <A as="div" fx="enter" at={22} style={{margin: "20px 22px 10px", flex: "none", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "11px", letterSpacing: ".14em", color: "#5d7468", fontWeight: "600"}}>
            NEEDS ATTENTION
          </span>
          <span style={{fontSize: "12px", color: "#0c6b43", fontWeight: "700"}}>
            See all
          </span>
        </A>
        <div style={{margin: "0 22px", flex: "none", display: "flex", flexDirection: "column", gap: "10px"}}>
          <A as="div" fx="enter" at={24} style={{borderRadius: "18px", padding: "13px 15px", display: "flex", alignItems: "center", gap: "13px", background: "linear-gradient(150deg,rgba(255,255,255,.6),rgba(255,255,255,.32))", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,.7)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)"}}>
            <div style={{width: "9px", height: "9px", borderRadius: "50%", background: "#e11d48", flex: "none", boxShadow: "0 0 9px rgba(225,29,72,.6)", scale: `${prog(f, 30, 6, EASE_POP)}`}} />
            <div style={{flex: "1"}}>
              <div style={{fontSize: "14.5px", fontWeight: "700"}}>
                Call Priya back
              </div>
              <div style={{fontSize: "12px", color: "#5d7468", marginTop: "1px"}}>
                Seller · 14 Marlowe Cr · by 4:00pm
              </div>
            </div>
            <div style={{width: "38px", height: "38px", borderRadius: "12px", background: "rgba(255,255,255,.7)", border: "1px solid rgba(16,196,110,.3)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 14px -5px rgba(12,154,85,.6)"}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#0c6b43">
                <path d="M19.6 21c-2.3 0-4.6-.6-6.9-1.7-2.2-1.1-4.2-2.6-6-4.4-1.8-1.8-3.3-3.8-4.4-6C1.2 6.7.6 4.4.6 2.1c0-.4.1-.7.4-1C1.3.8 1.6.7 2 .7h3.3c.3 0 .6.1.8.3.2.2.4.5.4.8.1.8.3 1.6.6 2.4.2.5.1 1-.3 1.4L5.6 8.1c1.2 2.2 2.9 3.9 5.1 5.1l1.7-1.7c.4-.4.9-.5 1.4-.3.8.3 1.6.5 2.4.6.3 0 .6.2.8.4.2.2.3.5.3.8V19c0 .4-.1.7-.4 1-.3.3-.6.4-1 .4z" />
              </svg>
            </div>
          </A>
          <A as="div" fx="enter" at={27} style={{borderRadius: "18px", padding: "13px 15px", display: "flex", alignItems: "center", gap: "13px", background: "linear-gradient(150deg,rgba(255,255,255,.6),rgba(255,255,255,.32))", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,.7)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)"}}>
            <div style={{width: "9px", height: "9px", borderRadius: "50%", background: "#f59e0b", flex: "none", boxShadow: "0 0 9px rgba(245,158,11,.6)", scale: `${prog(f, 33, 6, EASE_POP)}`}} />
            <div style={{flex: "1"}}>
              <div style={{fontSize: "14.5px", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px"}}>
                {"Send James the brochure "}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#0c6b43">
                  <path d="M12 2l1.9 5.2L19 9l-5.1 1.8L12 16l-1.9-5.2L5 9l5.1-1.8L12 2z" />
                </svg>
              </div>
              <div style={{fontSize: "12px", color: "#5d7468", marginTop: "1px"}}>
                Buyer · AI already drafted it
              </div>
            </div>
            <div style={{width: "38px", height: "38px", borderRadius: "12px", background: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.8)", display: "flex", alignItems: "center", justifyContent: "center"}}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#16241d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </div>
          </A>
        </div>
        <A as="div" fx="enter" at={30} style={{margin: "18px 22px 8px", flex: "none", fontFamily: "'Geist Mono',monospace", fontSize: "11px", letterSpacing: ".14em", color: "#5d7468", fontWeight: "600"}}>
          RECENT
        </A>
        <div style={{margin: "0 24px", flex: "1", display: "flex", flexDirection: "column", gap: "13px"}}>
          <A as="div" fx="enter" at={32} style={{display: "flex", alignItems: "center", gap: "13px"}}>
            <div style={{width: "38px", height: "38px", borderRadius: "50%", background: "rgba(16,196,110,.16)", color: "#0c6b43", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "13px", flex: "none"}}>
              JH
            </div>
            <div style={{flex: "1"}}>
              <div style={{fontSize: "14px", fontWeight: "600"}}>
                James Holloway
              </div>
              <div style={{fontSize: "12px", color: "#5d7468", display: "flex", alignItems: "center", gap: "5px"}}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#5d7468" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
                Outgoing · 6m 12s
              </div>
            </div>
            <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "11px", color: "#8a9690"}}>
              09:24
            </div>
          </A>
          <A as="div" fx="enter" at={35} style={{display: "flex", alignItems: "center", gap: "13px"}}>
            <div style={{width: "38px", height: "38px", borderRadius: "50%", background: "rgba(225,29,72,.14)", color: "#be123c", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "13px", flex: "none"}}>
              ST
            </div>
            <div style={{flex: "1"}}>
              <div style={{fontSize: "14px", fontWeight: "600"}}>
                Sophie Tran
              </div>
              <div style={{fontSize: "12px", color: "#be123c"}}>
                Missed call
              </div>
            </div>
            <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "11px", color: "#8a9690"}}>
              08:51
            </div>
          </A>
        </div>
        <A as="div" fx="rise" at={36} style={{margin: "0 18px 16px", flex: "none", height: "66px", borderRadius: "24px", background: "linear-gradient(150deg,rgba(255,255,255,.72),rgba(255,255,255,.46))", backdropFilter: "blur(26px) saturate(160%)", border: "1px solid rgba(255,255,255,.8)", boxShadow: "0 12px 30px -12px rgba(16,74,52,.28),inset 0 1px 0 rgba(255,255,255,.95)", display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 22px"}}>
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#0c6b43" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11l9-8 9 8" />
            <path d="M5 10v10h5v-6h4v6h5V10" />
          </svg>
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#9aa8a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
          <div style={{width: "52px", height: "52px", borderRadius: "18px", background: "#16241d", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "-22px", boxShadow: "0 12px 26px -8px rgba(12,154,85,.7),inset 0 1px 0 rgba(255,255,255,.4)"}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
              <path d="M19.6 21c-2.3 0-4.6-.6-6.9-1.7-2.2-1.1-4.2-2.6-6-4.4-1.8-1.8-3.3-3.8-4.4-6C1.2 6.7.6 4.4.6 2.1c0-.4.1-.7.4-1C1.3.8 1.6.7 2 .7h3.3c.3 0 .6.1.8.3.2.2.4.5.4.8.1.8.3 1.6.6 2.4.2.5.1 1-.3 1.4L5.6 8.1c1.2 2.2 2.9 3.9 5.1 5.1l1.7-1.7c.4-.4.9-.5 1.4-.3.8.3 1.6.5 2.4.6.3 0 .6.2.8.4.2.2.3.5.3.8V19c0 .4-.1.7-.4 1-.3.3-.6.4-1 .4z" />
            </svg>
          </div>
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#9aa8a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.6A8.4 8.4 0 1 1 21 11.5z" />
          </svg>
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#9aa8a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7" />
          </svg>
        </A>
      </div>
    </div>
  </div>
  );
};
