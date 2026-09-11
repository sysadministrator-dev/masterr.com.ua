"use client";

import Image from "next/image";
import { useState } from "react";
import ContactModal from "@/components/ContactModal";
import { PRODUCTS } from "@/components/productsData";

interface ProductsSectionProps {
  pricePerM2: number;
  phonePrimary?: string;
  phoneSecondary?: string;
  email?: string;
  emailSecondary?: string;
  workHours?: string;
}

export function ProductsSection({
  pricePerM2,
  phonePrimary,
  phoneSecondary,
  email,
  emailSecondary,
  workHours,
}: ProductsSectionProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const oldPrice = pricePerM2 + 400;

  return (
    <section className="border-b border-border bg-background px-4 py-16">
      <div className="mx-auto w-full max-w-6xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Асортимент</p>
        <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
          Розсувні Решітки будь-яких розмірів
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="flex flex-col overflow-hidden rounded-theme border border-border bg-card"
            >
              <div className="group relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <Image
                  src={product.primaryImage}
                  alt={product.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <Image
                  src={product.hoverImage}
                  alt={product.title}
                  fill
                  unoptimized
                  className="object-cover opacity-0 transition-opacity duration-1000 ease-in-out group-hover:opacity-100"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-sm font-bold leading-snug text-text">{product.title}</h3>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-lg font-extrabold text-primary">
                    {pricePerM2.toLocaleString("uk-UA")} ₴
                  </span>
                  <span className="text-xs text-muted-foreground line-through">
                    {oldPrice.toLocaleString("uk-UA")} ₴
                  </span>
                  <span className="text-[11px] text-muted-foreground">/ м²</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsContactOpen(true)}
                  className="mt-3 w-full cursor-pointer rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Замовити
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        phonePrimary={phonePrimary || "+38 (067) 63-050-63"}
        phoneSecondary={phoneSecondary}
        email={email}
        emailSecondary={emailSecondary}
        workHours={workHours}
      />
    </section>
  );
}
