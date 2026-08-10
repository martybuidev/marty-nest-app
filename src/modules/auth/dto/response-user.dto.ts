import { Expose } from 'class-transformer';

import { EUserRole } from '@/common/enum/user-role.enum';
import { EUserStatus } from '@/common/enum/user-status.enum';

export class ResponseUserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  fullName: string;

  @Expose()
  role: EUserRole;

  @Expose()
  status: EUserStatus;
}
