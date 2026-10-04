// Auto-converted from AgentPhone Motion Brief.html (data-shot="messages"), 390x844.
import React from "react";
import {interpolate} from "remotion";
import {useT} from "../lib/time";
import {prog, pulse, slide} from "../lib/anim";
import {CheckDraw, Ripple, Typed} from "../lib/bits";
import {A} from "../lib/A";
import {Amb} from "../lib/Amb";

export const DRAFT = 22; // AI draft starts typing
export const SENT = 80;
const DRAFT_TEXT = "Booked you in 10–10:30am 🗓️ See you both there.";

/** Dashed while the AI composes it; turns solid and green when sent. */
const DraftBubble: React.FC = () => {
  const f = useT();
  const solid = prog(f, SENT, 6);
  const e = slide(f, DRAFT - 2, 60);
  return (
    <div style={{...e, fontSize: "14.5px", lineHeight: "1.5", color: solid > 0.5 ? "#fff" : "#1f3a2e", borderRadius: "18px", borderBottomRightRadius: "5px", padding: "10px 14px", display: "inline-block", maxWidth: "80%", textAlign: "left", minHeight: 44, minWidth: 60,
      background: `linear-gradient(160deg,rgba(16,196,110,${solid}),rgba(10,143,78,${solid})), rgba(255,255,255,${0.55 * (1 - solid)})`,
      border: `1.5px dashed rgba(16,196,110,${0.7 * (1 - solid)})`, boxShadow: `0 6px 16px -8px rgba(12,154,85,${0.5 * solid})`}}>
      <Typed text={DRAFT_TEXT} at={DRAFT} cps={26} caret={f < SENT} />
    </div>
  );
};

