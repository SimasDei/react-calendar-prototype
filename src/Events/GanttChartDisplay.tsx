import { Box, Typography } from '@mui/material';
import { FrappeGantt, ViewMode } from 'frappe-gantt-react';
import React from 'react';
import { useAircraftContext } from '../context/AircraftContext';
import { Event } from '../utils/event-factory';

interface GanttChartDisplayProps {
  event: Event;
}

const GanttChartDisplay: React.FC<GanttChartDisplayProps> = ({ event }) => {
  const { aircrafts } = useAircraftContext();

  const eventResourceId = event.resourceId;
  const mainResourceId = `MSN-` + eventResourceId.split('-')[1];
  const aircraft = aircrafts.find((ac) => ac.id === mainResourceId);

  if (!aircraft) {
    return <Typography>No maintenance tasks found for this aircraft.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Maintenance Tasks for {aircraft.name}
      </Typography>
      <Box sx={{ overflowX: 'auto' }}>
        <FrappeGantt tasks={aircraft.tasks} viewMode={ViewMode.Day} />
      </Box>
    </Box>
  );
};

export default GanttChartDisplay;
