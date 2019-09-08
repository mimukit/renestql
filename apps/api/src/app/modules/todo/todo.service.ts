import { Injectable } from '@nestjs/common';
import { CUSTOM_ID_PREFIX } from '../../const';
import { CreateTodoInput } from '../../graphql.types';
import { gererateCustomId } from '../../utils';
import { Todo } from './todo.entity';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async getAllTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async createTodo({ title, description }: CreateTodoInput): Promise<Todo> {
    const todoId = await gererateCustomId(CUSTOM_ID_PREFIX.TODO);

    const todo = await this.todoRepository.save({
      todoId,
      title,
      description,
    });

    return todo;
  }
}
