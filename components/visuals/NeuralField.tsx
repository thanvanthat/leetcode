import { seeded } from "@/lib/utils";

const LAYERS = [5, 8, 10, 8, 4];
const W = 1200;
const H = 800;

/** Decorative layered network (input → hidden → output) with a few travelling signals. */
export function NeuralField({ animated = true }: { animated?: boolean }) {
  const rand = seeded(42);
  const nodes = LAYERS.map((count, li) =>
    Array.from({ length: count }, (_, ni) => ({
      x: 420 + li * 170,
      y: H / 2 + (ni - (count - 1) / 2) * (560 / Math.max(...LAYERS)) * 1.2,
    })),
  );
  const links: { x1: number; y1: number; x2: number; y2: number; hot: boolean }[] = [];
  nodes.slice(0, -1).forEach((layer, li) => {
    layer.forEach((a) => {
      nodes[li + 1]!.forEach((b) => {
        if (rand() > 0.45) links.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, hot: rand() > 0.92 });
      });
    });
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMaxYMid slice" className="h-full w-full" aria-hidden="true">
      <g stroke="#9fd4ff">
        {links.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            strokeOpacity={l.hot ? 0.5 : 0.07}
            strokeWidth={l.hot ? 1.2 : 1}
          />
        ))}
      </g>
      {animated &&
        links
          .filter((l) => l.hot)
          .map((l, i) => (
            <circle key={`p${i}`} r="2.5" fill="#9fd4ff">
              <animateMotion
                dur={`${2.2 + (i % 4) * 0.5}s`}
                repeatCount="indefinite"
                path={`M${l.x1} ${l.y1} L${l.x2} ${l.y2}`}
              />
            </circle>
          ))}
      {nodes.flat().map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="5" fill="#07090c" stroke="#ecebe6" strokeOpacity="0.35" />
      ))}
    </svg>
  );
}
