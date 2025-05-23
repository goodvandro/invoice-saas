import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateUserDtoValidation } from '../dtos/create-user.dto';
import { CreateUserDto } from 'src/@core/user/dtos/create-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDtoValidation, @Req() req: Request) {
    const tenantId = req.tenantId; // Middleware já atribui
    if (!tenantId) {
      throw new Error('Tenant ID not found in request');
    }

    const data: CreateUserDto = {
      ...dto,
      tenantId,
    };

    return this.service.create(data);
  }
}
