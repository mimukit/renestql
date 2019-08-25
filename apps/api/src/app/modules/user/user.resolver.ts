import { Query, Resolver } from '@nestjs/graphql';

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
  users() {
    return this.userList;
  }
}
