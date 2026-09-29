"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { useIsDesktop } from "@/lib/hooks";
import { easeOutExpo } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RevealText } from "@/components/ui/RevealText";
import { ScrollIndicator } from "./ScrollIndicator";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => null });

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const desktop = useIsDesktop();
  const [inView, setInView] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);

  // Mount WebGL after first paint so text and LCP are never blocked by three.js
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const handle = idle(() => setSceneReady(true));
    return () => {
      if (window.cancelIdleCallback && typeof handle === "number") window.cancelIdleCallback(handle);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Subtle pointer parallax on the typography layers
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const typeX = useTransform(sx, (v) => v * -12);
  const typeY = useTransform(sy, (v) => v * -8);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  // Scroll-out: content drifts and fades as the next section arrives
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      onPointerMove={onPointerMove}
      aria-label="Introduction"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink"
    >
      {/* WebGL world */}
      <motion.div className="absolute inset-0 -z-10" style={{ opacity: fade }}>
        {sceneReady && <HeroScene active={inView} reduced={reduce} mobile={!desktop} />}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,transparent_0%,rgba(9,9,10,0.35)_45%,#09090a_85%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
      </motion.div>

      <motion.div style={{ y: contentY, opacity: fade }} className="gutter relative flex flex-1 flex-col pb-10 pt-28 lg:pt-32">
        <motion.div
          className="label flex flex-wrap justify-between gap-4 text-ash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span>
            <span className="text-bone">( 00 )</span> Portfolio — {site.year}
          </span>
          <span className="hidden sm:inline">Games · Intelligence · Interaction</span>
        </motion.div>

        <div className="mt-auto">
          <RevealText
            as="p"
            immediate
            delay={0.2}
            lines={[site.name]}
            className="display-wide text-[clamp(1.6rem,min(4.6vw,5.2svh),4.5rem)] text-bone"
          />
          <h1 className="sr-only">{site.name} — Game Developer and AI Engineer</h1>
          <motion.div aria-hidden="true" style={{ x: typeX, y: typeY }} className="mt-3 lg:mt-5">
            <RevealText
              as="div"
              immediate
              delay={0.35}
              stagger={0.1}
              lines={["Game Developer"]}
              className="display text-[clamp(4rem,min(15.5vw,16.5svh),15rem)] text-bone"
            />
            <div className="flex items-start gap-[0.12em] text-[clamp(4rem,min(15.5vw,16.5svh),15rem)]">
              <motion.span
                className="display pt-[0.08em] text-[0.55em] text-ai"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.7 }}
              >
                +
              </motion.span>
              <RevealText as="div" immediate delay={0.5} lines={["AI Engineer"]} className="display text-steel" />
            </div>
          </motion.div>

          <div className="mt-8 grid gap-8 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <motion.p
              className="max-w-[38ch] text-base leading-relaxed text-bone/80 sm:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: easeOutExpo, delay: 0.9 }}
            >
              {site.tagline}
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: easeOutExpo, delay: 1.05 }}
            >
              <MagneticButton href="#projects" cursor="explore">
                Explore Projects <span aria-hidden="true">↘</span>
              </MagneticButton>
              <MagneticButton href="#about" variant="ghost">
                About Me
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        <div className="mt-8 flex items-end justify-between border-t border-bone/10 pt-5">
          <ScrollIndicator />
          <ul className="label hidden gap-8 text-ash md:flex" aria-label="Focus areas">
            <li>Unreal Engine 5</li>
            <li>Computer Vision</li>
            <li>Interactive Systems</li>
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
