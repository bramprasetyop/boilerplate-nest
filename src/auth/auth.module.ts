import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LoggerService } from '@src/core/service/logger/logger.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION }
    })
  ],
  providers: [AuthService, LoggerService, JwtService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
