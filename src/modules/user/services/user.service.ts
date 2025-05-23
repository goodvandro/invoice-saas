import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/@core/user/dtos/create-user.dto';
import { CreateUserUseCase } from 'src/@core/user/use-cases/create-user.usecase';

@Injectable()
export class UserService {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async create(data: CreateUserDto) {
    return this.createUserUseCase.execute(data);
  }
}
