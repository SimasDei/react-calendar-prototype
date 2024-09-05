import { EventChangeArg } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { Container, Paper, Typography } from '@mui/material'; // MUI Components
import React, { useEffect, useState } from 'react';
import './App.css'; // Import custom styles
import { events as generatedEvents, resources as generatedResources } from './resources';

const LOCAL_STORAGE_KEY = 'calendarData';

const App: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);

  // Load data from localStorage or generate new data if none exists
  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setEvents(parsedData.events);
      setResources(parsedData.resources);
    } else {
      // No data in localStorage, generate new data and save it
      setEvents(generatedEvents);
      setResources(generatedResources);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ events: generatedEvents, resources: generatedResources }));
    }
  }, []);

  // Function to handle event changes (drag, drop, resize)
  const handleEventChange = (changeInfo: EventChangeArg) => {
    const updatedEvent = changeInfo.event;
    const updatedEvents = events.map((event) =>
      event.id === updatedEvent.id
        ? {
            ...event,
            start: updatedEvent.start?.toISOString(),
            end: updatedEvent.end?.toISOString(),
          }
        : event
    );
    setEvents(updatedEvents);
    updateLocalStorage(updatedEvents, resources);
  };

  // Function to update the localStorage with the latest event and resource data
  const updateLocalStorage = (updatedEvents: any[], updatedResources: any[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ events: updatedEvents, resources: updatedResources }));
  };

  return (
    <Container style={{ marginTop: '2rem', maxWidth: '100%' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Calendar
        </Typography>
        <FullCalendar
          plugins={[resourceTimelinePlugin]}
          initialView="resourceTimelineYear"
          views={{
            resourceTimelineYear: {
              type: 'resourceTimeline',
              duration: { days: 365 }, // Show a full year for scrolling
            },
          }}
          slotLabelFormat={[
            { month: 'long' }, // Top row shows the full month
            { week: 'short' }, // Second row shows the full week
            { weekday: 'short', day: 'numeric' }, // Third row shows the day
          ]}
          slotLabelInterval={{ days: 1 }}
          slotDuration={{ days: 1 }} // Show one day per slot
          scrollTime={new Date().toISOString()} // Start the scroll at today's date
          resources={resources}
          events={events}
          editable={true} // Enable dragging and resizing
          selectable={true} // Allows for selecting dates
          droppable={true} // Allows for dragging events from outside the calendar
          eventResizableFromStart={true} // Resizable from start
          eventStartEditable={true} // Make events draggable from the start
          eventDurationEditable={true} // Make events resizable
          // Handle event changes (dragging, resizing)
          eventChange={handleEventChange}
          eventsSet={(events) => console.log(events)}
          eventContent={(eventInfo) => (
            <div
              style={{
                padding: '0.5rem',
                background: eventInfo.event.extendedProps.gradient || '#1976d2', // Use gradient if available
                color: '#fff',
                borderRadius: '4px',
                fontSize: '0.9rem',
              }}
            >
              {eventInfo.event.title}
            </div>
          )}
        />
      </Paper>
    </Container>
  );
};

export default App;
