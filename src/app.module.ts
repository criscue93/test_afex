import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './apis/api.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './connection/database.module';
import { connectProviders } from './connection/connect.providers';
import { QueryModule } from './services/querys.module';
@Module({
  imports: [ApiModule, DatabaseModule, QueryModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [...connectProviders, AppService],
})
export class AppModule {}
