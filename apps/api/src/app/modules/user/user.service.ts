import { Injectable } from '@nestjs/common';
import { User } from '../../graphql.types';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  currentUser(user: User): User {
    return user;
  }
}
