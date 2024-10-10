import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Event, Resource } from '../utils/event-factory';
import { events as generatedEvents, resources as generatedResources } from '../utils/resources';

interface CalendarContextType {
  events: Event[];
  resources: Resource[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
  updateEvent: (updatedEvent: Event) => void;
  updateResource: (updatedResource: Resource) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(generatedEvents);
  const [resources, setResources] = useState<Resource[]>(generatedResources);

  const updateEvent = (updatedEvent: Event) => {
    setEvents((prevEvents) => prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
  };

  const updateResource = (updatedResource: Resource) => {
    setResources((prevResources) => prevResources.map((resource) => (resource.id === updatedResource.id ? updatedResource : resource)));
  };

  return (
    <CalendarContext.Provider value={{ events, resources, setEvents, setResources, updateEvent, updateResource }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendarContext must be used within a CalendarProvider');
  }
  return context;
};
