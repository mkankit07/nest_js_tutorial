import { EntityRepository } from 'typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  // ...
  
}
