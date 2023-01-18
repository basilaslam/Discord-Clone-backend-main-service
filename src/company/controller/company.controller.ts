import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CompanyCreateDto } from '../dto/companyCreate.dto';
import { Company } from '../schema/company.schema';
import { CompanyService } from '../service/company.service';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post('/create')
  async createABusinessPage(
    @Body()
    companyCreateDto: CompanyCreateDto,
  ): Promise<Company> {
    console.log(companyCreateDto);
    if (companyCreateDto.password != companyCreateDto.confirmPassword) {
      throw new HttpException(
        'password must be equal to confirm password',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return this.companyService.createABusinessPage(companyCreateDto);
    }
  }
}
