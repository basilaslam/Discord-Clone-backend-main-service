import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { AuthService } from './auth.service';
import * as nodemailer from 'nodemailer';
import { EmailDto } from './dto/email.dto';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { AuthRepository } from './auth.repository';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authRepository: AuthRepository,
  ) {}

  @Post('user/signup')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserDto> {
    console.log(createUserDto);

    const result = await this.authService.createUser(createUserDto);
    return result;
  }

  async sendEmail(email: string, subject: string, text: string) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: 587,
        secure: true,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject,
        text,
      });
    } catch (error) {
      console.log(error);
    }
  }
  @Post('/user/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginUserDto> {
    const result = await this.authService.loginUser(loginUserDto);
    return result;
  }
  @Post('/email')
  async emailSend(@Body() emailDto: EmailDto) {
    return this.sendEmail(emailDto.email, emailDto.subject, emailDto.message);
  }
}
