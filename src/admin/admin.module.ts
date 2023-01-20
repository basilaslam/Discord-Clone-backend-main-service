import { Company, CompanySchema } from './../company/schema/company.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './controller/admin.controller';
import { AdminRepository } from './repository/admin.repository';
import { AdminService } from './service/admin.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
})
export class AdminModule {}
