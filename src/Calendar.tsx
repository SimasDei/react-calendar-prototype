import { EventChangeArg, EventClickArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { Paper, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useCalendarContext } from './context/CalendarContext';
import { useUserContext } from './context/UserContext';
import ChildEvent from './Events/ChildEvent';
import EventDetailsModal from './Events/EventDetailsModal';
import MainEvent from './Events/MainEvent';
import { Event, EventType } from './utils/factories';

const Calendar: React.FC = () => {
  const { events, resources, updateEvent } = useCalendarContext();
  const { users, selectUser } = useUserContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentView, setCurrentView] = useState('resourceTimelineWeek');
  const calendarRef = useRef<FullCalendar>(null);

  const handleEventChange = (changeInfo: EventChangeArg) => {
    const calendarEvent = changeInfo.event;
    const updatedEventData: Event = {
      id: calendarEvent.id,
      title: calendarEvent.title,
      start: calendarEvent.startStr,
      end: calendarEvent.endStr,
      resourceId: calendarEvent.getResources()[0]?.id || '',
      extendedProps: {
        ...(calendarEvent.extendedProps as Event['extendedProps']),
      },
    };

    updateEvent(updatedEventData);
  };

  const handleEventClick = (eventInfo: EventClickArg) => {
    const calendarEvent = eventInfo.event;
    const eventInContext = events.find((evt) => evt.id === calendarEvent.id);
    if (eventInContext) {
      setSelectedEvent(eventInContext);
      setModalOpen(true);
    }
  };

  const handleEventClose = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  const handleSaveEvent = (updatedEvent: Event) => {
    updateEvent(updatedEvent);

    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      const calendarEvent = calendarApi.getEventById(updatedEvent.id);
      if (calendarEvent) {
        calendarEvent.setProp('title', updatedEvent.title);
        calendarEvent.setExtendedProp('description', updatedEvent.extendedProps.description);
        calendarEvent.setExtendedProp('comments', updatedEvent.extendedProps.comments);
        calendarEvent.setStart(updatedEvent.start);
        calendarEvent.setEnd(updatedEvent.end);
      }
    }

    handleEventClose();
  };

  const handleYearChange = (year: number) => {
    setCurrentYear(year);
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      const newYearStartDate = new Date(year, 0, 1);
      calendarApi.gotoDate(newYearStartDate);
    }
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView(view);
      calendarApi.gotoDate(new Date());
    }
  };

  const handleTagClick = (username: string) => {
    const taggedUser = users.find((user) => user.username === username);
    if (taggedUser) {
      selectUser(taggedUser);
      setModalOpen(true);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '2rem' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Calendar
      </Typography>
      <FullCalendar
        ref={calendarRef}
        plugins={[resourceTimelinePlugin, interactionPlugin]}
        initialView={currentView}
        views={{
          resourceTimelineDay: {
            type: 'resourceTimeline',
            duration: { years: 1 },
            slotDuration: { days: 1 },
          },
          resourceTimelineWeek: {
            type: 'resourceTimeline',
            duration: { years: 1 },
            slotDuration: { weeks: 1 },
          },
        }}
        headerToolbar={{
          left: 'prevYear,nextYear',
          center: 'title',
          right: 'resourceTimelineDay,resourceTimelineWeek',
        }}
        customButtons={{
          prevYear: {
            text: `${currentYear - 1}`,
            click: () => handleYearChange(currentYear - 1),
          },
          nextYear: {
            text: `${currentYear + 1}`,
            click: () => handleYearChange(currentYear + 1),
          },
          resourceTimelineDay: {
            text: 'Daily',
            click: () => handleViewChange('resourceTimelineDay'),
          },
          resourceTimelineWeek: {
            text: 'Weekly',
            click: () => handleViewChange('resourceTimelineWeek'),
          },
        }}
        scrollTime={new Date().toISOString()}
        scrollTimeReset={false}
        slotLabelFormat={[{ month: 'long' }, { week: 'short' }, { weekday: 'short', day: 'numeric' }]}
        resources={resources.map((resource) => ({
          id: resource.id,
          title: resource.title,
          children: resource.children,
        }))}
        resourceAreaHeaderContent={'MSN ✈️'}
        resourceAreaWidth="250px"
        events={events}
        editable={true}
        selectable={true}
        eventResizableFromStart={true}
        eventStartEditable={true}
        eventDurationEditable={true}
        eventChange={handleEventChange}
        eventClick={handleEventClick}
        eventBackgroundColor="transparent"
        eventBorderColor="transparent"
        eventContent={(eventInfo) => {
          const event = eventInfo.event;
          const isProject = event.extendedProps.type === EventType.Project;
          const projectResource = event.getResources();
          const childResources = projectResource[0].getChildren();
          const childEvents = childResources.flatMap((childResource) => childResource.getEvents());

          const numOfChildEvents = childEvents.length;

          const startDate = new Date(event.start!);
          const endDate = new Date(event.end!);
          const durationString = `${startDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

          const eventGradient = event.extendedProps.gradient;

          return isProject ? (
            <MainEvent
              title={event.title}
              duration={durationString}
              numOfChildEvents={numOfChildEvents}
              gradient={eventGradient}
              onOptionsClick={() => {}}
            />
          ) : (
            <ChildEvent title={event.title} duration={durationString} gradient={eventGradient} />
          );
        }}
      />
      {selectedEvent && (
        <EventDetailsModal
          open={modalOpen}
          onClose={handleEventClose}
          event={selectedEvent}
          onSave={handleSaveEvent}
          onTagClick={handleTagClick}
        />
      )}
    </Paper>
  );
};

export default Calendar;
