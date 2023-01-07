/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(12)
  password: string;
}
