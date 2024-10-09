import { faker } from '@faker-js/faker';
import { Comment, CommentFactory } from './comment-factory';

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
  location: string;
}

export class UserFactory {
  static createUser(): User {
    const id = faker.string.uuid();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`;
    const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    const avatar = `https://api.dicebear.com/9.x/personas/svg?seed=${firstName.toLowerCase()}`;
    const role = faker.helpers.arrayElement(Object.values(UserRole));
    const location = faker.location.city();

    return {
      id,
      name,
      username,
      email,
      avatar,
      role,
      comments: [],
      location,
    };
  }

  static createUsers(amount: number): User[] {
    const users: User[] = [];
    for (let i = 0; i < amount; i++) {
      users.push(this.createUser());
    }

    users.forEach((user) => {
      user.comments = CommentFactory.createComments(faker.number.int({ min: 1, max: 15 }), user.id, users);
    });

    return users;
  }
}
