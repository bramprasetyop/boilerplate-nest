import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
// import { Cron } from '@nestjs/schedule';
import { Queue } from 'bull';

@Injectable()
export class UsersCronService {
  constructor(@InjectQueue('userCronQueue') private userCronQueue: Queue) {}

  // @Cron('45 * * * * *')
  // async userCron(): Promise<any> {
  //   await this.userCronQueue.add('addUserCronQueue');
  // }
}
