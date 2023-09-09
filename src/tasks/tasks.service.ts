import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-tasks.dto';
@Injectable()
export class TasksService {
    private tasks:Task[]=[]

    createTask(createTaskDto:CreateTaskDto){
        const tasks: Task={
            id:uuid.v4(),
            title:createTaskDto.title,
            description:createTaskDto.description,
            status:TaskStatus.OPEN
        }
        this.tasks.push(tasks);
        return tasks;
    }

    getAllTasks():Task[] {
        return this.tasks
    }

    getTaskById(id:string): Task {
        return this.tasks.find(task => task.id === id)
    }

    deleteTaskById(id:string){
        this.tasks=this.tasks.filter((task)=>task.id !== id)
        return "task deleted"
    }

}
