import { Query, Resolver } from '@nestjs/graphql';
import { User } from '../../graphql.types';
import { UserRepository } from './user.repository';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userRepository: UserRepository) {}

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
