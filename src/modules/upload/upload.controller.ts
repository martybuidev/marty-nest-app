import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Serialize } from '@/common/decorator';

import { createUploadTicketDto } from './dto/create-upload-ticket.dto';
import { ResponseUploadTicketDto } from './dto/response-upload-ticket.dto';
import { UploadService } from './upload.service';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('ticket')
  @Serialize(ResponseUploadTicketDto)
  createUploadTicket(@Query() query: createUploadTicketDto) {
    const { fileName, mime, size } = query;
    return this.uploadService.createUploadTicket(fileName, mime, size);
  }
}
