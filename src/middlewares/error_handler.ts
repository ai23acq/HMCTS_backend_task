import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { ErrorCode, StatusCode } from "../exceptions/codes";
import { HttpException } from "../exceptions/errorMessages";
import { BadRequestsException, InternalException } from "../exceptions/httpExceptions";


export const errorHandler = (method: Function) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req,res,next)
        } catch (error) {
            let exception: HttpException;
            if(error instanceof HttpException){
                exception = error
            }else if(error instanceof Joi.ValidationError) {
                exception = new BadRequestsException("Fields not complete", ErrorCode.FAILED_REQUEST, StatusCode.NOT_CREATED)
            }else{
                exception = new InternalException('Something went wrong', error, ErrorCode.INTERNAL_EXCEPTION_ERROR, StatusCode.INTERNAL_SERVER_ERROR)
            }
            next(exception)
        }
    }
}