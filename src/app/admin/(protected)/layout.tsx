import Link from "next/link";
import { logout } from "@/app/actions/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-100">
      <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
        <nav className="flex gap-4 text-sm font-medium text-neutral-700">
          <Link href="/admin/photos" className="hover:text-neutral-900">Фото</Link>
          <Link href="/admin/videos" className="hover:text-neutral-900">Відео</Link>
          <Link href="/admin/settings" className="hover:text-neutral-900">Налаштування</Link>
          <Link href="/" className="hover:text-neutral-900" target="_blank">Сайт →</Link>
        </nav>
        <form action={logout}>
          <button type="submit" className="text-sm text-neutral-500 hover:text-neutral-900">
            Вийти
          </button>
        </form>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-8">{children}</main>
    </div>
  );
}
