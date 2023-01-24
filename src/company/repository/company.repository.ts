import { BadRequestException } from '@nestjs/common';
import { CompanyDocument } from '../schema/company.schema';
import { Company } from '../schema/company.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyCreateDto } from '../dto/companyCreate.dto';
import * as argon2 from 'argon2';
import {
  CompanyAdmin,
  CompanyAdminDocument,
} from 'src/company-admin/schema/company-admin.schema';
import { CompanyAdminDto } from 'src/company-admin/dto/companyAdmin.dto';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    @InjectModel(CompanyAdmin.name)
    private companyAdminModel: Model<CompanyAdminDocument>,
  ) {}

  async addAdmin(companyAdminDto: CompanyAdminDto): Promise<CompanyAdmin> {
    const adminExist = await this.companyAdminModel.findOne({
      email: companyAdminDto.email,
    });
    if (adminExist) {
      throw new BadRequestException('An Admin already exists with this email');
    }
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const passwordLength = 8;
    let password = '';

    for (let i = 0; i < passwordLength; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    companyAdminDto.status = true;
    companyAdminDto.password = password;
    const newAdmin = new this.companyAdminModel(companyAdminDto).save();
    return newAdmin;
  }

  async getAllCompanyAdmins(): Promise<CompanyAdmin[]> {
    return this.companyAdminModel.find({});
  }
}
