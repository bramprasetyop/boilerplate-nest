import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class AuthAPIHealthIndicator extends HealthIndicator {
  private readonly http: HttpHealthIndicator;

  constructor(http: HttpHealthIndicator) {
    super();
    this.http = http;
  }

  async isHealthy(url: string): Promise<HealthIndicatorResult> {
    try {
      await this.http.pingCheck('auth API', url);
      return this.getStatus('auth API', true);
    } catch (error) {
      return this.getStatus('auth API', false, { message: error.message });
    }
  }
}
