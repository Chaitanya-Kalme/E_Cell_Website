/** Data for the E-Summit'27 Sponsorship page. */

/** sponsors/sponsor-01.webp … sponsor-31.webp (white-background logos in public/E-Summit-27/). */
export const PAST_SPONSOR_LOGOS: string[] = Array.from(
  { length: 31 },
  (_, i) => `sponsors/sponsor-${String(i + 1).padStart(2, "0")}.webp`,
);

export type MediaPartner = { name: string; src: string };

export const MEDIA_PARTNERS: MediaPartner[] = [
  { name: "StartupNews.fyi", src: "https://res.cloudinary.com/doxe1rjaj/image/upload/v1775583014/startupnewfyi_hesfzt.jpg" },
  { name: "Dainik Jagran", src: "https://res.cloudinary.com/doxe1rjaj/image/upload/v1775583013/dainik_jagran_dh3cwi.png" },
  { name: "Entrepreneurs of India", src: "https://res.cloudinary.com/doxe1rjaj/image/upload/v1775583013/entrepreneurs_of_india_s9bezo.jpg" },
  { name: "fest.info", src: "https://res.cloudinary.com/doxe1rjaj/image/upload/v1775583013/festsinfo_vn59rw.png" },
  { name: "Jagran Josh", src: "https://res.cloudinary.com/doxe1rjaj/image/upload/v1775583013/jagran_josh_rorjio.jpg" },
  { name: "Silicon India", src: "https://res.cloudinary.com/doxe1rjaj/image/upload/v1775583013/silicon_india_eeqhyh.png" },
  { name: "Summarise", src: "https://res.cloudinary.com/doxe1rjaj/image/upload/v1775583013/summarise_i3nb2w.jpg" },
];

export type ReachStat = { value: number; suffix: string; label: string };

/** From the brochure. value is counted up and shown with Indian grouping (en-IN). */
export const REACH_STATS: ReachStat[] = [
  { value: 50, suffix: "K+", label: "Footfall & Participants" },
  { value: 250000, suffix: "+", label: "Reach" },
  { value: 15, suffix: "+", label: "Events" },
  { value: 6, suffix: "+", label: "Zones" },
  { value: 300, suffix: "+", label: "Colleges" },
  { value: 550, suffix: "+", label: "Startups supported by IIT Ropar" },
];

// TODO: confirm with Sponsorship Head — tier names, taglines and benefits are placeholders.
// No prices or amounts on purpose.
export type SponsorTier = {
  id: string;
  name: string;
  tagline: string;
  benefits: string[];
  featured?: boolean;
};

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    id: "title",
    name: "Title Partner",
    tagline: "Your brand becomes the name on the flame.", // TODO
    featured: true,
    benefits: [
      "Brand name alongside E-Summit'27 in all communication",
      "Prime logo placement on website, banners and stage",
      "Keynote / stage presence and a premium stall",
      "Dedicated social media features and mentions",
      "Direct access to student talent and incubated startups",
    ],
  },
  {
    id: "powered-by",
    name: "Powered-By Partner",
    tagline: "Power the summit, front and centre.", // TODO
    benefits: [
      "\"Powered by\" credit on website and key creatives",
      "Logo on banners, standees and event merchandise",
      "Stage mention and stall presence",
      "Social media mentions across campaigns",
    ],
  },
  {
    id: "associate",
    name: "Associate Partner",
    tagline: "Stand beside the builders of tomorrow.", // TODO
    benefits: [
      "Logo on website and event banners",
      "Stall presence at the summit",
      "Social media mentions",
      "Access to talent and startup showcases",
    ],
  },
  {
    id: "supporting",
    name: "Supporting Partner",
    tagline: "Back the ideas taking their first breath.", // TODO
    benefits: [
      "Logo on website sponsor wall",
      "Brand mention at the event",
      "Social media acknowledgement",
      "Networking with participants and startups",
    ],
  },
];

// TODO: put the sponsorship brochure PDF link here. If empty, the download button is hidden.
export const BROCHURE_URL = "";

export type Step = { title: string; text: string };

export const HOW_IT_WORKS: Step[] = [
  { title: "Reach out", text: "Drop us an email or call a coordinator with what your brand is looking for." },
  { title: "Get the proposal", text: "We share a customised deck with packages that match your goals." },
  { title: "Activate your brand", text: "Go live across the summit: stage, stalls, campaigns and talent." },
];