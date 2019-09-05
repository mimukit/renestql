import { Injectable } from '@nestjs/common';
import { User } from '../../graphql.types';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async currentUser(user: User): Promise<User> {
    return this.userRepository.findOne({ id: user.id });
  }
}
