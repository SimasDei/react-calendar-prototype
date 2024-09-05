// src/resources.ts
import { ResourceFactory } from './factories';

// Helper function to generate random start dates
const getRandomStartDate = (): string => {
  const today = new Date();
  const randomDaysOffset = Math.floor(Math.random() * 30); // Randomly offset the start date by up to 30 days
  today.setDate(today.getDate() + randomDaysOffset);
  return today.toISOString().split('T')[0];
};

// Generate resources and events for multiple MSNs
const msns = ['1421', '1626', '1088', '1433', '1232'];
export const resources = msns.map((msn) => ResourceFactory.createResource(msn, getRandomStartDate()));

// Extract the events from the resources to create a single list of events for FullCalendar
export const events = resources.flatMap((resource) => resource.events);
