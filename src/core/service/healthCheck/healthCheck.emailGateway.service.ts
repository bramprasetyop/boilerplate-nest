import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class EmailGatewayHealthIndicator extends HealthIndicator {
  private readonly http: HttpHealthIndicator;

  constructor(http: HttpHealthIndicator) {
    super();
    this.http = http;
  }

  async isHealthy(url: string): Promise<HealthIndicatorResult> {
    try {
      await this.http.pingCheck('emailGateway', url);
      return this.getStatus('emailGateway', true);
    } catch (error) {
      return this.getStatus('emailGateway', false, { message: error.message });
    }
  }
}
