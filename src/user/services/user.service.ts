/* eslint-disable prettier/prettier */
import { CreateUserWithProvidersDto } from '../dto/createUserWithProviders.dto';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UserRepository } from 'src/user/repositories/user.repository';
import { User } from 'src/user/schemas/user.schema';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async registerWithProviders(
    createUserWithProvidersDto: CreateUserWithProvidersDto,
  ): Promise<User> {
    return this.userRepository.registerWithProviders(
      createUserWithProvidersDto,
    );
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<User> {
    return this.userRepository.loginUser(loginUserDto);
  }

  async getCurrentUserProfile(userId:string): Promise<User> {
    return this.userRepository.getCurrentUserProfile(userId);
  }

  //   async getUserById(userId: string): Promise<User> {
  //     return this.userRepository.findOne({ userId });
  //   }
}
