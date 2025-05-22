import { Injectable } from '@nestjs/common';
import { UserProps } from 'src/@core/user/entities/user.entity';
import { CreateUserUseCase } from 'src/@core/user/use-cases/create-user.usecase';

@Injectable()
export class UserService {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async create(data: UserProps) {
    return this.createUserUseCase.execute(data);
  }
}
