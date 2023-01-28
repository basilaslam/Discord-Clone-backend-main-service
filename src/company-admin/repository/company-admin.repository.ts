import { JobPostDocument } from './../schema/job-post-schema.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AddAJobPost } from '../dto/addAJobPost.dto';
import {
  CompanyAdmin,
  CompanyAdminDocument,
} from '../schema/company-admin.schema';
import { JobPost } from '../schema/job-post-schema.schema';
// import { Schema as MongooseSchema, Types } from 'mongoose';

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

  async editAJob(addAJobPost: any): Promise<any> {
    const {
      job,
      jobDescription,
      jobQualification,
      image,
      benefits,
      aboutCompany,
      applications,
    } = addAJobPost;
    return this.jobPostModel.updateOne(
      { _id: addAJobPost._id },
      {
        $set: {
          job,
          jobDescription,
          jobQualification,
          image,
          benefits,
          aboutCompany,
          applications,
        },
      },
    );
  }

  async getAllCompanyPosts(companyId: string): Promise<JobPost[]> {
    const job = await this.jobPostModel
      .find({ companyId: companyId })
      .populate('adminId');
    return job;
  }
  async getAJobPost(jobId: string, user: boolean): Promise<JobPost[]> {
    if (!user) return this.jobPostModel.findOne({ _id: jobId });
    const users = await this.jobPostModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(jobId) },
      },
      {
        $project: {
          applicants: 1,
        },
      },
      {
        $unwind: {
          path: '$applicants',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'applicants.user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $project: {
          accepted: '$applicants.accepted',
          applicants: { $arrayElemAt: ['$user', 0] },
        },
      },
    ]);
    return users;
  }

  async rejectApplicant(applicantId: string, jobId: string): Promise<boolean> {
    console.log(applicantId, jobId);
    await this.jobPostModel.updateOne(
      { _id: jobId, 'applicants.user': new Types.ObjectId(applicantId) },
      {
        $set: {
          'applicants.$.accepted': false,
        },
      },
    );
    return true;
  }

  async acceptApplicant(applicantId: string, jobId: string): Promise<boolean> {
    console.log(applicantId, jobId);
    await this.jobPostModel.updateOne(
      { _id: jobId, 'applicants.user': new Types.ObjectId(applicantId) },
      {
        $set: {
          'applicants.$.accepted': true,
        },
      },
    );
    return true;
  }

  async acceptApplicantAndSchedule(
    formData: any,
    applicantId: string,
    jobId: string,
    adminId: string,
  ): Promise<boolean> {
    const adminAuthority = await this.companyAdminModel.findOne({
      _id: adminId,
    });

    // Update the jobPost by applicant information if it is a online interview
    if (formData.onlineInterviewDate) {
      const { onlineInterviewDate, onlineInterviewTime } = formData;
      await this.jobPostModel.updateOne(
        { _id: jobId, 'applicants.user': new Types.ObjectId(applicantId) },
        {
          $set: {
            'applicants.$.accepted': true,
            'applicants.$.online': {
              date: onlineInterviewDate,
              time: onlineInterviewTime,
              completed: false,
              approved: false,
              scheduledAdmin: new Types.ObjectId(adminId),
            },
          },
        },
      );
    }

    // Update the jobPost by applicant information if it is a offline interview
    if (formData.offlineInterviewDate) {
      const {
        offlineInterviewDate,
        offlineInterviewTime,
        offlineInterviewPlace,
      } = formData;
      await this.jobPostModel.updateOne(
        { _id: jobId, 'applicants.user': new Types.ObjectId(applicantId) },
        {
          $set: {
            'applicants.$.accepted': true,
            'applicants.$.offline': {
              date: offlineInterviewDate,
              time: offlineInterviewTime,
              place: offlineInterviewPlace,
              completed: false,
              approved: false,
              scheduledAdmin: new Types.ObjectId(adminId),
            },
          },
        },
      );
    }

    // Update the jobPost by applicant information if admin directly hire the user
    if (formData.directHire) {
      await this.jobPostModel.updateOne(
        { _id: jobId, 'applicants.user': new Types.ObjectId(applicantId) },
        {
          $set: {
            'applicants.$.accepted': true,
            'applicants.$.hired': {
              hire: true,
              approved: false,
              hiredAdmin: new Types.ObjectId(adminId),
            },
          },
        },
      );
    }
    return true;
  }
}
