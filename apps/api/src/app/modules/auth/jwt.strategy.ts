import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { environment } from 'apps/api/src/environments/environment';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.auth.secretKey,
    });
  }

  async validate(payload: any) {
    const user = { id: payload.userId };
    return user;
  }
}
