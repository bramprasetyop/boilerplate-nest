import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { LoggerService } from '../core/service/logger/logger.service';
import { QueueModule } from '../core/service/queue/queue.module';
import { UserCronProcessor } from './user/processor/userCron.processor';
import { UsersCronService } from './user/user.cron';

@Module({
  imports: [
    QueueModule,
    BullModule.registerQueue({
      name: 'userCronQueue',
    }),
  ],
  providers: [UsersCronService, LoggerService, UserCronProcessor],
  controllers: [],
  exports: [UsersCronService, LoggerService],
})
export class CronModule {}
