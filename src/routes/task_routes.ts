import { Router } from "express";
import TaskController from "../controllers/task_controller";
import { errorHandler } from "../middlewares/error_handler";
import { validate } from "../middlewares/validator";
import { taskValidator } from "../validators/task_validation";

const tasksRoutes:Router = Router()
const tasks: TaskController = new TaskController()

tasksRoutes.get("/get", errorHandler(tasks.getAllTask))
tasksRoutes.post("/post", validate(taskValidator), errorHandler(tasks.create))
tasksRoutes.get("/get_single/:id", errorHandler(tasks.getTask))
tasksRoutes.patch("/update_single/:id", errorHandler(tasks.updateTask))
tasksRoutes.delete("/delete_single/:id", errorHandler(tasks.deleteTask))

export default tasksRoutes