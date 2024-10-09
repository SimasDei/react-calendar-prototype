import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import FlightIcon from '@mui/icons-material/Flight';
import { List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import React from 'react';
import { Aircraft } from '../utils/factories';

interface AircraftListProps {
  aircrafts: Aircraft[];
  onAircraftClick: (aircraft: Aircraft | null) => void;
}

const AircraftList: React.FC<AircraftListProps> = ({ aircrafts, onAircraftClick }) => {
  return (
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
      <ListItemButton onClick={() => onAircraftClick(null)}>
        <ListItemIcon sx={{ minWidth: 30 }}>
          <ConnectingAirportsIcon />
        </ListItemIcon>
        <ListItemText primary="All" primaryTypographyProps={{ fontSize: '1.2rem' }} />
      </ListItemButton>
      {aircrafts.map((aircraft) => (
        <ListItemButton key={aircraft.id} onClick={() => onAircraftClick(aircraft)}>
          <ListItemIcon sx={{ minWidth: 30 }}>
            <FlightIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={aircraft.name} primaryTypographyProps={{ fontSize: '0.875rem' }} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default AircraftList;
