import { EventChangeArg } from '@fullcalendar/core';
import { Container, CssBaseline } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import AircraftMaintenance from './AircraftMaintenance';
import AircraftSpecification from './AircraftSpec/AircraftSpecification';
import Calendar from './Calendar';
import Sidebar from './Nav/Sidebar';
import { events as generatedEvents, resources as generatedResources } from './resources';
import Settings from './Settings/Settings';

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
  };

  return (
    <HashRouter>
      <CssBaseline />
      <Sidebar />
      <Container style={{ marginTop: '2rem', paddingLeft: '70px', maxWidth: '100%' }}>
        <Routes>
          <Route path="/" element={<Calendar events={events} resources={resources} onEventChange={handleEventChange} />} />
          <Route path="/aircraft-specification" element={<AircraftSpecification />} />
          <Route path="/maintenance" element={<AircraftMaintenance />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Container>
    </HashRouter>
  );
};

export default App;
