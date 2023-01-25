import { CompanyAdmin } from 'src/company-admin/schema/company-admin.schema';
import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';
import { CompanyAdminService } from '../service/company-admin.service';
import { AddAJobPost } from '../dto/addAJobPost.dto';
import { JobPost } from '../schema/job-post-schema.schema';

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

  @Post('/postJob')
  async addAJobPost(@Body() addAJobPost: AddAJobPost): Promise<JobPost> {
    return this.companyAdminService.addAJobPost(addAJobPost);
  }
}
