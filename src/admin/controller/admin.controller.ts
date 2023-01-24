import { Controller, Get, Query, HttpException } from '@nestjs/common';
import { BadGatewayException } from '@nestjs/common/exceptions';
import { Company } from 'src/company/schema/company.schema';
import { AdminService } from '../service/admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('/getAllCompanies')
  async getAllCompanies(): Promise<Company[]> {
    return this.adminService.getAllCompanies();
  }

  @Get('/approveCompany')
  async approveCompany(
    @Query() object: { companyId: string },
  ): Promise<boolean> {
    return this.adminService.approveCompany(object.companyId);
  }

  @Get('/getCompanyDetails')
  async getCompanyDetails(
    @Query() object: { companyId: string },
  ): Promise<Company> {
    console.log(object);
    if (!object.companyId)
      throw new BadGatewayException('Check is there is any issues');
    return this.adminService.getCompanyDetails(object.companyId);
  }
}
