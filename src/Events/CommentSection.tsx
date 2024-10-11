import { Box } from '@mui/material';
import React from 'react';
import AddComment from '../Settings/AddComment';
import Comments from '../Settings/Comments';
import { Comment } from '../utils/factories';

interface CommentsSectionProps {
  comments: Comment[];
  onAddComment: (text: string) => void;
  onTagClick: (username: string) => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments, onAddComment, onTagClick }) => {
  return (
    <Box>
      <Comments comments={comments} onTagClick={onTagClick} />
      <AddComment onAddComment={onAddComment} />
    </Box>
  );
};

export default CommentsSection;
