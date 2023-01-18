import { Injectable } from '@nestjs/common';
import { CompanyCreateDto } from '../dto/companyCreate.dto';
import { CompanyRepository } from '../repository/company.respository';
import { Company } from '../schema/company.schema';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async createABusinessPage(
    companyCreateDto: CompanyCreateDto,
  ): Promise<Company> {
    return this.companyRepository.createABusinessPage(companyCreateDto);
  }
}
