import { Avatar, Box, Grid, List, ListItem, ListItemText, Modal, Pagination, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { User } from '../utils/factories';
import { roleIcons } from './RoleIcons';
import TaggedUser from './TaggedUser';

interface UserModalProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
  onTagClick: (username: string) => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, open, onClose, onTagClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 3;

  useEffect(() => {
    setCurrentPage(1);
  }, [user]);

  if (!user) return null;

  const renderCommentText = (text: string) => {
    const parts = text.split(/(@\w+\.\w+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('@')) {
        const username = part.slice(1);
        return <TaggedUser key={index} username={username} onClick={onTagClick} />;
      }
      return part;
    });
  };

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = user.comments.slice(indexOfFirstComment, indexOfLastComment);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
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
        <List>
          {currentComments.map((comment) => (
            <ListItem
              key={comment.id}
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                mb: 1,
                p: 2,
                bgcolor: '#f9f9f9',
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="body2" color="textPrimary">
                    {renderCommentText(comment.text)}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="textSecondary">
                    {new Date(comment.date).toLocaleDateString()}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
        <Pagination
          count={Math.ceil(user.comments.length / commentsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ mt: 2 }}
        />
      </Box>
    </Modal>
  );
};

export default UserModal;
