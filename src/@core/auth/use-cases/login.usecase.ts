import { UserRepository } from 'src/@core/user/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthPayload } from '../entities/auth-payload.entity';

export class LoginUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: {
    email: string;
    password: string;
    tenantId: string;
  }): Promise<AuthPayload> {
    const user = await this.userRepo.findByEmail(input.email, input.tenantId);
    if (!user) throw new Error('Invalid credentials');

    const passwordMatches = await bcrypt.compare(input.password, user.password);
    if (!passwordMatches) throw new Error('Invalid credentials');

    const payload = {
      sub: user.id,
      tenantId: user.tenantId,
      email: user.email,
      roles: user.rules,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    return new AuthPayload(
      user.id,
      user.tenantId,
      user.email,
      String(accessToken),
      String(refreshToken),
    );
  }
}
