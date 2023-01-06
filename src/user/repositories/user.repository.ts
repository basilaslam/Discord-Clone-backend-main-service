/* eslint-disable prettier/prettier */
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
  }

  async find(): Promise<User[]> {
    return this.userModel.find({});
  }

  //   async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
  //     return this.userModel.findOne(userFilterQuery);
  //   }

  //   async findOneAndUpdate(
  //     userFilterQuery: FilterQuery<User>,
  //     user: Partial<User>,
  //   ): Promise<User> {
  //     return this.userModel.findOneAndUpdate(userFilterQuery, user);
  //   }
}
