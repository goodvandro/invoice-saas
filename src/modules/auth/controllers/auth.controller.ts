import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { LoginDto } from '../dtos/login.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto, @Req() req: Request) {
    const tenantId = req.tenantId;
    if (!tenantId) throw new Error('Missing tenant context');

    return this.service.login(tenantId, dto.email, dto.password);
  }
}
