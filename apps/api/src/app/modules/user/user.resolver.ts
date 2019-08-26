import { Query, Resolver } from '@nestjs/graphql';
import { User } from '../../graphql.types';

@Resolver('User')
export class UserResolver {
  userList = [
    {
      id: '123',
      name: 'John Doe',
      age: 20,
    },
  ];

  @Query()
  users(): User[] {
    return this.userList;
  }
}
