import { randomUUID } from 'crypto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcryptjs';

export class CreateUserUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(input: {
    tenantId: string;
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    const exists = await this.repo.findByEmail(input.email, input.tenantId);
    if (exists) throw new Error('User already exists for this tenant');

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = new User(randomUUID(), input.tenantId, input.name, input.email, hashedPassword);
    return this.repo.create(user);
  }
}
