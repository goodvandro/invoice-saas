import 'express';

declare module 'express' {
  export interface Request {
    tenantId?: string | null;
  }
}
