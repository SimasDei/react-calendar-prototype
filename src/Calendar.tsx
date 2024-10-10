import { EventChangeArg, EventClickArg } from '@fullcalendar/core';
import { EventImpl } from '@fullcalendar/core/internal';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { Paper, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useCalendarContext } from './context/CalendarContext';
import ChildEvent from './Events/ChildEvent';
import EventDetailsModal from './Events/EventDetailsModal';
import MainEvent from './Events/MainEvent';
import { Event, EventType } from './utils/factories';

const Calendar: React.FC = () => {
  const { events, resources, updateEvent } = useCalendarContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventImpl | null>(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentView, setCurrentView] = useState('resourceTimelineWeek');
  const calendarRef = useRef<FullCalendar>(null);

  const handleEventChange = (changeInfo: EventChangeArg) => {
    const updatedEvent = changeInfo.event;
    const updatedEventData: Event = {
      id: updatedEvent.id,
      title: updatedEvent.title,
      start: updatedEvent.startStr,
      end: updatedEvent.endStr,
      resourceId: updatedEvent.getResources()[0]?.id || '',
      extendedProps: {
        ...(updatedEvent.extendedProps as { type: EventType; gradient: string }),
      },
    };
    updateEvent(updatedEventData);
  };

  const handleEventClick = (eventInfo: EventClickArg) => {
    const event = eventInfo.event;
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleEventClose = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  const handleSaveEvent = (updatedEvent: { title: string; description?: string; startDate: string; endDate: string }) => {
    if (selectedEvent) {
      selectedEvent.setProp('title', updatedEvent.title);
      selectedEvent.setExtendedProp('description', updatedEvent.description);
      selectedEvent.setStart(updatedEvent.startDate);
      selectedEvent.setEnd(updatedEvent.endDate);
      handleEventClose();
    }
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
          eventTitle={selectedEvent.title}
          eventDescription={selectedEvent.extendedProps.description || ''}
          eventStartDate={selectedEvent.startStr}
          eventEndDate={selectedEvent.endStr}
          onSave={handleSaveEvent}
        />
      )}
    </Paper>
  );
};

export default Calendar;
