import { BadRequestException, Injectable } from '@nestjs/common';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { extname, parse } from 'path';

import { FILE_SIZE } from '@/common/constant';
import { generateSlug } from '@/common/util';
import { ConfigService } from '@/config/config.service';

@Injectable()
export class UploadService {
  private readonly s3: S3Client;
  private readonly maxSizeBytes: number;
  private readonly bucket: string;
  private readonly publicBaseUrl: string;
  private readonly expiresIn: number;
  private readonly allowedMimeTypes: string[];

  constructor(private readonly config: ConfigService) {
    const { storagePresign } = config;
    this.s3 = new S3Client({
      region: storagePresign.region,
      endpoint: storagePresign.endPoint,
      credentials: {
        accessKeyId: storagePresign.accessKeyId,
        secretAccessKey: storagePresign.secretAccessKey,
      },
      requestChecksumCalculation: 'WHEN_REQUIRED',
    });
    this.maxSizeBytes = storagePresign.maxSizeBytes;
    this.bucket = storagePresign.bucket;
    this.publicBaseUrl = storagePresign.publicBaseUrl;
    this.expiresIn = storagePresign.expiresIn;
    this.allowedMimeTypes = storagePresign.allowedTypes.split(',');
  }

  async createPresignUpload(fileName: string, mime: string, size: number) {
    const ext = extname(fileName).toLowerCase();
    const safeName = generateSlug(parse(fileName).name);
    const key = `product/${Date.now()}-${safeName}${ext}`;

    const publicUrl = `${this.publicBaseUrl}/${key}`;
    const toMegaBytes = this.maxSizeBytes / FILE_SIZE.MEGABYTE;

    if (size > this.maxSizeBytes)
      throw new BadRequestException(
        `File size exceeds the maximum limit of ${toMegaBytes} MB.`,
      );

    if (!this.allowedMimeTypes.includes(mime))
      throw new BadRequestException(`This file type is not supported`);

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
