import { ResourceFactory, UserFactory } from './factories';

const getRandomStartDate = (): string => {
  const startYear = Math.floor(Math.random() * 3) + 2023;
  const startMonth = Math.floor(Math.random() * 12);
  const startDay = Math.floor(Math.random() * 28) + 1;
  const randomStartDate = new Date(startYear, startMonth, startDay);
  return randomStartDate.toISOString().split('T')[0];
};

const generateRandomMSNs = (amount: number): string[] => {
  return Array.from({ length: amount }, () => Math.floor(Math.random() * 2000).toString());
};
const msns = generateRandomMSNs(20);
export const resources = msns.map((msn) => ResourceFactory.createResource(msn, getRandomStartDate()));

export const events = resources.flatMap((resource) => resource.events);

export const users = UserFactory.createUsers(50);
