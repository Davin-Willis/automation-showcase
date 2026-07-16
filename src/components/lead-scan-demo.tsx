"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useReducedMotion,
} from "framer-motion";
import { foundCount, leads, tagStyles } from "@/lib/leads";

const spring = { type: "spring" as const, stiffness: 170, damping: 24 };

// Irregular gaps between results (ms) so the scan feels like live hits
// arriving, not a metronome. Deterministic, so no hydration surprises.
const gaps = [400, 550, 300, 700, 350, 500, 250, 650, 450, 400];

type Phase = "idle" | "scanning" | "done";

export function LeadScanDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [revealed, setRevealed] = useState(0);
  const [run, setRun] = useState(0);
  const reduceMotion = useReducedMotion();
  const countRef = useRef<HTMLSpanElement>(null);

  const startScan = () => {
    setRevealed(0);
    setPhase("scanning");
    setRun((r) => r + 1);
  };

  useEffect(() => {
    if (phase !== "scanning") return;
    if (reduceMotion) {
      setRevealed(leads.length);
      setPhase("done");
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    let at = 0;
    leads.forEach((_, i) => {
      at += gaps[i % gaps.length];
      timers.push(setTimeout(() => setRevealed(i + 1), at));
    });
    timers.push(setTimeout(() => setPhase("done"), at + 600));
    return () => timers.forEach(clearTimeout);
  }, [phase, run, reduceMotion]);

  useEffect(() => {
    if (phase !== "done" || !countRef.current) return;
    if (reduceMotion) {
      countRef.current.textContent = String(foundCount);
      return;
    }
    const controls = animate(0, foundCount, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (countRef.current) countRef.current.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [phase, reduceMotion]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={startScan}
          disabled={phase === "scanning"}
          className="rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-paper shadow-sm transition-colors duration-200 hover:bg-accent-deep disabled:cursor-wait disabled:opacity-70"
        >
          {phase === "idle"
            ? "Scan the neighborhood"
            : phase === "scanning"
              ? "Scanning…"
              : "Scan again"}
        </button>
        <p className="text-xs text-muted">
          Simulated data. The real thing reads live public listings.
        </p>
      </div>

      <div className="mt-6">
        {phase === "idle" ? (
          <div className="flex min-h-[27rem] items-center justify-center rounded-xl border border-dashed border-line p-4">
            <p className="max-w-sm text-center text-sm leading-relaxed text-muted">
              Somewhere nearby are good businesses nobody can find online.
              Press the button and watch them turn up.
            </p>
          </div>
        ) : (
          <div className="min-h-[27rem] rounded-xl border border-line bg-white p-2 sm:p-4">
            <div className="flex items-center justify-between gap-3 border-b-2 border-line px-2 py-2 text-xs font-semibold tracking-wide text-muted uppercase">
              <span className="flex items-center gap-2">
                <motion.span
                  animate={
                    phase === "scanning" && !reduceMotion
                      ? { opacity: [1, 0.25, 1] }
                      : { opacity: 1 }
                  }
                  transition={
                    phase === "scanning" && !reduceMotion
                      ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" }
                      : { duration: 0.2 }
                  }
                  className={`h-2 w-2 rounded-full ${
                    phase === "scanning" ? "bg-[#8a6420]" : "bg-accent"
                  }`}
                />
                {phase === "scanning"
                  ? "Scanning public listings nearby"
                  : "Scan complete"}
              </span>
              <span className="font-mono normal-case">
                {phase === "scanning"
                  ? `${revealed} found so far`
                  : `showing the first ${leads.length}`}
              </span>
            </div>

            {leads.slice(0, revealed).map((l) => (
              <motion.div
                key={l.id}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduceMotion ? { duration: 0.3 } : spring}
                className="flex items-center gap-3 border-b border-line px-2 py-2.5"
              >
                <span className="min-w-0 flex-1 truncate">
                  <span className="text-sm font-medium">{l.name}</span>
                  <span className="ml-2 text-xs text-muted">
                    {l.kind} &middot; {l.area}
                  </span>
                </span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: reduceMotion ? 0 : 0.3,
                  }}
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${tagStyles[l.tag]}`}
                >
                  {l.tag}
                </motion.span>
              </motion.div>
            ))}

            <AnimatePresence>
              {phase === "done" && (
                <motion.div
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="px-2 pt-4 pb-1 text-base font-semibold">
                    Found{" "}
                    <span
                      ref={countRef}
                      className="font-mono text-lg font-bold text-accent"
                    >
                      0
                    </span>{" "}
                    local businesses with no website.
                  </p>
                  <p className="px-2 pb-2 text-sm leading-relaxed text-muted">
                    This is the pocket-sized version. The real one worked
                    through the whole of Louisville overnight and came back
                    with 706 businesses like these. That&apos;s what automation
                    does: a stack of opportunities on your desk by morning.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
