// Auto-converted from AgentPhone Motion Brief.html (data-shot="after"), 390x844.
import React from "react";
import {useCurrentFrame} from "remotion";
import {fade} from "../lib/anim";
import {CheckDraw} from "../lib/bits";
import {Amb} from "../lib/Amb";
import {A} from "../lib/A";

export const S1 = 18;
export const LOGGED = 62;

export const AfterScreen: React.FC = () => {
  const f = useCurrentFrame();
  return (
  <div style={{position: "relative", width: 390, height: 844, overflow: "hidden"}}>
    <div style={{width: "390px", height: "844px", borderRadius: "46px", overflow: "hidden", position: "relative", fontFamily: "'Geist',sans-serif", color: "#16241d", background: "#eef4f0", boxShadow: "0 30px 60px -24px rgba(16,74,52,.4)", display: "flex", flexDirection: "column"}}>
      <div style={{position: "absolute", inset: "0", background: "radial-gradient(75% 48% at 50% 0%,#b9f6d6 0%,transparent 52%),radial-gradient(62% 44% at 100% 8%,#cbe8ff 0%,transparent 52%),radial-gradient(70% 50% at 0% 100%,#d8fbe8 0%,transparent 54%),#eef4f0"}} />
      <Amb as="div" kind="ccFloat" dur={9} style={{position: "absolute", width: "240px", height: "240px", borderRadius: "50%", background: "#86efac", filter: "blur(66px)", opacity: ".45", top: "-30px", left: "50%", marginLeft: "-120px"}} />
      <div style={{position: "relative", display: "flex", flexDirection: "column", height: "100%"}}>
        <div style={{height: "54px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 30px 0 34px", fontSize: "15px", fontWeight: "700", flex: "none"}}>
          <span style={{fontFamily: "'Geist Mono',monospace"}}>
            9:48
          </span>
          <span style={{width: "20px", height: "11px", border: "1.5px solid #16241d", borderRadius: "3px", display: "inline-block", position: "relative"}}>
            <span style={{position: "absolute", inset: "1.5px", background: "#16241d", borderRadius: "1px", width: "13px"}} />
          </span>
        </div>
        <div style={{flex: "none", padding: "6px 24px 0", textAlign: "center"}}>
          <A as="div" fx="enter" at={8} style={{display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "12px", fontWeight: "600", color: "#5d7468"}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0c6b43" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Call ended · 6m 12s
          </A>
          <A as="div" fx="enter" at={11} style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "11px", marginTop: "12px"}}>
            <div style={{width: "44px", height: "44px", borderRadius: "50%", background: "rgba(16,196,110,.16)", color: "#0c6b43", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Geist',sans-serif", fontWeight: "700", fontSize: "15px"}}>
              JH
            </div>
            <div style={{textAlign: "left"}}>
              <div style={{fontFamily: "'Geist',sans-serif", fontSize: "19px", fontWeight: "700", lineHeight: "1"}}>
                James Holloway
              </div>
              <div style={{fontSize: "11px", color: "#5d7468", marginTop: "3px"}}>
                <span style={{fontWeight: "700", color: "#0c6b43"}}>
                  BUYER
                </span>
                {" \u00b7 14 Marlowe Crescent"}
              </div>
            </div>
          </A>
        </div>
        <A as="div" fx="enter" at={14} style={{margin: "16px 22px 0", flex: "none", borderRadius: "24px", padding: "18px 20px", background: "linear-gradient(150deg,rgba(255,255,255,.68),rgba(255,255,255,.4))", backdropFilter: "blur(24px) saturate(150%)", border: "1px solid rgba(255,255,255,.78)", boxShadow: "0 14px 36px -16px rgba(16,74,52,.28),inset 0 1px 0 rgba(255,255,255,.95)"}}>
          <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
            <div style={{width: "24px", height: "24px", borderRadius: "8px", background: "linear-gradient(180deg,#10c46e,#0a8f4e)", display: "flex", alignItems: "center", justifyContent: "center"}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
                <path d="M12 2l1.9 5.2L19 9l-5.1 1.8L12 16l-1.9-5.2L5 9l5.1-1.8L12 2z" />
              </svg>
            </div>
            <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "11px", fontWeight: "600", letterSpacing: ".1em", color: "#0c6b43"}}>
              AI SUMMARY
            </span>
          </div>
          <div style={{fontSize: "14.5px", lineHeight: "1.55", color: "#3f5249", marginTop: "11px"}}>
            <span style={fade(f, S1, 8)}>
            {"James confirmed he wants to bring his wife to the "}
            <b style={{color: "#16241d"}}>
              Saturday inspection at 14 Marlowe Cr
            </b>
            {" (10\u201310:30am). "}
            </span>
            <span style={fade(f, S1 + 7, 8)}>
            {"He's pre-approved and keen, but his broker needs the body-corp figure \u2014 you quoted "}
            <b style={{color: "#16241d"}}>
              $1,180/quarter
            </b>
            {". "}
            </span>
            <span style={fade(f, S1 + 14, 8)}>
            Warm lead; likely to offer if the inspection goes well.
            </span>
          </div>
        </A>
        <A as="div" fx="enter" at={34} style={{margin: "18px 22px 10px", flex: "none", fontFamily: "'Geist Mono',monospace", fontSize: "11px", letterSpacing: ".14em", color: "#5d7468", fontWeight: "600"}}>
          ACTION ITEMS · 3
        </A>
        <div style={{flex: "1", overflow: "hidden", padding: "0 22px", display: "flex", flexDirection: "column", gap: "10px"}}>
          <A as="div" fx="enter" at={38} style={{borderRadius: "18px", padding: "13px 15px", display: "flex", alignItems: "center", gap: "12px", background: "linear-gradient(150deg,rgba(255,255,255,.62),rgba(255,255,255,.34))", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,.72)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)"}}>
            <div style={{width: "24px", height: "24px", borderRadius: "8px", background: "rgba(16,196,110,.16)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none"}}>
              <CheckDraw at={44} size={14} color="#0c6b43" />
            </div>
            <div style={{flex: "1"}}>
              <div style={{fontSize: "14px", fontWeight: "700"}}>
                Book Saturday inspection
              </div>
              <div style={{fontSize: "11.5px", color: "#5d7468", marginTop: "1px"}}>
                Sat 21 Jun · 10:00am
              </div>
            </div>
            <div style={{fontSize: "13px", fontWeight: "700", color: "#fff", background: "linear-gradient(180deg,#10c46e,#0c9a55)", borderRadius: "11px", padding: "8px 14px", boxShadow: "0 6px 14px -6px rgba(12,154,85,.5)"}}>
              Add
            </div>
          </A>
          <A as="div" fx="enter" at={43} style={{borderRadius: "18px", padding: "13px 15px", display: "flex", alignItems: "center", gap: "12px", background: "linear-gradient(150deg,rgba(255,255,255,.62),rgba(255,255,255,.34))", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,.72)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)"}}>
            <div style={{width: "24px", height: "24px", borderRadius: "8px", background: "rgba(16,196,110,.16)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none"}}>
              <CheckDraw at={49} size={14} color="#0c6b43" />
            </div>
            <div style={{flex: "1"}}>
              <div style={{fontSize: "14px", fontWeight: "700"}}>
                Send the brochure
              </div>
              <div style={{fontSize: "11.5px", color: "#5d7468", marginTop: "1px"}}>
                14 Marlowe Cr · PDF · AI drafted
              </div>
            </div>
            <div style={{fontSize: "13px", fontWeight: "700", color: "#fff", background: "linear-gradient(180deg,#10c46e,#0c9a55)", borderRadius: "11px", padding: "8px 14px", boxShadow: "0 6px 14px -6px rgba(12,154,85,.5)"}}>
              Send
            </div>
          </A>
          <A as="div" fx="enter" at={48} style={{borderRadius: "18px", padding: "13px 15px", display: "flex", alignItems: "center", gap: "12px", background: "linear-gradient(150deg,rgba(255,255,255,.62),rgba(255,255,255,.34))", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,.72)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)"}}>
            <div style={{width: "24px", height: "24px", borderRadius: "8px", background: "rgba(16,196,110,.16)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none"}}>
              <CheckDraw at={54} size={14} color="#0c6b43" />
            </div>
            <div style={{flex: "1"}}>
              <div style={{fontSize: "14px", fontWeight: "700"}}>
                Log body-corp $1,180/qtr
              </div>
              <div style={{fontSize: "11.5px", color: "#5d7468", marginTop: "1px"}}>
                to property notes
              </div>
            </div>
            <div style={{fontSize: "13px", fontWeight: "700", color: "#16241d", background: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.8)", borderRadius: "11px", padding: "8px 14px"}}>
              Save
            </div>
          </A>
          <A as="div" fx="pop" at={58} style={{display: "flex", gap: "9px", marginTop: "2px"}}>
            <span style={{fontSize: "11px", fontWeight: "700", color: "#0c6b43", background: "rgba(16,196,110,.16)", borderRadius: "8px", padding: "6px 11px", display: "inline-flex", alignItems: "center", gap: "6px"}}>
              <span style={{width: "7px", height: "7px", borderRadius: "50%", background: "#10c46e"}} />
              Sentiment: positive
            </span>
            <A as="span" fx="pop" at={LOGGED} style={{fontSize: "11px", fontWeight: "700", color: "#1d4ed8", background: "rgba(59,130,246,.14)", border: "1px solid rgba(59,130,246,.3)", borderRadius: "8px", padding: "6px 11px", display: "inline-flex", alignItems: "center", gap: "6px"}}>
              <CheckDraw at={LOGGED + 4} size={12} color="#1d4ed8" width={3} />
              Auto-logged to CRM
            </A>
          </A>
        </div>
        <A as="div" fx="rise" at={54} style={{padding: "12px 22px 24px", flex: "none", display: "flex", gap: "11px"}}>
          <div style={{flex: "1", height: "54px", borderRadius: "18px", background: "rgba(255,255,255,.55)", border: "1px solid rgba(255,255,255,.8)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "15px", color: "#16241d"}}>
            Edit summary
          </div>
          <div style={{flex: "1.3", height: "54px", borderRadius: "18px", background: "linear-gradient(180deg,#10c46e,#0a8f4e)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#fff", fontWeight: "700", fontSize: "15px", boxShadow: "0 12px 26px -10px rgba(12,154,85,.6),inset 0 1px 0 rgba(255,255,255,.4)"}}>
            {"Do all 3 "}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </div>
        </A>
      </div>
    </div>
  </div>
  );
};
