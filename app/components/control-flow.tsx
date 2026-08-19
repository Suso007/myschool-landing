"use client";

/**
 * ControlFlow
 * ---------------------------------------------------------------------------
 * A single, dependency-free SVG component. Drop it anywhere:
 *
 *   import ControlFlow from "@/components/control-flow";
 *   <ControlFlow />
 *
 * The token runs input → protection → insights → optimization → model call →
 * validation → insights → output protection → output, lighting up each stage
 * and fanning out its hint labels. Click any stage or any cell to restart the
 * run from that point.
 */

import { useCallback, useEffect, useMemo, useState, type KeyboardEvent } from "react";

/* ------------------------------------------------------------------- model */

type Side = "top" | "bottom";

type Hint = {
  /** Hints are listed in travel order: hint i sits on cell i and reveals as the token reaches it. */
  label: string;
  side: Side;
  color: string;
};

type Stage = {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  /** Cell x positions in travel order (descending on the bottom track). */
  cells: number[];
  hints: Hint[];
  log: { cmd: string; rest: string };
  /** Resting glow, for the entry and exit nodes. */
  rest?: number;
  /** Points the token glides through on its way to the next stage. */
  exit?: [number, number][];
};

const ROW_TOP = 187.5;
const ROW_BOTTOM = 365.5;
const NODE_H = 38;
const CELL_W = 26;
const CHAR_W = 6; // 10px Geist Mono advance width
const MIRROR_AT = 1000; // labels past this flip to the left of their line

const C = {
  pink: "#ff57d4",
  amber: "#ffaf3b",
  blue: "#7aa2ff",
  violet: "#a97bff",
  green: "#48d597",
};

const STAGES: Stage[] = [
  {
    id: "input",
    label: "input",
    x: 43.5,
    y: ROW_TOP,
    w: 62,
    rest: 0.55,
    cells: [],
    hints: [],
    log: { cmd: "Input", rest: "received — 1,284 tokens from api client" },
  },
  {
    id: "input-protection",
    label: "input protection",
    x: 165.5,
    y: ROW_TOP,
    w: 160,
    cells: [329.5, 359.5, 389.5],
    hints: [
      { label: "unsafe inputs blocking", side: "top", color: C.pink },
      { label: "jailbreak prevention", side: "top", color: C.amber },
      { label: "PII detection", side: "bottom", color: C.blue },
    ],
    log: { cmd: "Blocking", rest: "unsafe input — jailbreak attempt detected in prompt" },
  },
  {
    id: "insights-in",
    label: "insights",
    x: 483.5,
    y: ROW_TOP,
    w: 82,
    cells: [569.5, 599.5, 629.5, 659.5],
    hints: [
      { label: "custom metrics", side: "top", color: C.pink },
      { label: "risk scoring", side: "top", color: C.violet },
      { label: "user satisfaction scoring", side: "bottom", color: C.blue },
    ],
    log: { cmd: "Risk", rest: "score 0.87 for user 8f21c exceeds baseline threshold" },
  },
  {
    id: "optimization",
    label: "optimization",
    x: 753.5,
    y: ROW_TOP,
    w: 114,
    cells: [871.5, 901.5, 931.5, 961.5],
    hints: [
      { label: "dynamic model routing", side: "top", color: C.violet },
      { label: "prompt engineering", side: "top", color: C.blue },
      { label: "memory management", side: "bottom", color: C.amber },
      { label: "context enrichment", side: "bottom", color: C.blue },
    ],
    log: { cmd: "Routing", rest: "to claude-haiku with optimized system prompt" },
    exit: [
      [1010, 207.5],
      [1040, 219],
      [1062, 247],
    ],
  },
  {
    id: "model-call",
    label: "model call",
    x: 1013.5,
    y: 272.5,
    w: 92,
    cells: [],
    hints: [],
    log: { cmd: "Model", rest: "call dispatched — response stream opened" },
    exit: [
      [1062, 340],
      [1040, 371],
      [1005, 383.5],
    ],
  },
  {
    id: "validation",
    label: "validation",
    x: 873.5,
    y: ROW_BOTTOM,
    w: 114,
    cells: [843.5, 813.5, 783.5],
    hints: [
      { label: "output quality checking", side: "top", color: C.blue },
      { label: "reliability checking", side: "top", color: C.green },
    ],
    log: { cmd: "Output", rest: "quality check passed — instruction compliance verified" },
  },
  {
    id: "insights-out",
    label: "insights",
    x: 603.5,
    y: ROW_BOTTOM,
    w: 82,
    cells: [573.5, 543.5, 513.5],
    hints: [
      { label: "custom metrics", side: "top", color: C.blue },
      { label: "anomaly detection", side: "bottom", color: C.green },
      { label: "model behavior analysis", side: "top", color: C.pink },
    ],
    log: { cmd: "Anomaly", rest: "detected — model uses outdated library version" },
  },
  {
    id: "output-protection",
    label: "output protection",
    x: 323.5,
    y: ROW_BOTTOM,
    w: 132,
    cells: [293.5, 263.5, 233.5, 203.5, 173.5],
    hints: [
      { label: "compliance checks", side: "bottom", color: C.green },
      { label: "token drain prevention", side: "top", color: C.blue },
      { label: "tool abuse prevention", side: "top", color: C.amber },
      { label: "hallucination detection", side: "top", color: C.pink },
      { label: "data leak prevention", side: "top", color: C.blue },
    ],
    log: { cmd: "Tool", rest: "flagged — model tried to erase the hard drive" },
  },
  {
    id: "output",
    label: "output",
    x: 43.5,
    y: ROW_BOTTOM,
    w: 62,
    rest: 0.55,
    cells: [],
    hints: [],
    log: { cmd: "Output", rest: "delivered — 842 tokens, 1.2s end to end" },
  },
];

