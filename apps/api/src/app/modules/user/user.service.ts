import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async currentUser(userId: string, user: any): Promise<User> {
    Logger.debug(user, 'MeQuery');
    return this.userRepository.findOne({ id: userId });
  }
}
