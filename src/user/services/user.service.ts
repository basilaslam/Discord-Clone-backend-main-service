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

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getCurrentUserProfile(userId: string): Promise<User> {
    return this.userRepository.getCurrentUserProfile(userId);
  }

  async updateProfile(userDetails: any): Promise<User> {
    return this.userRepository.updateProfile(userDetails);
  }

  async getUserByEmail(email: string) {
    return this.userRepository.getUserByEmail(email);
  }
}
