// src/context/E-Summit/dataObjects.js
// COMPLETE FILE - Copy this ENTIRE content into your dataObjects.js

// Event Categories
export const eventCategories = {
  COMPETITION: 'Competition',
  EXHIBITION: 'Exhibition',
  NETWORKING: 'Networking',
  WORKSHOP: 'Workshop',
  TALK: 'Talk Session',
  FAIR: 'Fair'
};

// ⭐ IMPORTANT: This export is what your page.tsx needs!
export const allEvents = [
  {
    id: 'startup-expo',
    title: 'Startup Expo',
    category: eventCategories.EXHIBITION,
    description: 'The Startup Expo offers an opportunity for startups to showcase their products and services. The event offers an opportunity to have interactions with the university students, mentors, and investors.',
    icon: '🚀',
    color: 'from-orange-600 to-red-600',
    date: '14-16 Feb 2026',
    time: 'All Day',
    venue: 'Main Exhibition Hall',
    teamSize: { min: 1, max: 5 },
    registrationFee: '₹500 per startup',
    prizes: 'Cash prizes + Incubation opportunities',
    isRegistrationOpen: false,
    image: '/images/startup-expo.jpg',
    highlights: [
      'Showcase your product',
      'Network with investors',
      'Meet potential customers',
      'Media coverage'
    ]
  },
  {
    id: 'ipl-auction',
    title: 'IPL Auction (Startup Edition)',
    category: eventCategories.COMPETITION,
    description: 'The Startup IPL offers students participating in an IPL auction to bid on startups or innovative ideas. They do so while taking into account valuation, scalability, and innovation.',
    icon: '🏏',
    color: 'from-purple-600 to-pink-600',
    date: '15 Feb 2026',
    time: '2:00 PM - 6:00 PM',
    venue: 'Auditorium',
    teamSize: { min: 2, max: 4 },
    registrationFee: '₹200 per team',
    prizes: '₹50,000 worth of prizes',
    isRegistrationOpen: false,
    image: '/images/ipl-auction.jpg',
    highlights: [
      'Real-time bidding experience',
      'Valuation assessment',
      'Strategic decision making',
      'Winner takes all'
    ]
  },
  {
    id: 'job-fair',
    title: 'Job & Internship Fair',
    category: eventCategories.FAIR,
    description: 'The Job and Internship Fair provides opportunities for students in startups and other companies willing to offer career opportunities to students.',
    icon: '💼',
    color: 'from-blue-600 to-cyan-600',
    date: '16 Feb 2026',
    time: '10:00 AM - 5:00 PM',
    venue: 'Convention Center',
    teamSize: { min: 1, max: 1 },
    registrationFee: 'Free',
    prizes: 'Job Opportunities + Internships',
    isRegistrationOpen: true,
    image: '/images/job-fair.jpg',
    highlights: [
      'Direct interaction with recruiters',
      'On-spot interviews',
      'Internship opportunities',
      'Resume building sessions'
    ]
  },
  {
    id: 'investors-arena',
    title: 'Investors Arena',
    category: eventCategories.NETWORKING,
    description: 'Investors Arena provides the opportunity to present your idea to seasoned investors and industry experts.',
    icon: '💰',
    color: 'from-green-600 to-emerald-600',
    date: '15 Feb 2026',
    time: '11:00 AM - 4:00 PM',
    venue: 'Seminar Hall',
    teamSize: { min: 1, max: 3 },
    registrationFee: '₹300 per team',
    prizes: 'Investment opportunities + Mentorship',
    isRegistrationOpen: true,
    image: '/images/investors-arena.jpg',
    highlights: [
      'Pitch to real investors',
      'Get funding opportunities',
      'Expert feedback',
      'Networking with VCs'
    ]
  },
  {
    id: 'equity-research',
    title: 'Equity Research Challenge',
    category: eventCategories.COMPETITION,
    description: 'This challenge tests participants analytical ability regarding companies and financial markets.',
    icon: '📊',
    color: 'from-indigo-600 to-blue-600',
    date: '14 Feb 2026',
    time: '1:00 PM - 5:00 PM',
    venue: 'Finance Lab',
    teamSize: { min: 2, max: 3 },
    registrationFee: '₹250 per team',
    prizes: '₹30,000 worth of prizes',
    isRegistrationOpen: true,
    image: '/images/equity-research.jpg',
    highlights: [
      'Real company analysis',
      'Financial modeling',
      'Valuation techniques',
      'Industry research'
    ]
  },
  {
    id: 'live-monopoly',
    title: 'Live Monopoly',
    category: eventCategories.COMPETITION,
    description: 'Live Monopoly transforms a classic board game into real life. The participants make financial decisions, negotiate trades, manage resources.',
    icon: '🎲',
    color: 'from-red-600 to-orange-600',
    date: '16 Feb 2026',
    time: '3:00 PM - 7:00 PM',
    venue: 'Open Ground',
    teamSize: { min: 4, max: 6 },
    registrationFee: '₹400 per team',
    prizes: '₹40,000 worth of prizes',
    isRegistrationOpen: true,
    image: '/images/live-monopoly.jpg',
    highlights: [
      'Real-life monopoly experience',
      'Strategic resource management',
      'Negotiation skills',
      'Team coordination'
    ]
  },
  {
    id: 'policyforge',
    title: 'PolicyForge - "From Campus to Cabinet"',
    category: eventCategories.COMPETITION,
    description: 'PolicyForge dares participants to create realistic policies for realistic governance challenges.',
    icon: '⚖️',
    color: 'from-slate-600 to-gray-700',
    date: '15 Feb 2026',
    time: '9:00 AM - 1:00 PM',
    venue: 'Conference Hall',
    teamSize: { min: 2, max: 4 },
    registrationFee: '₹200 per team',
    prizes: '₹25,000 worth of prizes',
    isRegistrationOpen: true,
    image: '/images/policyforge.jpg',
    highlights: [
      'Policy creation challenge',
      'Governance simulation',
      'Critical thinking',
      'Social impact'
    ]
  },
  {
    id: 'gtm-war',
    title: 'GTM War (Go-To-Market Strategy Challenge)',
    category: eventCategories.COMPETITION,
    description: 'GTM War strives to develop strategies to ensure the successful market entry of the products.',
    icon: '🎯',
    color: 'from-teal-600 to-cyan-600',
    date: '14 Feb 2026',
    time: '2:00 PM - 6:00 PM',
    venue: 'Marketing Lab',
    teamSize: { min: 2, max: 4 },
    registrationFee: '₹250 per team',
    prizes: '₹35,000 worth of prizes',
    isRegistrationOpen: true,
    image: '/images/gtm-war.jpg',
    highlights: [
      'Market entry strategy',
      'Customer analysis',
      'Competitive positioning',
      'Go-to-market planning'
    ]
  },
  {
    id: 'leaders-talk',
    title: "Leader's Talk",
    category: eventCategories.TALK,
    description: "Leaders' Talk is a program where accomplished leaders interact with the participants by sharing their experiences.",
    icon: '🎤',
    color: 'from-amber-600 to-yellow-600',
    date: '15 Feb 2026',
    time: '5:00 PM - 7:00 PM',
    venue: 'Main Auditorium',
    teamSize: { min: 1, max: 1 },
    registrationFee: 'Free',
    prizes: 'Certificates + Networking',
    isRegistrationOpen: true,
    image: '/images/leaders-talk.jpg',
    highlights: [
      'Industry leader insights',
      'Q&A sessions',
      'Networking opportunity',
      'Career guidance'
    ]
  },
  {
    id: 'startup-sprint',
    title: 'Startup Sprint - 60',
    category: eventCategories.COMPETITION,
    description: 'Startup Sprint is an accelerated competition based on the concept wherein the entire team needs to come up with and present a startup idea within 60 minutes.',
    icon: '⚡',
    color: 'from-yellow-600 to-orange-600',
    date: '16 Feb 2026',
    time: '11:00 AM - 2:00 PM',
    venue: 'Innovation Hub',
    teamSize: { min: 2, max: 4 },
    registrationFee: '₹200 per team',
    prizes: '₹20,000 worth of prizes',
    isRegistrationOpen: true,
    image: '/images/startup-sprint.jpg',
    highlights: [
      '60-minute challenge',
      'Rapid ideation',
      'Quick pitch preparation',
      'Fast decision making'
    ]
  },
  {
    id: 'mun',
    title: 'MUN (Theme - Board Room)',
    category: eventCategories.COMPETITION,
    description: "In this MUN, the scenario is a boardroom recreation instead of the typical diplomatic activity.",
    icon: '🗣️',
    color: 'from-purple-700 to-indigo-700',
    date: '14-15 Feb 2026',
    time: '9:00 AM - 6:00 PM',
    venue: 'MUN Hall',
    teamSize: { min: 1, max: 1 },
    registrationFee: '₹300 per delegate',
    prizes: '₹30,000 worth of prizes + Certificates',
    isRegistrationOpen: true,
    image: '/images/mun.jpg',
    highlights: [
      'Corporate boardroom simulation',
      'Debate and negotiation',
      'Leadership skills',
      'International exposure'
    ]
  },
  {
    id: 'creators-conclave',
    title: 'Creators Conclave',
    category: eventCategories.NETWORKING,
    description: "Creators' Conclave is an exclusive gathering of creators and experts from diverse fields like teachers, artists, scientists, and more coming together to share their work and ideas.",
    icon: '🎨',
    color: 'from-pink-600 to-rose-600',
    date: '16 Feb 2026',
    time: '4:00 PM - 8:00 PM',
    venue: 'Creative Space',
    teamSize: { min: 1, max: 1 },
    registrationFee: 'Free',
    prizes: 'Networking + Collaboration opportunities',
    isRegistrationOpen: true,
    image: '/images/creators-conclave.jpg',
    highlights: [
      'Cross-domain networking',
      'Creative collaborations',
      'Portfolio showcase',
      'Industry connections'
    ]
  }
];

