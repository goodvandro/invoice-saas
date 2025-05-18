import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../services/user.service';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDto, @Req() req: Request) {
    const tenantId = req.tenantId; // Middleware já atribui
    if (!tenantId) {
      throw new Error('Tenant ID not found in request');
    }

    return this.service.create({ ...dto, tenantId });
  }
}
