'use client';

import { useState } from 'react';

import Initiatives from '@/components/Initiatives';
import EventRegistrationModal from '@/components/EventRegistrationModal';
import axios from 'axios';
import { toast } from 'sonner';

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

  const handleFormSubmit = async (formData: FormData) => {
    if (!selectedEvent) return;

    try {
      await axios.post('/api/participant/createParticipant',formData)
      .then((response) =>{
        toast.success("Participation Created Successfully")
      })
      .catch((error) =>{
        toast.error(error.response.data.message)
      })
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