"use client";

import { useEffect, useRef, useState } from "react";
import { BusIcon } from "./icons";

export default function TimelineBus() {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden
      className="hidden lg:block absolute top-2 bottom-2 left-1/2 -translate-x-1/2 pointer-events-none w-0"
    >
      <span
        className={[
          "absolute left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-marron-deep text-oro-bright ring-2 ring-oro-bright/40 shadow-lg shadow-marron-deep/60",
          started ? "animate-bus" : "",
        ].join(" ")}
        style={!started ? { top: "0%" } : undefined}
      >
        <BusIcon size={18} />
      </span>
    </span>
  );
}
