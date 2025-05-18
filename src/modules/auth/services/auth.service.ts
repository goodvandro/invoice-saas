import { Injectable } from '@nestjs/common';
import { LoginUseCase } from 'src/@core/auth/use-cases/login.usecase';

@Injectable()
export class AuthService {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  async login(tenantId: string, email: string, password: string) {
    return this.loginUseCase.execute({ email, password, tenantId });
  }
}
