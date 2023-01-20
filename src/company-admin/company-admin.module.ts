import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyAdminController } from './controller/company-admin.controller';
import { CompanyAdminRepository } from './repository/company-admin.repository';
import {
  CompanyAdmin,
  CompanyAdminSchema,
} from './schema/company-admin.schema';
import { CompanyAdminService } from './service/company-admin.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CompanyAdmin.name, schema: CompanyAdminSchema },
    ]),
  ],
  controllers: [CompanyAdminController],
  providers: [CompanyAdminService, CompanyAdminRepository],
})
export class CompanyAdminModule {}
