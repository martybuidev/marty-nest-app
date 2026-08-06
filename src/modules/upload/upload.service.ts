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
    const { r2Presign } = config;
    this.s3 = new S3Client({
      region: r2Presign.region,
      endpoint: r2Presign.endPoint,
      credentials: {
        accessKeyId: r2Presign.accessKeyId,
        secretAccessKey: r2Presign.secretAccessKey,
      },
      requestChecksumCalculation: 'WHEN_REQUIRED',
    });
    this.maxSizeBytes = r2Presign.maxSizeBytes;
    this.bucket = r2Presign.bucket;
    this.publicBaseUrl = r2Presign.publicBaseUrl;
    this.expiresIn = r2Presign.expiresIn;
    this.allowedMimeTypes = r2Presign.allowedTypes.split(',');
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
