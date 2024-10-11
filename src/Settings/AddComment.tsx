import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

interface AddCommentProps {
  onAddComment: (text: string) => void;
}

const AddComment: React.FC<AddCommentProps> = ({ onAddComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    if (commentText.trim()) {
      onAddComment(commentText.trim());
      setCommentText('');
    }
  };

  return (
    <>
      <TextField
        label="Add a comment"
        fullWidth
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        multiline
        rows={2}
        margin="normal"
      />
      <Button onClick={handleAddComment} color="primary" variant="contained" disabled={!commentText.trim()}>
        Add Comment
      </Button>
    </>
  );
};

export default AddComment;
