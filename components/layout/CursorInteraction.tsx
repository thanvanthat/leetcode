"use client";

import { useEffect, useRef, useState } from "react";
import { useFinePointer } from "@/lib/hooks";
import { cn, lerp } from "@/lib/utils";

type CursorState = "normal" | "hover" | "view" | "drag" | "explore";

const LABELS: Partial<Record<CursorState, string>> = {
  view: "View →",
  drag: "← Drag →",
  explore: "Explore",
};

/**
 * Custom desktop cursor. Elements opt in with `data-cursor="hover|view|drag|explore"`
 * and may override the text with `data-cursor-label`. Disabled on touch devices.
 */
export function CursorInteraction() {
  const enabled = useFinePointer();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("normal");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...target };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor], a, button");
      if (!el) {
        setState("normal");
        return;
      }
      const next = (el.dataset.cursor as CursorState | undefined) ?? "hover";
      setState(next);
      setLabel(el.dataset.cursorLabel ?? LABELS[next] ?? "");
    };

    const onLeave = () => setVisible(false);

    const tick = () => {
      ring.x = lerp(ring.x, target.x, 0.18);
      ring.y = lerp(ring.y, target.y, 0.18);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  const expanded = state === "view" || state === "drag" || state === "explore";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-[100] transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <div ref={ringRef} className="absolute left-0 top-0 will-change-transform">
        <div
          className={cn(
            "flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-500 ease-[var(--ease-out-expo)]",
            state === "normal" && "size-9 border border-bone/40",
            state === "hover" && "size-14 border border-bone bg-bone/5",
            expanded && "size-24 border border-transparent bg-bone",
          )}
        >
          <span
            className={cn(
              "label whitespace-nowrap text-[0.625rem] text-ink transition-opacity duration-300",
              expanded ? "opacity-100 delay-150" : "opacity-0",
            )}
          >
            {label}
          </span>
        </div>
      </div>
      <div ref={dotRef} className="absolute left-0 top-0 will-change-transform">
        <div
          className={cn(
            "size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone transition-opacity duration-300",
            expanded && "opacity-0",
          )}
        />
      </div>
    </div>
  );
}
