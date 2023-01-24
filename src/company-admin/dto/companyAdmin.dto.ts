/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CompanyAdminDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  position: string;

  @IsNotEmpty()
  employeeId: string;

  address: string;
  mobile: number;
  postalCode: number;

  @IsNotEmpty()
  @MaxLength(10)
  @MinLength(10)
  businessMobile: number;

  @IsNotEmpty()
  authority: string;

  status: boolean;

  password:string;
}
