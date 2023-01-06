import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UserRepository } from 'src/user/repositories/user.repository';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  //   async getUserById(userId: string): Promise<User> {
  //     return this.userRepository.findOne({ userId });
  //   }
}
