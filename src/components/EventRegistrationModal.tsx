'use client';

import { useState, useEffect } from 'react';

type ModalProps = {
  event: { title: string } | null;
  onClose: () => void;
  onSubmit: (formData: { name: string, email: string }) => void;
};

export default function EventRegistrationModal({ event, onClose, onSubmit }: ModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!event) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onSubmit({ name, email });
    }
  };

  return (
   
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={onClose} // Close modal if clicking on the background
    >
      {/* The actual modal content */}
      <div
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Register for</h2>
        <h3 className="text-3xl font-bold text-center mb-6" style={{ color: "#6f72bfff" }}>
          {event.title}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6f72bfff] focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6f72bfff] focus:border-transparent outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#6fa8bfff] text-white rounded-full py-3 font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-opacity"
          >
            Submit Registration
          </button>
        </form>
      </div>
    </div>
  );
}
