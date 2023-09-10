import { Body, Controller,Query, Delete, Get, Param, Post,Patch ,UsePipes,ValidationPipe} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-va;idation-pipes';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}
    
    @Get()
    getTasks(@Query(ValidationPipe) filter:GetTaskFilterDto):Task[] {
      return  Object.keys(filter).length ?this.tasksService.getTaskWithFilter(filter):this.tasksService.getAllTasks()
    }

    @Post()
    @UsePipes(ValidationPipe)
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
    
    @Patch("/:id/status")
    updateTaskStatus(@Body("status" ,TaskStatusValidationPipe) status:TaskStatus, @Param("id") id:string){
        console.log(id,status)
        return this.tasksService.updateTaskStatus(id,status)
    }
}
