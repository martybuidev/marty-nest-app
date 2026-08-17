import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { verify } from 'argon2';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';

import { TO_MILLISECONDS } from '@/common/constant';
import { ConfigService } from '@/config/config.service';

import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshToken } from './entities/refresh-token.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  private async generateTokens(
    { id, email, role }: User,
    ip: string,
    userAgent: string,
  ) {
    const payload = { sub: id, email, role };
    const { refreshSecret, refreshExpiration } = this.configService.jwt;

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: refreshSecret,
        expiresIn: refreshExpiration,
      }),
    ]);

    const hashedRefreshToken = crypto
      .createHmac('sha256', refreshSecret)
      .update(refreshToken)
      .digest('hex');

    const expiresAt = new Date(
      Date.now() + refreshExpiration * TO_MILLISECONDS,
    );
    await this.refreshTokenRepository.insert({
      userId: id,
      tokenHash: hashedRefreshToken,
      expiresAt,
      userAgent,
      ip,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id,
        email,
        role,
      },
    };
  }

  async register(registerDto: RegisterDto, ip: string, userAgent: string) {
    const user = await this.userService.create(registerDto);
    return this.generateTokens(user, ip, userAgent);
  }

  async login(loginDto: LoginDto, ip: string, userAgent: string) {
    const user = await this.userService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException(
        `User with ${loginDto.email} email is not found`,
      );
    }

    const matchedPassword = await verify(user.password, loginDto.password);
    if (!matchedPassword) {
      throw new UnauthorizedException(`Password is incorrect`);
    }

    return this.generateTokens(user, ip, userAgent);
  }

  async refresh(rawRefreshToken: string, ip: string, userAgent: string) {
    try {
      await this.jwtService.verifyAsync(rawRefreshToken, {
        secret: this.configService.jwt.refreshSecret,
      });
    } catch {
      throw new UnauthorizedException('Refresh token is invalid or expired');
    }

    const tokenHash = crypto
      .createHmac('sha256', this.configService.jwt.refreshSecret)
      .update(rawRefreshToken)
      .digest('hex');

    const storedToken = await this.refreshTokenRepository.findOne({
      where: { tokenHash },
      relations: { user: true },
    });

    if (
      !storedToken ||
      storedToken.revokedAt ||
      storedToken.expiresAt < new Date()
    ) {
      throw new UnauthorizedException('Refresh token is invalid or expired');
    }

    await this.refreshTokenRepository.update(storedToken.id, {
      revokedAt: new Date(),
    });

    return this.generateTokens(storedToken.user, ip, userAgent);
  }

  async logout(rawRefreshToken: string) {
    const tokenHash = crypto
      .createHmac('sha256', this.configService.jwt.refreshSecret)
      .update(rawRefreshToken)
      .digest('hex');

    await this.refreshTokenRepository.update(
      { tokenHash },
      { revokedAt: new Date() },
    );
  }
}
