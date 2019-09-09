import { Injectable } from '@nestjs/common';
import { CUSTOM_ID_PREFIX } from '../../const';
import { CreateTodoInput } from '../../graphql.types';
import { gererateCustomId } from '../../utils';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { Todo } from './todo.entity';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly todoRepository: TodoRepository
  ) {}

  async getAllTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async getTodoUser(todo: Todo) {
    const [user] = await this.userRepository.userLoaderById.load(todo.userId);
    return user;
  }

  async createTodo(data: CreateTodoInput, user?: User): Promise<Todo> {
    const { title, description } = data;

    const todoId = await gererateCustomId(CUSTOM_ID_PREFIX.TODO);

    const todo = await this.todoRepository.save({
      todoId,
      title,
      description,
      user,
    });

    return todo;
  }
}