export const MessagesScreen: React.FC = () => {
  const f = useT();
  return (
  <div style={{position: "relative", width: 390, height: 844, overflow: "hidden"}}>
    <div style={{width: "390px", height: "844px", borderRadius: "46px", overflow: "hidden", position: "relative", fontFamily: "'Geist',sans-serif", color: "#16241d", background: "#eef4f0", boxShadow: "0 30px 60px -24px rgba(16,74,52,.4)", display: "flex", flexDirection: "column"}}>
      <div style={{position: "absolute", inset: "0", background: "radial-gradient(70% 38% at 0% 0%,#b9f6d6 0%,transparent 46%),radial-gradient(64% 40% at 100% 6%,#cbe8ff 0%,transparent 50%),radial-gradient(70% 40% at 50% 100%,#d8fbe8 0%,transparent 52%),#eef4f0"}} />
      <Amb as="div" kind="ccFloat" dur={11} style={{position: "absolute", width: "220px", height: "220px", borderRadius: "50%", background: "#7dd3fc", filter: "blur(64px)", opacity: ".35", bottom: "120px", right: "-60px"}} />
      <div style={{position: "relative", display: "flex", flexDirection: "column", height: "100%"}}>
        <div style={{flex: "none", paddingTop: "8px", background: "linear-gradient(180deg,rgba(238,244,240,.85),rgba(238,244,240,0))"}}>
          <div style={{height: "46px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 26px 0 24px", fontSize: "15px", fontWeight: "700"}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16241d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span style={{fontFamily: "'Geist Mono',monospace", fontSize: "14px"}}>
              9:41
            </span>
          </div>
          <A as="div" fx="enter" at={0} style={{display: "flex", alignItems: "center", gap: "12px", padding: "6px 22px 14px", borderBottom: "1px solid rgba(22,36,29,.07)"}}>
            <div style={{width: "42px", height: "42px", borderRadius: "50%", background: "rgba(16,196,110,.16)", color: "#0c6b43", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Geist',sans-serif", fontWeight: "700", fontSize: "15px", flex: "none"}}>
              JH
            </div>
            <div style={{flex: "1"}}>
              <div style={{fontFamily: "'Geist',sans-serif", fontSize: "17px", fontWeight: "700", lineHeight: "1"}}>
                James Holloway
              </div>
              <div style={{fontSize: "11px", color: "#5d7468", marginTop: "3px"}}>
                <span style={{fontWeight: "700", color: "#0c6b43"}}>
                  BUYER
                </span>
                {" \u00b7 14 Marlowe Cr"}
              </div>
            </div>
            <div style={{scale: `${1 + 0.15 * pulse(f, SENT + 10, 14)}`, boxShadow: `0 0 0 ${8 * pulse(f, SENT + 10, 14)}px rgba(16,196,110,.18)`, width: "38px", height: "38px", borderRadius: "12px", background: "rgba(16,196,110,.14)", display: "flex", alignItems: "center", justifyContent: "center"}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0c6b43">
                <path d="M19.6 21c-2.3 0-4.6-.6-6.9-1.7-2.2-1.1-4.2-2.6-6-4.4-1.8-1.8-3.3-3.8-4.4-6C1.2 6.7.6 4.4.6 2.1c0-.4.1-.7.4-1C1.3.8 1.6.7 2 .7h3.3c.3 0 .6.1.8.3.2.2.4.5.4.8.1.8.3 1.6.6 2.4.2.5.1 1-.3 1.4L5.6 8.1c1.2 2.2 2.9 3.9 5.1 5.1l1.7-1.7c.4-.4.9-.5 1.4-.3.8.3 1.6.5 2.4.6.3 0 .6.2.8.4.2.2.3.5.3.8V19c0 .4-.1.7-.4 1-.3.3-.6.4-1 .4z" />
              </svg>
            </div>
          </A>
        </div>
        <A as="div" fx="slideL" at={11} style={{flex: "1", overflow: "hidden", padding: "16px 22px 8px", display: "flex", flexDirection: "column", gap: "11px"}}>
          <A as="div" fx="fade" at={3} style={{textAlign: "center", fontSize: "11px", color: "#8a9690", fontWeight: "600", fontFamily: "'Geist Mono',monospace", marginBottom: "2px"}}>
            MONDAY · 16 JUN
          </A>
          <A as="div" fx="slideR" at={5}>
            <div style={{fontSize: "14.5px", lineHeight: "1.5", color: "#1f3a2e", borderRadius: "18px", borderBottomLeftRadius: "5px", padding: "10px 14px", display: "inline-block", maxWidth: "80%", background: "linear-gradient(150deg,rgba(255,255,255,.74),rgba(255,255,255,.5))", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.72)"}}>
              Hi Maya, is 14 Marlowe still available? Saw it on realestate.com 👀
            </div>
          </A>
          <A as="div" fx="slideL" at={8} style={{textAlign: "right"}}>
            <div style={{fontSize: "14.5px", lineHeight: "1.5", color: "#fff", borderRadius: "18px", borderBottomRightRadius: "5px", padding: "10px 14px", display: "inline-block", maxWidth: "80%", textAlign: "left", background: "linear-gradient(160deg,#10c46e,#0a8f4e)", boxShadow: "0 6px 16px -8px rgba(12,154,85,.5)"}}>
              It is! Lovely 4-bedder. Want me to send the full brochure?
            </div>
          </A>
          <div style={{textAlign: "right"}}>
            <div style={{display: "inline-flex", alignItems: "center", gap: "9px", borderRadius: "16px", padding: "9px 13px", maxWidth: "84%", textAlign: "left", background: "linear-gradient(150deg,rgba(255,255,255,.7),rgba(255,255,255,.46))", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.72)"}}>
              <div style={{width: "32px", height: "38px", borderRadius: "7px", background: "linear-gradient(160deg,#e11d48,#fb5e7e)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none"}}>
                <span style={{fontSize: "8px", fontWeight: "800", color: "#fff"}}>
                  PDF
                </span>
              </div>
              <div>
                <div style={{fontSize: "13px", fontWeight: "700", color: "#16241d", whiteSpace: "nowrap"}}>
                  14-Marlowe-Cr.pdf
                </div>
                <div style={{fontSize: "11px", color: "#5d7468"}}>
                  2.4 MB · sent ✓
                </div>
              </div>
            </div>
          </div>
          <A as="div" fx="slideR" at={14}>
            <div style={{fontSize: "14.5px", lineHeight: "1.5", color: "#1f3a2e", borderRadius: "18px", borderBottomLeftRadius: "5px", padding: "10px 14px", display: "inline-block", maxWidth: "80%", background: "linear-gradient(150deg,rgba(255,255,255,.74),rgba(255,255,255,.5))", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.72)"}}>
              Perfect, thank you! Could we view it Saturday?
            </div>
          </A>
          <div style={{textAlign: "right"}}>
            <DraftBubble />
          </div>
          <div style={{textAlign: "right", fontSize: "11px", color: "#8a9690", fontWeight: "600", marginTop: "-4px", marginRight: "4px"}}>
            {f < SENT + 4 ? "AI draft · tap to send" : "Delivered"} {f >= SENT + 4 ? <CheckDraw at={SENT + 4} size={10} color="#0c6b43" width={3.5} /> : null}
          </div>
        </A>
        <div style={{flex: "none", padding: "6px 18px 0"}}>
          <A as="div" fx="enter" at={18} style={{display: "flex", gap: "8px", alignItems: "center", padding: "0 4px 10px", overflow: "hidden"}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#0c6b43" style={{flex: "none"}}>
              <path d="M12 2l1.9 5.2L19 9l-5.1 1.8L12 16l-1.9-5.2L5 9l5.1-1.8L12 2z" />
            </svg>
            <span style={{fontSize: "12px", fontWeight: "600", color: "#0c6b43", background: "rgba(16,196,110,.14)", border: "1px solid rgba(16,196,110,.3)", borderRadius: "13px", padding: "7px 12px", whiteSpace: "nowrap"}}>
              Send a reminder Friday
            </span>
            <span style={{fontSize: "12px", fontWeight: "600", color: "#16241d", background: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.8)", borderRadius: "13px", padding: "7px 12px", whiteSpace: "nowrap"}}>
              Share directions
            </span>
          </A>
        </div>
        <div style={{flex: "none", padding: "0 18px 22px", display: "flex", alignItems: "center", gap: "10px"}}>
          <div style={{width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(150deg,rgba(255,255,255,.62),rgba(255,255,255,.34))", border: "1px solid rgba(255,255,255,.72)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none"}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16241d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <div style={{flex: "1", height: "44px", borderRadius: "22px", background: "linear-gradient(150deg,rgba(255,255,255,.66),rgba(255,255,255,.4))", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,.74)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)", display: "flex", alignItems: "center", padding: "0 16px", fontSize: "14px", color: "#8a9690"}}>
            Text message…
          </div>
          <div style={{position: "relative", scale: `${interpolate(f, [SENT - 3, SENT, SENT + 8], [1, 0.88, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}`, width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(180deg,#10c46e,#0a8f4e)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none", boxShadow: "0 8px 18px -8px rgba(12,154,85,.55)"}}>
            <Ripple at={SENT} size={44} />
            <svg width="19" height="19" viewBox="0 0 24 24" fill="#fff">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
