import { JobPostDocument } from './../../company-admin/schema/job-post-schema.schema';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { JobPost } from 'src/company-admin/schema/job-post-schema.schema';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(JobPost.name) private jobModel: Model<JobPostDocument>,
  ) {}

  async find(): Promise<User[]> {
    return this.userModel.find({});
  }

  async getCurrentUserProfile(userId: string): Promise<User> {
    return this.userModel.findOne({ _id: userId });
  }

  async updateProfile(userDetails: any): Promise<User> {
    const {
      firstName,
      lastName,
      email,
      image,
      resume,
      DOB,
      mobile,
      gender,
      address,
      city,
      country,
      postalCode,
    } = userDetails;

    let { qualifications } = userDetails;
    qualifications = JSON.parse(qualifications);

    let { skills } = userDetails;
    skills = JSON.parse(skills);

    await this.userModel.updateOne(
      { _id: userDetails.userId },
      {
        $set: {
          firstName,
          lastName,
          email,
          image,
          resume,
          DOB,
          mobile,
          gender,
          address,
          city,
          country,
          postalCode,
          qualifications,
          skills,
        },
      },
    );
    return null;
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email: email });
  }

  async applyForJob(jobId: string, userId: string): Promise<boolean> {
    // To check the user have a resume
    const userResume = await this.userModel.findOne({ _id: userId });
    if (userResume.resume.length == 0)
      throw new HttpException(
        'Please update your profile with your Resume !',
        HttpStatus.BAD_REQUEST,
      );
    // To check the user is already applied or not
    const alreadyApplied = await this.jobModel.findOne({
      _id: jobId,
      'applicants.user': { $in: [new Types.ObjectId(userId)] },
    });
    if (alreadyApplied)
      throw new HttpException(
        'You already applied to this Job !',
        HttpStatus.BAD_REQUEST,
      );
    // To add the user as an applicant
    await this.jobModel.updateOne(
      { _id: jobId },
      {
        $push: {
          applicants: { user: new Types.ObjectId(userId), accepted: null },
        },
      },
    );
    return true;
  }
}
