import { User } from '@/modules/user/entities/user.entity';

import { LoginDto } from '../dto/login.dto';

export interface IAuthStrategyResult {
  email: string;
  fullName?: string;
  providerId?: string;
  user?: User;
}

export interface IAuthStrategy {
  validate(loginDto: LoginDto): Promise<IAuthStrategyResult>;
}
