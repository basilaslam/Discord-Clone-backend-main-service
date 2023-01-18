/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
 
} from 'class-validator';

export class UpdateUserDto {
@IsNotEmpty()
  userId: string

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  mobile?: number;
}
