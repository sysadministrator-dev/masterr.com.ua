import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Hero } from "@/components/Hero";
import { ProductsSection } from "@/components/ProductsSection";
import { VideoSection } from "@/components/VideoSection";
import { SpecCarousel } from "@/components/SpecCarousel";

export const revalidate = 60;

const ADVANTAGES = [
  { title: "Гарантія до 3 років", text: "На весь асортимент продукції ми пропонуємо гарантію - 3 роки." },
  { title: "Ціна - якість", text: "Дякуючи власному виробництву ми пропонуєм максимальну якість за доступними цінами." },
  { title: "Широка географія", text: "Працюєм по всіх великих містах та регіонах України." },
  { title: "Висока кваліфікація", text: "Наші співробітники мають досвід роботи більш ніж 20 років." },
];

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
      <div className="hidden border-b border-white/10 bg-neutral-950 sm:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-[13px] text-white/50">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <a href={`mailto:${settings.email}`} className="hover:text-white">{settings.email}</a>
            {settings.emailSecondary && (
              <a href={`mailto:${settings.emailSecondary}`} className="hover:text-white">{settings.emailSecondary}</a>
            )}
            <span>м. Дніпро, пр. Слобожанський 20</span>
            <span>{settings.workHours}</span>
          </div>
          <div className="flex items-center gap-3">
            {settings.youtubeUrl && (
              <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:opacity-80">
                <Image src="/icons/youtube.svg" alt="" width={16} height={16} className="h-4 w-4" />
              </a>
            )}
            {settings.facebookUrl && (
              <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-80">
                <Image src="/icons/facebook.png" alt="" width={16} height={16} className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="flex items-center gap-2">
              <span className="text-lg font-extrabold uppercase tracking-tight text-white sm:text-xl">
                ФОП Борцов Розсувні Решітки
              </span>
              <span className="hidden flex-col text-[10px] font-medium italic leading-[1.15] text-white/45 sm:flex">
                <span>надійний</span>
                <span>захист</span>
              </span>
            </span>
          </a>
          <nav className="hidden gap-8 text-[15px] font-semibold text-white/85 lg:flex">
            <a href="#about" className="transition-colors hover:text-white">Про нас</a>
            <a href="#video" className="transition-colors hover:text-white">Відео</a>
            <a href="#gallery" className="transition-colors hover:text-white">Фото об&apos;єктів</a>
            <a href="#contacts" className="transition-colors hover:text-white">Контакти</a>
          </nav>
          <a
            href={`tel:${settings.phonePrimary.replace(/[^+\d]/g, "")}`}
            className="whitespace-nowrap rounded-full border border-white/30 px-3 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-white hover:text-neutral-950 sm:px-4 sm:text-sm"
          >
            {settings.phonePrimary}
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section id="home">
          <Hero
            pricePerM2={settings.pricePerM2}
            slides={photos}
            phonePrimary={settings.phonePrimary}
            phoneSecondary={settings.phoneSecondary}
            email={settings.email}
            emailSecondary={settings.emailSecondary}
            workHours={settings.workHours}
          />

          <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="flex flex-wrap gap-x-10 gap-y-2 rounded-theme border border-border bg-card px-6 py-4 text-sm text-muted-foreground">
              <span>Гарантія до <span className="font-semibold text-primary">3 років</span></span>
              <span>Досвід <span className="font-semibold text-primary">20+ років</span></span>
              <span>Виробництво до <span className="font-semibold text-primary">150 м²/тиждень</span></span>
              <span>Термін виготовлення від <span className="font-semibold text-primary">3 днів</span></span>
            </div>
          </div>
        </section>

        {/* Products */}
        <ProductsSection
          pricePerM2={settings.pricePerM2}
          phonePrimary={settings.phonePrimary}
          phoneSecondary={settings.phoneSecondary}
          email={settings.email}
          emailSecondary={settings.emailSecondary}
          workHours={settings.workHours}
        />

        {/* Video */}
        <VideoSection videos={videos} />

        {/* Advantages */}
        <section className="py-12">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANTAGES.map((a) => (
              <div key={a.title} className="rounded-theme border border-border bg-neutral-300 p-6">
                <span className="mb-4 block h-2 w-8 rounded-full bg-primary" aria-hidden />
                <h3 className="mb-2 text-xl font-extrabold text-text">{a.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{a.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Description & prices */}
        <section id="about" className="py-16">
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
                        <li>Лутка - кут металевий 35×35мм</li>
                        <li>Замикання — навісні або врізні замки, за бажанням замовника</li>
                        <li>Фарбування — полімерно-порошкове, будь-який колір за каталогом RAL</li>
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
                        Ціна за розсувні решітки не менш ніж 1,5м² в стандартному кольорі (білий, чорний,
                        коричневий) без урахування відправки та монтажу. Додаткові кронштейни, анкерні пластини та
                        стійки рахуються окремо. На вироби особливо малих та надвеликих розмірів ціна формується з
                        додатковими націнками. Будь-яка форма оплати: ФОП 2 група, ФОП 3 група, ТОВ з ПДВ.
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

        {/* Photo gallery */}
        <section id="gallery" className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Портфоліо</p>
            <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-text">
              Фото об&apos;єктів
            </h2>
            <PhotoGallery photos={photos} />
          </div>
        </section>

        {/* Contacts */}
        <section id="contacts" className="bg-neutral-950 pt-16 pb-10">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Контакти</p>
            <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-white">
              Зв&apos;язок з нами
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/50">Телефон</h3>
                <p className="text-white">{settings.phonePrimary}</p>
                <p className="text-white">{settings.phoneSecondary}</p>
              </div>
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/50">Часи роботи</h3>
                <p className="text-white">{settings.workHours}</p>
                <p className="text-white">м. Дніпро, пр. Слобожанський 20</p>
              </div>
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/50">E-mail</h3>
                <a href={`mailto:${settings.email}`} className="block text-white hover:text-primary">
                  {settings.email}
                </a>
                <a href={`mailto:${settings.emailSecondary}`} className="block text-white hover:text-primary">
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
                  className="flex h-7 w-7 items-center justify-center transition-opacity hover:opacity-80"
                >
                  <Image src="/icons/youtube.svg" alt="" width={28} height={28} className="h-7 w-7" />
                </a>
              )}
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-7 w-7 items-center justify-center transition-opacity hover:opacity-80"
                >
                  <Image src="/icons/facebook.png" alt="" width={28} height={28} className="h-7 w-7" />
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col items-center gap-2 border-t border-white/10 bg-neutral-950 py-4 text-xs text-white/50">
        <span>© {new Date().getFullYear()} ФОП БОРЦОВ РОЗСУВНІ РЕШІТКИ · HandyVPS</span>
      </footer>
    </>
  );
}
