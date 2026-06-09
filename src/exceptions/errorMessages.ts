import { ErrorCode, StatusCode } from "./codes";

export class HttpException extends Error{
    message: string;
    errorCode: any;
    statusCode: number;
    errors: ErrorCode;

    constructor(message:string, errorCode:ErrorCode, statusCode:StatusCode, errors:any){
        super(message)
        this.message = message
        this.errorCode = errorCode
        this.statusCode = statusCode
        this.errors = errors
    }
}