import { Injectable, UnauthorizedException } from '@nestjs/common';

import { verify } from 'argon2';

import { UserService } from '@/modules/user/user.service';

import { LoginDto } from '../dto/login.dto';
import { IAuthStrategy, IAuthStrategyResult } from './auth-strategy.interface';

@Injectable()
export class CredentialAuthStrategy implements IAuthStrategy {
  constructor(private readonly userService: UserService) {}

  async validate(loginDto: LoginDto): Promise<IAuthStrategyResult> {
    const { email, password } = loginDto;
    if (!email || !password) {
      throw new UnauthorizedException('Email and password are required');
    }

    const user = await this.userService.findOneByEmail(email);
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await verify(user.password, password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return { email: user.email, user };
  }
}
