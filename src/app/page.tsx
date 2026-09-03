import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Hero } from "@/components/Hero";
import { SpecCarousel } from "@/components/SpecCarousel";

export const revalidate = 60;

const ADVANTAGES = [
  { title: "Гарантія 3 роки", text: "На весь асортимент продукції ми пропонуємо гарантію - 3 роки." },
  { title: "Ціна - якість", text: "Дякуючи власному виробництву ми пропонуєм максимальну якість за доступними цінами." },
  { title: "Широка географія", text: "Працюєм по всіх великих містах та регіонах України." },
  { title: "Висока кваліфікація", text: "Наші співробітники мають досвід роботи більш ніж 20 років." },
];

function LatticeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 20" className={className} fill="none" aria-hidden>
      <path
        d="M1,2 L9,10 L16,2 L23,10 L31,2 M1,18 L9,10 L16,18 L23,10 L31,18"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M23 12s0-3.4-.44-5.02a2.94 2.94 0 0 0-2.07-2.08C18.88 4.46 12 4.46 12 4.46s-6.88 0-8.49.44A2.94 2.94 0 0 0 1.44 7C1 8.6 1 12 1 12s0 3.4.44 5.02a2.94 2.94 0 0 0 2.07 2.08c1.61.44 8.49.44 8.49.44s6.88 0 8.49-.44a2.94 2.94 0 0 0 2.07-2.08C23 15.4 23 12 23 12ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M13.5 21v-7.9h2.65l.4-3.08H13.5V8.1c0-.89.25-1.5 1.52-1.5h1.63V3.85A21.6 21.6 0 0 0 14.3 3.7c-2.35 0-3.96 1.43-3.96 4.07v2.27H7.68v3.08h2.66V21h3.16Z" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path
        d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2 2.5-2.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TruckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M3 7h11v8H3z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 10h4l3 3v2h-7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  );
}

function TagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path
        d="M12.6 3H5a2 2 0 0 0-2 2v7.6c0 .5.2 1 .6 1.4l8.4 8.4c.8.8 2 .8 2.8 0l6-6c.8-.8.8-2 0-2.8L12.4 3.6a2 2 0 0 0-1.4-.6Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="8" r="1.4" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" strokeLinecap="round" />
      <circle cx="17" cy="8" r="2.6" />
      <path d="M15 14.2c2.8.4 5 2.8 5 5.8" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
      <div className="hidden border-b border-border bg-card sm:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-[13px] text-muted-foreground">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <a href={`mailto:${settings.email}`} className="hover:text-primary">{settings.email}</a>
            <a href={`mailto:${settings.emailSecondary}`} className="hover:text-primary">{settings.emailSecondary}</a>
            <span>{settings.workHours}</span>
          </div>
          <div className="flex items-center gap-3">
            {settings.youtubeUrl && (
              <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-primary">
                <YoutubeIcon className="h-4 w-4" />
              </a>
            )}
            {settings.facebookUrl && (
              <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-primary">
                <FacebookIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#home" className="flex items-center gap-2.5">
            <LatticeMark className="h-4 w-8 text-primary" />
            <span className="text-lg font-extrabold leading-none tracking-tight text-text sm:text-xl">
              Майстерня решіток
            </span>
          </a>
          <nav className="hidden gap-6 text-sm font-medium text-muted-foreground lg:flex">
            <a href="#about" className="hover:text-primary">Про нас</a>
            <a href="#video" className="hover:text-primary">Відео</a>
            <a href="#gallery" className="hover:text-primary">Фото об&apos;єктів</a>
            <a href="#contacts" className="hover:text-primary">Контакти</a>
          </nav>
          <a
            href={`tel:${settings.phonePrimary.replace(/[^+\d]/g, "")}`}
            className="whitespace-nowrap rounded-full bg-primary px-3 py-2 text-[11px] font-semibold text-primary-foreground sm:px-4 sm:text-sm"
          >
            {settings.phonePrimary}
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section id="home" className="border-b border-border">
          <Hero />

          <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="flex flex-wrap gap-x-10 gap-y-2 rounded-theme border border-border bg-card px-6 py-4 text-sm text-muted-foreground">
              <span>Гарантія <span className="font-semibold text-primary">3 роки</span></span>
              <span>Досвід <span className="font-semibold text-primary">20+ років</span></span>
              <span>Виробництво до <span className="font-semibold text-primary">150 м²/тиждень</span></span>
              <span>Термін від <span className="font-semibold text-primary">3 днів</span></span>
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="border-b border-border py-12">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANTAGES.map((a) => (
              <div key={a.title} className="rounded-theme border border-border bg-card p-6">
                <span className="mb-4 block h-2 w-8 rounded-full bg-primary" aria-hidden />
                <h3 className="mb-2 text-lg font-bold text-text">{a.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{a.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Description & prices */}
        <section id="about" className="border-b border-border py-16">
          <div className="mx-auto max-w-6xl px-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Специфікація</p>
            <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-text">Опис та ціни</h2>

            <SpecCarousel
              cards={[
                {
                  icon: <ShieldIcon className="h-5 w-5" />,
                  title: "Чому саме розсувні решітки?",
                  body: (
                    <>
                      <p>
                        На поточний момент <strong className="text-text">розсувні решітки</strong> – це один з
                        найнадійніших видів захисту нерухомої власності від проникнення зловмисників.
                      </p>
                      <p>
                        <strong className="text-text">Головна перевага</strong> даного виду решіток – це створення
                        другого контуру захисту, відразу за вікном, дверима, роллетою. Робота другого контуру
                        захисту відмінно доповнюється сигналізацією, через збільшення часу проникнення непроханих
                        гостей на охороняємий об&apos;єкт. За цей час встигає приїхати оперативна група.
                      </p>
                      <p>
                        <strong className="text-text">Друга перевага</strong> розсувних решіток – це поєднання
                        міцності конструкції, легкості зсування-розсування з естетичним видом. У неробочому стані
                        прибирається з&apos;ємний поріг решітки, сама решітка складається та повертається
                        всередину, не займаючи проходу або просвіту.
                      </p>
                    </>
                  ),
                },
                {
                  icon: <WrenchIcon className="h-5 w-5" />,
                  title: "Небагато технічних подробиць",
                  body: (
                    <>
                      <p>Весь процес виготовлення виробів відбувається тільки на власному вітчизняному виробництві!</p>
                      <ul className="rivet-list space-y-1.5">
                        <li>Смуга 25×4мм та 20×4мм, кріплення — стальні заклепки, виключно вручну</li>
                        <li>Замикання — навісні або врізні замки, за бажанням замовника</li>
                        <li>Фарбування — полімерно-порошкове, будь-який колір по каталогу RAL</li>
                        <li>Монтаж без руйнування відкосів, прибирання будівельним пилососом</li>
                      </ul>
                    </>
                  ),
                },
                {
                  icon: <TruckIcon className="h-5 w-5" />,
                  title: "Термін виготовлення і доставка",
                  body: (
                    <>
                      <p>
                        Власне виробництво і полімерно-фарбувальна лінія дозволяють виготовляти до 150м²
                        розсувних решіток в тиждень. Стандартний термін виготовлення – від{" "}
                        <strong className="text-text">3 робочих днів</strong>, по попередній згоді можливе
                        термінове виготовлення <strong className="text-text">за 1 день</strong>.
                      </p>
                      <p>
                        Готові вироби упаковуються в стретч-плівку або в посилене пакування та доставляються до
                        місця монтажу власним транспортом. В віддалені райони відправка продукції здійснюється
                        компаніями-перевізниками.
                      </p>
                      <p>
                        В більшості міст України маємо наші регіональні представництва, які в найкоротший термін
                        зможуть зробити точні обміри, провести консультацію та зробити якісний монтаж.
                      </p>
                    </>
                  ),
                },
                {
                  icon: <TagIcon className="h-5 w-5" />,
                  title: "Яка ціна?",
                  body: (
                    <>
                      <p className="text-3xl font-extrabold text-primary sm:text-4xl">
                        {settings.pricePerM2.toLocaleString("uk-UA")}{" "}
                        <span className="text-lg font-medium text-muted-foreground">грн/м²</span>
                      </p>
                      <p>
                        Без урахування вартості відправки та монтажу. На вироби особливо малих та надвеликих
                        розмірів ціна формується з додатковими націнками. Оплата — готівковий або безготівковий
                        розрахунок з ПДВ.
                      </p>
                    </>
                  ),
                },
                {
                  icon: <UsersIcon className="h-5 w-5" />,
                  title: "Хто з нами процює?",
                  body: (
                    <>
                      <p>Нашими постійними партнерами є такі компанії як:</p>
                      <ul className="rivet-list space-y-1.5">
                        {PARTNERS.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </>
                  ),
                },
                {
                  icon: <MailIcon className="h-5 w-5" />,
                  title: "Щодо співпраці",
                  body: (
                    <p>
                      Ми завжди відкриті для співпраці з виробничими, будівельними та монтажними організаціями по
                      всій Україні. Вся додаткова інформація щодо співпраці або дилерства доступна за нашими
                      контактними телефонами.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </section>

        {/* Video */}
        {videos.length > 0 && (
          <section id="video" className="border-b border-border py-16">
            <div className="mx-auto max-w-6xl px-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Процес</p>
              <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-text">
                Відео об&apos;єктів
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {videos.map((video) => {
                  const content = (
                    <>
                      <div className="relative aspect-video overflow-hidden rounded-theme bg-card">
                        <Image src={video.thumbnailUrl} alt={video.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" unoptimized />
                        {video.videoUrl && (
                          <span className="absolute inset-0 flex items-center justify-center bg-text/10">
                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">▶</span>
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{video.title}</p>
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
            </div>
          </section>
        )}

        {/* Photo gallery */}
        <section id="gallery" className="border-b border-border py-16">
          <div className="mx-auto max-w-6xl px-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Портфоліо</p>
            <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-text">
              Фото об&apos;єктів
            </h2>
            <PhotoGallery photos={photos} />
          </div>
        </section>

        {/* Contacts */}
        <section id="contacts" className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Контакти</p>
            <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-text">
              Зв&apos;язок з нами
            </h2>
            <div className="grid gap-6 border-t border-border pt-6 sm:grid-cols-3">
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Телефон</h3>
                <p className="text-text">{settings.phonePrimary}</p>
                <p className="text-text">{settings.phoneSecondary}</p>
              </div>
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Часи роботи</h3>
                <p className="text-text">{settings.workHours}</p>
              </div>
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">E-mail</h3>
                <a href={`mailto:${settings.email}`} className="block text-text hover:text-primary">
                  {settings.email}
                </a>
                <a href={`mailto:${settings.emailSecondary}`} className="block text-text hover:text-primary">
                  {settings.emailSecondary}
                </a>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              {settings.youtubeUrl && (
                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-accent hover:text-primary"
                >
                  <YoutubeIcon className="h-4 w-4" />
                </a>
              )}
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-accent hover:text-primary"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col items-center gap-2 border-t border-border bg-card py-6 text-xs text-muted-foreground">
        <LatticeMark className="h-3 w-6 text-primary" />
        <span>© {new Date().getFullYear()} Майстерня решіток · Компанія-виробник</span>
      </footer>
    </>
  );
}
