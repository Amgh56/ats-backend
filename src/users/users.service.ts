import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
  
  async createUser(
    email: string,
    password_hash: string,
    role: 'business' | 'talent',
  ): Promise<User> {
    const createdUser = new this.userModel({ email, password_hash, role });
    return createdUser.save();
  }
}
