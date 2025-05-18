/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Post, Req, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { LoginDto } from '../dtos/login.dto';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginDto, @Req() req: Request) {
    const tenantId = req.tenantId;
    if (!tenantId) throw new Error('Missing tenant context');

    return this.service.login(tenantId, dto.email, dto.password);
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const accessToken = this.jwtService.sign(
        {
          sub: payload.sub,
          tenantId: payload.tenantId,
          email: payload.email,
        },
        { expiresIn: '15m' },
      );

      return {
        accessToken,
      };
    } catch (err) {
      throw new UnauthorizedException(err, 'Invalid refresh token');
    }
  }
}
