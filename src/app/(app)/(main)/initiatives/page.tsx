'use client';

import { useState } from 'react';

import Initiatives from '@/components/Initiatives';
import EventRegistrationModal from '@/components/EventRegistrationModal';

type Initiative = {
  _id?: string;
  id?: string;
  title?: string;
  eventName?: string;
  description?: string;
  button?: string;
  url?: string;
  minSize?: number;
  maxSize?: number;
};

export default function InitiativesPage() {
  const [selectedEvent, setSelectedEvent] = useState<Initiative | null>(null);

  const handleRegisterClick = (initiative: Initiative) => {
    setSelectedEvent(initiative);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleFormSubmit = async (formData: any) => {
    if (!selectedEvent) return;

    try {
      const response = await fetch('/api/participant/createParticipant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      alert(`Successfully registered for ${selectedEvent.title}!`);
      handleCloseModal();

    } catch (error: any) {
      alert(error.message || 'Registration failed. Please try again.');
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