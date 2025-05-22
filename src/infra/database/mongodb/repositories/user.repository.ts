import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDocument } from '../schemas/user.schema';
import { UserRepository } from 'src/@core/user/repositories/user.repository';
import { User } from 'src/@core/user/entities/user.entity';

@Injectable()
export class UserMongoRepository implements UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

  async create(user: User): Promise<User> {
    const created = await this.userModel.create({
      _id: user.id,
      tenantId: user.tenantId,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
    });

    return new User({ id: created._id, ...created });
  }

  async findByEmail(email: string, tenantId: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email, tenantId });
    if (!user) return null;

    return new User({ id: user._id, ...user });
  }

  async findById(id: string, tenantId: string): Promise<User | null> {
    const user = await this.userModel.findOne({ _id: id, tenantId });
    if (!user) return null;

    return new User({ id: user._id, ...user });
  }
}
