import { DataSource } from 'typeorm';
import { Connection } from 'mongoose';
import { StudentSchema } from 'src/schemas/student.schema';

export const connectProviders = [
  {
    provide: 'CONNECT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource,
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'STUDENT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Cat', StudentSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
