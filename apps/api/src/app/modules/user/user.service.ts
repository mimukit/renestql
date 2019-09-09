import { Injectable } from '@nestjs/common';
import { User } from '../../graphql.types';
import { TodoRepository } from '../todo/todo.repository';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly todoRepository: TodoRepository
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserTodos(user: User) {
    return await this.todoRepository.todoLoaderByUserId.load(user.id);
  }

  currentUser(user: User): User {
    return user;
  }
}
