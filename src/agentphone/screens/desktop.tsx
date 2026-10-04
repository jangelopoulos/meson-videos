// Auto-converted from AgentPhone Motion Brief.html (data-shot="desktop"), 1280x800.
import {useT} from "../lib/time";
import React from "react";
import {A} from "../lib/A";
import {Easing} from "remotion";
import {prog, pulse} from "../lib/anim";
import {Count, Typed} from "../lib/bits";
import {LoggedRow} from "../lib/LoggedRow";

export const LAND = 24; // the after-call row lands
export const CALLBACK = 92;
export const QUERY = 116;

/** Slot at the top of the list that opens as the flying row lands. */
const LandingSlot: React.FC = () => {
  const f = useT();
  const open = prog(f, LAND - 14, 14);
  const fly = prog(f, 0, LAND, Easing.out(Easing.cubic));
  const glow = pulse(f, LAND, 18);
  return (
    <div style={{height: 70 * open, marginTop: 10 * open, position: "relative"}}>
      <LoggedRow
        width={588}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          translate: `${-1200 * (1 - fly)}px ${-60 * (1 - fly)}px`,
          rotate: `${-5 * (1 - fly)}deg`,
          boxShadow: `0 0 0 ${6 * glow}px rgba(59,130,246,.18), 0 24px 50px -18px rgba(16,74,52,${0.5 - 0.3 * fly})`,
        }}
      />
    </div>
  );
};

