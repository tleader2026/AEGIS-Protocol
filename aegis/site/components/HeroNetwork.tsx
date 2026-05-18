"use client";

import { motion } from "framer-motion";

const nodes = [
  { x: 12, y: 58, label: "human", kind: "approval" },
  { x: 28, y: 36, label: "agent", kind: "agent" },
  { x: 48, y: 47, label: "runtime", kind: "runtime" },
  { x: 65, y: 28, label: "model", kind: "model" },
  { x: 78, y: 54, label: "registry", kind: "registry" },
  { x: 58, y: 73, label: "impact", kind: "impact" },
  { x: 86, y: 20, label: "orbit", kind: "orbit" }
];

const edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [2, 4],
  [2, 5],
  [4, 6],
  [5, 4],
  [3, 4]
];

function color(kind: string) {
  if (kind === "approval") return "#ffd166";
  if (kind === "registry") return "#86a8ff";
  if (kind === "impact") return "#ff6b9a";
  return "#46f0c2";
}

export function HeroNetwork() {
  return (
    <div className="relative min-h-[520px] overflow-hidden border border-white/10 bg-[#071014] shadow-glow light:bg-[#f5f7f2]">
      <div className="absolute inset-0 aegis-grid opacity-80" />
      <div className="noise absolute inset-0" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <radialGradient id="core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#46f0c2" stopOpacity="0.26" />
            <stop offset="55%" stopColor="#86a8ff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#071014" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="52" cy="50" r="45" fill="url(#core)" />
        <motion.circle
          cx="52"
          cy="50"
          r="31"
          fill="none"
          stroke="#86a8ff"
          strokeOpacity="0.24"
          strokeWidth="0.25"
          animate={{ rotate: 360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "52px 50px" }}
        />
        <motion.ellipse
          cx="52"
          cy="50"
          rx="45"
          ry="16"
          fill="none"
          stroke="#46f0c2"
          strokeOpacity="0.26"
          strokeWidth="0.22"
          animate={{ rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "52px 50px" }}
        />
        {edges.map(([a, b], index) => {
          const source = nodes[a];
          const target = nodes[b];
          return (
            <g key={`${a}-${b}`}>
              <line
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke="#c9fff1"
                strokeOpacity="0.24"
                strokeWidth="0.22"
              />
              <motion.circle
                r="0.8"
                fill={color(target.kind)}
                filter="url(#glow)"
                initial={{ cx: source.x, cy: source.y, opacity: 0 }}
                animate={{ cx: [source.x, target.x], cy: [source.y, target.y], opacity: [0, 1, 0] }}
                transition={{ duration: 2.6 + index * 0.18, repeat: Infinity, delay: index * 0.22, ease: "easeInOut" }}
              />
            </g>
          );
        })}
        {nodes.map((node, index) => (
          <g key={node.label}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.kind === "runtime" ? 4.2 : 2.8}
              fill="#071014"
              stroke={color(node.kind)}
              strokeWidth="0.45"
              filter="url(#glow)"
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.24 }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            />
            <text
              x={node.x}
              y={node.y + 6}
              textAnchor="middle"
              className="fill-white/70 font-mono text-[2px] uppercase light:fill-ink/70"
              style={{ letterSpacing: 0 }}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-ink/55 px-4 py-3 backdrop-blur light:bg-white/70">
        <div className="grid gap-2 font-mono text-[11px] text-white/65 light:text-ink/70 sm:grid-cols-4">
          <span>AEGIS/1.0-draft</span>
          <span>intent: verified</span>
          <span>runtime: attested</span>
          <span>impact: review-bound</span>
        </div>
      </div>
    </div>
  );
}
