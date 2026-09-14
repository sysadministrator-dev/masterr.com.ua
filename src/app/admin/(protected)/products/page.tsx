import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Асортимент</h1>
        <span className="text-sm text-neutral-500">{products.length} карток</span>
      </div>
      <p className="text-sm text-neutral-500">
        Картки з розділу «Розсувні Решітки будь-яких розмірів» на сайті. Тут можна редагувати фото, назву та ціну кожної картки.
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/admin/products/${product.id}`}
            className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-3 transition-colors hover:border-neutral-900"
          >
            <Image
              src={product.primaryImage}
              alt={product.title}
              width={56}
              height={56}
              className="h-14 w-14 shrink-0 rounded-lg object-cover"
              unoptimized
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-neutral-900">{product.title}</p>
              <p className="text-xs text-neutral-500">
                {product.price.toLocaleString("uk-UA")} ₴{product.oldPrice ? "" : " (від)"} / м²
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
