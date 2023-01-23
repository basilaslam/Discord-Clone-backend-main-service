import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CompanyAdminRepository } from '../repository/company-admin.repository';
import { CompanyAdmin } from '../schema/company-admin.schema';

@Injectable()
export class CompanyAdminService {
  constructor(private companyAdminRepository: CompanyAdminRepository) {}
  async getProfile(adminId: string): Promise<CompanyAdmin> {
    if (!adminId)
      throw new HttpException('An Error occured', HttpStatus.BAD_REQUEST);
    return this.companyAdminRepository.getProfile(adminId);
  }
}
