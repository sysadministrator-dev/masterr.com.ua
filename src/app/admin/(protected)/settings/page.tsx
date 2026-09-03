import { prisma } from "@/lib/prisma";
import { updateSettings } from "@/app/actions/settings";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-neutral-900">Налаштування сайту</h1>

      <form action={updateSettings} className="space-y-4 rounded-lg border border-neutral-200 bg-white p-6">
        <div>
          <label className="block text-sm text-neutral-600">Ціна за м² (грн)</label>
          <input name="pricePerM2" type="number" defaultValue={settings.pricePerM2} className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-neutral-600">Телефон 1</label>
          <input name="phonePrimary" defaultValue={settings.phonePrimary} className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-neutral-600">Телефон 2</label>
          <input name="phoneSecondary" defaultValue={settings.phoneSecondary} className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-neutral-600">Часи роботи</label>
          <input name="workHours" defaultValue={settings.workHours} className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-neutral-600">E-mail (основний)</label>
          <input name="email" type="email" defaultValue={settings.email} className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-neutral-600">E-mail (додатковий)</label>
          <input name="emailSecondary" type="email" defaultValue={settings.emailSecondary} className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-neutral-600">YouTube-канал</label>
          <input name="youtubeUrl" defaultValue={settings.youtubeUrl} className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-neutral-600">Facebook-сторінка</label>
          <input name="facebookUrl" defaultValue={settings.facebookUrl} className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm" />
        </div>
        <button type="submit" className="rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700">
          Зберегти
        </button>
      </form>
    </div>
  );
}
