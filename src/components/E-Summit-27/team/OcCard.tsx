import { Mail } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import TeamPhoto from "./TeamPhoto";
import type { Member } from "@/context/E-Summit-27/TeamData";

/** Featured card for the overall coordinators: tall portrait, static glow ring, CSS hover tilt. */
export default function OcCard({ member }: { member: Member }) {
  return (
    <article className="e27-tilt-card">
      <div className="e27t-oc-ring">
        <div className="e27t-oc-inner relative">
          <TeamPhoto src={member.image} name={member.name} width={600} eager />

          {/* purple-to-black gradient at the bottom for legible text */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050008] via-[#2a0757]/45 via-35% to-transparent to-65%"
            aria-hidden="true"
          />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
            <span className="inline-block rounded-full border border-[rgba(245,212,254,0.4)] bg-[#050008]/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--e27-lavender)]">
              {member.position}
            </span>
            <h3 className="mt-3 font-[family-name:var(--e27-font-heading)] text-3xl text-white sm:text-4xl">
              {member.name}
            </h3>
            <div className="mt-5 flex gap-3">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="e27t-icon-btn !h-11 !w-11"
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <FaLinkedinIn size={17} aria-hidden="true" />
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="e27t-icon-btn !h-11 !w-11"
                  aria-label={`Email ${member.name}`}
                >
                  <Mail size={18} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}