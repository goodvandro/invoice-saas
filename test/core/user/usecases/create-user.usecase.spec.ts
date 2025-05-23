import { User } from 'src/@core/user/entities/user.entity';
import { UserRepository } from 'src/@core/user/repositories/user.repository';
import { CreateUserUseCase } from 'src/@core/user/use-cases/create-user.usecase';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let mockRepo: jest.Mocked<Pick<UserRepository, 'findById' | 'findByEmail' | 'create'>>;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn<Promise<User | null>, [string, string]>(),
      findByEmail: jest.fn<Promise<User | null>, [string, string]>(),
      create: jest.fn<Promise<User>, [User]>(),
    };
    useCase = new CreateUserUseCase(mockRepo as UserRepository);
  });

  it('should get error when user email already exists', async () => {
    const existingUser = new User({
      id: '1',
      tenantId: '1',
      name: 'John Doe',
      email: 'email@test.com',
      password: 'hashed_password',
      isActive: true,
      rules: ['default'],
    });

    mockRepo.findByEmail.mockResolvedValueOnce(existingUser);
    await expect(
      useCase.execute({
        id: '1',
        tenantId: '1',
        name: 'John Doe',
        email: 'email@test.com',
        password: 'hashed_password',
        rules: ['default'],
      }),
    ).rejects.toThrowError('User already exists');
  });
});
