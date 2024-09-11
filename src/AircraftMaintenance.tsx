import { Box, Container, Typography } from '@mui/material';
import { FrappeGantt, Task, ViewMode } from 'frappe-gantt-react';
import React from 'react';

const AircraftMaintenance: React.FC = () => {
  const tasks: Task[] = [
    new Task({
      id: 'Task 1',
      name: 'Engine Inspection',
      start: '2024-09-01',
      end: '2024-09-03',
      progress: 50,
      dependencies: '',
    }),
    new Task({
      id: 'Task 2',
      name: 'Landing Gear Overhaul',
      start: '2024-09-04',
      end: '2024-09-08',
      progress: 75,
      dependencies: 'Task 1',
    }),
    new Task({
      id: 'Task 3',
      name: 'Avionics Check',
      start: '2024-09-09',
      end: '2024-09-12',
      progress: 30,
      dependencies: 'Task 2',
    }),
    // Parent task
    new Task({
      id: 'Task 4',
      name: 'Aircraft Complete Check',
      start: '2024-08-30',
      end: '2024-09-15',
      progress: 40,
      dependencies: '',
    }),
  ];

  const handleTaskClick = (task: Task) => {
    console.log('🚀 ~ handleTaskClick ~ task:', task);
  };

  return (
    <Container>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Aircraft Maintenance Schedule
        </Typography>
        <FrappeGantt
          tasks={tasks}
          onClick={handleTaskClick} // Handle task clicks
          viewMode={ViewMode.Week} // Weekly view mode
        />
      </Box>
    </Container>
  );
};

export default AircraftMaintenance;
