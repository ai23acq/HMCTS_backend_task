import { ErrorCode, StatusCode } from "../exceptions/codes"
import { BadRequestsException, NotFoundException } from "../exceptions/httpExceptions"
import { TaskCreation, TaskUpdate } from "../interfaces/task_interface"
import TaskRepository from "../repositories/task_repository"
import { FormateData } from "../utils/formate_data"

class TaskService{
    repository: TaskRepository
    constructor() {
        this.repository = new TaskRepository
    }

    async CreateTask(taskData: TaskCreation): Promise<{data: any}> {
        try {    
            const{title, description, dueDate} = taskData
    
            const createdData = await this.repository.createTask({
                title, description, dueDate
            })
            return FormateData(createdData)
        } catch (error) {
            console.error(error)
            throw new BadRequestsException("Something went wrong", ErrorCode.FAILED_REQUEST, StatusCode.NOT_CREATED)
        }
    }

    async GetTask(id: number): Promise<{data: any}>{
        try {
            const existingTask = await this.repository.findOneTask(id)
            if(existingTask){
                return FormateData(existingTask)
            }else{
                throw new NotFoundException("Task not found", ErrorCode.NOT_FOUND, StatusCode.TASK_NOT_FOUND) 
            }
        } catch (error) {
            console.log(error)
            throw new NotFoundException("Task not found", ErrorCode.INTERNAL_EXCEPTION_ERROR, StatusCode.INTERNAL_SERVER_ERROR)
        }
    }

    async GetAllTAsks(): Promise<{data: any[]}>{   
        const allTasks = await this.repository.findTasks()
        return FormateData(allTasks)
    }

    async UpdateTask(id: number, data: TaskUpdate): Promise<{data: any[]}>{
        try {
            const task = await this.repository.findOneTask(id)
            if(task){
                const updatedTask = await this.repository.updateTask(
                    id,
                    data
                )
                return FormateData(updatedTask)
            }else{
                throw new NotFoundException("No Task has been created", ErrorCode.NOT_FOUND, StatusCode.NOT_CREATED)
            }
        } catch (error) {
            throw new BadRequestsException("Something went wrong", ErrorCode.FAILED_REQUEST, StatusCode.INTERNAL_SERVER_ERROR)
        }
    }

    async DeleteTask(id: number): Promise<{data: any}> {
        try {    
            const task = await this.repository.findOneTask(id)
            if(task){
                await this.repository.deleteTask(id)
                return FormateData({message: "Task deleted successfully"})
            }else{
                throw new NotFoundException("Task not found", ErrorCode.NOT_FOUND, StatusCode.TASK_NOT_FOUND)
            }
        } catch (error) {
            throw new BadRequestsException("Something went wrong", ErrorCode.FAILED_REQUEST, StatusCode.INTERNAL_SERVER_ERROR)
        }
    }

}

export default TaskService