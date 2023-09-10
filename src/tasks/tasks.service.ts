import { Injectable,NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter-dto';
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
    getTaskWithFilter(filterDto:GetTaskFilterDto):Task[]{
        const {status ,search}=filterDto
        let tasks=this.getAllTasks()
        if(status){
            tasks=tasks.filter((task)=>task.status===status)
        }
        if(search){
            tasks=tasks.filter((task)=>task.title.includes(search)||task.description.includes(search))
        }
        return tasks
    }

    getTaskById(id:string): Task {
        const found= this.tasks.find(task => task.id === id)
        if(!found){
            throw new NotFoundException()
        }
        return found
    }

    deleteTaskById(id:string){
        const found= this.tasks.find(task => task.id === id)
        if(!found){
            throw new NotFoundException()
        }
        this.tasks=this.tasks.filter((task)=>task.id !== id)
        return "task deleted"
    }
    updateTaskStatus(id:string, status:TaskStatus){
        const found= this.tasks.find(task => task.id === id)
        if(!found){
            throw new NotFoundException()
        }
        const task= this.getTaskById(id)
        task.status=status
        return task
    }

}
