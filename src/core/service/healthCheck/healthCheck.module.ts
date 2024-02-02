import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { DatabaseModule } from '@src/core/database/database.module';

import { HealthCheckController } from './healthCheck.controller';
import { EmailGatewayHealthIndicator } from './healthCheck.emailGateway.service';
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
    EmailGatewayHealthIndicator,
  ],
})
export class HealthCheckModule {}
