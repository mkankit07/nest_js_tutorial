// typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'Ankit123',
    database: 'taskmanagement',
    entities: [__dirname + '../**/*.entity.ts'],
    synchronize: true,
};
