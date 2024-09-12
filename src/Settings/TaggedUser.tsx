import { Typography } from '@mui/material';
import React from 'react';

interface TaggedUserProps {
  username: string;
  onClick: (username: string) => void;
}

const TaggedUser: React.FC<TaggedUserProps> = ({ username, onClick }) => {
  return (
    <Typography
      component="span"
      sx={{
        color: '#2196f3',
        cursor: 'pointer',
        '&:hover': {
          textDecoration: 'underline',
          color: '#1976d2',
        },
      }}
      onClick={() => onClick(username)}
    >
      @{username}
    </Typography>
  );
};

export default TaggedUser;