// Startup Expo Data
export const startupExpoData = [
  {
    startupName: "EcoTech Solutions",
    startupImage: "/images/startups/ecotech.jpg",
    industry: "Renewable Energy",
    foundedYear: "2023",
    teamSize: "8-10",
    location: "Bangalore, India",
    description: "We're revolutionizing solar energy storage with innovative battery technology.",
    website: "https://ecotech-solutions.com",
    achievements: [
      "Winner of Green Innovation Award 2025",
      "Featured in TechCrunch",
      "₹2 Cr seed funding raised"
    ],
    contact: "contact@ecotech-solutions.com",
  },
  {
    startupName: "HealthAI Pro",
    startupImage: "/images/startups/healthai.jpg",
    industry: "HealthTech",
    foundedYear: "2024",
    teamSize: "5-8",
    location: "Mumbai, India",
    description: "AI-powered diagnostic platform that helps doctors make faster diagnoses.",
    website: "https://healthaipro.com",
    achievements: [
      "Partnered with 50+ hospitals",
      "FDA approval in progress"
    ],
    contact: "info@healthaipro.com",
  }
];

// Form field configurations for different event types
export const eventFormTypes = {
  'startup-expo': 'startupExpo',
  'ipl-auction': 'team',
  'job-fair': 'individual',
  'investors-arena': 'pitch',
  'equity-research': 'team',
  'live-monopoly': 'team',
  'policyforge': 'team',
  'gtm-war': 'team',
  'leaders-talk': 'individual',
  'startup-sprint': 'team',
  'mun': 'individual',
  'creators-conclave': 'individual',
};

