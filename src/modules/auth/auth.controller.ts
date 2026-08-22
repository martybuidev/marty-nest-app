import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { CurrentUser } from '@/common/decorator';
import { UserAgent } from '@/common/decorator/user-agent.decorator';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { TJwtPayload } from './strategies/jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body() registerDto: RegisterDto,
    @Ip() ip: string,
    @UserAgent() userAgent: string,
  ) {
    return this.authService.register(registerDto, ip, userAgent);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(
    @Body() loginDto: LoginDto,
    @Ip() ip: string,
    @UserAgent() userAgent: string,
  ) {
    return this.authService.login(loginDto, ip, userAgent);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(
    @Body() { refreshToken }: RefreshTokenDto,
    @Ip() ip: string,
    @UserAgent() userAgent: string,
  ) {
    return this.authService.refresh(refreshToken, ip, userAgent);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Body() { refreshToken }: RefreshTokenDto) {
    return this.authService.logout(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  me(@CurrentUser() user: TJwtPayload) {
    return user;
  }
}
