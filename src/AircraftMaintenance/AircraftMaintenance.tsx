import { Box, Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAircraftContext } from '../context/AircraftContext';
import { Aircraft } from '../utils/factories';
import AircraftList from './AircraftList';
import GanttChartDisplay from './GanttChartDisplay';

const AircraftMaintenance: React.FC = () => {
  const { aircrafts } = useAircraftContext();
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);

  const handleAircraftClick = (aircraft: Aircraft | null) => {
    setSelectedAircraft(aircraft);
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        Aircraft Maintenance
      </Typography>
      <Box sx={{ display: 'flex', minWidth: 320, height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
        <Box sx={{ width: '20%', minWidth: 240, borderRight: '1px solid #e0e0e0', p: 2, overflowY: 'auto' }}>
          <AircraftList aircrafts={aircrafts} onAircraftClick={handleAircraftClick} />
        </Box>
        <GanttChartDisplay aircrafts={aircrafts} selectedAircraft={selectedAircraft} />
      </Box>
    </Container>
  );
};

export default AircraftMaintenance;
