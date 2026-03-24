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
title: 'IPL Auction House',
category: eventCategories.COMPETITION,
description: 'IPL Auction House is a strategy-based simulation where participants act as franchise owners, building teams through live bidding while managing budget, risks, and real-time challenges.',
icon: '🏏',
color: 'from-purple-600 to-pink-600',
date: '11-12 Apr 2026',
time: 'Full Day Event',
venue: 'IIT Ropar Main Campus',
teamSize: { min: 1, max: 4 },
registrationFee: '₹1600 per team',
prizes: '₹8,000 + ₹4,000 cash + trophies & goodies',
isRegistrationOpen: false,
image: '/images/ipl-auction.jpg',
highlights: [
  'Live auction simulation',
  'Budget & team strategy',
  'Crisis management rounds',
  'Press conference + Q&A'
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
title: 'GTM Strategy War',
category: eventCategories.COMPETITION,
description: 'GTM Strategy War is the flagship product and strategy competition of E-Summit IIT Ropar where participants design and present go-to-market strategies for real-world business scenarios.',
icon: '🎯',
color: 'from-teal-600 to-cyan-600',
date: '11 Apr 2026',
time: '09:00 AM - 09:00 PM',
venue: 'IIT Ropar Campus',
teamSize: { min: 1, max: 5 },
registrationFee: 'Free / As per registration portal',
prizes: '₹7,500 + ₹5,000 + ₹2,500 cash + goodies',
isRegistrationOpen: true,
image: '/images/gtm-war.jpg',
highlights: [
  'Market analysis & strategy',
  'Pricing & distribution planning',
  'Go-to-market execution',
  'Presentation + Q&A round'
]
  },
  {
   id: 'startup-sprint',
title: 'Startup Sprint',
category: eventCategories.COMPETITION,
description: 'Startup Sprint is the flagship competition of E-Summit IIT Ropar where participants present innovative startup ideas and compete based on originality, feasibility, and business viability.',
icon: '⚡',
color: 'from-yellow-600 to-orange-600',
date: '12 Apr 2026',
time: '09:00 AM - 09:00 PM',
venue: 'IIT Ropar Campus',
teamSize: { min: 1, max: 3 },
registrationFee: 'Free / As per registration portal',
prizes: '₹7,500 + ₹5,000 + ₹2,500 cash + goodies',
isRegistrationOpen: true,
image: '/images/startup-sprint.jpg',
highlights: [
  'Startup idea pitching',
  'Problem & solution validation',
  'Business model planning',
  'Presentation + Q&A round'
]
  },
  {
   id: 'mun',
title: 'Lok Sabha MUN',
category: eventCategories.COMPETITION,
description: 'Lok Sabha MUN at E-Summit IIT Ropar is a boardroom-style simulation where participants debate policies related to India’s economic growth, startups, and innovation ecosystem.',
icon: '🗣️',
color: 'from-purple-700 to-indigo-700',
date: 'E-Summit 2026',
time: '9:00 AM - 6:00 PM',
venue: 'IIT Ropar Main Campus',
teamSize: { min: 1, max: 1 },
registrationFee: '₹300 per delegate',
prizes: '₹8,000 + ₹5,000 + ₹3,000 cash + certificates',
isRegistrationOpen: true,
image: '/images/mun.jpg',
highlights: [
  'Policy debate & discussion',
  'Startup & economic focus',
  'Negotiation & drafting',
  'Leadership & communication'
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
    {
  id: 'pitch-120',
  title: 'Pitch 120',
  category: eventCategories.COMPETITION,
  description: 'Pitch 120 is a fast-paced startup pitching competition where teams present innovative solutions to real-world problems within a limited time frame.',
  icon: '🚀',
  color: 'from-blue-600 to-cyan-600',
  date: '11 Apr 2026',
  time: '09:00 AM - 09:00 PM',
  venue: 'IIT Ropar Campus',
  teamSize: { min: 1, max: 5 },
  registrationFee: 'Free / As per registration portal',
  prizes: '₹7,500 + ₹5,000 + ₹2,500 cash + goodies',
  isRegistrationOpen: true,
  image: '/images/pitch-120.jpg',
  highlights: [
    'Rapid idea pitching',
    'Problem-solution focus',
    'Time-bound challenge',
    'Presentation + Q&A round'
  ]
},
   {
  id: 'consulting-case-competition',
  title: 'Consulting Case Competition',
  category: eventCategories.COMPETITION,
  description: 'Consulting Case Competition challenges participants to solve real-world business problems through structured analysis, strategy building, and professional presentations.',
  icon: '📊',
  color: 'from-green-600 to-emerald-600',
  date: '27 Mar - 12 Apr 2026',
  time: 'Multiple Rounds',
  venue: 'Hybrid (Online + IIT Ropar)',
  teamSize: { min: 2, max: 3 },
  registrationFee: 'Free / As per registration portal',
  prizes: '₹9,000 + ₹6,500 + ₹4,500 cash',
  isRegistrationOpen: false,
  image: '/images/consulting.jpg',
  highlights: [
    'Case study analysis',
    'Strategy & consulting approach',
    'Market & business evaluation',
    'Final presentation round'
  ]
},
   {
  id: 'ccb-mun',
  title: 'Corporations Crisis Board (MUN)',
  category: eventCategories.COMPETITION,
  description: 'Corporations Crisis Board is a dynamic MUN simulation where participants represent corporations and respond to real-time global crises through strategy and negotiation.',
  icon: '🏛️',
  color: 'from-rose-600 to-pink-600',
  date: 'E-Summit 2026',
  time: 'Full Day Event',
  venue: 'IIT Ropar Campus',
  teamSize: { min: 1, max: 1 },
  registrationFee: '₹300 per delegate',
  prizes: '₹6,000 + ₹4,000 + ₹2,000 cash + certificates',
  isRegistrationOpen: true,
  image: '/images/ccb-mun.jpg',
  highlights: [
    'Crisis simulation',
    'Corporate strategy decisions',
    'Negotiation & adaptation',
    'Real-time problem solving'
  ]
}

];

// Startup Expo Data
export const startupExpoData = [
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