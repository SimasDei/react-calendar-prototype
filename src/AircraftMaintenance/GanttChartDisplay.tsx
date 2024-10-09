import { Box, Typography } from '@mui/material';
import { FrappeGantt, ViewMode } from 'frappe-gantt-react';
import React from 'react';
import { Aircraft } from '../utils/factories';

interface GanttChartDisplayProps {
  aircrafts: Aircraft[];
  selectedAircraft: Aircraft | null;
}

const GanttChartDisplay: React.FC<GanttChartDisplayProps> = ({ aircrafts, selectedAircraft }) => {
  return (
    <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
      {selectedAircraft ? (
        <>
          <Typography variant="h6" gutterBottom>
            Maintenance Tasks for {selectedAircraft.name}
          </Typography>
          <Box sx={{ overflowX: 'auto' }}>
            <FrappeGantt tasks={selectedAircraft.tasks} viewMode={ViewMode.Day} />
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            All Ongoing Maintenance Tasks
          </Typography>
          {aircrafts.map((aircraft) => (
            <Box key={aircraft.id} sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                {aircraft.name}
              </Typography>
              <Box sx={{ overflowX: 'auto' }}>
                <FrappeGantt tasks={aircraft.tasks} viewMode={ViewMode.Day} />
              </Box>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default GanttChartDisplay;
