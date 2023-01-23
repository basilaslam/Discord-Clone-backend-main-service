import { Injectable } from '@nestjs/common';
import { CompanyAdminDto } from 'src/company-admin/dto/companyAdmin.dto';
import { CompanyAdmin } from 'src/company-admin/schema/company-admin.schema';
import { CompanyCreateDto } from '../dto/companyCreate.dto';
import { CompanyRepository } from '../repository/company.repository';
import { Company } from '../schema/company.schema';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async createABusinessPage(
    companyCreateDto: CompanyCreateDto,
  ): Promise<Company> {
    return this.companyRepository.createABusinessPage(companyCreateDto);
  }

  async addAdmin(companyAdminDto: CompanyAdminDto): Promise<CompanyAdmin> {
    return this.companyRepository.addAdmin(companyAdminDto);
  }

  async getAllCompanyAdmins(): Promise<CompanyAdmin[]> {
    return this.companyRepository.getAllCompanyAdmins();
  }
}
