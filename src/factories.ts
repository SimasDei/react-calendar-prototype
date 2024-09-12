import { faker } from '@faker-js/faker';

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
  };
}

export interface Resource {
  id: string;
  title: string;
  children: { id: string; title: string }[];
  events: Event[];
}

export enum UserRole {
  Admin = 'Admin',
  Editor = 'Editor',
  Maintenance = 'Maintenance',
  Engineer = 'Engineer',
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  role: UserRole;
  comments: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  date: string;
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

export class CommentFactory {
  static createComment(users: User[]): Comment {
    const taggedUser = faker.helpers.arrayElement(users);
    return {
      id: faker.string.uuid(),
      text: `${faker.lorem.sentence()} @${taggedUser.username}`,
      date: faker.date.past().toISOString(),
    };
  }

  static createComments(amount: number, users: User[]): Comment[] {
    const comments: Comment[] = [];
    for (let i = 0; i < amount; i++) {
      comments.push(this.createComment(users));
    }
    return comments;
  }
}

export class UserFactory {
  static createUser(): User {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`;
    const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    const avatar = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${firstName.toLowerCase()}`;
    const role = faker.helpers.arrayElement(Object.values(UserRole));

    return {
      id: faker.string.uuid(),
      name,
      username,
      email,
      avatar,
      role,
      comments: [],
    };
  }

  static createUsers(amount: number): User[] {
    const users: User[] = [];
    for (let i = 0; i < amount; i++) {
      users.push(this.createUser());
    }

    users.forEach((user) => {
      user.comments = CommentFactory.createComments(faker.number.int({ min: 1, max: 5 }), users);
    });

    return users;
  }
}
