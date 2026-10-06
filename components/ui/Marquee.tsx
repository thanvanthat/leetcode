import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  duration?: number;
  separator?: string;
}

/** CSS-only infinite ticker; the list is duplicated for a seamless loop. */
export function Marquee({ items, className, duration = 40, separator = "✦" }: MarqueeProps) {
  const row = items.flatMap((item) => [item, separator]);
  return (
    <div className={cn("relative flex overflow-hidden", className)} aria-hidden="true">
      <div className="flex shrink-0 items-center whitespace-nowrap" style={{ animation: `marquee ${duration}s linear infinite` }}>
        {[...row, ...row].map((item, i) => (
          <span key={i} className="px-[0.35em]">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
