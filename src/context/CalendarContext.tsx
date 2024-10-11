import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Event, Resource, ResourceFactory } from '../utils/event-factory';
import { User } from '../utils/user-factory';
import { useUserContext } from './UserContext';

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
  const { users } = useUserContext();

  const [resources, setResources] = useState<Resource[]>(() => generateResourcesWithEvents(users));
  const [events, setEvents] = useState<Event[]>(() => resources.flatMap((resource) => resource.events));

  const updateEvent = (updatedEvent: Event) => {
    setEvents((prevEvents) => prevEvents.map((event) => (event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event)));
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

function generateResourcesWithEvents(users: User[]) {
  const getRandomStartDate = () => {
    const startYear = Math.floor(Math.random() * 3) + 2023;
    const startMonth = Math.floor(Math.random() * 12);
    const startDay = Math.floor(Math.random() * 28) + 1;
    const randomStartDate = new Date(startYear, startMonth, startDay);
    return randomStartDate.toISOString().split('T')[0];
  };

  const generateRandomMSNs = (amount: number) => {
    return Array.from({ length: amount }, () => Math.floor(Math.random() * 2000).toString());
  };

  const msns = generateRandomMSNs(20);

  return msns.map((msn) => ResourceFactory.createResource(msn, getRandomStartDate(), users));
}
