import { User } from 'src/@core/user/entities/user.entity';
import { UserRepository } from 'src/@core/user/repositories/user.repository';
import { CreateUserUseCase } from 'src/@core/user/use-cases/create-user.usecase';
import * as bcrypt from 'bcryptjs';

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

  it('should throw if user email already exists', async () => {
    const existingUser = new User({
      id: '1',
      tenantId: '1',
      name: 'John Doe',
      email: 'email@test.com',
      password: 'hashed_password',
      isActive: true,
    });

    mockRepo.findByEmail.mockResolvedValueOnce(existingUser);
    await expect(
      useCase.execute({
        tenantId: '1',
        name: 'John Doe',
        email: 'email@test.com',
        password: 'hashed_password',
      }),
    ).rejects.toThrow('User already exists');
  });

  it('should hash the password and create a new user when not exists', async () => {
    mockRepo.findByEmail.mockResolvedValue(null);
    const fakeUser = new User({
      id: 'uui',
      tenantId: '1',
      name: 'John Doe',
      email: 'email@test.com',
      password: 'hashed-password',
    });
    mockRepo.create.mockResolvedValue(fakeUser);
    const res = await useCase.execute({
      tenantId: '1',
      name: 'John Doe',
      email: 'email@test.com',
      password: 'pass',
    });

    expect(bcrypt.hash).toHaveBeenCalledWith('pass', 10);
    expect(mockRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({ password: 'hashed-pass' }),
    );
    expect(res).toBe(fakeUser);
  });
});
