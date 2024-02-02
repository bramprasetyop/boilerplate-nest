import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { DataWithStatusRes } from '@src/core/dto/global.dto';
import { LoggerService } from '@src/core/service/logger/logger.service';
import * as crypto from 'crypto';

import { LoginDto, LoginResponseDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: LoggerService,
    @Inject(CACHE_MANAGER) private cacheService: CacheStore
  ) {}

  async login(payload: LoginDto): Promise<LoginResponseDto> {
    const { username, password } = payload;

    this.logger.log(`Start ===> Login user \'${username}\' session.`, '');
    const passwordMD5 = crypto.createHash('md5').update(password).digest('hex');

    return {
      token: passwordMD5,
      token_expired: +process.env.TOKEN_EXPIRATION,
    };
  }

  async logout(): Promise<DataWithStatusRes<object>> {
    return {
      status_description: 'Logout berhasil!',
      data: {},
    };
  }
}
