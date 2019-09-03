import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { PASSWORD_HASH_ROUND } from '../../const';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async getToken(user: User) {
    const payload = { userId: user.id };

    return this.jwtService.signAsync(payload);
  }

  async getHashPassword(password: string) {
    return await bcrypt.hash(password, PASSWORD_HASH_ROUND);
  }
}
