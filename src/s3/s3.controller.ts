import { Controller, Get } from '@nestjs/common';
import { S3Service } from './s3.service';

@Controller('s3')
export class S3Controller {
  constructor(private s3Service: S3Service) {}

  @Get('getUrl')
  async getUrl() {
    const url = await this.s3Service.getLink();
    return url;
  }
}
