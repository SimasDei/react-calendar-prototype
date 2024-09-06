import { EventChangeArg, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { Paper, Typography } from '@mui/material';
import React from 'react';
import { Resource } from './factories';

interface CalendarProps {
  events: EventInput[];
  resources: Resource[];
  onEventChange: (changeInfo: EventChangeArg) => void;
}

const Calendar: React.FC<CalendarProps> = ({ events, resources, onEventChange }) => {
  return (
    <Paper elevation={3} style={{ padding: '2rem' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Calendar
      </Typography>
      <FullCalendar
        plugins={[resourceTimelinePlugin, interactionPlugin]}
        initialView="resourceTimelineYear"
        views={{
          resourceTimelineYear: {
            type: 'resourceTimeline',
            duration: { days: 365 },
          },
        }}
        slotLabelFormat={[{ month: 'long' }, { week: 'short' }, { weekday: 'short', day: 'numeric' }]}
        slotLabelInterval={{ days: 1 }}
        slotDuration={{ days: 1 }}
        scrollTime={new Date().toISOString()}
        resources={resources.map((resource) => ({
          id: resource.id,
          title: resource.title,
          children: resource.children,
        }))}
        resourceAreaHeaderContent={'MSN ✈️'}
        events={events}
        editable={true}
        selectable={true}
        eventResizableFromStart={true}
        eventStartEditable={true}
        eventDurationEditable={true}
        eventChange={onEventChange}
        eventsSet={(events) => console.log('Current events:', events)}
        eventContent={(eventInfo) => (
          <div
            style={{
              padding: '0.5rem',
              background: eventInfo.event.extendedProps.gradient || '#1976d2',
              color: '#fff',
              borderRadius: '4px',
              fontSize: '0.9rem',
            }}
          >
            {eventInfo.event.title}
          </div>
        )}
      />
    </Paper>
  );
};

export default Calendar;
