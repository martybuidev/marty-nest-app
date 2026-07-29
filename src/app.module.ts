
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: (process.env.DB_TYPE || 'postgres') as any,
      host: process.env.DB_HOST || 'localhost',
      port: (process.env.DB_PORT || 5432) as number,

      username: process.env.DB_USERNAME || 'username',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'dbname',  
      entities: [],
      synchronize: true,
    }),
  ],
})
export class AppModule implements OnModuleInit{
    constructor(private dataSource: DataSource) {}

    onModuleInit() {
      if (this.dataSource.isInitialized){
        console.log('Connect to db successfully');
      }
      else{
        console.log('Fail to connect');
        
      }
    }
}


