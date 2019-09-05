import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../decorators/currentUser.decorator';
import { User } from '../../graphql.types';
import { GqlAuthGuard } from '../../guards/gqlAuth.guard';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('users')
  async users(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Query('whoami')
  @UseGuards(GqlAuthGuard)
  async whoami(@CurrentUser() user: any): Promise<User> {
    return await this.userService.currentUser(
      '6e21d216-a369-4929-912f-0791c629d0c0',
      user
    );
  }
}
