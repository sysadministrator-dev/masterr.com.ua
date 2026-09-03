import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { PhotoGallery } from "@/components/PhotoGallery";

const ADVANTAGES = [
  { title: "Гарантія на всі вироби", text: "На весь асортимент продукції ми пропонуємо гарантію - 3 роки." },
  { title: "Ціна - якість", text: "Дякуючи власному виробництву ми пропонуєм максимальну якість за доступними цінами." },
  { title: "Широка географія", text: "Працюєм по всіх великих містах та регіонах України." },
  { title: "Висока кваліфікація", text: "Наші співробітники мають досвід роботи більш ніж 20 років." },
];

const HERO_IMAGES = ["/images/pom3_625.jpg", "/images/pom4_625.jpg", "/images/pom2_625.jpg", "/images/pom1_625.jpg"];

const PARTNERS = [
  "мережа салонів зв'язку «Київстар»",
  "мережа магазинів «Вина Світу»",
  "мережі салонів зв'язку «Vodafone», «Алло»",
  "мережа магазинів «Єва»",
  "мережа магазинів «Простор»",
  "мережа магазинів «Ельдорадо»",
  "мережа магазинів «Комфі», «Брейн» та багато інших",
];

export default async function Home() {
  const [photos, videos, settings] = await Promise.all([
    prisma.photo.findMany({ orderBy: { order: "asc" } }),
    prisma.video.findMany({ orderBy: { order: "asc" } }),
    prisma.siteSettings.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } }),
  ]);

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <span className="text-xl font-bold tracking-tight text-neutral-900">МР</span>
          <nav className="hidden gap-6 text-sm text-neutral-600 sm:flex">
            <a href="#about" className="hover:text-neutral-900">Про нас</a>
            <a href="#video" className="hover:text-neutral-900">Відео</a>
            <a href="#gallery" className="hover:text-neutral-900">Фото об&apos;єктів</a>
            <a href="#contacts" className="hover:text-neutral-900">Контакти</a>
          </nav>
          <a href={`tel:${settings.phonePrimary.replace(/[^+\d]/g, "")}`} className="text-sm font-semibold text-neutral-900">
            {settings.phonePrimary}
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero / advantages */}
        <section id="home" className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {HERO_IMAGES.map((src) => (
              <div key={src} className="aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100">
                <Image src={src} alt="Розсувні решітки" width={400} height={300} className="h-full w-full object-cover" unoptimized />
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANTAGES.map((a) => (
              <div key={a.title} className="rounded-lg border border-neutral-200 p-5">
                <h3 className="mb-2 font-semibold text-neutral-900">{a.title}</h3>
                <p className="text-sm text-neutral-600">{a.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Description & prices */}
        <section id="about" className="bg-neutral-50 py-14">
          <div className="mx-auto max-w-3xl px-4 text-neutral-700">
            <h2 className="mb-6 text-2xl font-bold text-neutral-900">Опис та ціни</h2>
            <div className="space-y-4 leading-relaxed">
              <p>
                На поточний момент <strong>розсувні решітки</strong> – це один з найнадійніших видів захисту
                нерухомої власності від проникнення зловмисників.
              </p>
              <p>
                <strong>Головна перевага</strong> даного виду решіток – це створення другого контуру захисту,
                відразу за вікном, дверима, роллетою. Робота другого контуру захисту відмінно доповнюється
                сигналізацією, через збільшення часу проникнення непроханих гостей на охороняємий об&apos;єкт.
                За цей час встигає приїхати оперативна група.
              </p>
              <p>
                <strong>Друга перевага</strong> розсувних решіток – це поєднання міцності конструкції, легкості
                зсування-розсування з естетичним видом. У неробочому стані прибирається з&apos;ємний поріг решітки,
                сама решітка складається та повертається всередину, не займаючи проходу або просвіту.
              </p>
              <p>Весь процес виготовлення виробів відбувається тільки на власному вітчизняному виробництві!</p>
              <p>
                Решітки виробляються з стальної смуги 25х4мм та 20х4мм. Смуги кріпляться між собою стальними
                заклепками виключно вручну. Ваша майбутня розсувна решітка – це повністю ручна робота!
              </p>
              <p>Замикання решітки відбувається навісними або врізними замками (за бажанням замовника).</p>
              <p>Фарбування решіток - полімерно-порошкове в будь-які кольори по каталогу порошкових фарб RAL.</p>
              <p>
                Монтаж здійснюється нашими спеціалістами, в процесі робіт віконні або дверні відкоси не
                руйнуються. Після закінчення робіт місце монтажу ретельно прибирається з використанням
                будівельного пилососу.
              </p>
              <p>Ми працюєм на ринку України з 2004 року.</p>
              <p>
                Власне виробництво і полімерно-фарбувальна лінія дозволяють виготовляти до 150м² розсувних
                решіток в тиждень.
              </p>
              <p>
                Стандартний термін виготовлення виробів – від <strong>3 робочих днів</strong>, по попередній
                згоді можливе термінове виготовлення <strong>за 1 день</strong>.
              </p>
              <p>
                В більшості міст України маємо наші регіональні представництва, які в найкоротший термін
                зможуть зробити точні обміри, провести консультацію та зробити якісний монтаж.
              </p>
              <p>
                Готові вироби упаковуються в стретч-плівку або в посилене пакування та доставляються до місця
                монтажу власним транспортом. В віддалені райони відправка продукції здійснюється
                компаніями-перевізниками.
              </p>

              <p className="rounded-lg bg-white p-5 text-lg font-semibold text-neutral-900 shadow-sm">
                Вартість розсувних решіток на теперішній момент – {settings.pricePerM2.toLocaleString("uk-UA")} грн/м²
                без урахування вартості відправки та монтажу.
              </p>
              <p className="text-sm text-neutral-500">
                На вироби особливо малих та надвеликих розмірів ціна формується з додатковими націнками.
              </p>
              <p>Можливі форми оплати: готівковий або безготівковий розрахунок з ПДВ.</p>

              <h3 className="pt-4 font-semibold text-neutral-900">Нашими постійними партнерами є такі компанії як:</h3>
              <ul className="list-disc space-y-1 pl-5">
                {PARTNERS.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>

              <p>
                Ми завжди відкриті для співпраці з виробничими, будівельними та монтажними організаціями по
                всій Україні.
              </p>
              <p>Вся додаткова інформація щодо співпраці або дилерства доступна за нашими контактними телефонами.</p>
            </div>
          </div>
        </section>

        {/* Video */}
        {videos.length > 0 && (
          <section id="video" className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="mb-8 text-2xl font-bold text-neutral-900">Відео об&apos;єктів</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {videos.map((video) => {
                const content = (
                  <>
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-neutral-200">
                      <Image src={video.thumbnailUrl} alt={video.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" unoptimized />
                      {video.videoUrl && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-neutral-900">▶</span>
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm font-medium text-neutral-700">{video.title}</p>
                  </>
                );

                return video.videoUrl ? (
                  <a key={video.id} href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="group block">
                    {content}
                  </a>
                ) : (
                  <div key={video.id} className="group block">
                    {content}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Photo gallery */}
        <section id="gallery" className="bg-neutral-50 py-14">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-8 text-2xl font-bold text-neutral-900">Фото об&apos;єктів</h2>
            <PhotoGallery photos={photos} />
          </div>
        </section>

        {/* Contacts */}
        <section id="contacts" className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="mb-8 text-2xl font-bold text-neutral-900">Зв&apos;язок з нами</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <h3 className="mb-1 text-sm font-semibold text-neutral-500">Телефон</h3>
              <p className="text-neutral-900">{settings.phonePrimary}</p>
              <p className="text-neutral-900">{settings.phoneSecondary}</p>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-semibold text-neutral-500">Часи роботи</h3>
              <p className="text-neutral-900">{settings.workHours}</p>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-semibold text-neutral-500">E-mail</h3>
              <a href={`mailto:${settings.email}`} className="text-neutral-900 hover:underline">
                {settings.email}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200 py-6 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} МР. Розсувні решітки на вікна та двері.
      </footer>
    </>
  );
}
