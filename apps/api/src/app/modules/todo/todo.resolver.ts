import { UsePipes } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { createTodoInputSchema } from '@nx-intro/schema';
import { CreateTodoInput } from '../../graphql.types';
import { YupValidationPipe } from '../../pipes/yupValidation.pipe';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Resolver('TodoResolver')
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query('todos')
  async users(): Promise<Todo[]> {
    return await this.todoService.getAllTodos();
  }

  @Mutation('createTodo')
  @UsePipes(new YupValidationPipe(createTodoInputSchema))
  async createTodo(@Args('data') data: CreateTodoInput): Promise<Todo> {
    return this.todoService.createTodo(data);
  }
}
