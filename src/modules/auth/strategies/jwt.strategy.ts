import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'jwt-secret', // TODO: move to env
    });
  }

  async validate(payload: any) {
    // the payload come from the token
    return { userId: payload.sub, tenantId: payload.tenantId, email: payload.email };
  }
}
