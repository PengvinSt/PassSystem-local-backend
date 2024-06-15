import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user.module';

import { JwtStrategy } from '../utilities/jwt.strategy';
import { AuthService } from '../services/auth.service';
import { AuthResolver } from '../resolver/auth.resolver';
import { VerifyModule } from './verify.module';
import { UtilityModule } from './utility.module';

@Module({
  imports: [
    UserModule,
    VerifyModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    UtilityModule,
  ],

  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
