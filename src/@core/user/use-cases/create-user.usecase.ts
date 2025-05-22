import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { User, UserProps } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

export class CreateUserUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(input: UserProps): Promise<User> {
    const exists = await this.repo.findByEmail(input.email, input.tenantId);
    if (exists) throw new ConflictException('User already exists for this tenant');

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = new User({
      id: randomUUID(),
      tenantId: input.tenantId,
      name: input.name,
      email: input.email,
      isActive: input.isActive,
      password: hashedPassword,
      rules: input.rules,
    });
    return this.repo.create(user);
  }
}
