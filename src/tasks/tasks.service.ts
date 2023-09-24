import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: TaskRepository
    ) {
    }

    async getTaskById(id: number): Promise<Task | undefined> {
        const found = await this.taskRepository.findOne({ where: { id } });
        if (!found) {
            throw new NotFoundException(`Task ${id} does not exist`);
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto
        const task = new Task()
        task.title = title
        task.description = description
        task.user = user
        task.status = TaskStatus.OPEN
        const result = await this.taskRepository.save(task)
        delete task.user
        return result
    }

    async getAllTasks(filter: GetTaskFilterDto,
        user: User
        ): Promise<Task[]> {
        const { status, search } = filter
        const query = this.taskRepository.createQueryBuilder('task')
        query.where('task.userId= :userId',{userId: user.id})
        if (status) {
            query.andWhere('task.status =:status ', { status })
        }
        if (search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search ', { search: `%${search}%` })
        }
        const queryResult = await query.getMany()
        return queryResult
    }



    async deleteTaskById(id: number): Promise<Task | { statusCode: number, timestamp: string, message: string }> {
        const found = await this.taskRepository.delete(id)
        if (!found.affected) {
            throw new NotFoundException()
        }
        return {
            statusCode: 200,
            timestamp: new Date().toISOString(),
            message: "Task deleted"
        }
    }
    async updateTaskStatus(id: number, status: TaskStatus,user:User): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id: id,userId:user.id } })
        if (!task) {
            throw new NotFoundException()
        }
        task.status = status
        await this.taskRepository.save(task)
        return task

    }

}
