import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), TasksModule, AuthModule],
})
export class AppModule {}
