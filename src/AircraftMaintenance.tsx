import InboxIcon from '@mui/icons-material/MoveToInbox';
import SendIcon from '@mui/icons-material/Send';
import { Box, Container, List, ListItemText, ListSubheader, Typography } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { FrappeGantt, ViewMode } from 'frappe-gantt-react';
import * as React from 'react';
import { useState } from 'react';
import { Aircraft, AircraftFactory } from './factories';

const initialAircrafts = AircraftFactory.createAircrafts(5, 5);

const AircraftMaintenance: React.FC = () => {
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
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Aircraft List
              </ListSubheader>
            }
          >
            <ListItemButton onClick={() => handleAircraftClick(null)}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <InboxIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="All" primaryTypographyProps={{ fontSize: '0.875rem' }} />
            </ListItemButton>
            {initialAircrafts.map((aircraft) => (
              <ListItemButton key={aircraft.id} onClick={() => handleAircraftClick(aircraft)}>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <SendIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={aircraft.name} primaryTypographyProps={{ fontSize: '0.875rem' }} />
              </ListItemButton>
            ))}
          </List>
        </Box>
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
              {initialAircrafts.map((aircraft) => (
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
      </Box>
    </Container>
  );
};

export default AircraftMaintenance;
