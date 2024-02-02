import { HttpModule } from '@nestjs/axios';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import {
  Inject,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import * as redisStore from 'cache-manager-redis-store';

import { AuthModule } from './auth/auth.module';
import { ClaimsModule } from './claims/claims.module';
import { DatabaseModule } from './core/database/database.module';
import { ResponseMiddleware } from './core/middleware';
import { HealthCheckModule } from './core/service/healthCheck/healthCheck.module';
import { LoggerService } from './core/service/logger/logger.service';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    DatabaseModule,
    AuthModule,
    CronModule,
    HealthCheckModule,
    ClaimsModule,
    HttpModule.register({
      timeout: 150000,
    }),
  ],
  providers: [LoggerService],
})
export class AppModule {
  constructor(@Inject(CACHE_MANAGER) cacheManager) {
    try {
      const client = cacheManager.store.getClient();

      client.on('error', (error) => {
        console.info(`Redis error: ${error}`);
      });

      client.on('end', () => {
        console.info('Redis connection ended');
      });

      client.on('reconnecting', () => {
        console.info('Redis is reconnecting');
      });
    } catch (error) {
      console.error(
        `Error while initializing Redis connection: ${error.message}`
      );
    }
  }

  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ResponseMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
