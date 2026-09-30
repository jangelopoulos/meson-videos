import React from "react";
import { COLORS, EASE, fmt, lerp, prog } from "../theme";
import { CheckIcon } from "../ui";

const GREEN = "#15803D";
const AMBER = "#C2410C";
const BLUE = "#3B4FE4";
const MUTED = "#6B7280";
const TRACK = "#EEF0F2";

const Title: React.FC<{ title: string; sub: string }> = ({ title, sub }) => (
  <>
    <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.ink }}>{title}</div>
    <div style={{ marginTop: 2, fontSize: 15, color: MUTED }}>{sub}</div>
  </>
);

/** Rental yields with bars that grow and numbers that count. `f` is frames since the pane opened. */
export const YieldPane: React.FC<{ f: number }> = ({ f }) => {
  const rows = [
    { label: "Long-term let", gross: 4.1, net: "3.2%" },
    { label: "Holiday let", gross: 7.8, net: "5.4%" },
  ];
  return (
    <>
      <Title title="Rental yield" sub="From 9 comparable rents within 3 km" />
      {rows.map((r, i) => {
        const t = prog(f, 6 + i * 6, 24, EASE);
        return (
          <div key={r.label} style={{ marginTop: 22, opacity: prog(f, 4 + i * 6, 8) }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: COLORS.ink }}>{r.label}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 2 }}>
              <div style={{ fontSize: 42, fontWeight: 700, color: GREEN, lineHeight: 1.1 }}>{(r.gross * t).toFixed(1)}%</div>
              <div style={{ fontSize: 16, color: MUTED }}>
                gross · <span style={{ color: COLORS.ink, fontWeight: 700 }}>{r.net}</span> net
              </div>
            </div>
            <div style={{ marginTop: 8, height: 10, borderRadius: 5, backgroundColor: TRACK, overflow: "hidden" }}>
              <div style={{ width: `${(r.gross / 8.5) * 100 * t}%`, height: "100%", borderRadius: 5, backgroundColor: GREEN }} />
            </div>
          </div>
        );
      })}
      <div style={{ marginTop: 20, fontSize: 14, fontWeight: 600, color: AMBER, opacity: prog(f, 22, 10) }}>
        Holiday lets aren&apos;t allowed on Golden Visa homes
      </div>
    </>
  );
};

const COSTS: [string, number][] = [
  ["Purchase price", 485000],
  ["Transfer tax 3.09%", 14987],
  ["Notary", 5820],
  ["Lawyer", 4850],
  ["Land registry", 2425],
  ["Agent fee incl. VAT", 12028],
];

/** Acquisition costs stacking up to the all-in total. */
export const CostsPane: React.FC<{ f: number }> = ({ f }) => {
  const total = lerp(485000, 525110, prog(f, 14, 24, EASE));
  return (
    <>
      <Title title="Total cost to buy" sub="Taxes, notary, lawyer and fees" />
      <div style={{ marginTop: 12 }}>
        {COSTS.map(([label, value], j) => {
          const t = prog(f, 2 + j * 3, 10, EASE);
          return (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "7px 0",
                borderBottom: `1px solid ${TRACK}`,
                fontSize: 16,
                opacity: t,
                translate: `0px ${(1 - t) * 10}px`,
              }}
            >
              <span style={{ color: COLORS.ink }}>{label}</span>
              <span style={{ color: COLORS.ink, fontWeight: 600 }}>€{fmt(value)}</span>
            </div>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 14,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          opacity: prog(f, 12, 8),
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 700, color: COLORS.ink }}>Total upfront</span>
        <span style={{ fontSize: 30, fontWeight: 700, color: COLORS.ink }}>€{fmt(total)}</span>
      </div>
      <div style={{ marginTop: 2, fontSize: 14, color: MUTED, textAlign: "right", opacity: prog(f, 30, 8) }}>
        Then €1,760 / year
      </div>
    </>
  );
};

/** Golden Visa eligibility with a drawn check. */
export const VisaPane: React.FC<{ f: number }> = ({ f }) => {
  const pop = prog(f, 2, 14, EASE);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <div
        style={{
          marginTop: 6,
          width: 92,
          height: 92,
          borderRadius: "50%",
          backgroundColor: "#EEF0FF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          scale: String(lerp(0.6, 1, pop)),
        }}
      >
        <CheckIcon size={56} color={BLUE} progress={prog(f, 8, 14)} stroke={3} />
      </div>
      <div style={{ marginTop: 12, fontSize: 16, color: MUTED }}>Golden Visa</div>
      <div style={{ fontSize: 42, fontWeight: 700, color: BLUE, lineHeight: 1.1 }}>Eligible</div>
      <div style={{ marginTop: 4, fontSize: 16, color: COLORS.ink }}>€400,000 tier · outside the €800k zones</div>
      <div
        style={{
          marginTop: 18,
          padding: "12px 14px",
          borderRadius: 12,
          backgroundColor: "#FFF7ED",
          fontSize: 15,
          color: AMBER,
          fontWeight: 600,
          opacity: prog(f, 14, 10),
        }}
      >
        Holiday lets aren&apos;t allowed on Golden Visa homes
      </div>
      <div style={{ marginTop: 16, fontSize: 16, fontWeight: 700, color: BLUE, opacity: prog(f, 20, 10) }}>
        Talk to a partner immigration lawyer →
      </div>
    </div>
  );
};

