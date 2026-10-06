/**
 * Groups the department heads from TeamData.ts into display departments.
 * Matching: case-insensitive "position includes keyword"; the FIRST department
 * (in DEPARTMENTS order) that matches wins, so order matters
 * (e.g. "Competitions Management Head" must hit Competitions before Event Management).
 */
import type { Member } from "./TeamData";

export type Department = { id: string; label: string; keywords: string[] };
export type DepartmentGroup = { id: string; label: string; members: Member[] };

export const DEPARTMENTS: Department[] = [
  { id: "competitions", label: "Competitions", keywords: ["Competitions"] },
  {
    id: "events-content",
    label: "Events, Content & Literary",
    keywords: ["Event Management", "Content and Anchoring", "Literary"],
  },
  { id: "design-media", label: "Design & Media", keywords: ["Design", "Media and Coverage"] },
  { id: "publicity", label: "Publicity", keywords: ["Publicity"] },
  { id: "sponsorship", label: "Sponsorship & Outreach", keywords: ["Sponsorship", "Outreach"] },
  { id: "startup-expo", label: "Startup Expo & Investors Arena", keywords: ["Startup Expo"] },
  { id: "workshops", label: "Workshops & Hackathons", keywords: ["Workshops"] },
  { id: "talks-pronite", label: "Talks & Pronite", keywords: ["Talks", "Pronite"] },
  {
    id: "hospitality",
    label: "Hospitality, Logistics & Security",
    keywords: ["Hospitality", "Logistics", "Security"],
  },
  { id: "intern-fair", label: "Intern Fair & Creators Conclave", keywords: ["Intern Fair"] },
];

const MORE: Department = { id: "more", label: "More Heads", keywords: [] };

export function groupHeads(heads: Member[]): DepartmentGroup[] {
  const buckets = new Map<string, Member[]>();
  const all = [...DEPARTMENTS, MORE];
  for (const d of all) buckets.set(d.id, []);

  for (const m of heads) {
    const pos = m.position.toLowerCase();
    const dept = DEPARTMENTS.find((d) => d.keywords.some((k) => pos.includes(k.toLowerCase()))) ?? MORE;
    buckets.get(dept.id)!.push(m); // unmatched → "More Heads", nobody is dropped
  }

  const groups = all
    .map((d) => ({ id: d.id, label: d.label, members: buckets.get(d.id) ?? [] }))
    .filter((g) => g.members.length > 0);

  if (process.env.NODE_ENV !== "production") {
    const total = groups.reduce((n, g) => n + g.members.length, 0);
    if (total !== heads.length) {
      console.warn(`[teamGroups] grouped ${total} heads but received ${heads.length}`);
    }
  }

  return groups;
}