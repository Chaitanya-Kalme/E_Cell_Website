"use client";
import React, { useState } from 'react';
import { X, Rocket, Users, Award, FileText, Link as LinkIcon } from 'lucide-react';

const StartupExpoForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    // Startup Information
    startupName: '',
    industry: '',
    foundedYear: '',
    teamSize: '',
    location: '',
    
    // Founder Information
    founderName: '',
    founderEmail: '',
    founderPhone: '',
    founderLinkedIn: '',
    
    // Startup Details
    website: '',
    description: '',
    stage: '',
    fundingStatus: '',
    achievements: '',
    
    // Pitch Information
    pitchDeckLink: '',
    videoLink: '',
    
    // Co-founders
    coFounders: [{ name: '', email: '', role: '' }],
    
    // Additional
    lookingFor: [],
    specialRequests: '',
  });

  const [errors, setErrors] = useState({});

  const stageOptions = [
    'Idea Stage',
    'Prototype',
    'MVP',
    'Early Traction',
    'Growth Stage',
    'Scaling'
  ];

  const fundingOptions = [
    'Bootstrapped',
    'Pre-Seed',
    'Seed',
    'Series A',
    'Series B+',
    'Not Seeking Funding'
  ];

  const lookingForOptions = [
    'Funding',
    'Mentorship',
    'Co-founders',
    'Team Members',
    'Customers',
    'Partnerships',
    'Market Validation'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (option) => {
    setFormData(prev => ({
      ...prev,
      lookingFor: prev.lookingFor.includes(option)
        ? prev.lookingFor.filter(item => item !== option)
        : [...prev.lookingFor, option]
    }));
  };

  const handleCoFounderChange = (index, field, value) => {
    const newCoFounders = [...formData.coFounders];
    newCoFounders[index][field] = value;
    setFormData(prev => ({
      ...prev,
      coFounders: newCoFounders
    }));
  };

  const addCoFounder = () => {
    if (formData.coFounders.length < 5) {
      setFormData(prev => ({
        ...prev,
        coFounders: [...prev.coFounders, { name: '', email: '', role: '' }]
      }));
    }
  };

  const removeCoFounder = (index) => {
    if (formData.coFounders.length > 1) {
      const newCoFounders = formData.coFounders.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        coFounders: newCoFounders
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.startupName.trim()) newErrors.startupName = 'Startup name is required';
    if (!formData.industry.trim()) newErrors.industry = 'Industry is required';
    if (!formData.foundedYear) newErrors.foundedYear = 'Founded year is required';
    if (!formData.founderName.trim()) newErrors.founderName = 'Founder name is required';
    if (!formData.founderEmail.trim()) newErrors.founderEmail = 'Founder email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.founderEmail)) newErrors.founderEmail = 'Email is invalid';
    if (!formData.founderPhone.trim()) newErrors.founderPhone = 'Phone number is required';
    if (!formData.description.trim()) newErrors.description = 'Startup description is required';
    if (!formData.stage) newErrors.stage = 'Current stage is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    console.log('Startup Expo Registration:', formData);
    alert('Registration successful! We will contact you soon.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto p-2 sm:p-4">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl sm:rounded-2xl w-full max-w-5xl my-4 sm:my-8 border border-orange-500/20 shadow-2xl shadow-orange-500/10">
        {/* Fixed Header - Mobile Optimized */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-orange-600 to-red-600 p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/80 hover:text-white transition-colors p-1"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
          <div className="flex items-center gap-2 sm:gap-3 mb-2 pr-8">
            <Rocket size={24} className="text-white sm:w-8 sm:h-8" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Startup Expo Registration</h2>
          </div>
          <p className="text-orange-100 text-xs sm:text-sm">Showcase your innovation at E-Summit 2026</p>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto">
          {/* Startup Information */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-orange-400 flex items-center gap-2">
              <Rocket size={18} className="sm:w-5 sm:h-5" />
              Startup Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Startup Name *
                </label>
                <input
                  type="text"
                  name="startupName"
                  value={formData.startupName}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800/50 border ${
                    errors.startupName ? 'border-red-500' : 'border-orange-500/30'
                  } rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-orange-500 transition-colors`}
                  placeholder="Enter your startup name"
                />
                {errors.startupName && <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.startupName}</p>}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Industry/Sector *
                </label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800/50 border ${
                    errors.industry ? 'border-red-500' : 'border-orange-500/30'
                  } rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-orange-500 transition-colors`}
                  placeholder="e.g., FinTech, HealthTech"
                />
                {errors.industry && <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.industry}</p>}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Founded Year *
                </label>
                <input
                  type="number"
                  name="foundedYear"
                  min="2000"
                  max="2026"
                  value={formData.foundedYear}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800/50 border ${
                    errors.foundedYear ? 'border-red-500' : 'border-orange-500/30'
                  } rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-orange-500 transition-colors`}
                  placeholder="2024"
                />
                {errors.foundedYear && <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.foundedYear}</p>}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Team Size
                </label>
                <input
                  type="text"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800/50 border border-orange-500/30 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="e.g., 5-10"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800/50 border border-orange-500/30 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800/50 border border-orange-500/30 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="https://yourstartup.com"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Current Stage *
                </label>
                <select
                  name="stage"
                  value={formData.stage}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800/50 border ${
                    errors.stage ? 'border-red-500' : 'border-orange-500/30'
                  } rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-orange-500 transition-colors`}
                >
                  <option value="">Select Stage</option>
                  {stageOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.stage && <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.stage}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Startup Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800/50 border ${
                    errors.description ? 'border-red-500' : 'border-orange-500/30'
                  } rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-orange-500 transition-colors resize-none`}
                  placeholder="Describe what your startup does..."
                />
                {errors.description && <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.description}</p>}
              </div>
            </div>
          </div>

          {/* Founder Information */}
          <div className="space-y-3 sm:space-y-4 border-t border-orange-500/20 pt-4 sm:pt-6">
            <h3 className="text-lg sm:text-xl font-semibold text-orange-400 flex items-center gap-2">
              <Users size={18} className="sm:w-5 sm:h-5" />
              Primary Founder Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="founderName"
                  value={formData.founderName}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800/50 border ${
                    errors.founderName ? 'border-red-500' : 'border-orange-500/30'
                  } rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-orange-500 transition-colors`}
                  placeholder="Founder's name"
                />
                {errors.founderName && <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.founderName}</p>}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="founderEmail"
                  value={formData.founderEmail}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800/50 border ${
                    errors.founderEmail ? 'border-red-500' : 'border-orange-500/30'
                  } rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-orange-500 transition-colors`}
                  placeholder="founder@startup.com"
                />
                {errors.founderEmail && <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.founderEmail}</p>}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="founderPhone"
                  value={formData.founderPhone}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800/50 border ${
                    errors.founderPhone ? 'border-red-500' : 'border-orange-500/30'
                  } rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-orange-500 transition-colors`}
                  placeholder="+91 XXXXX XXXXX"
                />
                {errors.founderPhone && <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.founderPhone}</p>}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  name="founderLinkedIn"
                  value={formData.founderLinkedIn}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800/50 border border-orange-500/30 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
            </div>

            {/* Co-founders */}
            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-medium text-gray-300">Co-founders (Optional)</label>
                <button
                  type="button"
                  onClick={addCoFounder}
                  disabled={formData.coFounders.length >= 5}
                  className="text-orange-400 hover:text-orange-300 text-xs sm:text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  + Add Co-founder
                </button>
              </div>

              {formData.coFounders.map((coFounder, index) => (
                <div key={index} className="bg-slate-800/30 p-3 sm:p-4 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-medium text-gray-400">Co-founder {index + 1}</span>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeCoFounder(index)}
                        className="text-red-400 hover:text-red-300 text-xs sm:text-sm transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <input
                      type="text"
                      value={coFounder.name}
                      onChange={(e) => handleCoFounderChange(index, 'name', e.target.value)}
                      className="px-3 py-2 bg-slate-800/50 border border-orange-500/30 rounded-lg text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                      placeholder="Name"
                    />
                    <input
                      type="email"
                      value={coFounder.email}
                      onChange={(e) => handleCoFounderChange(index, 'email', e.target.value)}
                      className="px-3 py-2 bg-slate-800/50 border border-orange-500/30 rounded-lg text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                      placeholder="Email"
                    />
                    <input
                      type="text"
                      value={coFounder.role}
                      onChange={(e) => handleCoFounderChange(index, 'role', e.target.value)}
                      className="px-3 py-2 bg-slate-800/50 border border-orange-500/30 rounded-lg text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                      placeholder="Role (e.g., CTO)"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Funding & Achievement */}
          <div className="space-y-3 sm:space-y-4 border-t border-orange-500/20 pt-4 sm:pt-6">
            <h3 className="text-lg sm:text-xl font-semibold text-orange-400 flex items-center gap-2">
              <Award size={18} className="sm:w-5 sm:h-5" />
              Funding & Achievements
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Funding Status
                </label>
                <select
                  name="fundingStatus"
                  value={formData.fundingStatus}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800/50 border border-orange-500/30 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-orange-500 transition-colors"
                >
                  <option value="">Select Funding Status</option>
                  {fundingOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Achievements & Awards
                </label>
                <textarea
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800/50 border border-orange-500/30 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  placeholder="List any awards or achievements..."
                />
              </div>
            </div>
          </div>

          {/* Pitch Materials */}
          <div className="space-y-3 sm:space-y-4 border-t border-orange-500/20 pt-4 sm:pt-6">
            <h3 className="text-lg sm:text-xl font-semibold text-orange-400 flex items-center gap-2">
              <LinkIcon size={18} className="sm:w-5 sm:h-5" />
              Pitch Materials
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Pitch Deck Link
                </label>
                <input
                  type="url"
                  name="pitchDeckLink"
                  value={formData.pitchDeckLink}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800/50 border border-orange-500/30 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="Google Drive/Dropbox link"
                />
                <p className="text-xs text-gray-400 mt-1">Share a public link (PDF)</p>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Pitch Video Link
                </label>
                <input
                  type="url"
                  name="videoLink"
                  value={formData.videoLink}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800/50 border border-orange-500/30 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="YouTube/Vimeo link"
                />
                <p className="text-xs text-gray-400 mt-1">Optional: 2-3 min video</p>
              </div>
            </div>
          </div>

          {/* What You're Looking For */}
          <div className="space-y-3 sm:space-y-4 border-t border-orange-500/20 pt-4 sm:pt-6">
            <h3 className="text-lg sm:text-xl font-semibold text-orange-400 flex items-center gap-2">
              <FileText size={18} className="sm:w-5 sm:h-5" />
              What are you looking for at E-Summit?
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
              {lookingForOptions.map(option => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.lookingFor.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                    className="w-4 h-4 rounded border-orange-500/30 bg-slate-800/50 text-orange-600 focus:ring-orange-500 focus:ring-offset-0"
                  />
                  <span className="text-xs sm:text-sm text-gray-300">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-3 sm:space-y-4 border-t border-orange-500/20 pt-4 sm:pt-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                Special Requests or Requirements
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800/50 border border-orange-500/30 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                placeholder="Any special requirements..."
              />
            </div>
          </div>

          {/* Submit Buttons - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sticky bottom-0 bg-slate-900 py-3 sm:py-4 -mx-4 sm:-mx-6 px-4 sm:px-6 border-t border-orange-500/20">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 sm:px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Rocket size={18} className="sm:w-5 sm:h-5" />
              Register Startup
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 pb-2">
            * Required fields | All information will be kept confidential
          </p>
        </form>
      </div>
    </div>
  );
};

export default StartupExpoForm;