import { Avatar, Box, Grid, Modal, Typography } from '@mui/material';
import React from 'react';
import { User } from '../utils/factories';
import Comments from './Comments';
import { roleIcons } from './RoleIcons';

interface UserModalProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
  onTagClick: (username: string) => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, open, onClose, onTagClick }) => {
  if (!user) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          maxHeight: '90vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar src={user.avatar} sx={{ width: 100, height: 100 }} />
        </Box>
        <Typography variant="h6" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {user.email}
        </Typography>
        <Typography variant="body2" color="info.main" gutterBottom>
          @{user.username}
        </Typography>
        <Grid container alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Grid item>{roleIcons[user.role]}</Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              {user.role}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Comments:
        </Typography>
        <Comments comments={user.comments} onTagClick={onTagClick} showAvatar={false} />
      </Box>
    </Modal>
  );
};

export default UserModal;
