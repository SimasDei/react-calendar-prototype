import { faker } from '@faker-js/faker';
import { Comment, CommentFactory } from './comment-factory';
import { User } from './user-factory';

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

  private static formatDateTime(date: string, time: string): string {
    return `${date}T${time}`;
  }

  static createEvent(
    type: EventType,
    resourceId: string,
    title: string,
    description: string,
    startDate: string,
    durationDays: number,
    users: User[]
  ): Event {
    const endDate = this.addDaysToDate(startDate, durationDays);

    const numComments = faker.number.int({ min: 1, max: 10 });
    const comments: Comment[] = [];

    for (let i = 0; i < numComments; i++) {
      const commenter = faker.helpers.arrayElement(users);
      const comment = CommentFactory.createComment(commenter.id, users);
      comments.push(comment);
    }

    return {
      id: `${resourceId}-${type}`,
      resourceId,
      title,
      start: this.formatDateTime(startDate, '08:00:00'),
      end: this.formatDateTime(endDate, '17:00:00'),
      extendedProps: {
        type,
        gradient: this.gradientMap[type],
        description,
        comments,
      },
    };
  }

  public static addDaysToDate(date: string, days: number): string {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

export class ResourceFactory {
  static createResource(msn: string, startDate: string, users: User[]): Resource {
    const preparationDuration = Math.floor(Math.random() * 30) + 15;
    const maintenanceDuration = Math.floor(Math.random() * 30) + 15;
    const projectDuration = preparationDuration + maintenanceDuration + Math.floor(Math.random() * 30) + 15;

    const projectEvent = EventFactory.createEvent(
      EventType.Project,
      `MSN-${msn}`,
      'MSN Project',
      'Project Description',
      startDate,
      projectDuration,
      users
    );

    const preparationEvent = EventFactory.createEvent(
      EventType.Preparation,
      `preparation-${msn}`,
      'Source Project Preparation',
      'Preparation Description',
      startDate,
      preparationDuration,
      users
    );

    const maintenanceStartDate = EventFactory.addDaysToDate(startDate, preparationDuration + 1);
    const maintenanceEvent = EventFactory.createEvent(
      EventType.Maintenance,
      `maintenance-${msn}`,
      'Maintenance',
      'Maintenance Description',
      maintenanceStartDate,
      maintenanceDuration,
      users
    );

    const dealPipeStart = startDate;
    const dealPipeEvent = EventFactory.createEvent(
      EventType.DealPipe,
      `deal-pipe-${msn}`,
      'Deal Pipe',
      'Deal Pipe Description',
      dealPipeStart,
      projectDuration,
      users
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
