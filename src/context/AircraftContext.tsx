// AircraftContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Aircraft, AircraftFactory } from '../utils/factories';
import { useCalendarContext } from './CalendarContext';

interface AircraftContextType {
  aircrafts: Aircraft[];
  setAircrafts: React.Dispatch<React.SetStateAction<Aircraft[]>>;
}

const AircraftContext = createContext<AircraftContextType | undefined>(undefined);

export const AircraftProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { resources } = useCalendarContext();

  const [aircrafts, setAircrafts] = useState<Aircraft[]>(() => AircraftFactory.createAircrafts(resources, 5));

  return <AircraftContext.Provider value={{ aircrafts, setAircrafts }}>{children}</AircraftContext.Provider>;
};

export const useAircraftContext = () => {
  const context = useContext(AircraftContext);
  if (!context) {
    throw new Error('useAircraftContext must be used within an AircraftProvider');
  }
  return context;
};
