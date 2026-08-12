import { Injectable } from '@nestjs/common';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { extname, parse } from 'path';

import { generateSlug } from '@/common/util';
import { ConfigService } from '@/config/config.service';
import {
  ICreateUploadTicketInput,
  IStorageProvider,
  IUploadTicket,
} from '@/modules/storage/storage.interface';

@Injectable()
export class R2Service implements IStorageProvider {
  private readonly s3: S3Client;
  private readonly bucket: string;
  private readonly publicBaseUrl: string;
  private readonly expiresIn: number;

  constructor(private readonly config: ConfigService) {
    const { storageR2 } = config;

    this.s3 = new S3Client({
      region: storageR2.region,
      endpoint: storageR2.endPoint,
      credentials: {
        accessKeyId: storageR2.accessKeyId,
        secretAccessKey: storageR2.secretAccessKey,
      },
      requestChecksumCalculation: 'WHEN_REQUIRED',
    });
    this.bucket = storageR2.bucket;
    this.publicBaseUrl = storageR2.publicBaseUrl;
    this.expiresIn = storageR2.expiresIn;
  }

  async createUploadTicket({
    fileName,
    mime,
    size,
  }: ICreateUploadTicketInput): Promise<IUploadTicket> {
    const ext = extname(fileName).toLowerCase();
    const safeName = generateSlug(parse(fileName).name);
    const key = `product/${Date.now()}-${safeName}${ext}`;

    const publicUrl = `${this.publicBaseUrl}/${key}`;

    const uploadUrl = await getSignedUrl(
      this.s3,
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        ContentType: mime,
        ContentLength: size,
      }),
      { expiresIn: this.expiresIn },
    );

    return {
      uploadUrl,
      publicUrl,
    };
  }
}
