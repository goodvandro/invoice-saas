import { User } from '../entities/user.entity';

export interface UserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string, tenantId: string): Promise<User | null>;
  findById(id: string, tenantId: string): Promise<User | null>;
}
