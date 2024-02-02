import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { DatabaseModule } from '@src/core/database/database.module';

import { AuthAPIHealthIndicator } from './healthCheck.authApi.service';
import { HealthCheckController } from './healthCheck.controller';
import { connectionCheckProviders } from './healthCheck.providers';
import { RedisHealthIndicator } from './healthCheck.redis.service';
import { SequelizeHealthIndicator } from './healthCheck.sequelize.service';

@Module({
  imports: [TerminusModule, DatabaseModule],
  controllers: [HealthCheckController],
  providers: [
    SequelizeHealthIndicator,
    RedisHealthIndicator,
    ...connectionCheckProviders,
    AuthAPIHealthIndicator,
  ],
})
export class HealthCheckModule {}
