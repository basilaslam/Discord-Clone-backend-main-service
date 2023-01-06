import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UserService } from './../../services/user/user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get('/allUsers')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
