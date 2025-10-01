'use client';

import { useState } from 'react';
import axios from 'axios';

import Initiatives from '@/components/Initiatives';
import EventRegistrationModal from '@/components/EventRegistrationModal';

type Initiative = {
  _id: string;
  title: string;
  description: string;
  button: string;
  url: string;
};

export default function InitiativesPage() {
  const [selectedEvent, setSelectedEvent] = useState<Initiative | null>(null);

  const handleRegisterClick = (initiative: Initiative) => {
    setSelectedEvent(initiative);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleFormSubmit = async (formData: { name: string; email: string }) => {
    if (!selectedEvent) return;

    try {
      const payload = {
        ...formData,
        eventId: selectedEvent._id,
        eventName: selectedEvent.title,
      };

      await axios.post('/api/user/registerUser', payload);

      alert(`Successfully registered for ${selectedEvent.title}!`);
      handleCloseModal();

    } catch (error: any) {
      alert(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <>
      <Initiatives onRegisterClick={handleRegisterClick} />

      <EventRegistrationModal
        event={selectedEvent}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
      />
    </>
  );
}

