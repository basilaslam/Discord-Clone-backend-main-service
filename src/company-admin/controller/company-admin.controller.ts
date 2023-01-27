import { JobPost } from './../schema/job-post-schema.schema';
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

@Controller('companyAdmin')
export class CompanyAdminController {
  constructor(private companyAdminService: CompanyAdminService) {}

  @Get('/profile')
  async getProfile(
    @Query() object: { adminId: string },
  ): Promise<CompanyAdmin> {
    if (!object.adminId)
      throw new HttpException('An Error occurred', HttpStatus.BAD_REQUEST);
    return this.companyAdminService.getProfile(object.adminId);
  }

  @Post('/postJob')
  async addAJobPost(@Body() addAJobPost: AddAJobPost): Promise<JobPost> {
    return this.companyAdminService.addAJobPost(addAJobPost);
  }

  @Post('/editAJob')
  async editAJob(@Body() addAJobPost: AddAJobPost): Promise<JobPost> {
    return this.companyAdminService.editAJob(addAJobPost);
  }

  @Get('/getAllCompanyPosts')
  async getAllCompanyPosts(
    @Query() object: { companyId: string },
  ): Promise<JobPost[]> {
    if (!object.companyId)
      throw new HttpException('An Error occurred', HttpStatus.BAD_REQUEST);
    return this.companyAdminService.getAllCompanyPosts(object.companyId);
  }

  @Get('/getAJobPost')
  async getAJobPost(
    @Query() object: { jobId: string; users: string },
  ): Promise<JobPost[]> {
    let user;
    if (object.users == 'true') user = true;
    else user = false;
    if (!object.jobId)
      throw new HttpException('An Error occurred', HttpStatus.BAD_REQUEST);
    return this.companyAdminService.getAJobPost(object.jobId, user);
  }

  @Get('/rejectApplicant')
  async rejectApplicant(
    @Query() object: { applicantId: string; jobId: string },
  ): Promise<boolean> {
    if (!object.applicantId)
      throw new HttpException('An Error occurred', HttpStatus.BAD_REQUEST);
    return this.companyAdminService.rejectApplicant(
      object.applicantId,
      object.jobId,
    );
  }

  @Get('/acceptApplicant')
  async acceptApplicant(
    @Query() object: { applicantId: string; jobId: string },
  ): Promise<boolean> {
    if (!object.applicantId)
      throw new HttpException('An Error occurred', HttpStatus.BAD_REQUEST);
    return this.companyAdminService.acceptApplicant(
      object.applicantId,
      object.jobId,
    );
  }
}
