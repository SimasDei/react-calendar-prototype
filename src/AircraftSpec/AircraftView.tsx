import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import React from 'react';
import { CustomArea } from 'react-img-mapper';
import InteractiveImage from './InteractiveImage';

type AircraftViewProps = {
  title: string;
  imageSrc: string;
  map: {
    name: string;
    areas: CustomArea[];
  };
  onAreaClick: (area: CustomArea) => void;
  renderFields: (section: string) => JSX.Element[];
  section: string;
};

const AircraftView: React.FC<AircraftViewProps> = ({ title, imageSrc, map, onAreaClick, renderFields, section }) => {
  return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <InteractiveImage src={imageSrc} map={map} onAreaClick={onAreaClick} />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>{renderFields(section)}</AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default AircraftView;
