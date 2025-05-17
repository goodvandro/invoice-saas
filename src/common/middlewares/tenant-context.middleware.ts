import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class TenantContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const tenantHeader = req.headers['tenant-id'];
    req.tenantId = Array.isArray(tenantHeader)
      ? tenantHeader[0] // pega o primeiro se for array
      : tenantHeader || null;

    next();
  }
}
