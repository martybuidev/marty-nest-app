import { Injectable, UnauthorizedException } from '@nestjs/common';

import { OAuth2Client } from 'google-auth-library';

import { ConfigService } from '@/config/config.service';

import { LoginDto } from '../dto/login.dto';
import { IAuthStrategy, IAuthStrategyResult } from './auth-strategy.interface';

@Injectable()
export class GoogleAuthStrategy implements IAuthStrategy {
  private readonly googleClientId: string;
  private client: OAuth2Client;

  constructor(private readonly configService: ConfigService) {
    const { googleClientId } = this.configService.auth;

    this.googleClientId = googleClientId;
    this.client = new OAuth2Client(googleClientId);
  }

  async validate(loginDto: LoginDto): Promise<IAuthStrategyResult> {
    if (!loginDto.token) {
      throw new UnauthorizedException('Google ID token is required');
    }

    try {
      const ticket = await this.client.verifyIdToken({
        idToken: loginDto.token,
        audience: this.googleClientId,
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.email) {
        throw new UnauthorizedException('Invalid Google token payload');
      }

      if (!payload.email_verified) {
        throw new UnauthorizedException('Google email not verified');
      }

      return {
        email: payload.email,
        fullName: payload.name || payload.email.split('@')[0],
        providerId: payload.sub,
      };
    } catch (err) {
      throw new UnauthorizedException(
        `Google token verification failed: ${err}`,
      );
    }
  }
}
