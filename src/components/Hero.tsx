"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import CalculatorModal from "@/components/CalculatorModal";

export interface HeroSlide {
  imageUrl: string;
  title?: string;
}

interface HeroProps {
  pricePerM2?: number;
  slides?: HeroSlide[];
  phonePrimary?: string;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  { imageUrl: "/images/pom3_625.jpg", title: "Розсувні решітки на двері" },
  { imageUrl: "/images/pom4_625.jpg", title: "Розсувні решітки на вікна та двері" },
  { imageUrl: "/images/pom1_625.jpg", title: "Розсувні решітки великих розмірів" },
  { imageUrl: "/images/pom2_625.jpg", title: "Розсувні решітки на вікна" },
];

export function Hero({ pricePerM2 = 3500, slides = [], phonePrimary }: HeroProps) {
  const activeSlides = slides.length > 0 ? slides : DEFAULT_SLIDES;
  const [index, setIndex] = useState(0);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const reducedMotion = useRef(false);
  const oldPrice = pricePerM2 + 400;

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (reducedMotion.current || activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % activeSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  return (
    <div className="relative flex min-h-[calc(100svh-60px)] sm:min-h-[calc(100svh-100px)] flex-col justify-center overflow-hidden bg-neutral-950 px-4 py-12 sm:py-16 lg:py-20">
      {/* Background Slides with Cinematic Crossfade & Gentle Ken Burns */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {activeSlides.map((slide, i) => {
          const isCurrent = i === index;
          // Render current and adjacent slides to optimize memory & smooth transitions
          const isNear =
            Math.abs(i - index) <= 1 ||
            (index === 0 && i === activeSlides.length - 1) ||
            (index === activeSlides.length - 1 && i === 0);

          if (!isNear && !isCurrent) return null;

          return (
            <div
              key={`${slide.imageUrl}-${i}`}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                isCurrent
                  ? "opacity-85 scale-100"
                  : "opacity-0 scale-105 pointer-events-none"
              }`}
            >
              <Image
                src={slide.imageUrl}
                alt={slide.title || "Фонове зображення розсувних решіток"}
                fill
                priority={i === 0}
                className="object-cover object-center"
              />
            </div>
          );
        })}

        {/* Dark gradient overlay (25% more transparent for brighter background) */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-neutral-950/70 via-neutral-950/60 to-neutral-950/35" />
      </div>

      <div className="relative z-[2] mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Heading, Subtitle, CTA & Slide Controls */}
          <div className="lg:col-span-7 xl:col-span-7 hero-fade-in" style={{ animationDelay: "0.05s" }}>
            <h1 className="text-4xl font-bold leading-[0.96] tracking-[-0.5px] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-6xl sm:leading-[0.9] sm:tracking-[-1px] lg:text-[70px] xl:text-[78px] lg:leading-[0.88] xl:leading-[0.85]">
              Захист вашого дому,
              <br />
              <span className="text-white">яким можна пишатися</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-[1.35] text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)] sm:text-xl lg:text-[22px] lg:leading-[1.28]">
              Виготовляємо та монтуємо розсувні решітки вручну — надійний захист
              без зайвого клопоту. Працюємо по всій Україні.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => setIsCalcOpen(true)}
                className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-white bg-transparent px-8 py-3.5 text-base font-medium text-white transition-all duration-200 hover:bg-white hover:text-neutral-950 sm:text-lg lg:text-xl"
              >
                Отримати розрахунок
              </button>
              <a
                href="#gallery"
                className="inline-flex items-center justify-center px-4 py-3.5 text-base font-medium text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline sm:text-lg"
              >
                Переглянути роботи →
              </a>
            </div>
          </div>

          {/* Right Column: Floating Product Card */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end hero-fade-in" style={{ animationDelay: "0.15s" }}>
            <div className="w-full max-w-[370px] overflow-hidden rounded-3xl bg-white p-4 shadow-2xl ring-1 ring-black/10 transition-transform duration-300 hover:scale-[1.01] sm:p-5">
              {/* Product Preview Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100">
                <Image
                  src="/images/pom4_625.jpg"
                  alt="Розсувні решітки на вікна та двері"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute top-2.5 right-2.5 rounded-full bg-neutral-900/75 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                  Власне виробництво
                </span>
              </div>

              {/* Product Title */}
              <h3 className="mt-4 text-base font-bold uppercase tracking-tight text-neutral-900 sm:text-lg">
                Розсувні решітки для вікон та дверей
              </h3>

              {/* Price & Action Row */}
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-neutral-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCalcOpen(true)}
                  className="cursor-pointer rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 sm:text-base"
                >
                  Замовити
                </button>

                <div className="text-right">
                  <div className="flex items-baseline justify-end gap-1.5">
                    <span className="text-xl font-extrabold tracking-tight text-neutral-900 sm:text-2xl">
                      {pricePerM2.toLocaleString("uk-UA")} ₴
                    </span>
                    <span className="text-xs text-neutral-400 line-through sm:text-sm">
                      {oldPrice.toLocaleString("uk-UA")} ₴
                    </span>
                  </div>
                  <span className="text-[11px] font-normal text-neutral-500">ціна за м²</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Calculator Modal */}
      <CalculatorModal
        isOpen={isCalcOpen}
        onClose={() => setIsCalcOpen(false)}
        pricePerM2={pricePerM2}
        phonePrimary={phonePrimary}
      />

      <style>{`
        @keyframes hero-fade-in-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-fade-in {
          opacity: 0;
          animation: hero-fade-in-up 0.8s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-fade-in { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}



