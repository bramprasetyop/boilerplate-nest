import { Process, Processor } from '@nestjs/bull';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { CLAIMS_REPOSITORY } from '@src/core/constants';
import { LoggerService } from '@src/core/service/logger/logger.service';
import { Job } from 'bull';
import { Cache } from 'cache-manager';

import { ClaimCreateRequest, ClaimUpdateRequest } from '../dto';
import { Claim } from '../entity/claim.entity';

@Processor('claimQueue')
export class ClaimProcessor {
  constructor(
    @Inject(CLAIMS_REPOSITORY)
    private readonly claimRepository: typeof Claim,
    private readonly logger: LoggerService,
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache
  ) {}

  @Process('addClaimQueue')
  async processAddClaim(job: Job<ClaimCreateRequest>) {
    const claimData = job.data;

    const t = await this.claimRepository.sequelize.transaction();

    try {
      this.logger.log('Starting add claim in bull processor', '===running===');

      const createdClaim = await this.claimRepository.create<Claim>(claimData, {
        transaction: t,
      });

      await t.commit();
      const keys = await this.cacheService.store.keys();
      const keysToDelete = keys.filter((key) => key.startsWith(`claimData`));

      for (const keyToDelete of keysToDelete) {
        await this.cacheService.del(keyToDelete);
      }

      this.logger.log(
        'Add claim in bull processor done',
        JSON.stringify(createdClaim, null, 2)
      );
      return createdClaim;
    } catch (error) {
      this.logger.error(
        'Add claim in bull processor',
        'Error',
        JSON.stringify(error, null, 2)
      );
      await t.rollback();
      throw error;
    }
  }

  @Process('updateClaimQueue')
  async processUpdateClaim(job: Job<ClaimUpdateRequest>) {
    const claimData = job.data;
    const { id } = claimData;

    const t = await this.claimRepository.sequelize.transaction();

    try {
      this.logger.log(
        'Starting update claim in bull processor',
        '===running==='
      );

      const findClaim = await Claim.findByPk(id);

      const updatedClaim = await findClaim.update(claimData, {
        transaction: t,
      });
      await t.commit();
      const keys = await this.cacheService.store.keys();
      const keysToDelete = keys.filter((key) => key.startsWith('claimData'));

      for (const keyToDelete of keysToDelete) {
        await this.cacheService.del(keyToDelete);
      }

      this.logger.log(
        'Update claim in bull processor done for status 0',
        JSON.stringify(updatedClaim, null, 2)
      );
      return updatedClaim;
    } catch (error) {
      this.logger.error('Update claim in bull processor', 'Error', error);
      await t.rollback();
      throw error;
    }
  }
}
