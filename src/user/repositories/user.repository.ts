/* eslint-disable prettier/prettier */
import { LoginUserDto } from './../dto/loginUser.dto';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserWithProvidersDto } from '../dto/createUserWithProviders.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
  }

  async registerWithProviders(
    createUserWithProvidersDto: CreateUserWithProvidersDto,
  ): Promise<User> {
    const newUser = await this.userModel.create(createUserWithProvidersDto);
    return newUser.save();
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({ email: loginUserDto.email });
    if (user && user.password === loginUserDto.password) {
      return user;
    } else if (!user) {
      throw new BadRequestException('User Not Found');
    } else {
      throw new BadRequestException('Invalid Credentials');
    }
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
