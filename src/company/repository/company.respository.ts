/* eslint-disable prettier/prettier */
import { CompanyDocument } from './../schema/company.schema';
import { Company } from '../schema/company.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyCreateDto } from '../dto/companyCreate.dto';
import * as argon2 from 'argon2';
import { CompanyAdmin, CompanyAdminDocument } from 'src/company-admin/schema/company-admin.schema';
import { CompanyAdminDto } from 'src/company-admin/dto/companyAdmin.dto';


@Injectable()
export class CompanyRepository {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    @InjectModel(CompanyAdmin.name)
    private companyAdminModel: Model<CompanyAdminDocument>,
  ) {}

  async createABusinessPage(
    companyCreateDto: CompanyCreateDto,
  ): Promise<Company> {
    const password = await argon2.hash(companyCreateDto.password);
    const confirmPassword = await argon2.hash(companyCreateDto.confirmPassword);
    companyCreateDto.password = password;
    companyCreateDto.confirmPassword = confirmPassword;
    companyCreateDto.approved = false;
    const company = await new this.companyModel(companyCreateDto);
    return company.save();
  }

  async addAdmin(companyAdminDto: CompanyAdminDto): Promise<CompanyAdmin> {
    companyAdminDto.status = true;
    return new this.companyAdminModel(companyAdminDto).save();
  }

  async getAllCompanyAdmins(): Promise<CompanyAdmin[]> {
    return this.companyAdminModel.find({});
  }
}
