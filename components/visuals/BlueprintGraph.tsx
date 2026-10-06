import type { UnrealStage } from "@/lib/types";

interface BlueprintGraphProps {
  stages: UnrealStage[];
  active: number;
}

const NODE_W = 210;
const NODE_H = 96;
// Zig-zag layout reminiscent of a Blueprint event graph
const positions = [
  { x: 40, y: 40 },
  { x: 330, y: 150 },
  { x: 40, y: 290 },
  { x: 330, y: 400 },
  { x: 40, y: 540 },
  { x: 330, y: 650 },
];

/** A stylised Unreal Blueprint graph: the active stage's node and wire light up. */
export function BlueprintGraph({ stages, active }: BlueprintGraphProps) {
  return (
    <svg
      viewBox="0 0 580 790"
      className="h-full w-full"
      role="img"
      aria-label={`System breakdown, current stage: ${stages[active]?.label ?? ""}`}
    >
      <defs>
        <pattern id="bp-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="#ecebe6" strokeOpacity="0.05" />
        </pattern>
      </defs>
      <rect width="580" height="790" fill="url(#bp-grid)" />

      {/* Exec wires */}
      {positions.slice(0, -1).map((p, i) => {
        const n = positions[i + 1]!;
        const x1 = p.x + NODE_W;
        const y1 = p.y + 34;
        const x2 = n.x;
        const y2 = n.y + 34;
        const d = `M${x1} ${y1} C ${x1 + 120} ${y1}, ${x2 - 120} ${y2}, ${x2} ${y2}`;
        const lit = i < active;
        return (
          <g key={i}>
            <path
              d={d}
              fill="none"
              stroke="#ecebe6"
              strokeOpacity={lit ? 0.9 : 0.15}
              strokeWidth="2"
              style={{ transition: "stroke-opacity .6s" }}
            />
            {i === active - 1 && (
              <path
                d={d}
                fill="none"
                stroke="#9fd4ff"
                strokeWidth="2.5"
                strokeDasharray="10 14"
                style={{ animation: "bp-flow 1s linear infinite" }}
              />
            )}
          </g>
        );
      })}

      {stages.map((stage, i) => {
        const p = positions[i]!;
        const isActive = i === active;
        const done = i < active;
        return (
          <g
            key={stage.label}
            transform={`translate(${p.x} ${p.y})`}
            style={{ transition: "opacity .6s" }}
            opacity={isActive || done ? 1 : 0.4}
          >
            <rect
              width={NODE_W}
              height={NODE_H}
              fill="#111113"
              stroke={isActive ? "#9fd4ff" : "#ecebe6"}
              strokeOpacity={isActive ? 1 : 0.2}
            />
            <rect width={NODE_W} height="26" fill={isActive ? "#9fd4ff" : "#232327"} />
            <text x="12" y="18" fontFamily="monospace" fontSize="11" letterSpacing="1.5" fill={isActive ? "#09090a" : "#ecebe6"}>
              {stage.label.toUpperCase()}
            </text>
            {/* exec pins */}
            <path d="M-1 28 l8 6 -8 6z" fill="#ecebe6" opacity={i === 0 ? 0 : 0.8} />
            <path d={`M${NODE_W - 8} 28 l8 6 -8 6z`} fill="#ecebe6" opacity={i === stages.length - 1 ? 0 : 0.8} />
            {stage.tools.slice(0, 2).map((t, j) => (
              <g key={t} transform={`translate(12 ${50 + j * 22})`}>
                <circle cx="4" cy="-4" r="4" fill="none" stroke={j ? "#b7a4ff" : "#c5ec7a"} strokeWidth="1.5" />
                <text x="16" y="0" fontFamily="monospace" fontSize="11" fill="#8b8b90">
                  {t}
                </text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
