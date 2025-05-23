import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/@core/user/dtos/create-user.dto';
import { FindUsersFilterParams } from 'src/@core/user/repositories/user.repository';
import { CreateUserUseCase } from 'src/@core/user/use-cases/create-user.usecase';
import { ListUsersUseCase } from 'src/@core/user/use-cases/list-users.usecase';

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly listUserUseCase: ListUsersUseCase,
  ) {}

  async create(data: CreateUserDto) {
    return this.createUserUseCase.execute(data);
  }

  async list(dto: FindUsersFilterParams) {
    return this.listUserUseCase.execute(dto);
  }
}
