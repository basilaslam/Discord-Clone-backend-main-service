import { Injectable } from '@nestjs/common';
import { Company } from 'src/company/schema/company.schema';
import { AdminRepository } from '../repository/admin.repository';

@Injectable()
export class AdminService {
  constructor(private adminRepository: AdminRepository) {}

  async getAllCompanies(): Promise<Company[]> {
    return this.adminRepository.getAllCompanies();
  }

  async approveCompany(companyId): Promise<boolean> {
    return this.adminRepository.approveCompany(companyId);
  }
}
