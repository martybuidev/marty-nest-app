import { Body, Controller, Headers, Ip, Post } from '@nestjs/common';

import { UserAgent } from '@/common/decorator/user-agent.decorator';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body() loginDto: LoginDto,
    @Ip() ip: string,
    @UserAgent() userAgent: string,
  ) {
    return this.authService.login(loginDto, ip, userAgent);
  }
}
