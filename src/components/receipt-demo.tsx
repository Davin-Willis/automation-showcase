"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  animate,
  motion,
  useReducedMotion,
} from "framer-motion";
import { categoryStyles, receipts, receiptTotal } from "@/lib/receipts";

const spring = { type: "spring" as const, stiffness: 170, damping: 24 };

// Deterministic pseudo-random tilt and offsets so the messy pile looks
// jumbled but renders identically on server and client.
const tilt = (i: number) => ((i * 37) % 7) - 3;
const bumpTop = (i: number) => (i * 53) % 22;
const bumpLeft = (i: number) => (i * 29) % 18;

const fmtMoney = (v: number) => `$${v.toFixed(2)}`;

export function ReceiptDemo() {
  const [sorted, setSorted] = useState(false);
  const [showTotal, setShowTotal] = useState(false);
  const reduceMotion = useReducedMotion();
  const totalRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!sorted) {
      setShowTotal(false);
      return;
    }
    const settleMs = reduceMotion ? 0 : receipts.length * 90 + 450;
    const timer = setTimeout(() => setShowTotal(true), settleMs);
    return () => clearTimeout(timer);
  }, [sorted, reduceMotion]);

  useEffect(() => {
    if (!showTotal || !totalRef.current) return;
    if (reduceMotion) {
      totalRef.current.textContent = fmtMoney(receiptTotal);
      return;
    }
    const controls = animate(0, receiptTotal, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (totalRef.current) totalRef.current.textContent = fmtMoney(v);
      },
    });
    return () => controls.stop();
  }, [showTotal, reduceMotion]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setSorted((s) => !s)}
          className="rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-paper shadow-sm transition-colors duration-200 hover:bg-accent-deep"
        >
          {sorted ? "Do it again" : "Watch it get organized"}
        </button>
        <p className="text-xs text-muted">
          Simulated data. The real thing plugs into your bank export.
        </p>
      </div>

      <div className="mt-6">
        <LayoutGroup>
          {!sorted ? (
            <div className="flex min-h-[27rem] flex-wrap content-start gap-3 rounded-xl border border-dashed border-line p-4">
              {receipts.map((r, i) => (
                <motion.div
                  key={r.id}
                  layoutId={r.id}
                  animate={{ rotate: reduceMotion ? 0 : tilt(i) }}
                  transition={spring}
                  className="self-start rounded-md border border-line bg-white px-3 py-2 font-mono text-xs whitespace-nowrap shadow-sm"
                  style={{
                    marginTop: bumpTop(i),
                    marginLeft: bumpLeft(i),
                  }}
                >
                  {r.raw}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="min-h-[27rem] rounded-xl border border-line bg-white p-2 sm:p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-[3.5rem_1fr_auto_5rem] items-center gap-3 border-b-2 border-line px-2 py-2 text-xs font-semibold tracking-wide text-muted uppercase sm:grid-cols-[4.5rem_1fr_auto_5.5rem]"
              >
                <span>Date</span>
                <span>Vendor</span>
                <span>Category</span>
                <span className="text-right">Amount</span>
              </motion.div>
              {receipts.map((r, i) => (
                <motion.div
                  key={r.id}
                  layoutId={r.id}
                  transition={{
                    ...spring,
                    delay: reduceMotion ? 0 : i * 0.09,
                  }}
                  className="grid grid-cols-[3.5rem_1fr_auto_5rem] items-center gap-3 border-b border-line px-2 py-2.5 sm:grid-cols-[4.5rem_1fr_auto_5.5rem]"
                >
                  <span className="font-mono text-xs text-muted">{r.date}</span>
                  <span className="truncate text-sm font-medium">
                    {r.vendor}
                  </span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: reduceMotion ? 0 : i * 0.09 + 0.35,
                    }}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${categoryStyles[r.category]}`}
                  >
                    {r.category}
                  </motion.span>
                  <span className="text-right font-mono text-sm">
                    {fmtMoney(r.amount)}
                  </span>
                </motion.div>
              ))}
              <AnimatePresence>
                {showTotal && (
                  <motion.div
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="grid grid-cols-[3.5rem_1fr_auto_5rem] items-center gap-3 px-2 py-3 sm:grid-cols-[4.5rem_1fr_auto_5.5rem]">
                      <span />
                      <span className="text-sm font-semibold">
                        Week of Jul 8, total spend
                      </span>
                      <span />
                      <span
                        ref={totalRef}
                        className="text-right font-mono text-base font-bold text-accent"
                      >
                        $0.00
                      </span>
                    </div>
                    <p className="px-2 pb-2 text-sm text-muted">
                      About four seconds. By hand it&apos;s your whole Sunday
                      evening, every week.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </LayoutGroup>
      </div>
    </div>
  );
}
