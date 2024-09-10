import { Box } from '@mui/material';
import React from 'react';
import ImageMapper, { CustomArea } from 'react-img-mapper';
import { AreaMap } from './types.ts';

interface InteractiveImageProps {
  src: string;
  map: AreaMap;
  onAreaClick: (area: CustomArea) => void;
}

const InteractiveImage: React.FC<InteractiveImageProps> = ({ src, map, onAreaClick }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
      <ImageMapper src={src} map={map} onClick={onAreaClick} width={800} />
    </Box>
  );
};

export default InteractiveImage;
