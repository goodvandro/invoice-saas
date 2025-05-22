import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../services/user.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserProps } from 'src/@core/user/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDto, @Req() req: Request) {
    const tenantId = req.tenantId; // Middleware já atribui
    if (!tenantId) {
      throw new Error('Tenant ID not found in request');
    }

    const data: Partial<UserProps> = {
      ...dto,
      tenantId,
    };

    return this.service.create(data as UserProps);
  }
}
