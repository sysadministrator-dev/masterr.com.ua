import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { updateProduct } from "@/app/actions/products";
import { FileDropzone } from "@/components/admin/FileDropzone";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id: Number(id) } });
  if (!product) notFound();

  const updateProductWithId = updateProduct.bind(null, product.id);

  return (
    <div className="space-y-6">
      <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900">
        <ArrowLeft className="h-4 w-4" />
        До асортименту
      </Link>

      <div className="flex items-center gap-4">
        <Image src={product.primaryImage} alt={product.title} width={72} height={72} className="h-18 w-18 shrink-0 rounded-xl object-cover" unoptimized />
        <div>
          <h1 className="text-xl font-bold text-neutral-900">Редагувати картку</h1>
          <p className="text-sm text-neutral-500">{product.title}</p>
        </div>
      </div>

      <form action={updateProductWithId} className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <p className="text-xs font-medium text-neutral-500">Фонове зображення</p>
            <Image src={product.primaryImage} alt="" width={100} height={75} className="h-20 w-full rounded-lg object-cover" unoptimized />
            <FileDropzone name="primaryImageFile" label="Новий файл (необов'язково)" />
            <input
              name="primaryImageUrl"
              defaultValue={product.primaryImage}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-neutral-500">Зображення при наведенні</p>
            <Image src={product.hoverImage} alt="" width={100} height={75} className="h-20 w-full rounded-lg object-cover" unoptimized />
            <FileDropzone name="hoverImageFile" label="Новий файл (необов'язково)" />
            <input
              name="hoverImageUrl"
              defaultValue={product.hoverImage}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-neutral-500">Назва картки</label>
          <input
            name="title"
            defaultValue={product.title}
            required
            className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <div className="min-w-[140px]">
            <label className="mb-1 block text-xs font-medium text-neutral-500">Ціна, ₴/м²</label>
            <input
              name="price"
              type="number"
              defaultValue={product.price}
              required
              className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
            />
          </div>
          <div className="min-w-[140px]">
            <label className="mb-1 block text-xs font-medium text-neutral-500">Стара ціна (закреслена)</label>
            <input
              name="oldPrice"
              type="number"
              defaultValue={product.oldPrice ?? ""}
              placeholder="залиште пустим для «Від»"
              className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
            />
          </div>
          <button type="submit" className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700">
            Зберегти
          </button>
        </div>
        <p className="text-xs text-neutral-400">
          Якщо залишити «Стару ціну» пустою — картка покаже «Від {"{"}ціна{"}"}  ₴/м²» без закреслення, як для позицій зі спеціальною ціною.
        </p>
      </form>
    </div>
  );
}
