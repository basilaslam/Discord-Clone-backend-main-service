import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3Repository } from './s3.repositery';
import { S3Controller } from './s3.controller';
@Module({
  providers: [S3Service, S3Repository],
  controllers: [S3Controller],
})
export class S3Module {}
