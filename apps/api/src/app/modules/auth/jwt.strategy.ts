import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { environment } from 'apps/api/src/environments/environment';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.auth.secretKey,
    });
  }

  async validate(payload: any) {
    let user = {};

    const { userId } = payload;

    if (userId) {
      user = await this.userRepository.findOne({ id: userId });
    }

    return user;
  }
}
