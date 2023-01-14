import { UserPostsComments } from './../schemas/commet.schema';
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
import { PostCommentDto } from '../dto/postComment.dto';

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
    console.log(userPostAddDto);
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

  @Post('/comment')
  async commentAPost(
    @Body() postCommentDto: PostCommentDto,
  ): Promise<UserPostsComments> {
    return this.userPostService.commentPost(postCommentDto);
  }

  @Get('/getComments')
  async getComments(
    @Query() object: { postId: string },
  ): Promise<UserPostsComments[]> {
    return this.userPostService.getComments(object.postId);
  }
}
