'use client';

import { useState, useEffect } from 'react';

type TeamMember = {
  id: string;
  name: string;
  email: string;
  mobileNo: string;
};

type ModalProps = {
  event: {
    _id?: string;
    id?: string;
    title?: string;
    eventName?: string;
    minSize?: number;
    maxSize?: number;
  } | null;
  onClose: () => void;
  onSubmit: (formData: any) => void;
};

export default function EventRegistrationModal({ event, onClose, onSubmit }: ModalProps) {
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: '1', name: '', email: '', mobileNo: '' }
  ]);

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

  const minSize = event.minSize || 1;
  const maxSize = event.maxSize || 10;
  const eventId = event._id || event.id || '';
  const eventTitle = event.title || event.eventName || '';

  const addMember = () => {
    if (teamMembers.length < maxSize) {
      setTeamMembers([...teamMembers, {
        id: Date.now().toString(),
        name: '',
        email: '',
        mobileNo: ''
      }]);
    }
  };

  const removeMember = (id: string) => {
    if (teamMembers.length > minSize) {
      setTeamMembers(teamMembers.filter(m => m.id !== id));
    }
  };

  const updateMember = (id: string, field: string, value: string) => {
    setTeamMembers(teamMembers.map(m =>
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!teamName.trim()) {
      alert('Please enter team name');
      return;
    }

    for (const member of teamMembers) {
      if (!member.name || !member.email || !member.mobileNo) {
        alert('Please fill all member details');
        return;
      }
    }

    const formData = new FormData()
    formData.append("teamName", teamName)
    formData.append("eventId", eventId)
    teamMembers.forEach((member: TeamMember) => {
      const userData = {
        userName: member.name,
        email: member.email,
        mobileNo: member.mobileNo
      }

      formData.append("userData", JSON.stringify(userData))
    })

    onSubmit(formData);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
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
          {eventTitle}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-1">
              Team Name
            </label>
            <input
              id="teamName"
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              placeholder="Enter team name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6f72bfff] focus:border-transparent outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-gray-700">
                Team Members ({teamMembers.length})
              </label>
              <button
                type="button"
                onClick={addMember}
                className="text-sm bg-[#6f72bfff] text-white px-3 py-1 rounded-full hover:opacity-90"
              >
                + Add Member
              </button>
            </div>

            {teamMembers.map((member, index) => (
              <div key={member.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Member {index + 1}</span>
                  {teamMembers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMember(member.id)}
                      className="text-red-500 text-sm hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => updateMember(member.id, 'name', e.target.value)}
                    required
                    placeholder="Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6f72bfff] outline-none text-sm"
                  />
                  <input
                    type="email"
                    value={member.email}
                    onChange={(e) => updateMember(member.id, 'email', e.target.value)}
                    required
                    placeholder="Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6f72bfff] outline-none text-sm"
                  />
                  <input
                    type="tel"
                    value={member.mobileNo}
                    onChange={(e) => updateMember(member.id, 'mobileNo', e.target.value)}
                    required
                    placeholder="Mobile Number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6f72bfff] outline-none text-sm"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-[#6fa8bfff] text-white rounded-full py-3 font-bold text-lg shadow-lg hover:opacity-90 transition-opacity"
          >
            Submit Registration
          </button>
        </form>
      </div>
    </div>
  );
}