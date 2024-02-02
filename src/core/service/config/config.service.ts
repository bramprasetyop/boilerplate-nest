class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`Missing configuration for key: ${key}`);
    }

    return value || '';
  }

  public ensureValues(keys: string[]) {
    try {
      keys.forEach((k) => this.getValue(k, true));
      return this;
    } catch (error) {
      throw error;
    }
  }
}

export const checkConfigService = () =>
  new ConfigService(process.env).ensureValues([
    'APP_PORT',
    'NODE_ENV',
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PASS',
    'DB_DIALECT',
    'DB_NAME_TEST',
    'DB_NAME_DEVELOPMENT',
    'DB_NAME_PRODUCTION',
    'JWT_KEY',
    'TOKEN_EXPIRATION',
    'REDIS_HOST',
    'REDIS_PORT',
    'MASTER_KEY',
    'MAIL_GATEWAY',
    'BULLMQ_PASS',
  ]);
