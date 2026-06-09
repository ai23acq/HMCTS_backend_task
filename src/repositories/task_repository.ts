import { Prisma, Task } from "../generated/prisma/client";
import prisma from "../db";
import { TaskCreation } from "../interfaces/task_interface";
import { BadRequestsException, NotFoundException } from "../exceptions/httpExceptions";
import { ErrorCode, StatusCode } from "../exceptions/codes";


class TaskRepository {
  async createTask({title, description, dueDate}: TaskCreation): Promise<Task> {
    const now = new Date()
    const parsedDate = new Date(dueDate);

    if (isNaN(parsedDate.getTime())) {
        throw new BadRequestsException(
            "Invalid due date",
            ErrorCode.FAILED_REQUEST,
            StatusCode.INTERNAL_SERVER_ERROR
        );
    }

    // This is for checking for current date and not past dates
    if (parsedDate < now) {
        throw new BadRequestsException(
          "Due date cannot be in the past",
          ErrorCode.FAILED_REQUEST,
          StatusCode.INTERNAL_SERVER_ERROR
        );
    }
    try {
        const newTask = await prisma.task.create({
            data: {
                title, description, dueDate: parsedDate
            }
        })
        return newTask
    }catch{
        throw new BadRequestsException("Cannot Create new task", ErrorCode.FAILED_REQUEST, StatusCode.NOT_CREATED)
    }
  };

  async findOneTask(id: number): Promise<Task | null>{
    try {
        const existingTask = await prisma.task.findUnique({
            where: {id: id}
        })
        return existingTask
    } catch (error) {
        throw new NotFoundException("Task does not exist", ErrorCode.NOT_FOUND, StatusCode.TASK_NOT_FOUND)
    }
  }

  async findTasks(): Promise<Task[]>{
    const tasks = await prisma.task.findMany()
    return tasks
  }

  async updateTask(id: number, data: Prisma.TaskUpdateInput): Promise<Task | null>{
    
    const now = new Date()
    if(data.dueDate){
        const parsedDate = new Date(data.dueDate as string | Date);
    
        if (isNaN(parsedDate.getTime())) {
            throw new BadRequestsException(
                "Invalid due date",
                ErrorCode.FAILED_REQUEST,
                StatusCode.INTERNAL_SERVER_ERROR
            );
        }
    
        // This is for checking for current date and not past dates
        if (parsedDate < now) {
            throw new BadRequestsException(
              "Due date cannot be in the past",
              ErrorCode.FAILED_REQUEST,
              StatusCode.INTERNAL_SERVER_ERROR
            );
        }
        data.dueDate = parsedDate
    }
    try {
        const updatedTask = await prisma.task.update({
            where: {id: id},
            data
        })
        return updatedTask
    } catch (error) {
        throw new NotFoundException("Tasks are not created", ErrorCode.NOT_FOUND, StatusCode.TASK_NOT_FOUND)
    }
  }

  async deleteTask(id: number): Promise<Task | null>{
    try {
        const existingTask = await prisma.task.delete({
            where: {id: id}
        })
        return existingTask
    } catch (error) {
        throw new NotFoundException("Task does not exist", ErrorCode.NOT_FOUND, StatusCode.TASK_NOT_FOUND)
    }
  }
}

export default TaskRepository