import { JobPostDocument } from './../schema/job-post-schema.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddAJobPost } from '../dto/addAJobPost.dto';
import {
  CompanyAdmin,
  CompanyAdminDocument,
} from '../schema/company-admin.schema';
import { JobPost } from '../schema/job-post-schema.schema';

@Injectable()
export class CompanyAdminRepository {
  constructor(
    @InjectModel(CompanyAdmin.name)
    private companyAdminModel: Model<CompanyAdminDocument>,
    @InjectModel(JobPost.name)
    private jobPostModel: Model<JobPostDocument>,
  ) {}

  async getProfile(adminId: string): Promise<CompanyAdmin> {
    if (!adminId)
      throw new HttpException('An Error occured', HttpStatus.BAD_REQUEST);
    return this.companyAdminModel.findOne({ _id: adminId });
  }

  async addAJobPost(addAJobPost: AddAJobPost): Promise<JobPost> {
    const newPost = new this.jobPostModel(addAJobPost);
    return newPost.save();
  }
}
