import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const PUBLIC_ROUTES = ['/auth/login', '/auth/refresh'];

@Injectable()
export class TenantHeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (PUBLIC_ROUTES.includes(req.originalUrl)) {
      const tenantHeader = req.headers['tenant-id'];
      const tenantId = Array.isArray(tenantHeader) ? tenantHeader[0] : tenantHeader;

      if (!tenantId || typeof tenantId !== 'string') {
        throw new UnauthorizedException('Missing tenant-id header');
      }

      req.tenantId = tenantId;
    }

    next();
  }
}
