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
    registrationFee: 'Free ',
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
    id: 'pitch-120',
    title: 'Pitch 120',
    category: eventCategories.COMPETITION,
    description: 'Pitch 120 is a fast-paced startup pitching competition where teams present innovative solutions to real-world problems within a limited time frame.',
    icon: '🚀',
    color: 'from-blue-600 to-cyan-600',
    date: '11 Apr 2026',
    time: '09:00 AM - 09:00 PM',
    venue: 'IIT Ropar Campus',
    teamSize: { min: 2, max: 5 },
    registrationFee: 'Free',
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
    registrationFee: 'Free',
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
    id: 'mun',
    title: 'Lok Sabha MUN',
    category: eventCategories.COMPETITION,
    description: 'Lok Sabha MUN at E-Summit IIT Ropar is a boardroom-style simulation where participants debate policies related to India’s economic growth, startups, and innovation ecosystem.',
    icon: '🗣️',
    color: 'from-purple-700 to-indigo-700',
    date: '11-12 Apr 2026',
    time: '9:00 AM - 6:00 PM',
    venue: 'IIT Ropar Main Campus',
    teamSize: { min: 1, max: 1 },
    registrationFee: '₹1200 per delegate',
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
    registrationFee: 'Free',
    prizes: '₹9,000 + ₹6,500 + ₹4,500 cash',
    isRegistrationOpen: true,
    image: '/images/consulting.jpg',
    highlights: [
      'Case study analysis',
      'Strategy & consulting approach',
      'Market & business evaluation',
      'Final presentation round'
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
    isRegistrationOpen: true,
    image: '/images/ipl-auction.jpg',
    highlights: [
      'Live auction simulation',
      'Budget & team strategy',
      'Crisis management rounds',
      'Press conference + Q&A'
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
    time: ' One Full Day Event',
    venue: 'IIT Ropar Campus',
    teamSize: { min: 1, max: 1 },
    registrationFee: '₹1000 per delegate',
    prizes: '₹6,000 + ₹4,000 + ₹2,000 cash + certificates',
    isRegistrationOpen: true,
    image: '/images/ccb-mun.jpg',
    highlights: [
      'Crisis simulation',
      'Corporate strategy decisions',
      'Negotiation & adaptation',
      'Real-time problem solving'
    ]
  },
  {
  id: 'beyond-transformers-hackathon',
  title: 'Beyond Transformers Hackathon',
  category: eventCategories.COMPETITION,
  description: 'Beyond Transformers Hackathon is an AI-focused innovation challenge where participants build real-world machine learning solutions through online and offline rounds.',
  icon: '🤖',
  color: 'from-purple-600 to-violet-600',
  date: '20 Mar - 5 Apr 2026',
  time: 'Multi-stage Event',
  venue: 'Hybrid (Online + IIT Ropar)',
  teamSize: { min: 1, max: 4 },
  registrationFee: 'Free',
  prizes: '₹12,500 + ₹7,500 + ₹5,000 cash + certificates',
  isRegistrationOpen: true,
  image: '/images/beyond-transformers.jpg',
  highlights: [
    'AI & ML based solutions',
    'Online + offline rounds',
    'Prototype & demo submission',
    'Final presentation to experts'
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