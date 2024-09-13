import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Button, Grid, IconButton, List, ListItem, ListItemText, Pagination, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import TaggedUser from './TaggedUser';

interface UserPreferencesProps {
  onTagClick: (username: string) => void;
}

const UserPreferences: React.FC<UserPreferencesProps> = ({ onTagClick }) => {
  const { mainUser, selectUser } = useUserContext();
  const [username, setUsername] = useState(mainUser?.username || '');
  const [email, setEmail] = useState(mainUser?.email || '');
  const [avatar, setAvatar] = useState(mainUser?.avatar || '');
  const [comments, setComments] = useState(mainUser?.comments || []);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  const handleSave = () => {
    if (mainUser) {
      const updatedUser = { ...mainUser, username, email, avatar, comments };
      selectUser(updatedUser);
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatar(e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

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

  const handleEditComment = (id: string) => {
    setEditingCommentId(id);
  };

  const handleDeleteComment = (id: string) => {
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
  };

  const handleCommentChange = (id: string, text: string) => {
    setComments((prevComments) => prevComments.map((comment) => (comment.id === id ? { ...comment, text } : comment)));
  };

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Edit Preferences
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Box sx={{ position: 'relative', mb: 2 }}>
              <Avatar src={avatar} sx={{ width: 150, height: 150 }} />
              <IconButton
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  bgcolor: 'white',
                  borderRadius: '50%',
                  boxShadow: 1,
                }}
              >
                <EditIcon />
                <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
              </IconButton>
            </Box>
            <Box sx={{ width: '100%' }}>
              <TextField
                label="Name"
                value={mainUser?.name || ''}
                fullWidth
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth margin="normal" />
              <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Comments
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
                {editingCommentId === comment.id ? (
                  <TextField
                    fullWidth
                    multiline
                    value={comment.text}
                    onChange={(e) => handleCommentChange(comment.id, e.target.value)}
                    variant="outlined"
                    margin="normal"
                  />
                ) : (
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
                )}
                <IconButton onClick={() => handleEditComment(comment.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteComment(comment.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Pagination count={Math.ceil(comments.length / commentsPerPage)} page={currentPage} onChange={handlePageChange} sx={{ mt: 2 }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserPreferences;
