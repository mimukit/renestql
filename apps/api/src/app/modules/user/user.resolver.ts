import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../decorators/currentUser.decorator';
import { User } from '../../graphql.types';
import { GqlAuthGuard } from '../../guards/gqlAuth.guard';
import { TodoRepository } from '../todo/todo.repository';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly userService: UserService
  ) {}

  @ResolveProperty('todos')
  async user(@Parent() user: User) {
    return await this.todoRepository.todoLoaderByUserId.load(user.id);
  }

  @Query('users')
  async users(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Query('whoami')
  @UseGuards(GqlAuthGuard)
  whoami(@CurrentUser() user: User): User {
    return this.userService.currentUser(user);
  }
}
