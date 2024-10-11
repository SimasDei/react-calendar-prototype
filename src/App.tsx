import { Container, CssBaseline } from '@mui/material';
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import AircraftMaintenance from './AircraftMaintenance/AircraftMaintenance';
import AircraftSpecification from './AircraftSpec/AircraftSpecification';
import Calendar from './Calendar';
import { AircraftProvider } from './context/AircraftContext';
import { CalendarProvider } from './context/CalendarContext';
import { UserProvider } from './context/UserContext';
import Sidebar from './Nav/Sidebar';
import Settings from './Settings/Settings';

const App: React.FC = () => {
  return (
    <UserProvider>
      <CalendarProvider>
        <AircraftProvider>
          <HashRouter>
            <CssBaseline />
            <Sidebar />
            <Container style={{ marginTop: '2rem', paddingLeft: '70px', maxWidth: '100%' }}>
              <Routes>
                <Route path="/" element={<Calendar />} />
                <Route path="/aircraft-specification" element={<AircraftSpecification />} />
                <Route path="/maintenance" element={<AircraftMaintenance />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Container>
          </HashRouter>
        </AircraftProvider>
      </CalendarProvider>
    </UserProvider>
  );
};

export default App;
