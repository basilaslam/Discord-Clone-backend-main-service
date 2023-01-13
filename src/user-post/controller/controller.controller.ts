import { UserPostService } from './../service/service.service';
import { UserPostAddDto } from './../dto/userPost.dto';
import { UserPosts } from './../schemas/post.schema';
import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Query } from '@nestjs/common/decorators';
import { PostIdDto } from '../dto/postId.dto';

@Controller('userPost')
export class ControllerController {
  constructor(
    private userPostService: UserPostService,
    private jwtService: JwtService,
  ) {}

  @Post('/addPost')
  @UsePipes(ValidationPipe)
  async registerWithProviders(
    @Body() userPostAddDto: UserPostAddDto,
  ): Promise<UserPosts> {
    return this.userPostService.addPost(userPostAddDto);
  }

  @Get('/getPosts')
  async getAllPosts(): Promise<UserPosts[]> {
    return this.userPostService.getAllPosts();
  }

  @Get('/like')
  async likeAPost(@Query() postIdDto: PostIdDto): Promise<boolean> {
    return this.userPostService.likePost(postIdDto);
  }
}
