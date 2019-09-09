import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../decorators/currentUser.decorator';
import { User } from '../../graphql.types';
import { GqlAuthGuard } from '../../guards/gqlAuth.guard';
import { Todo } from '../todo/todo.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveProperty('todos')
  async todos(@Parent() user: User): Promise<Todo[]> {
    return await this.userService.getUserTodos(user);
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
