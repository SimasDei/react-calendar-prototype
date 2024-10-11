import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddComment from '../Settings/AddComment';
import Comments from '../Settings/Comments';
import { useUserContext } from '../context/UserContext';
import { Comment, Event } from '../utils/factories';

interface EventDetailsModalProps {
  open: boolean;
  onClose: () => void;
  event: Event;
  onSave: (updatedEvent: Event) => void;
  onTagClick: (username: string) => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ open, onClose, event, onSave, onTagClick }) => {
  const { mainUser } = useUserContext();

  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.extendedProps.description || '');
  const [startDate, setStartDate] = useState(event.start);
  const [endDate, setEndDate] = useState(event.end);
  const [comments, setComments] = useState<Comment[]>(event.extendedProps.comments || []);

  useEffect(() => {
    setTitle(event.title);
    setDescription(event.extendedProps.description || '');
    setStartDate(event.start);
    setEndDate(event.end);
    setComments(event.extendedProps.comments || []);
  }, [event]);

  const handleSave = () => {
    const updatedEvent: Event = {
      ...event,
      title,
      start: startDate,
      end: endDate,
      extendedProps: {
        ...event.extendedProps,
        description,
        comments,
      },
    };
    onSave(updatedEvent);
  };

  const handleAddComment = (text: string) => {
    if (!mainUser) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      text,
      date: new Date().toISOString(),
      userId: mainUser.id,
    };
    setComments([newComment, ...comments]);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Event Details</DialogTitle>
      <DialogContent dividers>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Edit Event</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField margin="dense" label="Event Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
            <TextField
              margin="dense"
              label="Event Description"
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Start Date"
              fullWidth
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
              margin="dense"
              label="End Date"
              fullWidth
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Comments</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ padding: 1 }}>
              <Comments comments={comments} onTagClick={onTagClick} />
              <AddComment onAddComment={handleAddComment} />
            </Box>
          </AccordionDetails>
        </Accordion>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
        <Button onClick={handleSave} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDetailsModal;
