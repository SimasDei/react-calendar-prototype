import { EventChangeArg } from '@fullcalendar/core';
import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Calendar from './Calendar';
import { events as generatedEvents, resources as generatedResources } from './resources';

const App: React.FC = () => {
  const [events, setEvents] = useState(generatedEvents);
  const [resources, setResources] = useState(generatedResources);

  useEffect(() => {
    setResources(generatedResources);
    setEvents(generatedEvents);
  }, []);

  const handleEventChange = (changeInfo: EventChangeArg) => {
    const updatedEvent = changeInfo.event;
    const updatedEvents = events.map((event) =>
      event.id === updatedEvent.id
        ? {
            ...event,
            start: updatedEvent.startStr,
            end: updatedEvent.endStr,
          }
        : event
    );
    setEvents(updatedEvents);

    console.log('Updated events:', updatedEvent);
  };

  return (
    <Container style={{ marginTop: '2rem', maxWidth: '100%' }}>
      <Calendar events={events} resources={resources} onEventChange={handleEventChange} />
    </Container>
  );
};

export default App;
