import { ErrorCode, StatusCode } from "./codes"
import { HttpException } from "./errorMessages"


export class BadRequestsException extends HttpException{
    constructor(message:string, errorCode:ErrorCode, statusCode: StatusCode){
        super(message, errorCode, statusCode, null)
    }
}

export class UnprocessableException extends HttpException{
    constructor(message: string, errorCode: number, statusCode: number){
        super(message, errorCode, statusCode, null)
    }
}

export class InternalException extends HttpException{
    constructor(message: string, errors: any, errorCode: number, statusCode: number){
        super(message, errorCode, statusCode, errors)
    }
}

export class NotFoundException extends HttpException{
    constructor(message:string, errorCode:ErrorCode, statusCode: StatusCode){
        super(message, errorCode, statusCode, null)
    }
}