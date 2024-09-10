import { Box, Tooltip } from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import React from 'react';
import { CustomArea } from 'react-img-mapper';

type InteractiveImageProps = {
  src: string;
  map: {
    name: string;
    areas: CustomArea[];
  };
  onAreaClick: (area: CustomArea) => void;
};

const InteractiveImage: React.FC<InteractiveImageProps> = ({ src, map, onAreaClick }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <ImageListItem>
        <img src={src} alt={map.name} style={{ width: '100%' }} />
      </ImageListItem>
      {map.areas.map((area, index) => (
        <Tooltip key={index} title={area.id || ''}>
          <Box
            sx={{
              position: 'absolute',
              left: `${area.coords[0]}px`,
              top: `${area.coords[1]}px`,
              width: `${area.coords[2] * 2}px`,
              height: `${area.coords[2] * 2}px`,
              borderRadius: '50%',
              backgroundColor: area.preFillColor,
              cursor: 'pointer',
              transform: 'translate(-50%, -50%)',
            }}
            onClick={() => onAreaClick(area)}
          />
        </Tooltip>
      ))}
    </Box>
  );
};

export default InteractiveImage;
