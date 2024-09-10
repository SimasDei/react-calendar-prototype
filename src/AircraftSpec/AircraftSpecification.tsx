import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import frontImage from '../../resources/aircraft_schematics_front.png';
import sectionImage from '../../resources/aircraft_schematics_section.png';
import sideImage from '../../resources/aircraft_schematics_side.png';
import topImage from '../../resources/aircraft_schematics_top.png';
import { sectionMapping, specificationFields } from './specificationFields';

const AircraftSpecification: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleSectionClick = (section: string) => {
    setSelectedSection(section);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderFields = (section: string) => {
    return sectionMapping[section]?.map((fieldKey) => {
      const sectionFields = specificationFields[fieldKey];
      return (
        <Box key={fieldKey} sx={{ marginBottom: 4 }}>
          <Typography variant="h6" gutterBottom>
            {sectionFields.title}
          </Typography>
          {sectionFields.fields.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              fullWidth
              margin="dense"
              onChange={handleInputChange}
              InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
            />
          ))}
        </Box>
      );
    });
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Aircraft Specification
      </Typography>

      {/* Front View */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Front View
        </Typography>
        <img
          src={frontImage}
          alt="Aircraft Front View"
          style={{ maxWidth: '100%', height: 'auto', cursor: 'pointer' }}
          onClick={() => handleSectionClick('frontView')}
        />
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Aircraft and Operating Limitations</Typography>
          </AccordionSummary>
          <AccordionDetails>{renderFields('frontView')}</AccordionDetails>
        </Accordion>
      </Box>

      {/* Section View */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Section View
        </Typography>
        <img
          src={sectionImage}
          alt="Aircraft Section View"
          style={{ maxWidth: '100%', height: 'auto', cursor: 'pointer' }}
          onClick={() => handleSectionClick('sectionView')}
        />
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Configuration</Typography>
          </AccordionSummary>
          <AccordionDetails>{renderFields('sectionView')}</AccordionDetails>
        </Accordion>
      </Box>

      {/* Side View */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Side View
        </Typography>
        <img
          src={sideImage}
          alt="Aircraft Side View"
          style={{ maxWidth: '100%', height: 'auto', cursor: 'pointer' }}
          onClick={() => handleSectionClick('sideView')}
        />
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Landing Gear</Typography>
          </AccordionSummary>
          <AccordionDetails>{renderFields('sideView')}</AccordionDetails>
        </Accordion>
      </Box>

      {/* Top View */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Top View
        </Typography>
        <img
          src={topImage}
          alt="Aircraft Top View"
          style={{ maxWidth: '100%', height: 'auto', cursor: 'pointer' }}
          onClick={() => handleSectionClick('topView')}
        />
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Airframe | Engine APU | Avionics</Typography>
          </AccordionSummary>
          <AccordionDetails>{renderFields('topView')}</AccordionDetails>
        </Accordion>
      </Box>

      {/* Modal for inputting details */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedSection} Details</DialogTitle>
        <DialogContent>{renderFields(selectedSection)}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AircraftSpecification;
