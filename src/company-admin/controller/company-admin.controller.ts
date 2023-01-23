import { CompanyAdmin } from 'src/company-admin/schema/company-admin.schema';
import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CompanyAdminService } from '../service/company-admin.service';

@Controller('companyAdmin')
export class CompanyAdminController {
  constructor(private companyAdminService: CompanyAdminService) {}

  @Get('/profile')
  async getProfile(
    @Query() object: { adminId: string },
  ): Promise<CompanyAdmin> {
    if (!object.adminId)
      throw new HttpException('An Error occured', HttpStatus.BAD_REQUEST);
    return this.companyAdminService.getProfile(object.adminId);
  }
}
