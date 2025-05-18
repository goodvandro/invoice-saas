import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const PUBLIC_ROUTES = ['/auth/login', '/auth/refresh'];

@Injectable()
export class TenantHeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (PUBLIC_ROUTES.includes(req.path)) {
      const tenantHeader = req.headers['tenant-id'];
      req.tenantId = Array.isArray(tenantHeader) ? tenantHeader[0] : tenantHeader || null;
    }

    next();
  }
}
