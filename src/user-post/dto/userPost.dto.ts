/* eslint-disable prettier/prettier */
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserPostAddDto {
  @IsNotEmpty()
  image: Array<string>;

  description: string;

  @IsNotEmpty()
  @MinLength(24)
  @MaxLength(24)
  user: string;
}
