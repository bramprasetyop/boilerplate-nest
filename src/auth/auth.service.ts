import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { DataWithStatusRes } from '@src/core/dto/global.dto';
import { LoggerService } from '@src/core/service/logger/logger.service';
import axios from 'axios';

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

    const externalUrl = `${process.env.AUTH_API}auth/login`;

    try {
      const response = await axios.post(externalUrl, {
        username,
        password,
        appcode: process.env.AUTH_API_APP_CODE,
      });

      return {
        token: response.data.token,
        token_expired: +response.data.token_expiration,
      };
    } catch (error) {
      this.logger.error('External request failed', 'error', error);
      throw new Error('External request failed');
    }
  }

  async logout(): Promise<DataWithStatusRes<object>> {
    return {
      status_description: 'Logout berhasil!',
      data: {},
    };
  }
}
