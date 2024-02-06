import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { TokenExpiredError } from 'jsonwebtoken';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheService: Cache) {
    super();
  }

  handleRequest(err, user, info: Error) {
    if (info instanceof TokenExpiredError) {
      return true;
    }
    return user;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

      if (!accessToken) {
        throw Error('Request Unauthorized!');
      }

      return true;
    } catch (e) {
      if (e instanceof ForbiddenException) {
        throw new ForbiddenException(e.message);
      }

      throw new UnauthorizedException(e.message);
    }
  }
}
