import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PASSWORD_HASH_ROUND } from '../../const';
import { AuthPayload, LoginInput, RegisterInput } from '../../graphql.types';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async register({ email, password }: RegisterInput): Promise<AuthPayload> {
    // Check if user with input email already exists
    const userExists = await this.userRepository.findOne({ email });

    if (userExists && userExists.id) {
      throw new BadRequestException('User already exists with this email');
    }

    // Create new user with inputs

    const hashPassword = await this.getHashPassword(password);

    const user = this.userRepository.create({ email, password: hashPassword });

    const newUser = await this.userRepository.save(user);

    // Generate login token for new user

    const token = await this.getToken(newUser);

    return {
      token,
      user: newUser,
    };
  }

  async login({ email, password }: LoginInput): Promise<AuthPayload> {
    // Check if user with input email exists''
    const user = await this.userRepository.findOne({ email });

    if (!user || !user.id) {
      throw new BadRequestException('login failed, invalid email or password');
    }

    // Verify password
    const userPassword = await this.userRepository.findOne(
      { id: user.id },
      { select: ['password'] }
    );

    const validPassword = await this.verifyPassword(
      password,
      userPassword.password
    );

    if (!validPassword) {
      throw new BadRequestException('login failed, invalid email or password');
    }

    // Generate login token for new user

    const token = await this.getToken(user);

    return {
      token,
      user,
    };
  }

  async getToken(user: User): Promise<string> {
    const payload = { userId: user.id };

    return this.jwtService.signAsync(payload);
  }

  async getHashPassword(password: string) {
    return await bcrypt.hash(password, PASSWORD_HASH_ROUND);
  }

  async verifyPassword(
    inputPassword: string,
    actualPasswordHash: string
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, actualPasswordHash);
  }
}
