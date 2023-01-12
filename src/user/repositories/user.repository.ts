/* eslint-disable prettier/prettier */
import { LoginUserDto } from './../dto/loginUser.dto';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserWithProvidersDto } from '../dto/createUserWithProviders.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExist = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (userExist) {
      throw new HttpException(
        'You already have an account',
        HttpStatus.NOT_ACCEPTABLE,
      );
      // throw new BadRequestException('You already have an account')
    }
    let newUser;
    let userCreated;
    try {
      const password = await argon2.hash(createUserDto.password);
      const confirmPassword = await argon2.hash(createUserDto.confirmPassword);
      createUserDto.password = password;
      createUserDto.confirmPassword = confirmPassword;
      newUser = await new this.userModel(createUserDto);
      userCreated = await newUser.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    delete userCreated.password;
    delete userCreated.confirmPassword;
    return userCreated;
  }

  async registerWithProviders(
    createUserWithProvidersDto: CreateUserWithProvidersDto,
  ): Promise<User> {
    const userExist = await this.userModel.findOne({
      email: createUserWithProvidersDto.email,
    });
    if (!userExist) {
      try {
        const password = await argon2.hash(createUserWithProvidersDto.password);
        const confirmPassword = await argon2.hash(
          createUserWithProvidersDto.confirmPassword,
        );
        createUserWithProvidersDto.password = password;
        createUserWithProvidersDto.confirmPassword = confirmPassword;
        const newUser = await this.userModel.create(createUserWithProvidersDto);
        return newUser.save();
      } catch (error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      return userExist;
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({ email: loginUserDto.email });
    if (user) {
      const passwordCheck = await argon2.verify(
        user.password,
        loginUserDto.password,
      );
      if(!passwordCheck) throw new HttpException("Invalid Credentials" , HttpStatus.BAD_REQUEST)
      else return user
    }

   if (!user) {
      throw new BadRequestException('User Not Found');
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
