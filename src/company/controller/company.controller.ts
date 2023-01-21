import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CompanyAdminDto } from 'src/company-admin/dto/companyAdmin.dto';
import { CompanyAdmin } from 'src/company-admin/schema/company-admin.schema';
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
    if (companyCreateDto.password != companyCreateDto.confirmPassword) {
      throw new HttpException(
        'password must be equal to confirm password',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return this.companyService.createABusinessPage(companyCreateDto);
    }
  }

  @Post('/addAdmin')
  async addAdmin(
    @Body()
    companyAdminDto: CompanyAdminDto,
  ): Promise<CompanyAdmin> {
    return this.companyService.addAdmin(companyAdminDto);
  }

  @Get('/getAllCompanyAdmins')
  async getAllCompanyAdmins(): Promise<CompanyAdmin[]> {
    return this.companyService.getAllCompanyAdmins();
  }
}
