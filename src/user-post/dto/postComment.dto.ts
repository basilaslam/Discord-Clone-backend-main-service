/* eslint-disable prettier/prettier */
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class PostCommentDto {
  @IsNotEmpty()
  @MinLength(24)
  @MaxLength(24)
  postId: string;

  @IsNotEmpty()
  @MinLength(24)
  @MaxLength(24)
  userId: string;

  @IsNotEmpty()
  comment: string;
}
