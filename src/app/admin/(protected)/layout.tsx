import { Sidebar } from "@/components/admin/Sidebar";

// Admin pages must always reflect the live DB — never serve a stale cached snapshot.
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Sidebar />
      <main className="px-4 py-6 sm:px-8 sm:py-8 lg:pl-72">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
