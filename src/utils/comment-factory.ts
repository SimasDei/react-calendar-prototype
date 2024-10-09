import { faker } from '@faker-js/faker';
import { User } from './user-factory';

export interface Comment {
  id: string;
  text: string;
  date: string;
  userId: string;
}

export class CommentFactory {
  static createComment(userId: string, users: User[]): Comment {
    const taggedUser = faker.helpers.arrayElement(users);
    return {
      id: faker.string.uuid(),
      text: `${faker.lorem.sentence()} @${taggedUser.username}`,
      date: faker.date.past().toISOString(),
      userId,
    };
  }

  static createComments(amount: number, userId: string, users: User[]): Comment[] {
    const comments: Comment[] = [];
    for (let i = 0; i < amount; i++) {
      comments.push(this.createComment(userId, users));
    }
    return comments;
  }
}
