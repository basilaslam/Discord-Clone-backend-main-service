/* eslint-disable prettier/prettier */
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
import { UserToClient } from 'src/user/dto/clientSideUser.dto';

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
    @Res({ passthrough: true }) response: Response,
  ): Promise<CreateUserDto> {
    const result = await this.userService.createUser(createUserDto);
    if (result) {
      const jwt = await this.jwtService.signAsync({
        userName: result.firstName + ' ' + result.lastName,
        email: result.email,
      });
      response.cookie('jwt', jwt, { httpOnly: true });
    }

    return result;
  }

  @Post('/registerWithProviders')
  // @UsePipes(ValidationPipe)
  async registerWithProviders(
    @Body() createUserWithProvidersDto: CreateUserWithProvidersDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<User> {
    const result = await this.userService.registerWithProviders(
      createUserWithProvidersDto,
    );
    if (result) {
      const jwt = await this.jwtService.signAsync({
        userName: result.firstName + ' ' + result.lastName,
        email: result.email,
      });
      response.cookie('jwt', jwt, { httpOnly: true });
    }

    return result;
  }

  @Post('/login')
  // @UsePipes(ValidationPipe)
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<User> {
    const result = await this.userService.loginUser(loginUserDto);
    if (result) {
      const jwt = await this.jwtService.signAsync({
        userName: result.firstName + ' ' + result.lastName,
        email: result.email,
      });
      response.cookie('jwt', jwt, { httpOnly: true });
    }

    return result;
  }

  @Get('/allUsers')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
