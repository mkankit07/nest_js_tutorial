import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), TasksModule],
})
export class AppModule {}
