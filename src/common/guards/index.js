import { CanActivate } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { UnauthorizedException } from '../exceptions';

export class JwtGuard {
  canActivate(context) {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers.authorization;

    if (!auth) {
      throw new UnauthorizedException('Missing authorization header');
    }

    const token = auth.replace('Bearer ', '');

    try {
      const payload = verify(token, process.env.JWT_SECRET || 'secret-key');
      request.user = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

export class RolesGuard {
  canActivate(context) {
    const request = context.switchToHttp().getRequest();
    const requiredRoles = Reflect.getMetadata('roles', context.getHandler());

    if (!requiredRoles) {
      return true;
    }

    const userRole = request.user?.role;
    return requiredRoles.includes(userRole);
  }
}
