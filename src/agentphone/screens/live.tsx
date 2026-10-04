// Auto-converted from AgentPhone Motion Brief.html (data-shot="live"), 390x844.
import React from "react";
import {Mark, Ripple, Timer} from "../lib/bits";
import {interpolate} from "remotion";
import {useT} from "../lib/time";
import {pulse} from "../lib/anim";
import {Amb} from "../lib/Amb";
import {A} from "../lib/A";

export const LiveScreen: React.FC<{endAt?: number}> = ({endAt}) => {
  const f = useT();
  const press = endAt === undefined ? 1 : interpolate(f, [endAt - 3, endAt, endAt + 8], [1, 0.94, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return (
  <div style={{position: "relative", width: 390, height: 844, overflow: "hidden"}}>
    <div style={{width: "390px", height: "844px", borderRadius: "46px", overflow: "hidden", position: "relative", fontFamily: "'Geist',sans-serif", color: "#16241d", background: "#e6f2ec", boxShadow: "0 30px 60px -24px rgba(16,74,52,.4)", display: "flex", flexDirection: "column"}}>
      <div style={{position: "absolute", inset: "0", background: "radial-gradient(72% 50% at 0% 0%,#a7f3d0 0%,transparent 56%),radial-gradient(66% 48% at 100% 4%,#bae6fd 0%,transparent 54%),radial-gradient(80% 55% at 60% 100%,#d1fae5 0%,transparent 55%),#e6f2ec"}} />
      <Amb as="div" kind="ccFloat" dur={10} style={{position: "absolute", width: "240px", height: "240px", borderRadius: "50%", background: "#6ee7b7", filter: "blur(64px)", opacity: ".45", top: "-50px", left: "-50px"}} />
      <div style={{position: "relative", display: "flex", flexDirection: "column", height: "100%"}}>
        <div style={{height: "54px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 30px 0 34px", fontSize: "14px", fontWeight: "700", flex: "none"}}>
          <span style={{display: "flex", alignItems: "center", gap: "7px", color: "#0c6b43"}}>
            <Amb as="span" kind="ccPulse" dur={1.1} style={{width: "8px", height: "8px", borderRadius: "50%", background: "#e11d48"}} />
            <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "13px"}}>
              REC <Timer />
            </span>
          </span>
          <span style={{width: "20px", height: "11px", border: "1.5px solid #16241d", borderRadius: "3px", display: "inline-block", position: "relative"}}>
            <span style={{position: "absolute", inset: "1.5px", background: "#16241d", borderRadius: "1px", width: "13px"}} />
          </span>
        </div>
        <div style={{padding: "8px 22px 16px", flex: "none", textAlign: "center"}}>
          <A as="div" fx="pop" at={0} style={{width: "76px", height: "76px", borderRadius: "50%", margin: "0 auto 12px", background: "linear-gradient(150deg,rgba(255,255,255,.7),rgba(255,255,255,.4))", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,.8)", boxShadow: "0 10px 26px -8px rgba(16,74,52,.3),inset 0 1px 0 rgba(255,255,255,.9)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Geist',sans-serif", fontWeight: "700", fontSize: "26px", color: "#0c6b43"}}>
            JH
          </A>
          <A as="div" fx="enter" at={2} style={{fontFamily: "'Geist',sans-serif", fontSize: "26px", fontWeight: "700", letterSpacing: "-.02em"}}>
            James Holloway
          </A>
          <A as="div" fx="enter" at={3} style={{marginTop: "6px", display: "inline-flex", alignItems: "center", gap: "7px"}}>
            <span style={{fontSize: "10px", fontWeight: "700", letterSpacing: ".08em", color: "#0c6b43", background: "rgba(16,196,110,.18)", borderRadius: "6px", padding: "3px 8px"}}>
              BUYER
            </span>
            <span style={{fontSize: "12px", color: "#5d7468"}}>
              first-home · pre-approved
            </span>
          </A>
        </div>
        <A as="div" fx="enter" at={4} style={{margin: "0 22px 12px", flex: "none", borderRadius: "18px", padding: "13px 15px", background: "linear-gradient(150deg,rgba(255,255,255,.64),rgba(255,255,255,.36))", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,.76)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)", cursor: "pointer"}}>
          <div style={{display: "flex", gap: "13px", alignItems: "center"}}>
            <div style={{width: "46px", height: "46px", borderRadius: "12px", background: "linear-gradient(150deg,#bbf7d0,#86efac)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none"}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0c6b43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11l9-8 9 8" />
                <path d="M5 10v10h14V10" />
              </svg>
            </div>
            <div style={{flex: "1"}}>
              <div style={{fontSize: "14px", fontWeight: "700"}}>
                14 Marlowe Crescent
              </div>
              <div style={{fontSize: "12px", color: "#5d7468", marginTop: "1px"}}>
                Brighton · 4 bed · 2 bath · <Mark at={18}>$1.24M</Mark>
              </div>
            </div>
            <span style={{fontSize: "10px", fontWeight: "700", color: "#0c6b43", background: "rgba(16,196,110,.18)", borderRadius: "6px", padding: "3px 8px", flex: "none"}}>
              KEEN
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9aa8a1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{flex: "none"}}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
          <div style={{overflow: "hidden", maxHeight: "0px", opacity: "0"}}>
            <div style={{borderTop: "1px solid rgba(22,36,29,.08)", marginTop: "13px", paddingTop: "13px", display: "flex", flexDirection: "column", gap: "11px"}}>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <span style={{fontSize: "12px", color: "#5d7468"}}>
                  Status
                </span>
                <span style={{fontSize: "13px", fontWeight: "700", color: "#16241d"}}>
                  Buyer · pre-approved $1.3M
                </span>
              </div>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <span style={{fontSize: "12px", color: "#5d7468"}}>
                  Looking for
                </span>
                <span style={{fontSize: "13px", fontWeight: "700", color: "#16241d"}}>
                  4 bed · Brighton · under $1.3M
                </span>
              </div>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <span style={{fontSize: "12px", color: "#5d7468"}}>
                  Last contact
                </span>
                <span style={{fontSize: "13px", fontWeight: "700", color: "#16241d"}}>
                  Mon · brochure sent
                </span>
              </div>
              <div style={{borderRadius: "12px", padding: "10px 12px", background: "rgba(16,196,110,.12)", border: "1px solid rgba(16,196,110,.25)"}}>
                <div style={{fontSize: "11px", fontWeight: "700", color: "#0c6b43", marginBottom: "3px", display: "flex", alignItems: "center", gap: "5px"}}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#0c6b43">
                    <path d="M12 2l1.9 5.2L19 9l-5.1 1.8L12 16l-1.9-5.2L5 9l5.1-1.8L12 2z" />
                  </svg>
                  AI NOTE
                </div>
                <div style={{fontSize: "12.5px", lineHeight: "1.45", color: "#0c5b3a"}}>
                  Bringing his wife Saturday. Broker needs the body-corp figure before they'll make an offer.
                </div>
              </div>
            </div>
          </div>
        </A>
        <div style={{flex: "1", minHeight: "0", overflow: "hidden", padding: "2px 22px 6px", display: "flex", flexDirection: "column"}}>
          <A as="div" fx="fade" at={5} style={{display: "flex", alignItems: "center", gap: "8px", marginBottom: "13px"}}>
            <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "11px", fontWeight: "600", letterSpacing: ".12em", color: "#0c6b43"}}>
              LIVE TRANSCRIPT
            </span>
            <div style={{display: "flex", gap: "2px", alignItems: "flex-end", height: "12px"}}>
              <Amb as="span" kind="ccWave" dur={1} style={{width: "2px", height: "100%", background: "#10c46e", borderRadius: "2px"}} />
              <Amb as="span" kind="ccWave" dur={1} delay={.15} style={{width: "2px", height: "100%", background: "#10c46e", borderRadius: "2px"}} />
              <Amb as="span" kind="ccWave" dur={1} delay={.3} style={{width: "2px", height: "100%", background: "#10c46e", borderRadius: "2px"}} />
              <Amb as="span" kind="ccWave" dur={1} delay={.45} style={{width: "2px", height: "100%", background: "#10c46e", borderRadius: "2px"}} />
            </div>
          </A>
          <div style={{flex: "1", minHeight: "0", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "11px"}}>
            <A as="div" fx="enter" at={7}>
              <div style={{fontSize: "10.5px", fontWeight: "700", color: "#5d7468", marginBottom: "3px", marginLeft: "2px"}}>
                JAMES
              </div>
              <div style={{fontSize: "14px", lineHeight: "1.5", color: "#1f3a2e", borderRadius: "16px", borderTopLeftRadius: "5px", padding: "10px 13px", display: "inline-block", maxWidth: "90%", background: "linear-gradient(150deg,rgba(255,255,255,.72),rgba(255,255,255,.48))", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.7)"}}>
                Is the Marlowe place still open <Mark at={13}>Saturday</Mark>? I'd love to bring my wife through.
              </div>
            </A>
            <A as="div" fx="enter" at={16} style={{textAlign: "right"}}>
              <div style={{fontSize: "10.5px", fontWeight: "700", color: "#0c6b43", marginBottom: "3px", marginRight: "2px"}}>
                YOU
              </div>
              <div style={{fontSize: "14px", lineHeight: "1.5", color: "#fff", borderRadius: "16px", borderTopRightRadius: "5px", padding: "10px 13px", display: "inline-block", maxWidth: "90%", textAlign: "left", background: "linear-gradient(160deg,#10c46e,#0a8f4e)", boxShadow: "0 6px 16px -8px rgba(12,154,85,.6)"}}>
                Absolutely — ten to ten-thirty. I'll lock you in and send the brochure now.
              </div>
            </A>
            <A as="div" fx="enter" at={25}>
              <div style={{fontSize: "10.5px", fontWeight: "700", color: "#5d7468", marginBottom: "3px", marginLeft: "2px"}}>
                JAMES
              </div>
              <div style={{fontSize: "14px", lineHeight: "1.5", color: "#1f3a2e", borderRadius: "16px", borderTopLeftRadius: "5px", padding: "10px 13px", display: "inline-block", maxWidth: "90%", background: "linear-gradient(150deg,rgba(255,255,255,.72),rgba(255,255,255,.48))", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.7)"}}>
                Perfect. And what was the <Mark at={31}>body-corp</Mark> figure again?
              </div>
            </A>
            <A as="div" fx="enter" at={33}>
              <div style={{fontSize: "10.5px", fontWeight: "700", color: "#9aa8a1", marginBottom: "3px", marginLeft: "2px", display: "flex", alignItems: "center", gap: "5px"}}>
                {"JAMES "}
                <span style={{fontSize: "9px", fontWeight: "600", color: "#0c6b43"}}>
                  · listening…
                </span>
              </div>
              <div style={{borderRadius: "16px", borderTopLeftRadius: "5px", padding: "12px 13px", display: "inline-block", width: "62%", background: "rgba(255,255,255,.4)", border: "1px solid rgba(255,255,255,.6)"}}>
                <Amb as="div" kind="ccShimmer" dur={1.2} style={{height: "8px", borderRadius: "4px", marginBottom: "7px", background: "linear-gradient(90deg,rgba(16,196,110,.12) 25%,rgba(16,196,110,.28) 50%,rgba(16,196,110,.12) 75%)", backgroundSize: "180px 100%", width: "90%"}} />
                <Amb as="div" kind="ccShimmer" dur={1.2} style={{height: "8px", borderRadius: "4px", background: "linear-gradient(90deg,rgba(16,196,110,.12) 25%,rgba(16,196,110,.28) 50%,rgba(16,196,110,.12) 75%)", backgroundSize: "180px 100%", width: "55%"}} />
              </div>
            </A>
          </div>
        </div>
        <div style={{overflow: "hidden", maxHeight: "140px"}}>
          <A as="div" fx="pop" at={38} style={{margin: "0 22px 14px", flex: "none", borderRadius: "16px", padding: "12px 14px", display: "flex", gap: "11px", alignItems: "center", background: "linear-gradient(150deg,rgba(16,196,110,.22),rgba(16,196,110,.08))", backdropFilter: "blur(16px)", border: "1px solid rgba(16,196,110,.4)", boxShadow: "0 8px 22px -10px rgba(12,154,85,.4),inset 0 1px 0 rgba(255,255,255,.5)"}}>
            <div style={{width: "26px", height: "26px", borderRadius: "8px", background: "linear-gradient(180deg,#10c46e,#0a8f4e)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none"}}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff">
                <path d="M12 2l1.9 5.2L19 9l-5.1 1.8L12 16l-1.9-5.2L5 9l5.1-1.8L12 2z" />
              </svg>
            </div>
            <div style={{flex: "1", fontSize: "13px", lineHeight: "1.4", color: "#0c5b3a"}}>
              <b>
                3 actions captured
              </b>
              {" \u2014 book Sat inspection \u00b7 send brochure \u00b7 log body-corp $1,180/qtr"}
            </div>
          </A>
        </div>
        <div style={{padding: "0 28px 28px", flex: "none"}}>
          <div style={{display: "flex", justifyContent: "space-between", marginBottom: "16px"}}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "6px"}}>
              <div style={{width: "56px", height: "56px", borderRadius: "50%", background: "linear-gradient(150deg,rgba(255,255,255,.62),rgba(255,255,255,.34))", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,.74)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16241d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                  <path d="M5 10v1a7 7 0 0 0 14 0v-1" />
                  <path d="M12 19v3" />
                </svg>
              </div>
              <span style={{fontSize: "11px", color: "#5d7468"}}>
                Mute
              </span>
            </div>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "6px"}}>
              <div style={{width: "56px", height: "56px", borderRadius: "50%", background: "linear-gradient(150deg,rgba(255,255,255,.62),rgba(255,255,255,.34))", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,.74)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#16241d">
                  <circle cx="5" cy="5" r="1.7" />
                  <circle cx="12" cy="5" r="1.7" />
                  <circle cx="19" cy="5" r="1.7" />
                  <circle cx="5" cy="12" r="1.7" />
                  <circle cx="12" cy="12" r="1.7" />
                  <circle cx="19" cy="12" r="1.7" />
                  <circle cx="5" cy="19" r="1.7" />
                  <circle cx="12" cy="19" r="1.7" />
                  <circle cx="19" cy="19" r="1.7" />
                </svg>
              </div>
              <span style={{fontSize: "11px", color: "#5d7468"}}>
                Keypad
              </span>
            </div>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "6px"}}>
              <div style={{width: "56px", height: "56px", borderRadius: "50%", background: "linear-gradient(150deg,rgba(255,255,255,.62),rgba(255,255,255,.34))", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,.74)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16241d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                  <path d="M18.5 5.5a9 9 0 0 1 0 13" />
                </svg>
              </div>
              <span style={{fontSize: "11px", color: "#5d7468"}}>
                Speaker
              </span>
            </div>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "6px"}}>
              <div style={{width: "56px", height: "56px", borderRadius: "50%", background: "linear-gradient(150deg,rgba(16,196,110,.85),rgba(10,143,78,.9))", boxShadow: "0 8px 20px -8px rgba(12,154,85,.6),inset 0 1px 0 rgba(255,255,255,.4)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                  <path d="M12 2l1.9 5.2L19 9l-5.1 1.8L12 16l-1.9-5.2L5 9l5.1-1.8L12 2z" />
                </svg>
              </div>
              <span style={{fontSize: "11px", color: "#0c6b43", fontWeight: "700"}}>
                AI notes
              </span>
            </div>
          </div>
          <div style={{position: "relative", scale: `${press * (endAt === undefined ? 1 : 1 + 0.04 * pulse(f, endAt - 14, 12))}`, height: "64px", borderRadius: "32px", background: "linear-gradient(180deg,#fb5e7e,#e11d48)", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", color: "#fff", fontWeight: "700", fontSize: "16px", boxShadow: "0 14px 30px -10px rgba(225,29,72,.6),inset 0 1px 0 rgba(255,255,255,.35)"}}>
            {endAt === undefined ? null : <Ripple at={endAt} size={64} color="rgba(251,94,126,.7)" />}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" style={{transform: "rotate(135deg)"}}>
              <path d="M19.6 21c-2.3 0-4.6-.6-6.9-1.7-2.2-1.1-4.2-2.6-6-4.4-1.8-1.8-3.3-3.8-4.4-6C1.2 6.7.6 4.4.6 2.1c0-.4.1-.7.4-1C1.3.8 1.6.7 2 .7h3.3c.3 0 .6.1.8.3.2.2.4.5.4.8.1.8.3 1.6.6 2.4.2.5.1 1-.3 1.4L5.6 8.1c1.2 2.2 2.9 3.9 5.1 5.1l1.7-1.7c.4-.4.9-.5 1.4-.3.8.3 1.6.5 2.4.6.3 0 .6.2.8.4.2.2.3.5.3.8V19c0 .4-.1.7-.4 1-.3.3-.6.4-1 .4z" />
            </svg>
            End call
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
