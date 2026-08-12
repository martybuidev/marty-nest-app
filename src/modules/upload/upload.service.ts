import { BadRequestException, Injectable } from '@nestjs/common';

import { FILE_SIZE } from '@/common/constant';
import { ConfigService } from '@/config/config.service';

import { StorageService } from '../storage/storage.service';

@Injectable()
export class UploadService {
  private readonly maxSizeBytes: number;
  private readonly allowedMimeTypes: string[];

  constructor(
    private readonly config: ConfigService,
    private readonly storage: StorageService,
  ) {
    const { upload } = config;
    this.maxSizeBytes = upload.maxSizeBytes;
    this.allowedMimeTypes = upload.allowedTypes
      .split(',')
      .map((type) => type.trim());
  }

  async createUploadTicket(fileName: string, mime: string, size: number) {
    const toMegaBytes = this.maxSizeBytes / FILE_SIZE.MEGABYTE;

    if (size > this.maxSizeBytes)
      throw new BadRequestException(
        `File size exceeds the maximum limit of ${toMegaBytes} MB.`,
      );

    if (!this.allowedMimeTypes.includes(mime))
      throw new BadRequestException(`This file type is not supported`);

    return this.storage.createUploadTicket({ fileName, mime, size });
  }
}
