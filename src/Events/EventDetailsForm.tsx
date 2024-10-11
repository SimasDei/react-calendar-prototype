import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Event } from '../utils/factories';

interface EventDetailsFormProps {
  event: Event;
  onSave: (updatedEvent: Event) => void;
}

const EventDetailsForm: React.FC<EventDetailsFormProps> = ({ event }) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.extendedProps.description || '');
  const [startDate, setStartDate] = useState(event.start);
  const [endDate, setEndDate] = useState(event.end);

  useEffect(() => {
    setTitle(event.title);
    setDescription(event.extendedProps.description || '');
    setStartDate(event.start);
    setEndDate(event.end);
  }, [event]);

  return (
    <>
      <TextField margin="dense" label="Event Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextField
        margin="dense"
        label="Event Description"
        fullWidth
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        margin="dense"
        label="Start Date"
        fullWidth
        type="datetime-local"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <TextField
        margin="dense"
        label="End Date"
        fullWidth
        type="datetime-local"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
    </>
  );
};

export default EventDetailsForm;
