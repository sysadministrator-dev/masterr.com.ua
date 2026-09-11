import { Sidebar } from "@/components/admin/Sidebar";

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
