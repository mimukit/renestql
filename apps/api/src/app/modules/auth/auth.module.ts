import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { environment } from 'apps/api/src/environments/environment';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: environment.auth.secretKey,
      signOptions: { expiresIn: environment.auth.tokenExpiresIn },
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
})
export class AuthModule {}
