/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';

export type JobPostDocument = HydratedDocument<JobPost>;

@Schema({
  timestamps: true,
})
export class JobPost {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Company',
    required: true,
  })
  companyId: Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'CompanyAdmin',
    required: true,
  })
  adminId: Types.ObjectId;

  @Prop({ required: true })
  job: string;

  @Prop({ required: true })
  jobDescription: string;

  @Prop({ required: true })
  jobQualification: string;

  @Prop({ required: true })
  aboutCompany: string;

  @Prop({ required: true })
  benefits: string;

  @Prop({ required: true })
  applications: string;

  @Prop({})
  image: string;

  @Prop({
    ref: 'User',
    required: true,
  })
  applicants: Array<Types.ObjectId>;
}

export const JobPostSchema = SchemaFactory.createForClass(JobPost);
