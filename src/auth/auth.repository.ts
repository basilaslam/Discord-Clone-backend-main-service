/* eslint-disable prettier/prettier */
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';


@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {

    const userExist = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (userExist) {
      throw new HttpException(
        'You already have an account',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    let newUser;
    let userCreated;
    try {
      const password = await argon2.hash(createUserDto.password);
      createUserDto.password = password;

      newUser = await new this.userModel(createUserDto);
      userCreated = await newUser.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    delete userCreated.password;
    return userCreated;
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({ email: loginUserDto.email });
    if (user) {
      const passwordCheck = await argon2.verify(
        user.password,
        loginUserDto.password,
      );
      if (!passwordCheck)
        throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
      else return user;
    }

    if (!user) {
      throw new BadRequestException('User Not Found');
    }
  }


}
