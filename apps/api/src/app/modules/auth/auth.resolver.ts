import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload, RegisterInput } from '../../graphql.types';
import { UserRepository } from '../user/user.repository';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService
  ) {}

  @Mutation('register')
  async register(@Args('data') { email, password }: RegisterInput): Promise<
    AuthPayload
  > {
    // Check if user with input email already exists
    const userExists = await this.userRepository.findOne({ email });

    if (userExists && userExists.id) {
      throw new BadRequestException('User already exists with this email');
    }

    // Create new user with inputs

    const hashPassword = await this.authService.getHashPassword(password);

    const user = this.userRepository.create({ email, password: hashPassword });

    const newUser = await this.userRepository.save(user);

    // Generate login token for new user

    const token = await this.authService.getToken(newUser);

    return {
      token,
      user: newUser,
    };
  }
}
