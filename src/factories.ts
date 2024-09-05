// src/factories.ts
export type EventType = 'deal-pipe' | 'maintenance' | 'preparation';

export class EventFactory {
  private static gradientMap = {
    'deal-pipe': 'linear-gradient(45deg, #368FD8, #1940F1)', // Deal Pipe Gradient
    maintenance: 'linear-gradient(45deg, #CCBE3C, #9A7E1C)', // Maintenance Gradient
    preparation: 'linear-gradient(45deg, #3CCC98, #1C9A6D)', // Preparation Gradient
  };

  // Generate event with a random duration
  static createEvent(type: EventType, resourceId: string, title: string, startDate: string, durationDays: number, dependency?: string) {
    const endDate = this.addDaysToDate(startDate, durationDays);
    return {
      id: `${resourceId}-${type}`,
      resourceId: resourceId,
      title: title,
      start: `${startDate}T08:00:00`,
      end: `${endDate}T17:00:00`,
      extendedProps: {
        type: type,
        gradient: this.gradientMap[type],
      },
      dependency: dependency,
    };
  }

  // Helper to add days to a date string
  public static addDaysToDate(date: string, days: number): string {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate.toISOString().split('T')[0];
  }
}

export class ResourceFactory {
  static createResource(msn: string, startDate: string) {
    // Duration for each event type
    const dealPipeDuration = 30; // Deal Pipe lasts the entire project
    const preparationDuration = 5; // Preparation lasts 5 days
    const maintenanceDuration = 7; // Maintenance lasts 7 days

    // Create events for each stage of the MSN's lifecycle
    const dealPipeEvent = EventFactory.createEvent('deal-pipe', `deal-pipe-${msn}`, 'Deal Pipe', startDate, dealPipeDuration);

    const preparationEvent = EventFactory.createEvent(
      'preparation',
      `preparation-${msn}`,
      'Source Project Preparation',
      startDate,
      preparationDuration
    );

    const maintenanceEvent = EventFactory.createEvent(
      'maintenance',
      `maintenance-${msn}`,
      'Maintenance',
      EventFactory.addDaysToDate(startDate, preparationDuration + 1), // Maintenance starts after Preparation
      maintenanceDuration,
      preparationEvent.id // Maintenance depends on Preparation
    );

    return {
      id: `MSN-${msn}`,
      title: `MSN - ${msn}`,
      children: [
        { id: `deal-pipe-${msn}`, title: 'Deal Pipe' },
        { id: `preparation-${msn}`, title: 'Source Project Preparation' },
        { id: `maintenance-${msn}`, title: 'Maintenance' },
      ],
      events: [dealPipeEvent, preparationEvent, maintenanceEvent],
    };
  }
}
