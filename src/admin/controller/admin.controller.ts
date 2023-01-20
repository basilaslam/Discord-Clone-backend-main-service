import { Controller, Get, Query } from '@nestjs/common';
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
}
