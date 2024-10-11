import { faker } from '@faker-js/faker';
import { Task } from 'frappe-gantt-react';
import { Resource } from './event-factory';

export enum TaskName {
  EngineInspection = 'Engine Inspection',
  LandingGearOverhaul = 'Landing Gear Overhaul',
  AvionicsCheck = 'Avionics Check',
  CompleteCheck = 'Complete Check',
}

export interface Aircraft {
  id: string;
  name: string;
  tasks: Task[];
}

export class MaintenanceTaskFactory {
  static createTask(id: string, name: string, start: string, end: string, progress: number, dependencies: string): Task {
    return new Task({ id, name, start, end, progress, dependencies });
  }

  static createTasks(numTasks: number, aircraftId: string): Task[] {
    const taskNames = Object.values(TaskName);
    const tasks: Task[] = [];
    let previousEndDate = faker.date.future().toISOString().split('T')[0];
    let earliestStartDate = previousEndDate;

    for (let i = 0; i < numTasks; i++) {
      const name = taskNames[i % taskNames.length];
      const startDate = this.addDaysToDate(previousEndDate, i % 2 === 0 ? 1 : -2);
      const endDate = this.addDaysToDate(startDate, faker.number.int({ min: 1, max: 5 }));
      const progress = faker.number.int({ min: 0, max: 100 });
      const dependencies = i > 0 ? tasks[i - 1].id : '';

      const taskId = `Task ${i + 1} - Aircraft ${aircraftId}`;
      const taskName = `${name} - Aircraft ${aircraftId}`;

      const task = this.createTask(taskId, taskName, startDate, endDate, progress, dependencies);
      tasks.push(task);
      previousEndDate = endDate;

      if (new Date(startDate) < new Date(earliestStartDate)) {
        earliestStartDate = startDate;
      }
    }

    const mainTaskStart = earliestStartDate;
    const mainTaskEnd = tasks[tasks.length - 1].end;
    const mainTask = this.createTask(`Main Task - Aircraft ${aircraftId}`, 'Complete Maintenance', mainTaskStart, mainTaskEnd, 0, '');

    return [mainTask, ...tasks];
  }

  private static addDaysToDate(date: string, days: number): string {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate.toISOString().split('T')[0];
  }
}

export class AircraftFactory {
  static createAircraft(resource: Resource, numTasks: number): Aircraft {
    const id = resource.id;
    const msn = resource.title;
    const tasks = MaintenanceTaskFactory.createTasks(numTasks, resource.id);
    return { id, name: msn, tasks };
  }

  static createAircrafts(resources: Resource[], numTasks: number): Aircraft[] {
    return resources.map((resource) => this.createAircraft(resource, numTasks));
  }
}
