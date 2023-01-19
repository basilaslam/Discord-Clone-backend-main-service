import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/signup.dto';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { AuthRepository } from './auth.repository';
import { User } from 'src/user/schemas/user.schema';
import { CreateUserWithProvidersDto } from 'src/user/dto/createUserWithProviders.dto';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private authRepository: AuthRepository,
  ) {}

  // To create a JWT
  async createToken(email: string, password: string) {
    const payLoad = {
      email,
      password,
    };
    const secret = this.config.get('url');
    const token = await this.jwt.signAsync(payLoad, {
      expiresIn: '15m',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const result = await this.authRepository.create(createUserDto);
    console.log(result);
    if (result) {
      const accessToken = await this.createToken(result.email, result.password);
      return {
        result,
        accessToken,
      };
    }
  }

  async registerWithProviders(
    createUserWithProvidersDto: CreateUserWithProvidersDto,
  ): Promise<any> {
    const result = await this.authRepository.registerWithProviders(
      createUserWithProvidersDto,
    );
    if (result) {
      const accessToken = await this.createToken(result.email, result.password);
      return {
        result,
        accessToken,
      };
    }
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<any> {
    const result = await this.authRepository.loginUser(loginUserDto);
    if (result) {
      const accessToken = await this.createToken(result.email, result.password);
      return {
        result,
        accessToken,
      };
    }
  }
}
