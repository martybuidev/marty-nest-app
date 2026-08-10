import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RefreshToken } from './entities/reresh-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RefreshToken])],
})
export class AuthModule {}
