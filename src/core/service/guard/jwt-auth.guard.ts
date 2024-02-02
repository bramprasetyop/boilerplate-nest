import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import {
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(@Inject(CACHE_MANAGER) private cacheService: CacheStore) {
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
        throw Error('Permintaan tidak ter-autentikasi!');
      }

      const decoded = jwt.decode(accessToken);

      // Check if jwt token has expired
      if (
        !/token\/refresh$/.test(request.route.path) &&
        Date.now() >= decoded['exp'] * 1000
      ) {
        throw new ForbiddenException('Sesi telah habis!');
      }

      // Place decoded token on request context ===> user
      request.user = decoded;

      return true;
    } catch (e) {
      if (e instanceof ForbiddenException) {
        throw new ForbiddenException(e.message);
      }

      throw new UnauthorizedException(e.message);
    }
  }
}
