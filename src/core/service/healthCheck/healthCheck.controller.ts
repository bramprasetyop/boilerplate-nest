import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

import { EmailGatewayHealthIndicator } from './healthCheck.emailGateway.service';
import { RedisHealthIndicator } from './healthCheck.redis.service';
import { SequelizeHealthIndicator } from './healthCheck.sequelize.service';

@Controller('health-check')
export class HealthCheckController {
  constructor(
    private readonly connection: HealthCheckService,
    private readonly sequelizeHealthIndicator: SequelizeHealthIndicator,
    private readonly redisHealthIndicator: RedisHealthIndicator,
    private readonly emailGatewayHealthIndicator: EmailGatewayHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.connection.check([
      () => this.sequelizeHealthIndicator.isHealthy(),
      () => this.redisHealthIndicator.isHealthy(),
      async () =>
        await this.emailGatewayHealthIndicator.isHealthy(
          `${process.env.MAIL_GATEWAY}sendmailexternal.php`
        ),
    ]);
  }
}
