import { CompanyRepository } from './repository/company.repository';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyController } from './controller/company.controller';
import { Company, CompanySchema } from './schema/company.schema';
import { CompanyService } from './service/company.service';
import {
  CompanyAdmin,
  CompanyAdminSchema,
} from 'src/company-admin/schema/company-admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    MongooseModule.forFeature([
      { name: CompanyAdmin.name, schema: CompanyAdminSchema },
    ]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository],
})
export class CompanyModule {}
