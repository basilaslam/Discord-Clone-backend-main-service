import { IsNotEmpty } from 'class-validator';
export class EmailDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  message: string;
}
