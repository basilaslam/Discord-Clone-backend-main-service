import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CompanyAdmin,
  CompanyAdminDocument,
} from '../schema/company-admin.schema';

@Injectable()
export class CompanyAdminRepository {
  constructor(
    @InjectModel(CompanyAdmin.name)
    private companyAdminModel: Model<CompanyAdminDocument>,
  ) {}
}
