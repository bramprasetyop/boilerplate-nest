import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

import { AuthAPIHealthIndicator } from './healthCheck.authApi.service';
import { RedisHealthIndicator } from './healthCheck.redis.service';
import { SequelizeHealthIndicator } from './healthCheck.sequelize.service';

@Controller('health-check')
export class HealthCheckController {
  constructor(
    private readonly connection: HealthCheckService,
    private readonly sequelizeHealthIndicator: SequelizeHealthIndicator,
    private readonly redisHealthIndicator: RedisHealthIndicator,
    private readonly authApiHealthIndicator: AuthAPIHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.connection.check([
      () => this.sequelizeHealthIndicator.isHealthy(),
      () => this.redisHealthIndicator.isHealthy(),
      async () =>
        await this.authApiHealthIndicator.isHealthy(`${process.env.AUTH_API}`),
    ]);
  }
}
