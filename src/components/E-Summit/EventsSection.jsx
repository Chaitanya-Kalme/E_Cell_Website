"use client";
import React, { useState } from 'react';
import EventCard from './EventCard';
import { eventsList } from '@/context/E-Summit/dataObjects';
import { Calendar, Filter, Search } from 'lucide-react';

const EventsSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Competition', 'Showcase', 'Networking', 'Career', 'Talk', 'Game', 'Simulation'];

  const filteredEvents = eventsList.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-3 px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              <Calendar className="text-cyan-400" size={24} />
              <span className="text-cyan-400 font-semibold text-lg">E-Summit 2026 Events</span>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Events</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join us for an incredible lineup of competitions, workshops, and networking opportunities
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Filter className="text-cyan-400" size={20} />
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-800/50 text-gray-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Events Count */}
        <div className="text-center mb-8">
          <p className="text-gray-400">
            Showing <span className="text-cyan-400 font-semibold">{filteredEvents.length}</span> event{filteredEvents.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No events found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Join E-Summit 2026?
            </h3>
            <p className="text-gray-300 mb-6">
              Don't miss out on this incredible opportunity to learn, network, and grow as an entrepreneur
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#events"
                className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                Register for Events
              </a>
              <a
                href="/contact"
                className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white border border-cyan-500/30 rounded-lg font-semibold transition-all"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;