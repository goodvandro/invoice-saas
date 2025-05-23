import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { User, UserProps } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';

export class CreateUserUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(input: CreateUserDto): Promise<User> {
    const exists = await this.repo.findByEmail(input.email, input.tenantId);
    if (exists) throw new ConflictException('User already exists');

    const hashedPassword = await bcrypt.hash(input.password, 10);

    return this.repo.create({
      ...input,
      id: randomUUID(),
      password: hashedPassword,
    } as UserProps);
  }
}
