import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserWithProvidersDto } from 'src/user/dto/createUserWithProviders.dto';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user/signup')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserDto> {
    if (createUserDto.password != createUserDto.confirmPassword)
      throw new HttpException(
        'password must be equal to confirm password',
        HttpStatus.BAD_REQUEST,
      );

    const result = await this.authService.createUser(createUserDto);
    return result;
  }

  @Post('/user/registerWithProviders')
  async registerWithProviders(
    @Body() createUserWithProvidersDto: CreateUserWithProvidersDto,
  ): Promise<CreateUserWithProvidersDto> {
    const result = await this.authService.registerWithProviders(
      createUserWithProvidersDto,
    );
    return result;
  }

  @Post('/user/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginUserDto> {
    const result = await this.authService.loginUser(loginUserDto);
    return result;
  }

  @Post('/company/login')
  async companyLogin(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<LoginUserDto> {
    const result = await this.authService.loginCompany(loginUserDto);
    return result;
  }
}
