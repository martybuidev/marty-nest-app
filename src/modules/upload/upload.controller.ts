import { Body, Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PresignDto } from './dto/upload.dto';
import { UploadService } from './upload.service';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('presign')
  presign(@Query() query: PresignDto) {
    const { fileName, mime, size } = query;
    return this.uploadService.createPresignUpload(fileName, mime, size);
  }
}
