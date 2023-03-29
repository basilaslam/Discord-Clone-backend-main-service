import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/repositories/user.repository';
import { User } from 'src/user/schemas/user.schema';

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
