import { Box, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import frontImage from '../../resources/aircraft_schematics_front.png';
import sectionImage from '../../resources/aircraft_schematics_section.png';
import sideImage from '../../resources/aircraft_schematics_side.png';
import topImage from '../../resources/aircraft_schematics_top.png';
import AircraftView from './AircraftView';
import FormModal from './FormModal';
import { FormData, sectionMapping, specificationFields, viewMaps } from './specificationData';

const AircraftSpecification: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [formData, setFormData] = useState<Record<string, FormData>>({});

  const handleSectionClick = (section: string) => {
    setSelectedSection(section);
    console.log('🚀 ~ formData:', formData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (section: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [section]: {
        ...prevFormData[section],
        [name]: value,
      },
    }));
  };

  const renderFields = (section: string) => {
    return (
      sectionMapping[section]?.map((fieldKey) => {
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
                onChange={handleInputChange(section)}
                InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
              />
            ))}
          </Box>
        );
      }) || []
    );
  };

  const views = [
    { title: 'Front View', imageSrc: frontImage, section: 'frontView' },
    { title: 'Section View', imageSrc: sectionImage, section: 'sectionView' },
    { title: 'Side View', imageSrc: sideImage, section: 'sideView' },
    { title: 'Top View', imageSrc: topImage, section: 'topView' },
  ];

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Aircraft Specification
      </Typography>

      {views.map((view) => (
        <AircraftView
          key={view.section}
          title={view.title}
          imageSrc={view.imageSrc}
          map={viewMaps[view.section]}
          onAreaClick={(area) => handleSectionClick(area.id!)}
          renderFields={renderFields}
          section={view.section}
        />
      ))}

      <FormModal open={open} onClose={handleClose} title={selectedSection} renderFields={renderFields} section={selectedSection} />
    </Container>
  );
};

export default AircraftSpecification;
