import { CreateUserWithProvidersDto } from './../../dto/createUserWithProviders.dto';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UserService } from './../../services/user/user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserDto> {
    return this.userService.createUser(createUserDto);
  }

  @Post('/registerWithProviders')
  @UsePipes(ValidationPipe)
  async registerWithProviders(
    @Body() createUserWithProvidersDto: CreateUserWithProvidersDto,
  ): Promise<User> {
    return this.userService.registerWithProviders(createUserWithProvidersDto);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<User> {
    const jwt = await this.jwtService.signAsync({
      email: loginUserDto.email,
    });
    response.cookie('jwt', jwt, { httpOnly: true });
    return this.userService.loginUser(loginUserDto);
  }

  @Get('/allUsers')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
