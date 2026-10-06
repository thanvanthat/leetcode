"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { easeOutExpo } from "@/lib/utils";

const ITEMS = [
  { id: "apple", label: "Apple", conf: 0.94, freshness: "High", tip: "Good to keep", x: 16, y: 30, size: 26, color: "#c9453a" },
  { id: "tomato", label: "Tomato", conf: 0.91, freshness: "Medium", tip: "Use soon", x: 50, y: 22, size: 22, color: "#d8543a" },
  { id: "orange", label: "Orange", conf: 0.88, freshness: "High", tip: "Good to keep", x: 70, y: 52, size: 26, color: "#e08a2e" },
  { id: "lime", label: "Lime", conf: 0.83, freshness: "Low", tip: "Prioritise today", x: 34, y: 60, size: 18, color: "#7fb043" },
] as const;

const ACCENT = "#c5ec7a";

/**
 * Demo visualization of the FreshcoAI flow: a scan line sweeps the frame,
 * detections lock on one by one and the side readout updates.
 * Values are illustrative, not model output.
 */
export function FreshScanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? ITEMS.length : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => setStep((s) => (s >= ITEMS.length + 1 ? 0 : s + 1)), 1100);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const shown = Math.min(step, ITEMS.length);
  const focus = ITEMS[Math.max(0, shown - 1)]!;

  return (
    <div ref={ref} className="grid gap-px bg-bone/10 lg:grid-cols-[1.6fr_1fr]">
      {/* Viewfinder */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0b120b]">
        <div className="scan-grid absolute inset-0 opacity-60" />
        {ITEMS.map((it) => (
          <div
            key={it.id}
            className="absolute rounded-full"
            style={{
              left: `${it.x}%`,
              top: `${it.y}%`,
              width: `${it.size}%`,
              aspectRatio: "1",
              background: `radial-gradient(circle at 32% 30%, color-mix(in srgb, ${it.color} 45%, white) 0%, ${it.color} 38%, color-mix(in srgb, ${it.color} 55%, black) 100%)`,
            }}
          />
        ))}

        <AnimatePresence>
          {ITEMS.slice(0, shown).map((it) => (
            <motion.div
              key={it.id}
              className="absolute"
              style={{
                left: `calc(${it.x}% - 2%)`,
                top: `calc(${it.y}% - 2.5%)`,
                width: `${it.size + 4}%`,
                aspectRatio: "1",
                border: `1.5px solid ${ACCENT}`,
              }}
              initial={{ opacity: 0, scale: 1.3 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
            >
              <span
                className="label absolute -top-6 left-[-1.5px] whitespace-nowrap px-1.5 py-0.5 text-[0.6rem] text-[#0a0f0a]"
                style={{ background: ACCENT }}
              >
                {it.label} · {it.conf.toFixed(2)}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {!reduce && (
          <div
            className="absolute inset-x-0 top-0 h-[10%]"
            style={{
              background: `linear-gradient(to bottom, transparent, ${ACCENT}33 80%, ${ACCENT})`,
              animation: "scan 4.4s cubic-bezier(.6,0,.4,1) infinite",
            }}
          />
        )}

        {/* Corners */}
        {[
          "left-4 top-4 border-l border-t",
          "right-4 top-4 border-r border-t",
          "left-4 bottom-4 border-l border-b",
          "right-4 bottom-4 border-r border-b",
        ].map((c) => (
          <span key={c} className={`absolute size-6 border-bone/70 ${c}`} />
        ))}
        <span className="label absolute bottom-5 left-12 text-[0.6rem] text-bone/60">Demo visualization</span>
        <span className="label absolute right-12 top-5 flex items-center gap-2 text-[0.6rem] text-bone/80">
          <span className="size-1.5 rounded-full bg-[#ff5a4a]" style={{ animation: "pulse-dot 1.4s infinite" }} /> Live
        </span>
      </div>

      {/* Readout */}
      <div className="flex flex-col justify-between gap-8 bg-[#0a0f0a] p-6 sm:p-8" aria-live="polite">
        <div>
          <p className="label text-ash">Detections</p>
          <p className="display mt-2 text-6xl tabular-nums text-bone">{String(shown).padStart(2, "0")}</p>
        </div>
        <div className="space-y-4">
          <div>
            <p className="label text-ash">Item</p>
            <p className="display-wide mt-1 text-2xl text-bone">{shown ? focus.label : "Scanning…"}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="label text-ash">Confidence</p>
              <p className="mt-1 font-mono text-bone">{shown ? focus.conf.toFixed(2) : "—"}</p>
            </div>
            <div>
              <p className="label text-ash">Est. freshness</p>
              <p className="mt-1 font-mono" style={{ color: ACCENT }}>
                {shown ? focus.freshness : "—"}
              </p>
            </div>
          </div>
          <div className="h-px w-full bg-bone/10">
            <motion.div
              className="h-px"
              style={{ background: ACCENT }}
              animate={{ width: shown ? `${focus.freshness === "High" ? 85 : focus.freshness === "Medium" ? 55 : 25}%` : "0%" }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
            />
          </div>
          <div>
            <p className="label text-ash">Recommendation</p>
            <p className="mt-1 text-bone/80">{shown ? focus.tip : "Point the camera at your produce."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
