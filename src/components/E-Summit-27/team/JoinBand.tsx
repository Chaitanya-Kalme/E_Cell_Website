import { ArrowRight } from "lucide-react";
import Reveal from "../Reveal";
import { CONTACT_EMAIL } from "@/context/E-Summit-27/constants";

export default function JoinBand() {
  return (
    <section
      aria-labelledby="e27t-join-title"
      className="e27-section px-4 pb-24 sm:px-6 lg:px-8"
      style={{ containIntrinsicSize: "auto 320px" }}
    >
      <Reveal>
        <div className="e27-card mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-7 py-10 text-center sm:flex-row sm:px-10 sm:text-left">
          <div>
            <h2
              id="e27t-join-title"
              className="font-[family-name:var(--e27-font-heading)] text-3xl text-white sm:text-4xl"
            >
              Want to join <span className="e27-accent">E-Cell?</span>
            </h2>
            <p className="mt-2 text-sm text-[var(--e27-muted)] sm:text-base">
              Builders, designers, storytellers and organisers are always welcome.
            </p>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Joining E-Cell IIT Ropar")}`}
            className="e27-btn e27-btn-ghost shrink-0"
          >
            Write to us <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}