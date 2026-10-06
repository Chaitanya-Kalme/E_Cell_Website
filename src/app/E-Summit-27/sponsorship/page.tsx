import type { Metadata } from "next";
import "./sponsor.css";
import SponsorHero from "@/components/E-Summit-27/sponsorship/SponsorHero";
import ReachStats from "@/components/E-Summit-27/sponsorship/ReachStats";
import PastSponsors from "@/components/E-Summit-27/sponsorship/PastSponsors";
import MediaPartners from "@/components/E-Summit-27/sponsorship/MediaPartners";
import Tiers from "@/components/E-Summit-27/sponsorship/Tiers";
import HowItWorks from "@/components/E-Summit-27/sponsorship/HowItWorks";
import BecomeSponsor from "@/components/E-Summit-27/sponsorship/BecomeSponsor";

export const metadata: Metadata = {
  title: "Sponsorship | E-Summit'27 | IIT Ropar",
  description:
    "Partner with E-Summit'27 at IIT Ropar. Reach students, founders and investors at one of India's student entrepreneurship summits.",
};

export default function SponsorshipPage() {
  return (
    <main id="top">
      <SponsorHero />
      <ReachStats />
      <PastSponsors />
      <MediaPartners />
      <Tiers />
      <HowItWorks />
      <BecomeSponsor />
    </main>
  );
}