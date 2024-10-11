import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { Event, EventType } from '../utils/factories';
import CommentsSection from './CommentSection';
import EventDetailsForm from './EventDetailsForm';
import GanttChartDisplay from './GanttChartDisplay';

interface EventDetailsModalProps {
  open: boolean;
  onClose: () => void;
  event: Event;
  onSave: (updatedEvent: Event) => void;
  onTagClick: (username: string) => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ open, onClose, event, onSave, onTagClick }) => {
  const { mainUser } = useUserContext();
  const [tabIndex, setTabIndex] = useState(0);
  const [comments, setComments] = useState(event.extendedProps.comments || []);

  useEffect(() => {
    setComments(event.extendedProps.comments || []);
  }, [event]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleAddComment = (text: string) => {
    if (!mainUser) return;
    const newComment = {
      id: Date.now().toString(),
      text,
      date: new Date().toISOString(),
      userId: mainUser.id,
    };
    setComments([newComment, ...comments]);
  };

  const handleSave = () => {
    const updatedEvent: Event = {
      ...event,
      extendedProps: {
        ...event.extendedProps,
        comments,
      },
    };
    onSave(updatedEvent);
  };

  const isMaintenanceEvent = event.extendedProps.type === EventType.Maintenance;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Event Details</DialogTitle>
      <DialogContent dividers>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="Details" />
          {isMaintenanceEvent && <Tab label="Gantt Chart" />}
          <Tab label="Comments" />
        </Tabs>
        {tabIndex === 0 && (
          <Box p={2}>
            <EventDetailsForm event={event} onSave={onSave} />
          </Box>
        )}
        {isMaintenanceEvent && tabIndex === 1 && (
          <Box p={2}>
            <GanttChartDisplay event={event} />
          </Box>
        )}
        {((isMaintenanceEvent && tabIndex === 2) || (!isMaintenanceEvent && tabIndex === 1)) && (
          <Box p={2}>
            <CommentsSection comments={comments} onAddComment={handleAddComment} onTagClick={onTagClick} />
          </Box>
        )}
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
