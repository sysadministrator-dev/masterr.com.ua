import Link from "next/link";
import { Image as ImageIcon, Video, Banknote } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [photoCount, videoCount, settings] = await Promise.all([
    prisma.photo.count(),
    prisma.video.count(),
    prisma.siteSettings.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } }),
  ]);

  const cards = [
    {
      icon: ImageIcon,
      title: "Фото",
      value: `${photoCount}`,
      description: "Фотографій у портфоліо на сайті.",
      href: "/admin/photos",
    },
    {
      icon: Video,
      title: "Відео",
      value: `${videoCount}`,
      description: "Відео в розділі «Відео об'єктів».",
      href: "/admin/videos",
    },
    {
      icon: Banknote,
      title: "Ціна за м²",
      value: `${settings.pricePerM2.toLocaleString("uk-UA")} ₴`,
      description: "Поточна ціна, показана на сайті.",
      href: "/admin/settings",
    },
  ];

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
      <h1 className="text-2xl font-bold text-neutral-900">Вітаємо в адмін-панелі</h1>
      <p className="mt-3 max-w-2xl text-neutral-600">
        Тут можна змінювати фото, відео та налаштування сайту — ціну, телефони, посилання на соцмережі.
        Зміни на сайті з&apos;являються одразу після збереження.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map(({ icon: Icon, title, value, description, href }) => (
          <Link
            key={title}
            href={href}
            className="rounded-xl border border-neutral-200 bg-neutral-50 p-5 transition-colors hover:border-neutral-300 hover:bg-neutral-100"
          >
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              <Icon className="h-5 w-5" />
            </span>
            <p className="text-lg font-bold text-neutral-900">{title}</p>
            <p className="mt-1 text-2xl font-extrabold text-neutral-900">{value}</p>
            <p className="mt-2 text-sm text-neutral-500">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
