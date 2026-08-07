export interface ICreateUploadTicketInput {
  fileName: string;
  mime: string;
  size: number;
}
export interface IUploadTicket {
  uploadUrl: string;
  publicUrl: string;
  //TODO replace hard code later
  method?: 'PUT' | 'POST';
  headers?: Record<string, string>;
  fields?: Record<string, string>;
}

export interface IStorageProvider {
  createUploadTicket(input: ICreateUploadTicketInput): Promise<IUploadTicket>;
}

export const STORAGE_PROVIDER = Symbol('STORAGE_PROVIDER');
