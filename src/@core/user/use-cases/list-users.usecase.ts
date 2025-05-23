import {
  FindUsersFilterParams,
  FindUsersResult,
  UserRepository,
} from '../repositories/user.repository';

export class ListUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(params: FindUsersFilterParams): Promise<FindUsersResult> {
    const { tenantId, page = 1, limit = 10, name, email, rules } = params;
    return this.userRepository.findAll({ tenantId, page, limit, name, email, rules });
  }
}
