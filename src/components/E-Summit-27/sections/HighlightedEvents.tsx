import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";
import { highlightedEvents } from "@/context/E-Summit-27/homeData";
import { BASE } from "@/context/E-Summit-27/constants";

export default function HighlightedEvents() {
  return (
    <section
      id="events"
      aria-labelledby="e27-events-title"
      className="e27-section e27-section-bg px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      style={{ containIntrinsicSize: "auto 1100px" }}
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="e27-label mb-4">What awaits you</p>
            <h2 id="e27-events-title" className="e27-heading text-4xl sm:text-6xl">
              Highlighted <span className="text-white">events</span>
            </h2>
          </div>
          <Link href={`${BASE}/events`} className="e27-btn e27-btn-ghost">
            View all events <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {highlightedEvents.map((ev, i) => (
            <li key={ev.title}>
              <Reveal delay={(i % 3) * 0.07} className="h-full">
                <Link
                  href={`${BASE}${ev.href}`}
                  className="e27-card e27-tilt-card group flex h-full flex-col p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-[var(--e27-line)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--e27-magenta)]">
                      {ev.tag}
                    </span>
                    <span className="font-[family-name:var(--e27-font-heading)] text-sm text-white/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-8 font-[family-name:var(--e27-font-heading)] text-2xl text-white">{ev.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-[var(--e27-muted)]">{ev.description}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--e27-lavender)]">
                    Learn more
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}