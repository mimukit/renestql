import { UseGuards, UsePipes } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { createTodoInputSchema } from '@nx-intro/schema';
import { CurrentUser } from '../../decorators/currentUser.decorator';
import { CreateTodoInput } from '../../graphql.types';
import { GqlAuthGuard } from '../../guards/gqlAuth.guard';
import { YupValidationPipe } from '../../pipes/yupValidation.pipe';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Resolver('Todo')
export class TodoResolver {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly todoService: TodoService
  ) {}

  @ResolveProperty('user')
  async user(@Parent() todo: Todo) {
    const { userId } = todo;
    return await this.userRepository.findOne({ id: userId });
  }

  @Query('todos')
  async users(): Promise<Todo[]> {
    return await this.todoService.getAllTodos();
  }

  @Mutation('createTodo')
  @UseGuards(GqlAuthGuard)
  @UsePipes(new YupValidationPipe(createTodoInputSchema))
  async createTodo(
    @Args('data') data: CreateTodoInput,
    @CurrentUser() user: User
  ): Promise<Todo> {
    return this.todoService.createTodo(data, user);
  }
}
