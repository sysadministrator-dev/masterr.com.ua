"use client";

import { useEffect } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  phonePrimary: string;
  phoneSecondary?: string;
  email?: string;
  emailSecondary?: string;
  workHours?: string;
}

export default function ContactModal({
  isOpen,
  onClose,
  phonePrimary,
  phoneSecondary,
  email,
  emailSecondary,
  workHours,
}: ContactModalProps) {
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

  const toTel = (phone: string) => phone.replace(/[^+\d]/g, "");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
    >
      <div
        className="fixed inset-0 bg-neutral-950/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/10 transition-all">
        <div className="flex items-start justify-between border-b border-neutral-100 bg-neutral-50/60 px-6 py-5">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Контакти
            </span>
            <h2 id="contact-modal-title" className="mt-2 text-xl font-bold tracking-tight text-neutral-900">
              Зв&apos;яжіться з нами
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Закрити"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 px-6 py-6">
          <a
            href={`tel:${toTel(phonePrimary)}`}
            className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-base font-bold text-neutral-900 transition hover:border-primary hover:bg-primary/5"
          >
            <span>📞</span>
            {phonePrimary}
          </a>

          {phoneSecondary && (
            <a
              href={`tel:${toTel(phoneSecondary)}`}
              className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-base font-semibold text-neutral-700 transition hover:border-primary hover:bg-primary/5"
            >
              <span>📞</span>
              {phoneSecondary}
            </a>
          )}

          {(email || emailSecondary) && (
            <div className="space-y-1.5 pt-1">
              {email && (
                <a href={`mailto:${email}`} className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-primary">
                  <span>✉️</span>
                  {email}
                </a>
              )}
              {emailSecondary && (
                <a href={`mailto:${emailSecondary}`} className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-primary">
                  <span>✉️</span>
                  {emailSecondary}
                </a>
              )}
            </div>
          )}

          {workHours && (
            <p className="flex items-center gap-2 pt-1 text-sm text-neutral-500">
              <span>🕒</span>
              {workHours}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
