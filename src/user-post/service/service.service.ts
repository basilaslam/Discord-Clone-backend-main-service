import { UserPosts } from './../schemas/post.schema';
import { UserPostAddDto } from './../dto/userPost.dto';
import { Injectable } from '@nestjs/common';
import { UserPostRepository } from '../respositories/post.repository';

@Injectable()
export class UserPostService {
  constructor(private readonly userPostRepository: UserPostRepository) {}

  async addPost(userPostAddDto: UserPostAddDto): Promise<UserPosts> {
    return this.userPostRepository.addPost(userPostAddDto);
  }

  async getAllPosts(): Promise<UserPosts[]> {
    return this.userPostRepository.getAllPosts();
  }
}
