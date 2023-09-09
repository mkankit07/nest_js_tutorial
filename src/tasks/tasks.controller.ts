import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-tasks.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}
    
    @Get()
    getAllTasks():Task[] {
      return  this.tasksService.getAllTasks()
    }

    @Post()
    createTask(@Body() createTaskDto:CreateTaskDto){
        return this.tasksService.createTask(createTaskDto)
    }

    @Get("/:id")
    getTaskById(@Param("id") id:string):Task{
        return this.tasksService.getTaskById(id)
    }

    @Delete("/:id")
    deleteTaskById(@Param("id") id:string):string{
        return this.tasksService.deleteTaskById(id)
    }
}
