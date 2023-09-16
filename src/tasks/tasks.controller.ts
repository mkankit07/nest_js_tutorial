import { Body, Controller, Query, Delete, Get, Param, Post, Patch, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipes';
import { Task } from './tasks.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto):Promise<Task[]> {
        return this.tasksService.getAllTasks(filterDto)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto)
    }

    @Get("/:id")
    getTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id)
    }

    @Delete("/:id")
    deleteTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task | { statusCode: number, timestamp: string, message: string }> {
        return this.tasksService.deleteTaskById(id)
    }

    @Patch("/:id/status")
    updateTaskStatus(@Body("status", TaskStatusValidationPipe) status: TaskStatus, @Param("id", ParseIntPipe) id: number) {
        console.log(id, status)
        return this.tasksService.updateTaskStatus(id, status)
    }
}
