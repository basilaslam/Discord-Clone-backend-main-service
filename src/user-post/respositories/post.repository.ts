/* eslint-disable prettier/prettier */
import { PostIdDto } from './../dto/postId.dto';
import { UserPostAddDto } from './../dto/userPost.dto';
import { UserPostDocument } from './../schemas/post.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserPosts } from '../schemas/post.schema';
import { Model } from 'mongoose';
import {Types, Schema as MongooseSchema } from 'mongoose';

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

  async likePost(postIdDto:PostIdDto): Promise<boolean> {
    const objId = postIdDto.postId;
    const updated =await this.userPostModel.updateOne(
      {_id:objId},
      {$push:{likes:objId}}
      )
      console.log(updated)
    return null
  }
}
