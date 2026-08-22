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
export interface IGithubProfile {
  id: number;
  login: string;
  name?: string | null;
  email?: string | null;
}

export interface IGithubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
}