const HEADINGS = [
  { label: "Safety & Security", x: 281 },
  { label: "Analytics", x: 602.5 },
  { label: "Improvement", x: 873.5 },
];

/** Dotted rails. A "0 8" dash with round caps reproduces the 1.6r dots at 8px pitch. */
const RAILS = [
  "M113.5 206.5H153.5",
  "M423.5 206.5H471.5",
  "M693.5 206.5H741.5",
  "M995.5 206.5H1003.5C1050 206.5 1070 230 1070 295.5C1070 361 1050 384.5 1003.5 384.5H939.5",
  "M773.5 384.5H693.5",
  "M503.5 384.5H463.5",
  "M161.5 384.5H113.5",
];

/* ------------------------------------------------------------ travel path */

type Step = {
  x: number;
  y: number;
  kind: "pill" | "cell" | "path";
  stage: number;
  cell: number;
  hold: number;
  move: number;
};

const STEPS: Step[] = [];
const STEP_AT = new Map<string, number>();

STAGES.forEach((s, stage) => {
  STEP_AT.set(`${stage}:-1`, STEPS.length);
  STEPS.push({
    x: s.x + s.w / 2,
    y: s.y + NODE_H / 2,
    kind: "pill",
    stage,
    cell: -1,
    hold: 900,
    move: 340,
  });
  s.cells.forEach((cx, cell) => {
    STEP_AT.set(`${stage}:${cell}`, STEPS.length);
    STEPS.push({
      x: cx + CELL_W / 2,
      y: s.y + NODE_H / 2,
      kind: "cell",
      stage,
      cell,
      hold: 560,
      move: 260,
    });
  });
  s.exit?.forEach(([x, y]) =>
    STEPS.push({ x, y, kind: "path", stage, cell: -1, hold: 110, move: 140 }),
  );
});

/* ------------------------------------------------------------ hint layout */

type HintGeometry = {
  d: string;
  dotX: number;
  y: number;
  textX: number;
  anchor: "start" | "end";
  revealAt: number;
};

function layoutHints(stage: number): HintGeometry[] {
  const s = STAGES[stage];

  const measured = s.hints.map((h, i) => ({
    h,
    i,
    cx: s.cells[i] + CELL_W / 2,
    width: h.label.length * CHAR_W,
  }));

  // One direction for the whole stage: if any label would run off the right
  // edge, the whole group flips to the left of its lines.
  const mirror = measured.some((b) => b.cx + 26 + b.width > MIRROR_AT);
  const base = measured.map((b) => ({ ...b, mirror }));

  // Labels fan away from their lines: reaching right, the leftmost sits
  // farthest out; mirrored to the left, the rightmost does. Either way no
  // label crosses a neighbour's line.
  const rank = new Map<number, { k: number; n: number }>();
  (["top", "bottom"] as Side[]).forEach((side) => {
    const row = base
      .filter((b) => b.h.side === side)
      .sort((a, b) => (a.mirror ? b.cx - a.cx : a.cx - b.cx));
    row.forEach((b, k) => rank.set(b.i, { k, n: row.length }));
  });

  return base.map(({ h, i, cx, width, mirror }) => {
    const { k, n } = rank.get(i)!;
    const reach = 24 * (n - 1 - k);
    const y = h.side === "top" ? s.y - (15 + reach) : s.y + NODE_H + (25.5 + reach);
    const from = h.side === "top" ? s.y : s.y + NODE_H;
    const bend = h.side === "top" ? y + 4 : y - 4;
    const dir = mirror ? -1 : 1;

    return {
      d: `M ${cx} ${from} L ${cx} ${bend} Q ${cx} ${y} ${cx + 4 * dir} ${y} L ${cx + 12 * dir} ${y}`,
      dotX: mirror ? cx - 33 - width : cx + 19,
      y,
      textX: cx + 26 * dir,
      anchor: mirror ? "end" : "start",
      revealAt: STEP_AT.get(`${stage}:${i}`) ?? 0,
    };
  });
}

