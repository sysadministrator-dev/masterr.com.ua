import Image from "next/image";
import { VIDEOS } from "@/components/videosData";

export function VideoSection() {
  return (
    <section id="video" className="border-b border-border py-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Процес</p>
        <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-text">Відео об&apos;єктів</h2>

        <div className="flex max-h-[75vh] snap-y snap-mandatory flex-col gap-4 overflow-y-auto pb-1 sm:grid sm:max-h-none sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 lg:grid-cols-3">
          {VIDEOS.map((video) => {
            const content = (
              <>
                <div className="relative w-full flex-1 overflow-hidden rounded-theme bg-card sm:aspect-video sm:flex-none">
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-text/10">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg text-primary-foreground">
                      ▶
                    </span>
                  </span>
                </div>
                <p className="mt-2 shrink-0 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {video.title}
                </p>
              </>
            );

            const cardClassName =
              "group flex h-[70vh] shrink-0 flex-col snap-start sm:block sm:h-auto sm:shrink";

            return video.videoUrl ? (
              <a
                key={video.id}
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClassName}
              >
                {content}
              </a>
            ) : (
              <div key={video.id} className={cardClassName}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
