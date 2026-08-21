import { BadRequestException, Injectable } from '@nestjs/common';

import { EAuthProvider } from '../dto/login.dto';
import { IAuthStrategy } from './auth-strategy.interface';
import { CredentialAuthStrategy } from './credential.strategy';
import { GithubAuthStrategy } from './github.strategy';
import { GoogleAuthStrategy } from './google.strategy';

@Injectable()
export class AuthStrategyFactory {
  constructor(
    private readonly credentialStrategy: CredentialAuthStrategy,
    private readonly googleStrategy: GoogleAuthStrategy,
    private readonly githubStrategy: GithubAuthStrategy,
  ) {}

  getStrategy(provider: EAuthProvider): IAuthStrategy {
    switch (provider) {
      case EAuthProvider.CREDENTIALS:
        return this.credentialStrategy;
      case EAuthProvider.GOOGLE:
        return this.googleStrategy;
      case EAuthProvider.GITHUB:
        return this.githubStrategy;
      default:
        throw new BadRequestException(
          `Provider ${provider as string} is not supported`,
        );
    }
  }
}