/* ------------------------------------------------------------------- view */

export default function ControlFlow({
  className,
  autoPlay = true,
}: {
  className?: string;
  autoPlay?: boolean;
}) {
  const [at, setAt] = useState(0);
  const [running, setRunning] = useState(autoPlay);

  // Someone who asked for less motion gets a still diagram they can step through.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setRunning(false);
  }, []);

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(
      () => setAt((i) => (i + 1) % STEPS.length),
      STEPS[at].hold,
    );
    return () => window.clearTimeout(t);
  }, [at, running]);

  const runFrom = useCallback((index: number) => {
    setAt(index);
    setRunning(true);
  }, []);

  const hints = useMemo(() => STAGES.map((_, i) => layoutHints(i)), []);
  const step = STEPS[at];
  const active = STAGES[step.stage];

  const press = (index: number) => ({
    role: "button",
    tabIndex: 0,
    onClick: () => runFrom(index),
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        runFrom(index);
      }
    },
  });

  return (
    <div className={className} style={{ position: "relative", width: "100%" }}>
      <svg
        viewBox="0 0 1151 492"
        style={{ display: "block", width: "100%" }}
        aria-label="Interactive AI control flow. Select a stage to run the pipeline from there."
      >
        <defs>
          <pattern id="cf-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="1.1" fill="rgba(255,255,255,0.11)" />
          </pattern>
          <linearGradient id="cf-stroke-muted" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#343434" />
            <stop offset="100%" stopColor="#9a9a9a" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="cf-stroke-active" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#343434" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="cf-face" cx="28%" cy="18%" r="118%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
            <stop offset="48%" stopColor="#ffffff" stopOpacity="0.065" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.025" />
          </radialGradient>
          <linearGradient id="cf-hot" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="16%" stopColor="#ffffff" stopOpacity="0.56" />
            <stop offset="52%" stopColor="#ffffff" stopOpacity="0.88" />
            <stop offset="82%" stopColor="#ffffff" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect
          x="0.25"
          y="0.25"
          width="1150.5"
          height="491.5"
          rx="24"
          fill="rgba(7,7,7,0.2)"
          stroke="#343434"
          strokeWidth="0.5"
        />
        <rect x="1" y="1" width="1149" height="490" rx="23" fill="url(#cf-grid)" opacity="0.48" />

        {HEADINGS.map((h) => (
          <text
            key={h.label}
            x={h.x}
            y={61.5}
            textAnchor="middle"
            fill="#ffffff"
            style={{
              font: '400 16px "ABC Monument Grotesk", ui-sans-serif, system-ui, sans-serif',
              letterSpacing: "-0.01em",
            }}
          >
            {h.label}
          </text>
        ))}

        {RAILS.map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="rgba(255,255,255,0.46)"
            strokeOpacity={0.3}
            strokeWidth={3.2}
            strokeDasharray="0 8"
            strokeLinecap="round"
          />
        ))}

        {/* cells */}
        {STAGES.map((s, si) =>
          s.cells.map((cx, ci) => {
            const on = step.kind === "cell" && step.stage === si && step.cell === ci;
            return (
              <rect
                key={`${s.id}-${ci}`}
                className="cf-cell"
                x={cx}
                y={s.y}
                width={CELL_W}
                height={NODE_H}
                rx={6}
                fill={on ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)"}
                stroke={on ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.3)"}
                strokeWidth={on ? 1 : 0.5}
                opacity={on ? 1 : 0.72}
                {...press(STEP_AT.get(`${si}:${ci}`) ?? 0)}
                tabIndex={-1}
                aria-label={`Run from ${s.label}, step ${ci + 1}`}
              />
            );
          }),
        )}

        {/* the token — drawn under the stage plates, so it slides into them */}
        <g
          style={{
            transform: `translate(${step.x}px, ${step.y}px)`,
            transition: `transform ${step.move}ms ${
              step.kind === "path" ? "linear" : "cubic-bezier(0.65,0,0.35,1)"
            }`,
          }}
        >
          <circle
            r="2.35"
            fill="#ffffff"
            style={{ filter: "drop-shadow(0 0 7px rgba(255,255,255,0.72))" }}
          />
        </g>

        {/* stage plates */}
        {STAGES.map((s, si) => {
          const glow = step.stage === si ? 1 : s.rest ?? 0;
          const shade = (23 + Math.round(glow * 6)).toString(16).padStart(2, "0");
          return (
            <g
              key={s.id}
              className="cf-anchor"
              aria-label={`Run the pipeline from ${s.label}`}
              style={{
                filter: `drop-shadow(0 0 ${glow * 36}px rgba(255,255,255,${glow * 0.24}))`,
              }}
              {...press(STEP_AT.get(`${si}:-1`) ?? 0)}
            >
              <rect
                className="cf-plate"
                x={s.x}
                y={s.y}
                width={s.w}
                height={NODE_H}
                rx={6}
                fill={`#${shade}${shade}${shade}`}
                stroke={glow >= 1 ? "url(#cf-stroke-active)" : "url(#cf-stroke-muted)"}
                strokeWidth={glow >= 1 ? 1 : 0.5}
              />
              <rect
                className="cf-overlay"
                x={s.x + 0.75}
                y={s.y + 0.75}
                width={s.w - 1.5}
                height={NODE_H - 1.5}
                rx={5.25}
                fill="url(#cf-face)"
                stroke="url(#cf-hot)"
                strokeWidth={1}
                style={{ opacity: 0.18 + glow * 0.74 }}
              />
              <text
                x={s.x + s.w / 2}
                y={s.y + 23}
                textAnchor="middle"
                fill="#e8e8e8"
                style={{
                  font: '500 12px "Geist Mono", ui-monospace, SFMono-Regular, monospace',
                  letterSpacing: "-0.01em",
                }}
              >
                {s.label}
              </text>
            </g>
          );
        })}

        {/* hint labels */}
        {STAGES.map((s, si) => (
          <g key={`${s.id}-hints`} style={{ pointerEvents: "none" }}>
            {s.hints.map((h, hi) => {
              const g = hints[si][hi];
              const shown = step.stage === si && at >= g.revealAt;
              return (
                <g
                  key={h.label}
                  className="cf-hint"
                  style={{ opacity: shown ? 1 : 0 }}
                  aria-hidden={!shown}
                >
                  <path
                    d={g.d}
                    fill="none"
                    stroke={h.color}
                    strokeOpacity={0.54}
                    strokeWidth={0.5}
                    strokeLinecap="round"
                  />
                  <circle cx={g.dotX} cy={g.y} r={5.4} fill={h.color} opacity={0.16} />
                  <circle cx={g.dotX} cy={g.y} r={2.25} fill={h.color} />
                  <text
                    x={g.textX}
                    y={g.y + 3.6}
                    textAnchor={g.anchor}
                    fill="#7e8186"
                    style={{
                      font: '400 10px "Geist Mono", ui-monospace, SFMono-Regular, monospace',
                      paintOrder: "stroke",
                      stroke: "rgba(7,7,7,0.72)",
                      strokeWidth: "1.5px",
                    }}
                  >
                    {h.label}
                  </text>
                </g>
              );
            })}
          </g>
        ))}

        {/* read-out */}
        <text
          key={active.id}
          className="cf-log"
          x={43.5}
          y={466.5}
          style={{ font: '400 12px "Geist Mono", ui-monospace, SFMono-Regular, monospace' }}
        >
          <tspan fill="rgba(255,255,255,0.75)">{">/"}</tspan>
          <tspan fill="#ffffff">{active.log.cmd}</tspan>
          <tspan fill="#7e8186">{` ${active.log.rest}`}</tspan>
        </text>
      </svg>

      <style>{`
        .cf-cell {
          cursor: pointer;
          transition: fill 260ms ease, stroke 260ms ease, stroke-width 260ms ease, opacity 260ms ease;
        }
        .cf-anchor { cursor: pointer; outline: none; transition: filter 320ms ease; }
        .cf-plate { transition: fill 260ms ease, stroke 260ms ease, stroke-width 260ms ease; }
        .cf-overlay { transition: opacity 260ms ease; }
        .cf-anchor:hover .cf-plate,
        .cf-anchor:focus-visible .cf-plate { stroke: rgba(255,255,255,0.72); stroke-width: 1; }
        .cf-anchor:hover .cf-overlay,
        .cf-anchor:focus-visible .cf-overlay { opacity: 0.72 !important; }
        .cf-hint { transition: opacity 220ms ease 40ms; }
        .cf-log { animation: cf-log-in 260ms cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes cf-log-in {
          from { opacity: 0; transform: translateY(2px); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cf-cell, .cf-anchor, .cf-plate, .cf-overlay, .cf-hint {
            transition-duration: 1ms !important;
          }
          .cf-log { animation-duration: 1ms !important; }
        }
      `}</style>
    </div>
  );
}
