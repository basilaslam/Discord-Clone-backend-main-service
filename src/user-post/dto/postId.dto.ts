/* eslint-disable prettier/prettier */
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class PostIdDto {
  @IsNotEmpty()
  @MinLength(24)
  @MaxLength(24)
  postId: string;

  @IsNotEmpty()
  @MinLength(24)
  @MaxLength(24)
  userId: string;
}
