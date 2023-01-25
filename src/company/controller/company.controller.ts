import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CompanyAdminDto } from 'src/company-admin/dto/companyAdmin.dto';
import { CompanyAdmin } from 'src/company-admin/schema/company-admin.schema';
import { JobPost } from 'src/company-admin/schema/job-post-schema.schema';
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
  async getAllCompanyAdmins(
    @Query() object: { companyId: string },
  ): Promise<CompanyAdmin[]> {
    return this.companyService.getAllCompanyAdmins(object.companyId);
  }

  @Get('/getJobPosts')
  async getJobPosts(): Promise<JobPost[]> {
    return this.companyService.getJobPosts();
  }
}
