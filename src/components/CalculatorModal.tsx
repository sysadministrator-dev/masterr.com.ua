"use client";

import { useEffect, useState } from "react";

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  pricePerM2: number;
  phonePrimary?: string;
}

export default function CalculatorModal({
  isOpen,
  onClose,
  pricePerM2,
  phonePrimary = "+38 (067) 63-050-63",
}: CalculatorModalProps) {
  const [unit, setUnit] = useState<"cm" | "m">("cm");
  const [width, setWidth] = useState<string>("150");
  const [height, setHeight] = useState<string>("200");
  const [count, setCount] = useState<number>(1);

  // Close on Escape key and handle body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Numeric parsing
  const numWidth = parseFloat(width.replace(",", ".")) || 0;
  const numHeight = parseFloat(height.replace(",", ".")) || 0;

  // Normalize dimensions to meters
  const widthInMeters = unit === "cm" ? numWidth / 100 : numWidth;
  const heightInMeters = unit === "cm" ? numHeight / 100 : numHeight;

  // Area per single grille in m²
  const singleArea = Math.max(0, widthInMeters * heightInMeters);
  const totalArea = singleArea * count;

  // Price calculation
  const unitPrice = pricePerM2 > 0 ? pricePerM2 : 3500;
  const totalPrice = Math.round(totalArea * unitPrice);

  const setPreset = (presetW: number, presetH: number) => {
    if (unit === "cm") {
      setWidth(presetW.toString());
      setHeight(presetH.toString());
    } else {
      setWidth((presetW / 100).toString());
      setHeight((presetH / 100).toString());
    }
  };

  const cleanPhone = phonePrimary.replace(/[^+\d]/g, "");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="calc-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/10 transition-all sm:max-w-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-100 bg-neutral-50/60 px-6 py-5 sm:px-8">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Онлайн-калькулятор
            </span>
            <h2
              id="calc-modal-title"
              className="mt-2 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl"
            >
              Розрахунок вартості решіток
            </h2>
            <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
              Введіть ширину та висоту отвору для миттєвого орієнтовного розрахунку
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Закрити калькулятор"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="max-h-[calc(90vh-140px)] overflow-y-auto px-6 py-6 sm:px-8">
          {/* Quick Presets & Unit Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-neutral-500">Популярні розміри:</span>
              <button
                type="button"
                onClick={() => setPreset(140, 140)}
                className="rounded-lg bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-200"
              >
                Вікно 1.4×1.4м
              </button>
              <button
                type="button"
                onClick={() => setPreset(90, 210)}
                className="rounded-lg bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-200"
              >
                Двері 0.9×2.1м
              </button>
              <button
                type="button"
                onClick={() => setPreset(160, 220)}
                className="hidden rounded-lg bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-200 sm:inline-block"
              >
                Балкон 1.6×2.2м
              </button>
            </div>

            {/* Unit toggle: cm vs m */}
            <div className="flex items-center rounded-xl bg-neutral-100 p-1 text-xs font-medium text-neutral-600">
              <button
                type="button"
                onClick={() => {
                  if (unit === "m") {
                    setUnit("cm");
                    if (numWidth) setWidth(Math.round(numWidth * 100).toString());
                    if (numHeight) setHeight(Math.round(numHeight * 100).toString());
                  }
                }}
                className={`rounded-lg px-2.5 py-1 transition-all ${
                  unit === "cm"
                    ? "bg-white font-bold text-neutral-900 shadow-sm"
                    : "hover:text-neutral-900"
                }`}
              >
                см
              </button>
              <button
                type="button"
                onClick={() => {
                  if (unit === "cm") {
                    setUnit("m");
                    if (numWidth) setWidth((numWidth / 100).toFixed(2));
                    if (numHeight) setHeight((numHeight / 100).toFixed(2));
                  }
                }}
                className={`rounded-lg px-2.5 py-1 transition-all ${
                  unit === "m"
                    ? "bg-white font-bold text-neutral-900 shadow-sm"
                    : "hover:text-neutral-900"
                }`}
              >
                метри (м)
              </button>
            </div>
          </div>

          {/* Dimension Inputs Grid */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Width Input */}
            <div>
              <label htmlFor="calc-width" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Ширина ({unit})
              </label>
              <div className="mt-1.5 relative rounded-2xl shadow-sm">
                <input
                  id="calc-width"
                  type="number"
                  step={unit === "cm" ? "1" : "0.01"}
                  min="0"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder={unit === "cm" ? "150" : "1.50"}
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-base font-semibold text-neutral-900 transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400">
                  {unit}
                </span>
              </div>
            </div>

            {/* Height Input */}
            <div>
              <label htmlFor="calc-height" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Висота ({unit})
              </label>
              <div className="mt-1.5 relative rounded-2xl shadow-sm">
                <input
                  id="calc-height"
                  type="number"
                  step={unit === "cm" ? "1" : "0.01"}
                  min="0"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={unit === "cm" ? "200" : "2.00"}
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-base font-semibold text-neutral-900 transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400">
                  {unit}
                </span>
              </div>
            </div>

            {/* Grilles Count */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Кількість (шт)
              </label>
              <div className="mt-1.5 flex items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-50/50 p-1">
                <button
                  type="button"
                  onClick={() => setCount((c) => Math.max(1, c - 1))}
                  aria-label="Зменшити кількість"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-base font-bold text-neutral-700 shadow-sm transition hover:bg-neutral-100 focus:outline-none"
                >
                  −
                </button>
                <span className="text-base font-bold text-neutral-900">{count}</span>
                <button
                  type="button"
                  onClick={() => setCount((c) => c + 1)}
                  aria-label="Збільшити кількість"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-base font-bold text-neutral-700 shadow-sm transition hover:bg-neutral-100 focus:outline-none"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Result Calculation Banner */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-100 bg-gradient-to-br from-neutral-50 to-neutral-100/70 p-5 sm:p-6">
            <div className="grid items-center gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
                  <span>Загальна площа:</span>
                  <span className="font-bold text-neutral-900">
                    {totalArea > 0 ? totalArea.toFixed(2) : "0.00"} м²
                  </span>
                  {count > 1 && (
                    <span className="text-neutral-400">
                      ({singleArea.toFixed(2)} м² × {count} шт)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
                  <span>Ціна виробника:</span>
                  <span className="font-bold text-neutral-900">
                    {unitPrice.toLocaleString("uk-UA")} ₴ / м²
                  </span>
                </div>

                <p className="pt-1 text-[11px] leading-snug text-neutral-500">
                  * Точна вартість визначається після заміру з урахуванням конфігурації, типу замків та монтажу.
                </p>
              </div>

              {/* Total Price Block */}
              <div className="flex flex-col items-start rounded-xl bg-white p-4 shadow-sm sm:items-end">
                <span className="text-xs font-semibold text-neutral-500">
                  Орієнтовна вартість:
                </span>
                <span className="mt-0.5 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
                  {totalPrice > 0 ? `${totalPrice.toLocaleString("uk-UA")} ₴` : "—"}
                </span>
                <span className="text-[11px] text-neutral-400">
                  {count === 1 ? "за виріб" : `за ${count} вироби(-ів)`}
                </span>
              </div>
            </div>
          </div>

          {/* Actions & Ordering */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary sm:text-base"
            >
              <span>📞</span>
              Замовити замір: {phonePrimary}
            </a>

            <a
              href="#contacts"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-2xl border border-neutral-200 bg-white px-5 py-3.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 hover:text-neutral-900 sm:text-base"
            >
              Перейти до контактів →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
