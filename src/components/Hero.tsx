export function Hero() {
  return (
    <div className="relative px-4 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <div className="hero-fade-in" style={{ animationDelay: "0.05s" }}>
          <h1 className="font-serif text-4xl leading-[1.15] text-text sm:text-5xl lg:text-[3.4rem]">
            Захист вашого дому,
            <br />
            яким можна пишатися.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Виготовляємо та монтуємо розсувні решітки вручну — надійний захист без
            зайвого клопоту.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a
              href="#contacts"
              className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Отримати розрахунок
            </a>
            <a
              href="#gallery"
              className="text-sm font-semibold text-text underline-offset-4 hover:underline"
            >
              Переглянути роботи
            </a>
          </div>
        </div>

        <div
          className="hero-fade-in relative mx-auto aspect-[4/5] w-full max-w-sm lg:max-w-none"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="absolute inset-[6%] -rotate-2 overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/pom3_625.jpg" alt="Розсувні решітки" className="h-full w-full object-cover" />
          </div>
          <div className="hero-float absolute -bottom-[6%] -right-[8%] w-2/5 rotate-3 overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/photo-31bo-600.jpg"
              alt="Об'єкт із розсувною решіткою"
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>
      </div>

      <style>{`
          @keyframes hero-fade-in-up {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .hero-fade-in {
            opacity: 0;
            animation: hero-fade-in-up 0.8s ease-out forwards;
          }
          @keyframes hero-float {
            0%, 100% { transform: rotate(3deg) translateY(0); }
            50% { transform: rotate(3deg) translateY(-8px); }
          }
          .hero-float {
            animation: hero-float 6s ease-in-out infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .hero-fade-in { animation: none; opacity: 1; transform: none; }
            .hero-float { animation: none; }
          }
        `}</style>
    </div>
  );
}
