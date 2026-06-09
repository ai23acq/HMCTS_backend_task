import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../exceptions/codes";
import TaskService from "../services/task_services";

const service: TaskService = new TaskService()

class TaskController{
    async create(req: Request, res: Response, next: NextFunction){
        try {            
            const {title, description, dueDate} = req.body
            const { data } = await service.CreateTask({
                title, description, dueDate,
            })
            return res.status(StatusCode.CREATE_SUCCESSFUL).json(data)
        } catch (error) {
            next(error)
        }
    }

    async getTask(req: Request, res: Response, next: NextFunction){
        try {            
            const id = Number(req.params.id)
            const {data} = await service.GetTask(id)
            return res.status(StatusCode.CREATE_SUCCESSFUL).json(data)
        } catch (error) {
            next(error)
        }

    }
    
    async getAllTask(req: Request, res: Response, next: NextFunction){
        try {            
            const {data} = await service.GetAllTAsks()
            return res.status(StatusCode.CREATE_SUCCESSFUL).json(data)
        } catch (error) {
            next(error)
        }
        
    }
    
    async updateTask(req: Request, res: Response, next: NextFunction){
        try {            
            const id = Number(req.params.id)
            const {title, description, status, dueDate} = req.body
            const {data} = await service.UpdateTask(id, {
                title, description, status, dueDate
            })
            return res.status(StatusCode.CREATE_SUCCESSFUL).json(data)
        } catch (error) {
            next(error)
        }

    }

    async deleteTask(req: Request, res: Response, next: NextFunction){
        try {            
            const id = Number(req.params.id)
            const {data} = await service.DeleteTask(id)
            return res.status(StatusCode.CREATE_SUCCESSFUL).json(data)
        } catch (error) {
            next(error)
        }

    }

}

export default TaskController