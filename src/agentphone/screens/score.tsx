// Auto-converted from AgentPhone Motion Brief.html (data-shot="score"), 390x844.
import React from "react";
import {A} from "../lib/A";
import {useCurrentFrame} from "remotion";
import {draw, pulse} from "../lib/anim";
import {Count} from "../lib/bits";

export const ScoreScreen: React.FC = () => {
  const f = useCurrentFrame();
  return (
  <div style={{position: "relative", width: 390, height: 844, overflow: "hidden"}}>
    <div data-screen-label="TRAINING \u00b7 2 SCORE" style={{width: "390px", height: "844px", borderRadius: "46px", overflow: "hidden", position: "relative", fontFamily: "'Geist',sans-serif", color: "#16241d", background: "#eef4f0", boxShadow: "0 30px 60px -24px rgba(16,74,52,.4)"}}>
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
        <div style={{padding: "6px 22px 0", flex: "none", display: "flex", alignItems: "center", gap: "12px"}}>
          <span style={{width: "38px", height: "38px", borderRadius: "50%", background: "linear-gradient(150deg,rgba(255,255,255,.6),rgba(255,255,255,.32))", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,.7)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16241d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </span>
          <span style={{flex: "1", minWidth: "0"}}>
            <span style={{display: "block", fontFamily: "'Geist',sans-serif", fontSize: "17px", fontWeight: "700", letterSpacing: "-.02em"}}>
              Sophie Tran
            </span>
            <span style={{display: "block", fontFamily: "'Geist Mono',monospace", fontSize: "10.5px", color: "#5d7468", marginTop: "1px"}}>
              TUE 09:41 · 4:12 · MAYA
            </span>
          </span>
          <span style={{width: "38px", height: "38px", borderRadius: "50%", background: "linear-gradient(180deg,#10c46e,#0c9a55)", color: "#fff", boxShadow: "0 10px 22px -8px rgba(12,154,85,.6),inset 0 1px 0 rgba(255,255,255,.4)", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff">
              <path d="M7 4l13 8-13 8z" />
            </svg>
          </span>
        </div>
        <div style={{marginTop: "14px", flex: "none"}}>
          <div style={{margin: "0 22px", display: "flex", gap: "3px", background: "rgba(22,36,29,.06)", borderRadius: "12px", padding: "3px"}}>
            <span style={{flex: "1", textAlign: "center", padding: "8px 0", borderRadius: "9px", fontSize: "12px", fontWeight: "700", color: "#0c6b43", background: "#fff", boxShadow: "0 4px 12px -4px rgba(16,74,52,.25)"}}>
              Score
            </span>
            <span style={{flex: "1", textAlign: "center", padding: "8px 0", borderRadius: "9px", fontSize: "12px", fontWeight: "600", color: "#5d7468"}}>
              Transcript
            </span>
            <span style={{flex: "1", textAlign: "center", padding: "8px 0", borderRadius: "9px", fontSize: "12px", fontWeight: "600", color: "#5d7468"}}>
              Insights
            </span>
            <span style={{flex: "1", textAlign: "center", padding: "8px 0", borderRadius: "9px", fontSize: "12px", fontWeight: "600", color: "#5d7468"}}>
              Notes
            </span>
          </div>
        </div>
        <A as="div" fx="pop" at={1} style={{margin: "16px 22px 0", flex: "none", borderRadius: "28px", padding: "20px", background: "linear-gradient(150deg,rgba(255,255,255,.66),rgba(255,255,255,.36))", backdropFilter: "blur(24px) saturate(150%)", border: "1px solid rgba(255,255,255,.75)", boxShadow: "0 14px 38px -14px rgba(16,74,52,.28),inset 0 1px 0 rgba(255,255,255,.95)", display: "flex", alignItems: "flex-start", gap: "16px"}}>
          <span style={{width: "76px", height: "76px", borderRadius: "24px", flex: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(245,158,11,.14)", border: "1px solid rgba(245,158,11,.3)"}}>
            <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "30px", fontWeight: "600", color: "#b45309", lineHeight: "1"}}>
              <Count to={72} at={3} dur={21} />
            </span>
            <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "9px", letterSpacing: ".12em", color: "#b45309", marginTop: "3px"}}>
              /100
            </span>
          </span>
          <A as="div" fx="enter" at={8} style={{flex: "1", fontSize: "14px", lineHeight: "1.45", color: "#16241d", textWrap: "pretty"}}>
            Good rapport and a firm next step, but Sophie named a $1.2m ceiling and it went unexplored.
          </A>
        </A>
        <div style={{margin: "12px 22px 0", flex: "1", minHeight: "0", borderRadius: "24px", padding: "18px 18px 14px", background: "linear-gradient(150deg,rgba(255,255,255,.6),rgba(255,255,255,.32))", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,.7)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)", display: "flex", flexDirection: "column", gap: "14px", overflow: "hidden"}}>
          <div style={{fontFamily: "'Geist Mono',monospace", fontSize: "11px", letterSpacing: ".14em", color: "#5d7468", fontWeight: "600"}}>
            RUBRIC
          </div>
          <div style={{display: "flex", flexDirection: "column", gap: "6px"}}>
            <div style={{display: "flex", alignItems: "baseline"}}>
              <span style={{fontSize: "14px", fontWeight: "600"}}>
                Opener
              </span>
              <span style={{fontSize: "11.5px", color: "#5d7468", marginLeft: "8px"}}>
                used her name
              </span>
              <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "13px", fontWeight: "600", color: "#0c6b43", marginLeft: "auto"}}>
                <Count to={84} at={10} dur={18} />
              </span>
            </div>
            <span style={{height: "6px", borderRadius: "3px", background: "rgba(22,36,29,.08)", position: "relative", overflow: "hidden", display: "block", outline: "none"}}>
              <span style={{position: "absolute", left: "0", top: "0", bottom: "0", width: `${84 * draw(f, 10, 18)}%`, borderRadius: "3px", background: "#0c6b43"}} />
            </span>
          </div>
          <div style={{display: "flex", flexDirection: "column", gap: "6px"}}>
            <div style={{display: "flex", alignItems: "baseline"}}>
              <span style={{fontSize: "14px", fontWeight: "600"}}>
                Discovery
              </span>
              <span style={{fontSize: "11.5px", color: "#5d7468", marginLeft: "8px"}}>
                budget not probed
              </span>
              <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "13px", fontWeight: "600", color: "#be123c", marginLeft: "auto"}}>
                <Count to={58} at={12} dur={18} />
              </span>
            </div>
            <span style={{height: "6px", borderRadius: "3px", background: "rgba(22,36,29,.08)", position: "relative", overflow: "hidden", display: "block", boxShadow: `0 0 0 ${4 * pulse(f, 12 + 22, 14)}px rgba(245,158,11,.35)`}}>
              <span style={{position: "absolute", left: "0", top: "0", bottom: "0", width: `${58 * draw(f, 12, 18)}%`, borderRadius: "3px", background: "#be123c"}} />
            </span>
          </div>
          <div style={{display: "flex", flexDirection: "column", gap: "6px"}}>
            <div style={{display: "flex", alignItems: "baseline"}}>
              <span style={{fontSize: "14px", fontWeight: "600"}}>
                Objections
              </span>
              <span style={{fontSize: "11.5px", color: "#5d7468", marginLeft: "8px"}}>
                “stretch” unanswered
              </span>
              <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "13px", fontWeight: "600", color: "#be123c", marginLeft: "auto"}}>
                <Count to={62} at={15} dur={18} />
              </span>
            </div>
            <span style={{height: "6px", borderRadius: "3px", background: "rgba(22,36,29,.08)", position: "relative", overflow: "hidden", display: "block", boxShadow: `0 0 0 ${4 * pulse(f, 15 + 22, 14)}px rgba(245,158,11,.35)`}}>
              <span style={{position: "absolute", left: "0", top: "0", bottom: "0", width: `${62 * draw(f, 15, 18)}%`, borderRadius: "3px", background: "#be123c"}} />
            </span>
          </div>
          <div style={{display: "flex", flexDirection: "column", gap: "6px"}}>
            <div style={{display: "flex", alignItems: "baseline"}}>
              <span style={{fontSize: "14px", fontWeight: "600"}}>
                Next step
              </span>
              <span style={{fontSize: "11.5px", color: "#5d7468", marginLeft: "8px"}}>
                Sat 10am, spots held
              </span>
              <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "13px", fontWeight: "600", color: "#0c6b43", marginLeft: "auto"}}>
                <Count to={90} at={17} dur={18} />
              </span>
            </div>
            <span style={{height: "6px", borderRadius: "3px", background: "rgba(22,36,29,.08)", position: "relative", overflow: "hidden", display: "block", outline: "none"}}>
              <span style={{position: "absolute", left: "0", top: "0", bottom: "0", width: `${90 * draw(f, 17, 18)}%`, borderRadius: "3px", background: "#0c6b43"}} />
            </span>
          </div>
          <div style={{display: "flex", flexDirection: "column", gap: "6px"}}>
            <div style={{display: "flex", alignItems: "baseline"}}>
              <span style={{fontSize: "14px", fontWeight: "600"}}>
                Tone
              </span>
              <span style={{fontSize: "11.5px", color: "#5d7468", marginLeft: "8px"}}>
                calm, unhurried
              </span>
              <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "13px", fontWeight: "600", color: "#0c6b43", marginLeft: "auto"}}>
                <Count to={80} at={20} dur={18} />
              </span>
            </div>
            <span style={{height: "6px", borderRadius: "3px", background: "rgba(22,36,29,.08)", position: "relative", overflow: "hidden", display: "block", outline: "none"}}>
              <span style={{position: "absolute", left: "0", top: "0", bottom: "0", width: `${80 * draw(f, 20, 18)}%`, borderRadius: "3px", background: "#0c6b43"}} />
            </span>
          </div>
        </div>
        <div style={{flex: "none", padding: "8px 0 10px"}}>
          <div style={{display: "flex", gap: "5px", justifyContent: "center"}}>
            <span style={{width: "16px", height: "6px", borderRadius: "3px", background: "#16241d"}} />
            <span style={{width: "6px", height: "6px", borderRadius: "3px", background: "rgba(22,36,29,.18)"}} />
            <span style={{width: "6px", height: "6px", borderRadius: "3px", background: "rgba(22,36,29,.18)"}} />
            <span style={{width: "6px", height: "6px", borderRadius: "3px", background: "rgba(22,36,29,.18)"}} />
          </div>
          <div style={{textAlign: "center", fontSize: "10.5px", color: "#8a9690", marginTop: "5px"}}>
            Swipe between sections
          </div>
        </div>
        <A as="div" fx="rise" at={22} style={{margin: "0 22px 22px", flex: "none", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "15px", padding: "13px", fontSize: "15px", fontWeight: "700", background: "linear-gradient(180deg,#10c46e,#0c9a55)", color: "#fff", boxShadow: "0 10px 22px -8px rgba(12,154,85,.6),inset 0 1px 0 rgba(255,255,255,.4)"}}>
          Save review
        </A>
      </div>
    </div>
  </div>
  );
};
