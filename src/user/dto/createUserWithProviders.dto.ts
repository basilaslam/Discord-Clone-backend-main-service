/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserWithProvidersDto {
  @IsNotEmpty()
  firstName: string;

  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(12)
  password: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(12)
  confirmPassword: string;

  @IsNotEmpty()
  signInWith: string;
}