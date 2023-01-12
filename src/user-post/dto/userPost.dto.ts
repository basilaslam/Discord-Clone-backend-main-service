/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class UserPostAddDto {
  @IsNotEmpty()
  image: Array<string>;

  description: string;
}
