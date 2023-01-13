/* eslint-disable prettier/prettier */
import { PostIdDto } from './../dto/postId.dto';
import { UserPostAddDto } from './../dto/userPost.dto';
import { UserPostDocument } from './../schemas/post.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserPosts } from '../schemas/post.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class UserPostRepository {
  constructor(
    @InjectModel(UserPosts.name) private userPostModel: Model<UserPostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async addPost(userPostAddDto: UserPostAddDto): Promise<UserPosts> {
    const newPost = await new this.userPostModel(userPostAddDto);
    return newPost.save();
  }

  async getAllPosts(): Promise<UserPosts[]> {
    const posts = await this.userPostModel.find({}).populate('user');
    return posts
  }

  async likePost(postIdDto: PostIdDto): Promise<boolean> {
    const postId = postIdDto.postId;
    const userId = postIdDto.userId;
    const alreadyLiked = await this.userPostModel.findOne({
      _id: postId,
      likes: { $in: [userId] },
    });
    if (alreadyLiked) {
      await this.userPostModel.updateOne(
        { _id: postId },
        { $pull: { likes: userId } },
      );
      await this.userModel.updateOne(
        { _id: userId },
        { $pull: { likedPosts: postId } },
      );
      return null;
    }

    await this.userPostModel.updateOne(
      { _id: postId },
      { $push: { likes: userId } },
    );
    await this.userModel.updateOne(
      { _id: userId },
      { $push: { likedPosts: postId } },
    );
    return null;
  }
}
