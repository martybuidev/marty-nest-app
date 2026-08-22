import { Column, Entity, Index, OneToMany } from 'typeorm';

import { CommonBaseEntity } from '@/common/entity/base.entity';
import { EUserRole } from '@/common/enum/user-role.enum';
import { EUserStatus } from '@/common/enum/user-status.enum';
import { RefreshToken } from '@/modules/auth/entities/refresh-token.entity';

@Entity('users')
export class User extends CommonBaseEntity {
  @Index('UK_users_email', { unique: true })
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255, select: false, nullable: true })
  password: string;

  @Column({ name: 'full_name', type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'enum', enum: EUserRole, default: EUserRole.USER })
  role: EUserRole;

  @Column({ type: 'enum', enum: EUserStatus, default: EUserStatus.ACTIVE })
  status: EUserStatus;

  @OneToMany(() => RefreshToken, (token) => token.user, { cascade: true })
  refreshTokens: RefreshToken[];
}
