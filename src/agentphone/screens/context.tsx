// Auto-converted from AgentPhone Motion Brief.html (data-shot="context"), 460x340.
import React from "react";
import {A} from "../lib/A";
import {useCurrentFrame} from "remotion";
import {draw} from "../lib/anim";
import {Count} from "../lib/bits";

export const ContextScreen: React.FC = () => {
  const f = useCurrentFrame();
  return (
  <div style={{position: "relative", width: 460, height: 340, overflow: "hidden"}}>
    <div style={{width: "460px", height: "340px", borderRadius: "24px", overflow: "visible", position: "relative"}}>
            <div style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "400px", borderRadius: "22px", background: "linear-gradient(160deg,rgba(255,255,255,.85),rgba(255,255,255,.6))", backdropFilter: "blur(28px) saturate(160%)", border: "1px solid rgba(255,255,255,.95)", boxShadow: "0 26px 60px -20px rgba(16,74,52,.42)", padding: "16px", color: "#16241d", display: "flex", gap: "15px"}}>
        <div style={{flex: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px"}}>
          <div style={{position: "relative", width: "74px", height: "74px"}}>
            <svg width="74" height="74" viewBox="0 0 74 74" style={{position: "absolute", inset: "0", transform: "rotate(-90deg)"}}>
              <circle cx="37" cy="37" r="33" fill="none" stroke="rgba(22,36,29,.08)" strokeWidth="5" />
              <circle cx="37" cy="37" r="33" fill="none" stroke="#10c46e" strokeWidth="5" strokeLinecap="round" strokeDasharray={`${170 * draw(f, 4)} 207`} />
            </svg>
            <div style={{position: "absolute", inset: "9px", borderRadius: "50%", background: "rgba(16,196,110,.16)", color: "#0c6b43", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "17px"}}>
              JH
            </div>
          </div>
          <div style={{textAlign: "center"}}>
            <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "13px", fontWeight: "600", color: "#0c6b43"}}>
              <Count to={82} at={4} />°
            </div>
            <div style={{fontSize: "9px", color: "#8a9690", fontWeight: "600", letterSpacing: ".06em"}}>
              ENGAGEMENT
            </div>
          </div>
        </div>
        <div style={{flex: "1", minWidth: "0"}}>
          <div style={{display: "flex", alignItems: "center", gap: "7px"}}>
            <span style={{fontFamily: "'Geist',sans-serif", fontSize: "16px", fontWeight: "800"}}>
              James Holloway
            </span>
            <span style={{fontSize: "9.5px", fontWeight: "700", color: "#0c6b43", background: "rgba(16,196,110,.14)", border: "1px solid rgba(16,196,110,.3)", borderRadius: "999px", padding: "2px 8px"}}>
              KEEN ↑
            </span>
          </div>
          <div style={{fontSize: "11px", color: "#5d7468", marginTop: "2px"}}>
            Buyer · Brighton · pre-approved $1.3M
          </div>
          <div style={{marginTop: "10px", display: "flex", flexDirection: "column", gap: "6px", fontSize: "11.5px"}}>
            <A as="div" fx="enter" at={8} style={{display: "flex", alignItems: "center", gap: "7px"}}>
              <span style={{width: "6px", height: "6px", borderRadius: "50%", background: "#10c46e", flex: "none"}} />
              {"Replies within "}
              <b>
                1 hour
              </b>
              {" on average"}
            </A>
            <A as="div" fx="enter" at={10} style={{display: "flex", alignItems: "center", gap: "7px"}}>
              <span style={{width: "6px", height: "6px", borderRadius: "50%", background: "#10c46e", flex: "none"}} />
              <b>
                4 touches
              </b>
              {" in the last 14 days"}
            </A>
            <A as="div" fx="enter" at={12} style={{display: "flex", alignItems: "center", gap: "7px"}}>
              <span style={{width: "6px", height: "6px", borderRadius: "50%", background: "#f59e0b", flex: "none"}} />
              {"Prefers "}
              <b>
                calls after 4pm
              </b>
              {" weekdays"}
            </A>
          </div>
          <A as="div" fx="slideL" at={14} style={{marginTop: "11px", display: "flex", gap: "6px"}}>
            <span style={{flex: "1", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", fontSize: "10.5px", fontWeight: "700", color: "#fff", background: "linear-gradient(180deg,#10c46e,#0c9a55)", borderRadius: "999px", padding: "7px 0", boxShadow: "0 8px 18px -7px rgba(12,154,85,.6)"}}>
              Call
            </span>
            <span style={{flex: "1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10.5px", fontWeight: "700", color: "#16241d", background: "rgba(255,255,255,.7)", border: "1px solid rgba(255,255,255,.95)", borderRadius: "999px", padding: "7px 0"}}>
              Message
            </span>
            <span style={{flex: "1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10.5px", fontWeight: "700", color: "#16241d", background: "rgba(255,255,255,.7)", border: "1px solid rgba(255,255,255,.95)", borderRadius: "999px", padding: "7px 0"}}>
              Profile
            </span>
          </A>
        </div>
      </div>
    </div>
  </div>
  );
};
