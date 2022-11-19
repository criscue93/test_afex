import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './apis/api.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './connection/database.module';
import { connectProviders } from './connection/connect.providers';
import { QueryModule } from './services/querys.module';
import { Proyect, ProyectSchema } from './schemas/proyect.schema';
@Module({
  imports: [
    ApiModule,
    DatabaseModule,
    QueryModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.APP_MONGO, {
      connectionName: 'students',
    }),
    MongooseModule.forFeature(
      [
        {
          name: Proyect.name,
          schema: ProyectSchema,
        },
      ],
      'students',
    ),
  ],
  controllers: [AppController],
  providers: [...connectProviders, AppService],
})
export class AppModule {}
