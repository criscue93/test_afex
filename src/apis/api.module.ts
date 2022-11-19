import { Module } from '@nestjs/common';
import { connectProviders } from 'src/connection/connect.providers';
import { DatabaseModule } from 'src/connection/database.module';
import { queryService } from 'src/services/querys.service';
import { StudentMySqlQueryService } from './studentsMySql/students-query.service';
import { StudentMySqlController } from './studentsMySql/students.controller';
import { StudentMySqlService } from './studentsMySql/students.service';
import { StudentMongoDbController } from './studentsMongoDb/students.controller';
import { StudentMongoDbService } from './studentsMongoDb/students.service';
import { StudentMongoDbQueryService } from './studentsMongoDb/students-query.service';

@Module({
  imports: [DatabaseModule],
  controllers: [StudentMySqlController, StudentMongoDbController],
  providers: [
    ...connectProviders,
    queryService,
    StudentMySqlService,
    StudentMySqlQueryService,
    StudentMongoDbService,
    StudentMongoDbQueryService,
  ],
})
export class ApiModule {}
