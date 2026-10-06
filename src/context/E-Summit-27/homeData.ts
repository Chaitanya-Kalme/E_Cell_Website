/** Static content for the E-Summit'27 home page (from the brochure). */

export const WHAT_IS_TEXT =
  "E-Summit at IIT Ropar is the flagship event of the Entrepreneurship Cell (E-Cell), bringing together students, entrepreneurs, investors, and industry experts to promote innovation and entrepreneurial thinking. The summit includes keynote talks, workshops, competitions, and startup showcases, where experienced professionals share insights and inspire participants. Through events like startup sprint contests, pitching, and hackathons, E-Summit encourages creativity, teamwork, and real-world problem-solving, fostering a strong startup culture.";

export type Stat = { value: number; suffix: string; label: string };

/** value is counted up; Indian grouping (2,50,000) is applied at render time. */
export const STATS: Stat[] = [
  { value: 50, suffix: "K+", label: "Footfall & Participants" },
  { value: 250000, suffix: "+", label: "Reach" },
  { value: 15, suffix: "+", label: "Events" },
  { value: 6, suffix: "+", label: "Zones" },
  { value: 300, suffix: "+", label: "Colleges" },
];

export type AboutCard = {
  title: string;
  logo: string; // file name inside public/E-Summit-27/
  logoW: number;
  logoH: number;
  text: string;
};

export const ABOUT_CARDS: AboutCard[] = [
  {
    title: "IIT Ropar",
    logo: "iitr-emblem.webp",
    logoW: 96,
    logoH: 96,
    text: "The Indian Institute of Technology Ropar (IIT Ropar) is a premier technical institution in India known for excellence in education, research, and innovation. Established in 2008 and located in Rupnagar, Punjab. With a strong emphasis on interdisciplinary learning and real-world problem solving, IIT Ropar promotes research in emerging areas such as artificial intelligence, energy, healthcare technologies, agritech, defence and sustainable development. Additionally, the institute maintains strong industry linkages and international collaborations, working with global universities, research labs, and leading companies to drive innovation and knowledge exchange. The institute also nurtures a strong culture of innovation and entrepreneurship, having supported the growth of 550+ startups and building a thriving startup ecosystem that encourages students and researchers to transform ideas into impactful ventures.",
  },
  {
    title: "E-Cell IIT Ropar",
    logo: "ecell-logo.webp",
    logoW: 140,
    logoH: 96,
    text: "The Entrepreneurship Cell, Student body cell of TBIF IIT Ropar is a student-led non-profit organization dedicated to fostering an entrepreneurial mindset across the campus. Through initiatives such as competitions, workshops, speaker sessions, and interactive events, E-Cell encourages students to explore innovation and transform ideas into impactful ventures. By building a vibrant ecosystem of creators, thinkers, and problem-solvers, the organization promotes entrepreneurship as a strong and viable career path among students.",
  },
  {
    title: "TBIF IIT Ropar",
    logo: "tbif-logo.webp",
    logoW: 140,
    logoH: 96,
    text: "The Technology Business Incubator Foundation (TBIF) at IIT Ropar, established in 2016, operates under the NIDHI TBI Scheme of the Department of Science & Technology, Government of India. TBIF empowers aspiring entrepreneurs through comprehensive incubation support, including co-working spaces, seed funding, mentorship, and advanced facilities. Through strategic partnerships and regular workshops on pitching, business planning, and innovation, TBIF nurtures startups and transforms ideas into impactful ventures, contributing to India's entrepreneurial ecosystem and employment generation.",
  },
];

export type Speaker = { name: string; position: string; imageSrc: string };

/**
 * Cloudinary photos are asked for at 240px wide (auto format/quality) instead of the
 * full-size original — the cards only show them at ~112px, so this is much lighter.
 */
const cld = (path: string) =>
  `https://res.cloudinary.com/doxe1rjaj/image/upload/w_240,q_auto,f_auto/${path}`;

// imageSrc: a file inside public/E-Summit-27/ (e.g. "speakers/ashneer.webp"), a full https URL, or "" (shows initials).
export const SPEAKERS: Speaker[] = [
  {
    name: "Ashneer Grover",
    position: "Entrepreneur and former managing director of BharatPe",
    imageSrc: "speakers/ashneer.webp", // add this file to public/E-Summit-27/speakers/
  },
  {
    name: "Lt. Gen. S S Mahal",
    position: "Lieutenant General",
    imageSrc: cld("v1762323100/SS_Mahal_bq5qw5_nre3jd.jpg"),
  },
  {
    name: "Dr. Munish Jindal",
    position: "Founder and CEO of HoverRobotix",
    imageSrc: cld("v1762323099/Dr.-Munish-Jindal_zi10kq_kckex5.png"),
  },
  {
    name: "Akshay Singh",
    position: "Founder and CEO of Evigway Technologies",
    imageSrc: cld("v1762323098/akshay_singh_evigway_soozbq_mcjbn2.jpg"),
  },
  {
    name: "Saakshar Duggal",
    position: "Author and Advocate",
    imageSrc: cld("v1762323099/Saakshar_Duggal_ilelho_anucbh.jpg"),
  },
  {
    name: "Sonali Sharma",
    position: "Author and Story Teller",
    imageSrc: cld("v1762323099/sonali_sharma_story_teller_qubspc_hc0h8a.jpg"),
  },
  {
    name: "Purvi Roy",
    position: "Co-founder and CEO of Arista Vault",
    imageSrc: cld("v1762323099/purvi_roy_arista_vault_zfgmut_pejmaa.jpg"),
  },
  {
    name: "Bharulata Kamble",
    position: "CEO And Founder of Multi Speciality Hospital",
    imageSrc: cld("v1762323098/bharulata_kamble_nbvjp4_dirgc3.jpg"),
  },
];

export type HighlightedEvent = { title: string; tag: string; description: string; href: string };

// TODO: replace these placeholders with the real 2027 events (title, tag, description, href).
// href is a path relative to BASE, e.g. "/events/startup-sprint".
export const highlightedEvents: HighlightedEvent[] = [
  {
    title: "Startup Sprint",
    tag: "Flagship",
    description: "A high-intensity startup contest where teams build, validate and pitch an idea against the clock.",
    href: "/events/startup-sprint",
  },
  {
    title: "Pitch Arena",
    tag: "Pitching",
    description: "Pitch your venture to investors and industry experts for feedback, mentorship and prizes.",
    href: "/events/pitch-arena",
  },
  {
    title: "Hackathon",
    tag: "Build",
    description: "Solve real-world problems with code and design in an overnight build marathon.",
    href: "/events/hackathon",
  },
  {
    title: "Keynote Talks",
    tag: "Talks",
    description: "Founders, leaders and changemakers share the stories behind what they built.",
    href: "/events/keynotes",
  },
  {
    title: "Workshops",
    tag: "Learn",
    description: "Hands-on sessions on business planning, product, funding and growth.",
    href: "/events/workshops",
  },
  {
    title: "Startup Expo",
    tag: "Showcase",
    description: "Discover early-stage startups showcasing products to students, investors and press.",
    href: "/events/expo",
  },
];

/** sponsors/sponsor-01.webp … sponsor-31.webp */
export const SPONSOR_LOGOS: string[] = Array.from(
  { length: 31 },
  (_, i) => `sponsors/sponsor-${String(i + 1).padStart(2, "0")}.webp`,
);