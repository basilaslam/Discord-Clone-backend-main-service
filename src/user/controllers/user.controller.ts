import { HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from '@nestjs/passport/dist';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  async getCurrentUserProfile(
    @Query() object: { userId: string },
    @Req() req: Request,
  ): Promise<User> {
    if (object.userId == 'null')
      throw new HttpException('poyi id yum kond vada', HttpStatus.ACCEPTED);
    return this.userService.getCurrentUserProfile(object.userId);
  }

  @Post('/updateProfile')
  async updateProfile(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    if (!updateUserDto.userId) return null;
    return this.userService.updateProfile(updateUserDto);
  }

  @Get('/allUsers')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
