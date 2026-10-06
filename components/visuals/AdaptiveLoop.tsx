interface AdaptiveLoopProps {
  steps: string[];
  accent: string;
}

/** Circular feedback-loop diagram with an orbiting signal (CSS-driven). */
export function AdaptiveLoop({ steps, accent }: AdaptiveLoopProps) {
  const R = 150;
  const C = 200;
  return (
    <svg
      viewBox="-130 -10 660 420"
      className="w-full"
      role="img"
      aria-label={`Adaptive loop: ${steps.join(", then ")}, and back to the start`}
    >
      <circle cx={C} cy={C} r={R} fill="none" stroke="#ecebe6" strokeOpacity="0.12" />
      <circle
        cx={C}
        cy={C}
        r={R}
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        strokeDasharray="60 882"
        strokeLinecap="round"
        style={{ transformOrigin: "200px 200px", animation: "spin 6s linear infinite" }}
      />
      <circle cx={C} cy={C} r={R - 46} fill="none" stroke="#ecebe6" strokeOpacity="0.06" strokeDasharray="2 6" />
      <text
        x={C}
        y={C - 6}
        textAnchor="middle"
        fill="#ecebe6"
        fontFamily="monospace"
        fontSize="11"
        letterSpacing="2"
        opacity="0.6"
      >
        FLOW
      </text>
      <text x={C} y={C + 12} textAnchor="middle" fill={accent} fontFamily="monospace" fontSize="11" letterSpacing="2">
        ZONE
      </text>
      {steps.map((label, i) => {
        const a = (i / steps.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.round(C + Math.cos(a) * R);
        const y = Math.round(C + Math.sin(a) * R);
        const right = Math.cos(a) > 0.2;
        const left = Math.cos(a) < -0.2;
        return (
          <g key={label}>
            <circle cx={x} cy={y} r="7" fill="#0d0b16" stroke={accent} strokeWidth="1.5" />
            <circle cx={x} cy={y} r="2.5" fill={accent} />
            <text
              x={x + (right ? 16 : left ? -16 : 0)}
              y={y + (right || left ? 4 : Math.sin(a) < 0 ? -18 : 26)}
              textAnchor={right ? "start" : left ? "end" : "middle"}
              fill="#ecebe6"
              fontFamily="monospace"
              fontSize="11"
              letterSpacing="1.5"
            >
              {label.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
