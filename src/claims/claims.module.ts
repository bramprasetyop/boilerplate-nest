import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/core/database/database.module';
import { LoggerService } from '@src/core/service/logger/logger.service';
import { QueueModule } from '@src/core/service/queue/queue.module';

import { ClaimsController } from './claims.controller';
import { claimProviders } from './claims.providers';
import { ClaimProcessor } from './processors/claims.processor';
import { ClaimsService } from './service/claims.service';

@Module({
  imports: [
    QueueModule,
    BullModule.registerQueue(
      {
        name: 'claimQueue'
      },
      {
        name: 'portalMemberClaimQueue'
      },
      {
        name: 'claimCronQueue'
      }
    ),
    DatabaseModule
  ],
  providers: [ClaimsService, ...claimProviders, LoggerService, ClaimProcessor],
  controllers: [ClaimsController],
  exports: [ClaimsService, LoggerService]
})
export class ClaimsModule {}
