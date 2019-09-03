import { Query, Resolver } from '@nestjs/graphql';
import { User } from '../../graphql.types';
import { UserRepository } from './user.repository';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userRepository: UserRepository) {}

  @Query()
  async users(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
