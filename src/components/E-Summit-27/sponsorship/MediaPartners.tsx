import Reveal from "../Reveal";
import { MEDIA_PARTNERS } from "@/context/E-Summit-27/sponsorData";

export default function MediaPartners() {
  return (
    <section
      aria-labelledby="e27s-media-title"
      className="e27-section e27-section-bg px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
      style={{ containIntrinsicSize: "auto 620px" }}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="e27-label mb-4">Media Partners</p>
          <h2 id="e27s-media-title" className="e27-heading text-3xl sm:text-5xl">
            Amplified <span className="text-white">by</span>
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="mt-12 flex flex-wrap justify-center gap-5">
            {MEDIA_PARTNERS.map((p) => (
              <li key={p.name} className="w-[calc(50%-0.625rem)] sm:w-44">
                <figure className="flex flex-col items-center">
                  <div className="e27s-tile e27s-tile--fade aspect-[3/2] w-full">
                    <img src={p.src} alt={`${p.name} logo`} width={176} height={117} loading="lazy" decoding="async" />
                  </div>
                  <figcaption className="mt-3 text-center text-sm text-white/80">{p.name}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}