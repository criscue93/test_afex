import { students } from 'src/entitys/students.entity';
import { DataSource } from 'typeorm';
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.APP_PHOST,
        port: parseInt(process.env.APP_PORT, 10),
        username: process.env.APP_USER,
        password: process.env.APP_PASSWORD,
        database: process.env.APP_DATABASE,
        entities: [students],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.APP_MONGO),
  },
];
