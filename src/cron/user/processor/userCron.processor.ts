import { Process, Processor } from '@nestjs/bull';
import { LoggerService } from '@src/core/service/logger/logger.service';

@Processor('userCronQueue')
export class UserCronProcessor {
  constructor(private readonly logger: LoggerService) {}

  @Process('addUserCronQueue')
  async processUser() {
    try {
      this.logger.log(
        'starting run cron user in bull processor',
        '===running==='
      );
      this.logger.log(
        'run cron user in bull processorr done',
        '======finish======'
      );
    } catch (error) {
      this.logger.error(
        'run cron user in bull processor',
        'error',
        JSON.stringify(error, null, 2)
      );
    }
  }
}
