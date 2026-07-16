"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion";
import { reviews } from "@/lib/reviews";

const spring = { type: "spring" as const, stiffness: 170, damping: 24 };
const TYPE_SPEED = 45; // characters per second

type Phase = "idle" | "drafting" | "done";

function Stars({ count }: { count: number }) {
  return (
    <span
      aria-label={`${count} out of 5 stars`}
      className="font-mono text-sm tracking-tight text-[#8a6420]"
    >
      {"★".repeat(count)}
      <span className="opacity-30">{"★".repeat(5 - count)}</span>
    </span>
  );
}

export function ReviewReplyDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  // How many replies are fully drafted, which one is typing, and how
  // many characters of it are on screen so far.
  const [completed, setCompleted] = useState(0);
  const [active, setActive] = useState(-1);
  const [typed, setTyped] = useState(0);
  const [run, setRun] = useState(0);
  const reduceMotion = useReducedMotion();

  const startDrafting = () => {
    setCompleted(0);
    setActive(-1);
    setTyped(0);
    setPhase("drafting");
    setRun((r) => r + 1);
  };

  useEffect(() => {
    if (phase !== "drafting") return;
    if (reduceMotion) {
      setCompleted(reviews.length);
      setPhase("done");
      return;
    }
    let cancelled = false;
    let controls: ReturnType<typeof animate> | null = null;
    const wait = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    (async () => {
      for (let i = 0; i < reviews.length; i++) {
        if (cancelled) return;
        setActive(i);
        setTyped(0);
        await wait(500);
        if (cancelled) return;
        const length = reviews[i].reply.length;
        controls = animate(0, length, {
          duration: length / TYPE_SPEED,
          ease: "linear",
          onUpdate: (v) => setTyped(Math.round(v)),
        });
        await controls;
        if (cancelled) return;
        setActive(-1);
        setCompleted(i + 1);
        await wait(400);
      }
      if (!cancelled) setPhase("done");
    })();
    return () => {
      cancelled = true;
      controls?.stop();
    };
  }, [phase, run, reduceMotion]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={startDrafting}
          disabled={phase === "drafting"}
          className="rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-paper shadow-sm transition-colors duration-200 hover:bg-accent-deep disabled:cursor-wait disabled:opacity-70"
        >
          {phase === "idle"
            ? "Draft replies"
            : phase === "drafting"
              ? "Drafting…"
              : "Draft again"}
        </button>
        <p className="text-xs text-muted">
          Simulated data. The real thing watches your review pages for you.
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-line bg-white p-2 sm:p-4">
        {reviews.map((review, i) => {
          const isTyping = active === i;
          const isDrafted = i < completed;
          const replyText = isDrafted
            ? review.reply
            : review.reply.slice(0, typed);
          return (
            <div
              key={review.id}
              className={`px-2 py-4 ${i > 0 ? "border-t border-line" : ""}`}
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-sm font-semibold">{review.author}</span>
                <Stars count={review.stars} />
                <span className="text-xs text-muted">{review.ago}</span>
                <AnimatePresence>
                  {!isDrafted && !isTyping && (
                    <motion.span
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-auto rounded-full bg-[#f8ecd9] px-2.5 py-0.5 text-xs font-semibold text-[#8a6420]"
                    >
                      No reply yet
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <p className="mt-2 text-sm leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>

              <AnimatePresence>
                {(isTyping || isDrafted) && (
                  <motion.div
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 rounded-lg border border-line bg-paper px-4 py-3"
                  >
                    <div className="flex min-h-6 items-center justify-between gap-3">
                      <p className="font-mono text-xs text-muted">
                        Your reply
                      </p>
                      {isDrafted && (
                        <motion.span
                          initial={
                            reduceMotion
                              ? { opacity: 0 }
                              : { opacity: 0, scale: 0.6 }
                          }
                          animate={{ opacity: 1, scale: 1 }}
                          transition={
                            reduceMotion ? { duration: 0.3 } : spring
                          }
                          className="rounded-full bg-[#e3f0e7] px-2.5 py-0.5 text-xs font-semibold text-[#2f6b4f]"
                        >
                          Ready to send
                        </motion.span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed">
                      {replyText}
                      {isTyping && (
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 bg-ink"
                        />
                      )}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
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
              className="border-t border-line"
            >
              <p className="px-2 pt-4 pb-1 text-base font-semibold">
                <span className="font-mono text-lg font-bold text-accent">
                  {reviews.length}
                </span>{" "}
                replies drafted and waiting for your OK. Nothing is posted
                until you approve it.
              </p>
              <p className="px-2 pt-1 pb-2 text-sm leading-relaxed text-muted">
                Customers trust the business that always answers. This keeps
                you that business without handing over your evenings to do
                it.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
