// Comments.tsx
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, IconButton, List, ListItem, ListItemText, Pagination, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { Comment } from '../utils/factories';
import TaggedUser from './TaggedUser';

interface CommentsProps {
  comments: Comment[];
  commentsPerPage?: number;
  onTagClick: (username: string) => void;
  editable?: boolean;
  onEditComment?: (id: string, newText: string) => void;
  onDeleteComment?: (id: string) => void;
  showAvatar?: boolean;
}

const Comments: React.FC<CommentsProps> = ({
  comments,
  commentsPerPage = 4,
  onTagClick,
  editable = false,
  onEditComment,
  onDeleteComment,
  showAvatar = true,
}) => {
  const { users } = useUserContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

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

  const getUserById = (userId: string) => users.find((user) => user.id === userId);

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box>
      <List>
        {currentComments.map((comment) => {
          const user = getUserById(comment.userId);
          return (
            <ListItem
              key={comment.id}
              alignItems="flex-start"
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                mb: 1,
                p: 2,
                bgcolor: '#f9f9f9',
              }}
            >
              {showAvatar && <Avatar src={user?.avatar} alt={user?.name} sx={{ mr: 2, mt: 1 }} />}
              {editable && editingCommentId === comment.id ? (
                <TextField
                  fullWidth
                  multiline
                  value={comment.text}
                  onChange={(e) => onEditComment && onEditComment(comment.id, e.target.value)}
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
                    <>
                      {!showAvatar && <Typography variant="subtitle2">{user?.name || 'Unknown User'}</Typography>}
                      <Typography variant="caption" color="textSecondary">
                        {new Date(comment.date).toLocaleDateString()}
                      </Typography>
                    </>
                  }
                />
              )}
              {editable && (
                <>
                  <IconButton onClick={() => setEditingCommentId(comment.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDeleteComment && onDeleteComment(comment.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </ListItem>
          );
        })}
      </List>
      <Pagination count={Math.ceil(comments.length / commentsPerPage)} page={currentPage} onChange={handlePageChange} sx={{ mt: 2 }} />
    </Box>
  );
};

export default Comments;
