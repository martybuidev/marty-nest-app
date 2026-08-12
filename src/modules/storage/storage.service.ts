import { Inject, Injectable } from '@nestjs/common';

import {
  ICreateUploadTicketInput,
  type IStorageProvider,
  STORAGE_PROVIDER,
} from './storage.interface';

@Injectable()
export class StorageService {
  constructor(
    @Inject(STORAGE_PROVIDER)
    private readonly provider: IStorageProvider,
  ) {}

  createUploadTicket({ fileName, mime, size }: ICreateUploadTicketInput) {
    return this.provider.createUploadTicket({ fileName, mime, size });
  }
}
