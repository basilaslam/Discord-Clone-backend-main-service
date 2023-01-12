/* eslint-disable prettier/prettier */
import { UserPostAddDto } from './../dto/userPost.dto';
import { UserPostDocument } from './../schemas/post.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserPosts } from '../schemas/post.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserPostRepository {
  constructor(
    @InjectModel(UserPosts.name) private userPostModel: Model<UserPostDocument>,
  ) {}

  async addPost(userPostAddDto: UserPostAddDto): Promise<UserPosts> {
    const newPost = await new this.userPostModel(userPostAddDto);
    return newPost.save();
  }

  async getAllPosts(): Promise<UserPosts[]> {
    return this.userPostModel.find({});
  }
}
