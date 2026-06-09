import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/errorMessages";

export const errorMiddleware = (error:HttpException, req:Request, res:Response, next:NextFunction) => {
    console.log(error)
    console.log("FULL ERROR:", error);
    console.log("STATUS:", error?.statusCode);
    console.log("INSTANCEOF:", error instanceof HttpException);
    res.status(error?.statusCode || 500).json({
        message: error.message || "Internal server error",
        statusCode: error.statusCode || 500,
        errorCode: error.errorCode,
        errors: error.errors
    })
}