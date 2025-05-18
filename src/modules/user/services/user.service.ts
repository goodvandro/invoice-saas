import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from 'src/@core/user/use-cases/create-user.usecase';

@Injectable()
export class UserService {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async create(data: { tenantId: string; name: string; email: string; password: string }) {
    return this.createUserUseCase.execute(data);
  }
}
