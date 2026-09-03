"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type SpecCard = {
  icon: ReactNode;
  title: string;
  body: ReactNode;
};

export function SpecCarousel({ cards }: { cards: SpecCard[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = cards.length;
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (paused || reducedMotion.current) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [paused, count]);

  const go = (i: number) => setIndex(((i % count) + count) % count);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-theme border border-border bg-card">
        <div
          className="flex items-stretch transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {cards.map((card, i) => (
            <div key={i} className="w-full shrink-0 p-6 sm:p-8">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-primary">
                {card.icon}
              </span>
              <h3 className="mb-3 text-lg font-bold text-text">{card.title}</h3>
              <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">{card.body}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Попередня картка"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text transition-colors hover:border-primary hover:text-primary"
        >
          ‹
        </button>
        <div className="flex gap-1.5">
          {cards.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Картка ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-primary" : "w-1.5 bg-muted"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Наступна картка"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text transition-colors hover:border-primary hover:text-primary"
        >
          ›
        </button>
      </div>
    </div>
  );
}
