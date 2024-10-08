import { Comment } from './comment-factory';

export enum EventType {
  DealPipe = 'deal-pipe',
  Maintenance = 'maintenance',
  Preparation = 'preparation',
  Project = 'project',
}

export interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  resourceId: string;
  extendedProps: {
    type: EventType;
    gradient: string;
    description?: string;
    comments?: Comment[];
  };
}

export interface Resource {
  id: string;
  title: string;
  children: { id: string; title: string }[];
  events: Event[];
}

export class EventFactory {
  private static gradientMap = {
    [EventType.DealPipe]: 'linear-gradient(45deg, #368FD8, #1940F1)',
    [EventType.Maintenance]: 'linear-gradient(45deg, #CCBE3C, #9A7E1C)',
    [EventType.Preparation]: 'linear-gradient(45deg, #3CCC98, #1C9A6D)',
    [EventType.Project]: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
  };

  static createEvent(
    type: EventType,
    resourceId: string,
    title: string,
    description: string,
    startDate: string,
    durationDays: number
  ): Event {
    const endDate = this.addDaysToDate(startDate, durationDays);
    return {
      id: `${resourceId}-${type}`,
      resourceId,
      title,
      start: `${startDate}T08:00:00`,
      end: `${endDate}T17:00:00`,
      extendedProps: {
        type,
        gradient: this.gradientMap[type],
        description,
        comments: [],
      },
    };
  }

  public static addDaysToDate(date: string, days: number): string {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate.toISOString().split('T')[0];
  }
}

export class ResourceFactory {
  static createResource(msn: string, startDate: string): Resource {
    const preparationDuration = Math.floor(Math.random() * 30) + 15;
    const maintenanceDuration = Math.floor(Math.random() * 30) + 15;
    const projectDuration = preparationDuration + maintenanceDuration + Math.floor(Math.random() * 30) + 15;

    const projectEvent = EventFactory.createEvent(
      EventType.Project,
      `MSN-${msn}`,
      'MSN Project',
      'Project Description',
      startDate,
      projectDuration
    );

    const preparationEvent = EventFactory.createEvent(
      EventType.Preparation,
      `preparation-${msn}`,
      'Source Project Preparation',
      'Preparation Description',
      startDate,
      preparationDuration
    );

    const maintenanceStartDate = EventFactory.addDaysToDate(startDate, preparationDuration + 1);
    const maintenanceEvent = EventFactory.createEvent(
      EventType.Maintenance,
      `maintenance-${msn}`,
      'Maintenance',
      'Maintenance Description',
      maintenanceStartDate,
      maintenanceDuration
    );

    const dealPipeStart = startDate;
    const dealPipeEvent = EventFactory.createEvent(
      EventType.DealPipe,
      `deal-pipe-${msn}`,
      'Deal Pipe',
      'Deal Pipe Description',
      dealPipeStart,
      projectDuration
    );

    return {
      id: `MSN-${msn}`,
      title: `MSN - ${msn}`,
      children: [
        { id: `deal-pipe-${msn}`, title: 'Deal Pipe' },
        { id: `preparation-${msn}`, title: 'Source Project Preparation' },
        { id: `maintenance-${msn}`, title: 'Maintenance' },
      ],
      events: [projectEvent, dealPipeEvent, preparationEvent, maintenanceEvent],
    };
  }
}
