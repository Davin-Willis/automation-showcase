"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  countStyles,
  inventory,
  reorderCount,
  reorderNames,
  statusStyles,
} from "@/lib/inventory";

const spring = { type: "spring" as const, stiffness: 170, damping: 24 };

// Slightly uneven pauses between items, so the check reads as the
// system looking at each shelf rather than a single canned animation.
const gaps = [450, 350, 500, 300, 550, 350, 400];

type Phase = "idle" | "checking" | "done";

export function InventoryDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [checked, setChecked] = useState(0);
  const [run, setRun] = useState(0);
  const reduceMotion = useReducedMotion();

  const startCheck = () => {
    setChecked(0);
    setPhase("checking");
    setRun((r) => r + 1);
  };

  useEffect(() => {
    if (phase !== "checking") return;
    if (reduceMotion) {
      setChecked(inventory.length);
      setPhase("done");
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    let at = 0;
    inventory.forEach((_, i) => {
      at += gaps[i % gaps.length];
      timers.push(setTimeout(() => setChecked(i + 1), at));
    });
    timers.push(setTimeout(() => setPhase("done"), at + 500));
    return () => timers.forEach(clearTimeout);
  }, [phase, run, reduceMotion]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={startCheck}
          disabled={phase === "checking"}
          className="rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-paper shadow-sm transition-colors duration-200 hover:bg-accent-deep disabled:cursor-wait disabled:opacity-70"
        >
          {phase === "idle"
            ? "Check stock"
            : phase === "checking"
              ? "Checking…"
              : "Check again"}
        </button>
        <p className="text-xs text-muted">
          Simulated data. The real thing plugs into your sales system.
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-line bg-white p-2 sm:p-4">
        <div className="grid grid-cols-[1fr_auto_7rem] items-center gap-3 border-b-2 border-line px-2 py-2 text-xs font-semibold tracking-wide text-muted uppercase">
          <span>Item</span>
          <span className="text-right">In stock</span>
          <span className="text-right">Status</span>
        </div>

        {inventory.map((item, i) => {
          const isChecked = i < checked;
          const isActive = phase === "checking" && i === checked;
          return (
            <div
              key={item.id}
              className={`grid grid-cols-[1fr_auto_7rem] items-center gap-3 border-b border-line px-2 py-2.5 transition-colors duration-200 ${
                isActive ? "bg-paper" : ""
              }`}
            >
              <span className="truncate text-sm font-medium">{item.name}</span>
              <span
                className={`text-right font-mono text-sm transition-colors duration-300 ${
                  isChecked ? countStyles[item.status] : "text-muted"
                }`}
              >
                {item.count} {item.unit}
              </span>
              <span className="flex justify-end">
                {isChecked ? (
                  <motion.span
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 0.6 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    transition={reduceMotion ? { duration: 0.3 } : spring}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide whitespace-nowrap uppercase ${statusStyles[item.status]}`}
                  >
                    {item.status}
                  </motion.span>
                ) : isActive ? (
                  <motion.span
                    animate={
                      reduceMotion
                        ? { opacity: 0.6 }
                        : { opacity: [0.25, 1, 0.25] }
                    }
                    transition={
                      reduceMotion
                        ? { duration: 0.2 }
                        : { duration: 0.9, repeat: Infinity, ease: "easeInOut" }
                    }
                    className="mr-1 h-2 w-2 rounded-full bg-muted"
                  />
                ) : null}
              </span>
            </div>
          );
        })}

        <AnimatePresence>
          {phase === "done" && (
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <p className="px-2 pt-4 pb-3 text-base font-semibold">
                <span className="font-mono text-lg font-bold text-[#99493e]">
                  {reorderCount}
                </span>{" "}
                items flagged for reorder. A supplier email is ready to send.
              </p>
              <div className="mx-2 rounded-lg border border-line bg-paper px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-xs text-muted">
                    To: Riverbend Restaurant Supply
                  </p>
                  <span className="rounded-full bg-[#e3f0e7] px-2.5 py-0.5 text-xs font-semibold text-[#2f6b4f]">
                    Draft ready
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed">
                  Hi Dana, could you add {reorderNames.join(" and ")}
                  {" to this week's delivery? Thanks!"}
                </p>
              </div>
              <p className="px-2 pt-3 pb-2 text-sm leading-relaxed text-muted">
                This is the kind of job that runs quietly every night while
                the lights are off. You never lose a Saturday rush to an empty
                shelf, and you never have to remember to check.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
