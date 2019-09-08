import { Injectable } from '@nestjs/common';
import { CUSTOM_ID_PREFIX } from '../../const';
import { CreateTodoInput } from '../../graphql.types';
import { gererateCustomId } from '../../utils';
import { User } from '../user/user.entity';
import { Todo } from './todo.entity';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async getAllTodos(): Promise<Todo[]> {
    return this.todoRepository.find({ relations: ['user'] });
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
