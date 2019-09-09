import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from 'apps/api/src/environments/environment';
import { UserRepository } from '../user/user.repository';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: environment.auth.secretKey,
      signOptions: { expiresIn: environment.auth.tokenExpiresIn },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
})
export class AuthModule {}
