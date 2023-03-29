/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail,MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {


  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email?: string;


  _id?: string;



  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(12)
  password: string;

  accessToken:object;
}
