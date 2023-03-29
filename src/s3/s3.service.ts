import { Injectable } from '@nestjs/common';
import { S3Repository } from './s3.repositery';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  constructor(private s3Repository: S3Repository) {}

  getLink = async () => {
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    const s3 = new S3({
      apiVersion: '2006-03-01',
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region,
      signatureVersion: 'v4',
    });

    return await this.s3Repository.generateLink(s3);
  };
}