// Form fields for different registration types
export const eventFormFields = {
  individual: [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
    { name: 'college', label: 'College/University', type: 'text', required: true },
    { name: 'year', label: 'Year of Study', type: 'select', required: true, options: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgraduate'] },
    { name: 'branch', label: 'Branch/Department', type: 'text', required: true },
  ],
  team: [
    { name: 'teamName', label: 'Team Name', type: 'text', required: true },
    { name: 'leaderName', label: 'Team Leader Name', type: 'text', required: true },
    { name: 'leaderEmail', label: 'Team Leader Email', type: 'email', required: true },
    { name: 'leaderPhone', label: 'Team Leader Phone', type: 'tel', required: true },
    { name: 'college', label: 'College/University', type: 'text', required: true },
    { name: 'teamSize', label: 'Number of Team Members', type: 'number', required: true, min: 2, max: 6 },
  ],
  pitch: [
    { name: 'teamName', label: 'Team/Startup Name', type: 'text', required: true },
    { name: 'pitchTitle', label: 'Pitch Title', type: 'text', required: true },
    { name: 'leaderName', label: 'Team Leader Name', type: 'text', required: true },
    { name: 'leaderEmail', label: 'Email', type: 'email', required: true },
    { name: 'leaderPhone', label: 'Phone', type: 'tel', required: true },
    { name: 'industry', label: 'Industry/Sector', type: 'text', required: true },
    { name: 'pitchDescription', label: 'Brief Description', type: 'textarea', required: true, maxLength: 1000 },
  ],
  startupExpo: [
    { name: 'startupName', label: 'Startup Name', type: 'text', required: true },
    { name: 'founderName', label: 'Founder Name', type: 'text', required: true },
    { name: 'founderEmail', label: 'Email', type: 'email', required: true },
    { name: 'founderPhone', label: 'Phone', type: 'tel', required: true },
    { name: 'industry', label: 'Industry', type: 'text', required: true },
    { name: 'description', label: 'Startup Description', type: 'textarea', required: true, maxLength: 1000 },
  ]
};