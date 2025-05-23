import { User } from '../entities/user.entity';

export interface FindUsersFilterParams {
  tenantId: string;
  page?: number;
  limit?: number;
  name?: string;
  email?: string;
  rules?: string[];
}

export interface FindUsersResult {
  data: User[];
  total: number;
}

export interface UserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string, tenantId: string): Promise<User | null>;
  findById(id: string, tenantId: string): Promise<User | null>;

  findAll(filterParams: FindUsersFilterParams): Promise<FindUsersResult>;
}
