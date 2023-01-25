import { Injectable } from '@nestjs/common';
import { CompanyAdminDto } from 'src/company-admin/dto/companyAdmin.dto';
import { CompanyAdmin } from 'src/company-admin/schema/company-admin.schema';
import { JobPost } from 'src/company-admin/schema/job-post-schema.schema';
import { CompanyRepository } from '../repository/company.repository';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async addAdmin(companyAdminDto: CompanyAdminDto): Promise<CompanyAdmin> {
    return this.companyRepository.addAdmin(companyAdminDto);
  }

  async getAllCompanyAdmins(): Promise<CompanyAdmin[]> {
    return this.companyRepository.getAllCompanyAdmins();
  }

  async getJobPosts(): Promise<JobPost[]> {
    return this.companyRepository.getJobPosts();
  }
}
