import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { AuthRepository } from './auth.repository';
import * as jwt from 'jsonwebtoken';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { alterUserData } from 'src/special-functions/alterUserdata';

@Injectable()
export class AuthService {
  constructor(
    private nestJwt: JwtService,
    private config: ConfigService,
    private authRepository: AuthRepository,
  ) {}

  // To create a JWT
  async createToken(email: string, id: string, password: string) {
    console.log('stage - 4 ');
    const payLoad = {
      email,
      password,
      id,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.nestJwt.signAsync(payLoad, {
      expiresIn: '1h',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new Error('Invalid token');
    }
    const token = auth.split(' ')[1];
    try {
      const decoded = jwt.verify(token, 'secretKey');
      return decoded;
    } catch (err) {
      throw new Error('Invalid token');
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    console.log(createUserDto);

    const result = await this.authRepository.create(createUserDto);
    delete result.password;
    if (result) {
      const accessToken = await this.createToken(
        result.email,
        result._id,
        result.password,
      );
      return {
        result,
        accessToken,
      };
    }
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<any> {
    const result = await this.authRepository.loginUser(loginUserDto);
    console.log(result);

    if (result) {
      delete result.password;
      const accessToken = await this.createToken(
        result.email,
        result._id.toString(),
        result.password,
      );
      return {
        result,
        accessToken,
      };
    }
  }

  extractToken(token: string) {
    const detailes = this.nestJwt.decode(token);
    console.log(detailes);
  }
}
