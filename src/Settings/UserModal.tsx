import { Box, List, ListItem, ListItemText, Modal, Typography } from '@mui/material';
import React from 'react';
import { User } from '../factories';
import TaggedUser from './TaggedUser';

interface UserModalProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, open, onClose }) => {
  if (!user) return null;

  const handleTagClick = (username: string) => {
    alert(`User tagged: ${username}`);
  };

  const renderCommentText = (text: string) => {
    const parts = text.split(/(@\w+\.\w+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('@')) {
        const username = part.slice(1);
        return <TaggedUser key={index} username={username} onClick={handleTagClick} />;
      }
      return part;
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {user.email}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Role: {user.role}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Comments:
        </Typography>
        <List>
          {user.comments.map((comment) => (
            <ListItem key={comment.id}>
              <ListItemText primary={renderCommentText(comment.text)} secondary={new Date(comment.date).toLocaleDateString()} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default UserModal;
