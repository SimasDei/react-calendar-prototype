import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React from 'react';

interface EventDetailsModalProps {
  open: boolean;
  onClose: () => void;
  eventTitle: string;
  eventDescription?: string;
  eventStartDate: string;
  eventEndDate: string;
  onSave: (updatedEvent: { title: string; description?: string; startDate: string; endDate: string }) => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  open,
  onClose,
  eventTitle,
  eventDescription,
  eventStartDate,
  eventEndDate,
  onSave,
}) => {
  const [title, setTitle] = React.useState(eventTitle);
  const [description, setDescription] = React.useState(eventDescription || '');
  const [startDate, setStartDate] = React.useState(eventStartDate);
  const [endDate, setEndDate] = React.useState(eventEndDate);

  const handleSave = () => {
    onSave({ title, description, startDate, endDate });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Event Details</DialogTitle>
      <DialogContent>
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
          defaultValue={startDate}
          helperText="Please select a date and time"
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDetailsModal;