export const DesktopScreen: React.FC = () => {
  const f = useT();
  return (
  <div style={{position: "relative", width: 1280, height: 800, overflow: "hidden"}}>
    <div style={{width: "1280px", height: "800px", borderRadius: "24px", overflow: "visible", position: "relative", color: "#16241d", background: "#eef4f0"}}>
      <div style={{position: "absolute", inset: "0", background: "radial-gradient(60% 70% at 0% 0%,#b9f6d6 0%,transparent 55%),radial-gradient(50% 60% at 100% 8%,#cbe8ff 0%,transparent 55%),radial-gradient(70% 60% at 92% 100%,#ffe2c2 0%,transparent 50%),#eef4f0"}} />
      <div style={{position: "relative", height: "100%", display: "flex", flexDirection: "column", padding: "22px 26px"}}>
        <div style={{flex: "none", display: "flex", alignItems: "center", gap: "16px"}}>
          <div style={{flex: "none"}}>
            <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "10px", letterSpacing: ".18em", color: "#5d7468", fontWeight: "600"}}>
              TUE · 18 JUNE · 09:47
            </div>
            <div style={{fontFamily: "'Geist',sans-serif", fontSize: "24px", fontWeight: "800", letterSpacing: "-.025em", marginTop: "1px"}}>
              Morning, John.
            </div>
          </div>
          <span style={{display: "flex", alignItems: "center", gap: "16px", marginLeft: "8px"}}>
            <span style={{display: "flex", alignItems: "baseline", gap: "6px"}}>
              <span style={{fontFamily: "'Geist',sans-serif", fontSize: "21px", fontWeight: "800", lineHeight: "1"}}>
                <Count to={24} at={6} />
              </span>
              <span style={{fontSize: "10px", color: "#5d7468"}}>
                calls
                <br />
                +8% vs Tue
              </span>
            </span>
            <span style={{width: "1px", height: "26px", background: "rgba(22,36,29,.12)"}} />
            <span style={{display: "flex", alignItems: "baseline", gap: "6px"}}>
              <span style={{fontFamily: "'Geist',sans-serif", fontSize: "21px", fontWeight: "800", lineHeight: "1", whiteSpace: "nowrap"}}>
                1h42m
              </span>
              <span style={{fontSize: "10px", color: "#5d7468"}}>
                talking
                <br />
                longest 12m
              </span>
            </span>
            <span style={{width: "1px", height: "26px", background: "rgba(22,36,29,.12)"}} />
            <span style={{display: "flex", alignItems: "baseline", gap: "6px"}}>
              <span style={{fontFamily: "'Geist',sans-serif", fontSize: "21px", fontWeight: "800", lineHeight: "1", color: "#0c6b43"}}>
                <Count to={86} at={8} />%
              </span>
              <span style={{fontSize: "10px", color: "#5d7468"}}>
                answered
                <br />
                best week
              </span>
            </span>
            <span style={{width: "1px", height: "26px", background: "rgba(22,36,29,.12)"}} />
            <span style={{display: "flex", alignItems: "baseline", gap: "6px"}}>
              <span style={{fontFamily: "'Geist',sans-serif", fontSize: "21px", fontWeight: "800", lineHeight: "1", color: "#be123c"}}>
                <Count to={41} at={10} />m
              </span>
              <span style={{fontSize: "10px", color: "#5d7468"}}>
                reply lag
                <br />
                aim under 30
              </span>
            </span>
          </span>
          <span style={{marginLeft: "auto", display: "flex", gap: "3px", background: "rgba(22,36,29,.06)", borderRadius: "11px", padding: "3px"}}>
            <span style={{padding: "6px 13px", borderRadius: "8px", background: "#fff", boxShadow: "0 4px 12px -4px rgba(16,74,52,.25)", fontSize: "11px", fontWeight: "700", color: "#0c6b43"}}>
              Today
            </span>
            <span style={{padding: "6px 13px", borderRadius: "8px", fontSize: "11px", fontWeight: "600", color: "#5d7468"}}>
              Week
            </span>
            <span style={{padding: "6px 13px", borderRadius: "8px", fontSize: "11px", fontWeight: "600", color: "#5d7468"}}>
              Month
            </span>
          </span>
        </div>
        <div style={{marginTop: "12px", flex: "1", display: "flex", gap: "12px", minHeight: "0"}}>
          <div style={{width: "300px", flex: "none", borderRadius: "20px", background: "linear-gradient(160deg,rgba(255,255,255,.78),rgba(255,255,255,.54))", backdropFilter: "blur(26px) saturate(155%)", border: "1px solid rgba(255,255,255,.94)", padding: "14px 16px", display: "flex", flexDirection: "column", overflow: "hidden"}}>
            <div style={{flex: "none", display: "flex", alignItems: "center"}}>
              <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "9px", letterSpacing: ".16em", color: "#0c6b43", fontWeight: "600"}}>
                CALENDAR
              </span>
              <span style={{marginLeft: "auto", fontSize: "10px", fontWeight: "700", color: "#0c6b43"}}>
                Open →
              </span>
            </div>
            <div style={{marginTop: "10px", flex: "none", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
              <span style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "3px"}}>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "8px", color: "#5d7468", fontWeight: "600"}}>
                  T
                </span>
                <span style={{width: "24px", height: "24px", borderRadius: "8px", background: "linear-gradient(180deg,#10c46e,#0c9a55)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Geist Mono',monospace", fontSize: "10.5px", fontWeight: "600"}}>
                  18
                </span>
              </span>
              <span style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "3px"}}>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "8px", color: "#5d7468", fontWeight: "600"}}>
                  W
                </span>
                <span style={{width: "24px", height: "24px", borderRadius: "8px", background: "rgba(255,255,255,.7)", border: "1px solid rgba(255,255,255,.95)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Geist Mono',monospace", fontSize: "10.5px", fontWeight: "600", color: "#16241d"}}>
                  19
                </span>
              </span>
              <span style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "3px"}}>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "8px", color: "#5d7468", fontWeight: "600"}}>
                  T
                </span>
                <span style={{width: "24px", height: "24px", borderRadius: "8px", background: "rgba(255,255,255,.7)", border: "1px solid rgba(255,255,255,.95)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Geist Mono',monospace", fontSize: "10.5px", fontWeight: "600", color: "#16241d"}}>
                  20
                </span>
              </span>
              <span style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "3px"}}>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "8px", color: "#5d7468", fontWeight: "600"}}>
                  F
                </span>
                <span style={{width: "24px", height: "24px", borderRadius: "8px", background: "rgba(255,255,255,.7)", border: "1px solid rgba(255,255,255,.95)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Geist Mono',monospace", fontSize: "10.5px", fontWeight: "600", color: "#16241d"}}>
                  21
                </span>
              </span>
              <span style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "3px"}}>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "8px", color: "#5d7468", fontWeight: "600"}}>
                  S
                </span>
                <span style={{width: "24px", height: "24px", borderRadius: "8px", background: "rgba(255,255,255,.7)", border: "1px solid rgba(255,255,255,.95)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Geist Mono',monospace", fontSize: "10.5px", fontWeight: "600", color: "#16241d"}}>
                  22
                </span>
              </span>
              <span style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", opacity: ".5"}}>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "8px", color: "#5d7468", fontWeight: "600"}}>
                  S
                </span>
                <span style={{width: "24px", height: "24px", borderRadius: "8px", background: "rgba(255,255,255,.7)", border: "1px solid rgba(255,255,255,.95)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Geist Mono',monospace", fontSize: "10.5px", fontWeight: "600", color: "#5d7468"}}>
                  23
                </span>
              </span>
              <span style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "3px"}}>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "8px", color: "#5d7468", fontWeight: "600"}}>
                  M
                </span>
                <span style={{width: "24px", height: "24px", borderRadius: "8px", background: "rgba(255,255,255,.7)", border: "1px solid rgba(255,255,255,.95)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Geist Mono',monospace", fontSize: "10.5px", fontWeight: "600", color: "#16241d"}}>
                  24
                </span>
              </span>
            </div>
            <div style={{marginTop: "12px", display: "flex", flexDirection: "column", gap: "5px"}}>
              <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".16em", color: "#0c6b43", fontWeight: "600"}}>
                TODAY
              </div>
              <A as="div" fx="enter" at={12} style={{display: "flex", gap: "9px"}}>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "9.5px", fontWeight: "600", color: "#0c6b43", flex: "none", width: "36px", paddingTop: "9px"}}>
                  16:00
                </span>
                <div style={{flex: "1", minWidth: "0", borderRadius: "12px", padding: "9px 11px", background: "rgba(16,196,110,.08)", border: "1px solid rgba(16,196,110,.22)"}}>
                  <div style={{fontSize: "12px", fontWeight: "700"}}>
                    Fernway pre-open walk
                  </div>
                  <div style={{fontSize: "9.5px", color: "#3f5249"}}>
                    strata access confirmed
                  </div>
                </div>
              </A>
              <A as="div" fx="enter" at={15} style={{display: "flex", gap: "9px"}}>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "9.5px", fontWeight: "600", color: "#5d7468", flex: "none", width: "36px", paddingTop: "9px"}}>
                  18:30
                </span>
                <div style={{flex: "1", minWidth: "0", borderRadius: "12px", padding: "9px 11px", background: "rgba(255,255,255,.55)", border: "1px solid rgba(255,255,255,.9)"}}>
                  <div style={{fontSize: "12px", fontWeight: "700"}}>
                    Vendor update · Elm Grove
                  </div>
                  <div style={{fontSize: "9.5px", color: "#3f5249"}}>
                    3 buyers hesitant on price
                  </div>
                </div>
              </A>
              <div style={{marginTop: "3px", fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".16em", color: "#5d7468", fontWeight: "600"}}>
                WED 19
              </div>
              <A as="div" fx="enter" at={18} style={{display: "flex", gap: "9px"}}>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "9.5px", fontWeight: "600", color: "#5d7468", flex: "none", width: "36px", paddingTop: "9px"}}>
                  13:00
                </span>
                <div style={{flex: "1", minWidth: "0", borderRadius: "12px", padding: "9px 11px", background: "rgba(255,255,255,.55)", border: "1px solid rgba(255,255,255,.9)"}}>
                  <div style={{fontSize: "12px", fontWeight: "700"}}>
                    Northcote report writing
                  </div>
                  <div style={{fontSize: "9.5px", color: "#3f5249"}}>
                    blocked out · due Thu
                  </div>
                </div>
              </A>
              <div style={{marginTop: "3px", fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".16em", color: "#5d7468", fontWeight: "600"}}>
                THU 20
              </div>
              <A as="div" fx="enter" at={21} style={{display: "flex", gap: "9px"}}>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "9.5px", fontWeight: "600", color: "#b45309", flex: "none", width: "36px", paddingTop: "9px"}}>
                  10:00
                </span>
                <div style={{flex: "1", minWidth: "0", borderRadius: "12px", padding: "9px 11px", background: "rgba(255,246,222,.55)", border: "1px solid rgba(245,158,11,.2)"}}>
                  <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                    <div style={{flex: "1", minWidth: "0"}}>
                      <div style={{fontSize: "12px", fontWeight: "700"}}>
                        Northcote inspection
                      </div>
                      <div style={{fontSize: "9.5px", color: "#3f5249"}}>
                        Rachel Kim · report first
                      </div>
                    </div>
                    <span style={{fontSize: "9px", fontWeight: "700", color: "#0c6b43", background: "rgba(255,255,255,.7)", border: "1px solid rgba(16,196,110,.26)", borderRadius: "999px", padding: "4px 9px", flex: "none"}}>
                      Send
                    </span>
                  </div>
                </div>
              </A>
              <div style={{marginTop: "3px", fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".16em", color: "#5d7468", fontWeight: "600"}}>
                FRI 21
              </div>
              <A as="div" fx="enter" at={24} style={{display: "flex", gap: "9px"}}>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "9.5px", fontWeight: "600", color: "#b45309", flex: "none", width: "36px", paddingTop: "9px"}}>
                  17:00
                </span>
                <div style={{flex: "1", minWidth: "0", borderRadius: "12px", padding: "9px 11px", background: "rgba(255,246,222,.55)", border: "1px solid rgba(245,158,11,.2)"}}>
                  <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                    <div style={{flex: "1", minWidth: "0"}}>
                      <div style={{fontSize: "12px", fontWeight: "700"}}>
                        Elm Grove walkthrough
                      </div>
                      <div style={{fontSize: "9.5px", color: "#3f5249"}}>
                        Marcus · 5pm pending
                      </div>
                    </div>
                    <span style={{fontSize: "9px", fontWeight: "700", color: "#0c6b43", background: "rgba(255,255,255,.7)", border: "1px solid rgba(16,196,110,.26)", borderRadius: "999px", padding: "4px 9px", flex: "none"}}>
                      Confirm
                    </span>
                  </div>
                </div>
              </A>
              <div style={{marginTop: "3px", fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".16em", color: "#5d7468", fontWeight: "600"}}>
                SAT 22
              </div>
              <A as="div" fx="enter" at={27} style={{display: "flex", gap: "9px"}}>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "9.5px", fontWeight: "600", color: "#5d7468", flex: "none", width: "36px", paddingTop: "9px"}}>
                  11:00
                </span>
                <div style={{flex: "1", minWidth: "0", borderRadius: "12px", padding: "9px 11px", background: "rgba(255,255,255,.55)", border: "1px solid rgba(255,255,255,.9)"}}>
                  <div style={{fontSize: "12px", fontWeight: "700"}}>
                    Fernway open home
                  </div>
                  <div style={{fontSize: "9.5px", color: "#3f5249"}}>
                    14 on the invite list
                  </div>
                </div>
              </A>
              <div style={{marginTop: "3px", fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".16em", color: "#5d7468", fontWeight: "600"}}>
                MON 24
              </div>
              <A as="div" fx="enter" at={30} style={{display: "flex", gap: "9px"}}>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "9.5px", fontWeight: "600", color: "#5d7468", flex: "none", width: "36px", paddingTop: "9px"}}>
                  09:00
                </span>
                <div style={{flex: "1", minWidth: "0", borderRadius: "12px", padding: "9px 11px", background: "rgba(255,255,255,.55)", border: "1px solid rgba(255,255,255,.9)"}}>
                  <div style={{fontSize: "12px", fontWeight: "700"}}>
                    Greg Iles valuation
                  </div>
                  <div style={{fontSize: "9.5px", color: "#3f5249"}}>
                    seller lead · comparables
                  </div>
                </div>
              </A>
            </div>
            <div style={{marginTop: "auto", paddingTop: "9px", fontSize: "9.5px", color: "#8a9690"}}>
              2 events need something from you
            </div>
          </div>
          <div style={{flex: "1", minWidth: "0", borderRadius: "20px", background: "linear-gradient(160deg,rgba(255,255,255,.78),rgba(255,255,255,.54))", backdropFilter: "blur(26px) saturate(155%)", border: "1px solid rgba(255,255,255,.94)", padding: "14px 16px", display: "flex", flexDirection: "column", overflow: "visible", position: "relative", zIndex: 2}}>
            <div style={{flex: "none", display: "flex", alignItems: "baseline", gap: "14px", padding: "0 6px"}}>
              <span style={{fontFamily: "'Geist',sans-serif", fontSize: "17px", fontWeight: "700", letterSpacing: "-.02em"}}>
                {"Unanswered "}
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "13px", fontWeight: "600", color: "#be123c", marginLeft: "4px"}}>
                  8
                </span>
              </span>
              <span style={{display: "flex", gap: "14px", fontSize: "11.5px", fontWeight: "600", color: "#8a9690", marginLeft: "auto"}}>
                <span style={{color: "#16241d", borderBottom: "1.5px solid #16241d", paddingBottom: "2px"}}>
                  All
                </span>
                <span>
                  Calls 5
                </span>
                <span>
                  Texts 3
                </span>
              </span>
            </div>
            <LandingSlot />
            <A as="div" fx="enter" at={14} style={{marginTop: "10px", borderRadius: "14px", padding: "12px 14px", background: "rgba(255,255,255,.7)", border: "1px solid rgba(225,29,72,.16)"}}>
              <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
                <span style={{width: "16px", display: "flex", justifyContent: "center", flex: "none"}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#be123c">
                    <path d="M6.6 10.8c1.5 3 4 5.4 6.9 6.9l2.3-2.3c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.3c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.4 2.3z" />
                  </svg>
                </span>
                <div style={{flex: "1", minWidth: "0"}}>
                  <div style={{fontSize: "13.5px", fontWeight: "600"}}>
                    Sophie Tran
                  </div>
                  <div style={{marginTop: "2px", fontSize: "11px", color: "#be123c"}}>
                    Missed 08:51, then texted 3h ago · second miss this week
                  </div>
                </div>
                <span style={{fontSize: "11.5px", fontWeight: "700", color: "#fff", background: "linear-gradient(180deg,#10c46e,#0c9a55)", borderRadius: "999px", padding: "7px 15px", flex: "none", scale: `${1 + 0.12 * pulse(f, CALLBACK, 16)}`, boxShadow: `0 0 0 ${10 * pulse(f, CALLBACK, 16)}px rgba(16,196,110,.18)`}}>
                  Call back
                </span>
              </div>
              <div style={{marginTop: "10px", marginLeft: "28px", display: "flex", alignItems: "center", gap: "12px"}}>
                <span style={{flex: "1", fontSize: "12px", color: "#3f5249", lineHeight: "1.4", textWrap: "pretty"}}>
                  “Is the Elm Grove place still available?”
                </span>
                <span style={{display: "flex", alignItems: "center", gap: "7px", fontSize: "11.5px", fontWeight: "600", color: "#0c6b43", flex: "none"}}>
                  {"Send draft "}
                  <span style={{width: "30px", height: "30px", borderRadius: "50%", background: "rgba(16,196,110,.1)", border: "1px solid rgba(16,196,110,.24)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none"}}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0c6b43" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a8 8 0 0 1-8 8H8l-5 3 1.5-4.5A8 8 0 1 1 21 12z" />
                    </svg>
                  </span>
                </span>
              </div>
            </A>
            <div style={{marginTop: "6px", display: "flex", flexDirection: "column"}}>
              <A as="div" fx="enter" at={17} style={{display: "flex", alignItems: "center", gap: "12px", padding: "11px 6px", borderBottom: "1px solid rgba(22,36,29,.07)"}}>
                <span style={{width: "16px", display: "flex", justifyContent: "center", flex: "none"}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#be123c">
                    <path d="M6.6 10.8c1.5 3 4 5.4 6.9 6.9l2.3-2.3c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.3c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.4 2.3z" />
                  </svg>
                </span>
                <div style={{flex: "1", minWidth: "0"}}>
                  <div style={{fontSize: "13px", fontWeight: "600", fontFamily: "'Geist Mono',monospace", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                    +61 401 552 190
                  </div>
                  <div style={{marginTop: "2px", fontSize: "11px", color: "#5d7468", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                    New number · no voicemail
                  </div>
                </div>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "10px", color: "#8a9690", flex: "none", width: "34px", textAlign: "right"}}>
                  11:20
                </span>
                <span style={{width: "30px", height: "30px", borderRadius: "50%", background: "rgba(16,196,110,.1)", border: "1px solid rgba(16,196,110,.24)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none"}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#0c6b43">
                    <path d="M6.6 10.8c1.5 3 4 5.4 6.9 6.9l2.3-2.3c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.3c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.4 2.3z" />
                  </svg>
                </span>
              </A>
              <A as="div" fx="enter" at={20} style={{display: "flex", alignItems: "center", gap: "12px", padding: "11px 6px", borderBottom: "1px solid rgba(22,36,29,.07)"}}>
                <span style={{width: "16px", display: "flex", justifyContent: "center", flex: "none"}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a8 8 0 0 1-8 8H8l-5 3 1.5-4.5A8 8 0 1 1 21 12z" />
                  </svg>
                </span>
                <div style={{flex: "1", minWidth: "0"}}>
                  <div style={{fontSize: "13px", fontWeight: "600", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                    Daniel Wu
                  </div>
                  <div style={{marginTop: "2px", fontSize: "11px", color: "#5d7468", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                    Waiting a day · draft ready
                  </div>
                </div>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "10px", color: "#8a9690", flex: "none", width: "34px", textAlign: "right"}}>
                  1d
                </span>
                <span style={{width: "30px", height: "30px", borderRadius: "50%", background: "rgba(16,196,110,.1)", border: "1px solid rgba(16,196,110,.24)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none"}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0c6b43" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a8 8 0 0 1-8 8H8l-5 3 1.5-4.5A8 8 0 1 1 21 12z" />
                  </svg>
                </span>
              </A>
              <A as="div" fx="enter" at={23} style={{display: "flex", alignItems: "center", gap: "12px", padding: "11px 6px", borderBottom: "1px solid rgba(22,36,29,.07)"}}>
                <span style={{width: "16px", display: "flex", justifyContent: "center", flex: "none"}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5d7468" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
                    <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4" />
                  </svg>
                </span>
                <div style={{flex: "1", minWidth: "0"}}>
                  <div style={{fontSize: "13px", fontWeight: "600", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                    “…the Saturday open home at Fernway…”
                  </div>
                  <div style={{marginTop: "2px", fontSize: "11px", color: "#5d7468", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                    Voicemail · 0:32 · transcribed
                  </div>
                </div>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "10px", color: "#8a9690", flex: "none", width: "34px", textAlign: "right"}}>
                  10:04
                </span>
                <span style={{width: "30px", height: "30px", borderRadius: "50%", background: "rgba(16,196,110,.1)", border: "1px solid rgba(16,196,110,.24)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none"}}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="#0c6b43">
                    <path d="M7 4l13 8-13 8z" />
                  </svg>
                </span>
              </A>
              <A as="div" fx="enter" at={26} style={{display: "flex", alignItems: "center", gap: "12px", padding: "11px 6px", borderBottom: "1px solid rgba(22,36,29,.07)"}}>
                <span style={{width: "16px", display: "flex", justifyContent: "center", flex: "none"}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#be123c">
                    <path d="M6.6 10.8c1.5 3 4 5.4 6.9 6.9l2.3-2.3c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.3c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.4 2.3z" />
                  </svg>
                </span>
                <div style={{flex: "1", minWidth: "0"}}>
                  <div style={{fontSize: "13px", fontWeight: "600", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                    Elena Sokolov
                  </div>
                  <div style={{marginTop: "2px", fontSize: "11px", color: "#5d7468", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                    Rang out · you promised her Monday
                  </div>
                </div>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "10px", color: "#8a9690", flex: "none", width: "34px", textAlign: "right"}}>
                  10:06
                </span>
                <span style={{width: "30px", height: "30px", borderRadius: "50%", background: "rgba(16,196,110,.1)", border: "1px solid rgba(16,196,110,.24)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none"}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#0c6b43">
                    <path d="M6.6 10.8c1.5 3 4 5.4 6.9 6.9l2.3-2.3c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.3c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.4 2.3z" />
                  </svg>
                </span>
              </A>
              <A as="div" fx="enter" at={29} style={{display: "flex", alignItems: "center", gap: "12px", padding: "11px 6px", borderBottom: "1px solid rgba(22,36,29,.07)"}}>
                <span style={{width: "16px", display: "flex", justifyContent: "center", flex: "none"}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a8 8 0 0 1-8 8H8l-5 3 1.5-4.5A8 8 0 1 1 21 12z" />
                  </svg>
                </span>
                <div style={{flex: "1", minWidth: "0"}}>
                  <div style={{fontSize: "13px", fontWeight: "600", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                    Marcus Webb
                  </div>
                  <div style={{marginTop: "2px", fontSize: "11px", color: "#5d7468", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                    “Can we push Friday to 5pm?” · waiting 4h
                  </div>
                </div>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "10px", color: "#8a9690", flex: "none", width: "34px", textAlign: "right"}}>
                  4h
                </span>
                <span style={{width: "30px", height: "30px", borderRadius: "50%", background: "rgba(16,196,110,.1)", border: "1px solid rgba(16,196,110,.24)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none"}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0c6b43" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a8 8 0 0 1-8 8H8l-5 3 1.5-4.5A8 8 0 1 1 21 12z" />
                  </svg>
                </span>
              </A>
              <A as="div" fx="enter" at={32} style={{display: "flex", alignItems: "center", gap: "12px", padding: "11px 6px", borderBottom: "1px solid rgba(22,36,29,.07)"}}>
                <span style={{width: "16px", display: "flex", justifyContent: "center", flex: "none"}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#be123c">
                    <path d="M6.6 10.8c1.5 3 4 5.4 6.9 6.9l2.3-2.3c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.3c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.4 2.3z" />
                  </svg>
                </span>
                <div style={{flex: "1", minWidth: "0"}}>
                  <div style={{fontSize: "13px", fontWeight: "600", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                    Tom Bradley
                  </div>
                  <div style={{marginTop: "2px", fontSize: "11px", color: "#5d7468", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                    Missed · owed price feedback
                  </div>
                </div>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "10px", color: "#8a9690", flex: "none", width: "34px", textAlign: "right"}}>
                  09:40
                </span>
                <span style={{width: "30px", height: "30px", borderRadius: "50%", background: "rgba(16,196,110,.1)", border: "1px solid rgba(16,196,110,.24)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none"}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#0c6b43">
                    <path d="M6.6 10.8c1.5 3 4 5.4 6.9 6.9l2.3-2.3c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.3c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.4 2.3z" />
                  </svg>
                </span>
              </A>
              <A as="div" fx="enter" at={35} style={{display: "flex", alignItems: "center", gap: "12px", padding: "11px 6px", borderBottom: "none"}}>
                <span style={{width: "16px", display: "flex", justifyContent: "center", flex: "none"}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5d7468" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a8 8 0 0 1-8 8H8l-5 3 1.5-4.5A8 8 0 1 1 21 12z" />
                  </svg>
                </span>
                <div style={{flex: "1", minWidth: "0"}}>
                  <div style={{fontSize: "13px", fontWeight: "600", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                    Greg Iles
                  </div>
                  <div style={{marginTop: "2px", fontSize: "11px", color: "#5d7468", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                    “What would you list mine for?” · seller lead
                  </div>
                </div>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "10px", color: "#8a9690", flex: "none", width: "34px", textAlign: "right"}}>
                  11:44
                </span>
                <span style={{width: "30px", height: "30px", borderRadius: "50%", background: "rgba(16,196,110,.1)", border: "1px solid rgba(16,196,110,.24)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none"}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0c6b43" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a8 8 0 0 1-8 8H8l-5 3 1.5-4.5A8 8 0 1 1 21 12z" />
                  </svg>
                </span>
              </A>
            </div>
            <div style={{marginTop: "auto", paddingTop: "9px", paddingLeft: "6px", fontSize: "10.5px", color: "#8a9690"}}>
              {"Oldest has waited "}
              <b style={{color: "#be123c"}}>
                1 day
              </b>
              {" \u00b7 average reply 41m"}
            </div>
          </div>
          <div style={{width: "286px", flex: "none", borderRadius: "20px", background: "linear-gradient(160deg,rgba(255,255,255,.88),rgba(255,255,255,.68))", backdropFilter: "blur(30px) saturate(160%)", border: "1px solid rgba(255,255,255,1)", boxShadow: "0 0 0 4px rgba(16,196,110,.1),0 20px 44px -18px rgba(16,74,52,.35)", padding: "15px 16px", display: "flex", flexDirection: "column", overflow: "hidden"}}>
            <div style={{flex: "none", display: "flex", alignItems: "center", gap: "8px"}}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#0c6b43" style={{flex: "none"}}>
                <path d="M12 2l1.9 5.2L19 9l-5.1 1.8L12 16l-1.9-5.2L5 9l5.1-1.8L12 2z" />
              </svg>
              <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".16em", color: "#0c6b43", fontWeight: "600"}}>
                BUILD A LIST
              </span>
            </div>
            <div style={{marginTop: "10px", flex: "none", borderRadius: "14px", background: "#fff", border: "1px solid rgba(16,196,110,.3)", boxShadow: "0 0 0 3px rgba(16,196,110,.09)", padding: "11px 12px"}}>
              <div style={{display: "flex", alignItems: "center", gap: "2px"}}>
                <span style={{fontSize: "12.5px", color: "#16241d", fontWeight: "600"}}>
                  <Typed text="sellers who asked about value" at={QUERY} cps={30} />
                </span>
                <span style={{width: "1.5px", height: "15px", background: "#10c46e", opacity: Math.floor(f / 8) % 2 ? 0.2 : 1}} />
              </div>
              <div style={{marginTop: "7px", fontSize: "10px", color: "#8a9690", lineHeight: "1.4"}}>
                Ask in plain words — “anyone I haven't rung in a fortnight”.
              </div>
            </div>
            <div style={{marginTop: "9px", flex: "none", display: "flex", flexWrap: "wrap", gap: "5px"}}>
              <span style={{fontSize: "9.5px", fontWeight: "700", color: "#5d7468", background: "rgba(255,255,255,.75)", border: "1px solid rgba(255,255,255,.95)", borderRadius: "999px", padding: "5px 10px"}}>
                + gone quiet
              </span>
              <span style={{fontSize: "9.5px", fontWeight: "700", color: "#5d7468", background: "rgba(255,255,255,.75)", border: "1px solid rgba(255,255,255,.95)", borderRadius: "999px", padding: "5px 10px"}}>
                + hot buyers
              </span>
              <span style={{fontSize: "9.5px", fontWeight: "700", color: "#5d7468", background: "rgba(255,255,255,.75)", border: "1px solid rgba(255,255,255,.95)", borderRadius: "999px", padding: "5px 10px"}}>
                + finance expiring
              </span>
            </div>
            <div style={{marginTop: "13px", flex: "none", paddingTop: "11px", borderTop: "1px solid rgba(22,36,29,.09)", fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".16em", color: "#5d7468", fontWeight: "600"}}>
              SAVED LISTS
            </div>
            <div style={{marginTop: "8px", flex: "none", display: "flex", flexDirection: "column", gap: "5px"}}>
              <div style={{display: "flex", alignItems: "center", gap: "9px", borderRadius: "11px", background: "rgba(255,255,255,.72)", border: "1px solid rgba(255,255,255,.95)", padding: "9px 11px"}}>
                <span style={{flex: "1", fontSize: "11px", fontWeight: "700", color: "#3f5249"}}>
                  Buyers gone quiet
                </span>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "11px", fontWeight: "600", color: "#be123c"}}>
                  <Count to={9} at={QUERY + 4} dur={14} />
                </span>
              </div>
              <div style={{display: "flex", alignItems: "center", gap: "9px", borderRadius: "11px", background: "rgba(255,255,255,.72)", border: "1px solid rgba(255,255,255,.95)", padding: "9px 11px"}}>
                <span style={{flex: "1", fontSize: "11px", fontWeight: "700", color: "#3f5249"}}>
                  Hot on Northcote
                </span>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "11px", fontWeight: "600", color: "#0c6b43"}}>
                  <Count to={5} at={QUERY + 4} dur={14} />
                </span>
              </div>
              <div style={{display: "flex", alignItems: "center", gap: "9px", borderRadius: "11px", background: "rgba(255,255,255,.72)", border: "1px solid rgba(255,255,255,.95)", padding: "9px 11px"}}>
                <span style={{flex: "1", fontSize: "11px", fontWeight: "700", color: "#3f5249"}}>
                  Saturday invite list
                </span>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "11px", fontWeight: "600", color: "#0c6b43"}}>
                  <Count to={14} at={QUERY + 4} dur={14} />
                </span>
              </div>
              <div style={{display: "flex", alignItems: "center", gap: "9px", borderRadius: "11px", background: "rgba(255,255,255,.72)", border: "1px solid rgba(255,255,255,.95)", padding: "9px 11px"}}>
                <span style={{flex: "1", fontSize: "11px", fontWeight: "700", color: "#3f5249"}}>
                  Finance expiring
                </span>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "11px", fontWeight: "600", color: "#b45309"}}>
                  <Count to={4} at={QUERY + 4} dur={14} />
                </span>
              </div>
              <div style={{display: "flex", alignItems: "center", gap: "9px", borderRadius: "11px", background: "rgba(255,255,255,.72)", border: "1px solid rgba(255,255,255,.95)", padding: "9px 11px"}}>
                <span style={{flex: "1", fontSize: "11px", fontWeight: "700", color: "#3f5249"}}>
                  Seller leads
                </span>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "11px", fontWeight: "600", color: "#0c6b43"}}>
                  <Count to={6} at={QUERY + 4} dur={14} />
                </span>
              </div>
            </div>
            <div style={{marginTop: "13px", flex: "none", paddingTop: "11px", borderTop: "1px solid rgba(22,36,29,.09)"}}>
              <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "8.5px", letterSpacing: ".16em", color: "#5d7468", fontWeight: "600"}}>
                LAST BUILT
              </div>
              <div style={{marginTop: "7px", display: "flex", alignItems: "center", gap: "8px"}}>
                <span style={{flex: "1", fontSize: "10.5px", color: "#3f5249"}}>
                  Northcote hot buyers · Mon
                </span>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "9.5px", color: "#0c6b43", fontWeight: "600"}}>
                  7/8
                </span>
              </div>
              <div style={{marginTop: "5px", display: "flex", alignItems: "center", gap: "8px"}}>
                <span style={{flex: "1", fontSize: "10.5px", color: "#3f5249"}}>
                  Elm Grove price drop · Fri
                </span>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "9.5px", color: "#0c6b43", fontWeight: "600"}}>
                  11/12
                </span>
              </div>
              <div style={{marginTop: "5px", display: "flex", alignItems: "center", gap: "8px"}}>
                <span style={{flex: "1", fontSize: "10.5px", color: "#3f5249"}}>
                  Finance expiring · Thu
                </span>
                <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "9.5px", color: "#0c6b43", fontWeight: "600"}}>
                  4/4
                </span>
              </div>
            </div>
            <span style={{marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", borderRadius: "999px", height: "42px", background: "linear-gradient(180deg,#10c46e,#0c9a55)", color: "#fff", fontSize: "13.5px", fontWeight: "700", boxShadow: "0 12px 26px -8px rgba(12,154,85,.6)"}}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff">
                <path d="M6.6 10.8c1.5 3 4 5.4 6.9 6.9l2.3-2.3c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.3c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.4 2.3z" />
              </svg>
              {" Build list \u00b7 "}
              <Count to={6} at={QUERY + 28} dur={10} />
              {" people "}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
