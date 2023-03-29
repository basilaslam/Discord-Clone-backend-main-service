import { Injectable } from '@nestjs/common';
import { v4 as UUID } from 'uuid';
@Injectable()
export class S3Repository {
  async generateLink(s3: import('aws-sdk/clients/s3')) {
    const fileName = `${UUID()}.jpg`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Expires: 60,
    };
    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    return uploadURL;
  }
}
