import { UsePipes } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { loginInputSchema, registerInputSchema } from '@nx-intro/schema';
import { AuthPayload, LoginInput, RegisterInput } from '../../graphql.types';
import { YupValidationPipe } from '../../pipes/yupValidation.pipe';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('register')
  @UsePipes(new YupValidationPipe(registerInputSchema))
  async register(@Args('data') data: RegisterInput): Promise<AuthPayload> {
    return this.authService.register(data);
  }

  @Mutation('login')
  @UsePipes(new YupValidationPipe(loginInputSchema))
  async login(@Args('data') data: LoginInput): Promise<AuthPayload> {
    return this.authService.login(data);
  }
}
