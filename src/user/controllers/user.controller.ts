import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { JwtGuard } from 'src/auth/guard';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/allUsers')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get('/findByEmail')
  async getUserByEmail(@Query() email: { email: string }) {
    return this.userService.getUserByEmail(email.email);
  }

  @Get('/authTest')
  testAuth(): string {
    return 'testPass';
  }
}
