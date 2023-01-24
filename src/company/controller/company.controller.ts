import { Body, Controller, Get, Post } from '@nestjs/common';
import { CompanyAdminDto } from 'src/company-admin/dto/companyAdmin.dto';
import { CompanyAdmin } from 'src/company-admin/schema/company-admin.schema';
import { CompanyService } from '../service/company.service';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

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
