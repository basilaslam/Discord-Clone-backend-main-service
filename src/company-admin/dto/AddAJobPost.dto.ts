import { IsNotEmpty } from 'class-validator';

export class AddAJobPost {
  @IsNotEmpty()
  adminId: string;

  @IsNotEmpty()
  companyId: string;

  @IsNotEmpty()
  job: string;

  @IsNotEmpty()
  jobDescription: string;

  @IsNotEmpty()
  jobQualification: string;

  @IsNotEmpty()
  aboutCompany: string;

  @IsNotEmpty()
  benefits: string;

  @IsNotEmpty()
  applications: string;

  image: string;
}
