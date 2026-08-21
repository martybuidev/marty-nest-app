import { Injectable, UnauthorizedException } from '@nestjs/common';

import { LoginDto } from '../dto/login.dto';
import {
  IAuthStrategy,
  IAuthStrategyResult,
  IGithubEmail,
  IGithubProfile,
} from './auth-strategy.interface';

@Injectable()
export class GithubAuthStrategy implements IAuthStrategy {
  async validate(loginDto: LoginDto): Promise<IAuthStrategyResult> {
    if (!loginDto.token) {
      throw new UnauthorizedException('GitHub access token is required');
    }

    try {
      const userRes = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${loginDto.token}`,
          'User-Agent': 'NestJS-App',
        },
      });

      if (!userRes.ok) {
        throw new UnauthorizedException('Invalid GitHub access token');
      }

      const profile = (await userRes.json()) as IGithubProfile;

      let email = profile.email;
      if (!email) {
        const emailsRes = await fetch('https://api.github.com/user/emails', {
          headers: {
            Authorization: `Bearer ${loginDto.token}`,
            'User-Agent': 'NestJS-App',
          },
        });

        if (emailsRes.ok) {
          const emails = (await emailsRes.json()) as IGithubEmail[];
          const primaryEmail = emails.find((e) => e.primary && e.verified);
          email = primaryEmail?.email;
        }
      }

      if (!email) {
        throw new UnauthorizedException('GitHub account has no verified email');
      }

      return {
        email,
        fullName: profile.name || profile.login,
        providerId: String(profile.id),
      };
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        throw err;
      }

      const errorMessage = err instanceof Error ? err.message : String(err);
      throw new UnauthorizedException(
        `GitHub token verification failed: ${errorMessage}`,
      );
    }
  }
}
